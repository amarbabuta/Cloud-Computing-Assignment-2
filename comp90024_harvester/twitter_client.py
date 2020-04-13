import csv
import json
import random
import tweepy
from textblob.classifiers import NaiveBayesClassifier
from textblob import TextBlob
from shapely.geometry import shape, Point
import nltk
nltk.download("stopwords")
from nltk.corpus import stopwords


class MyStreamListener(tweepy.StreamListener):
    def __init__(self, db_tweets, db_users, api, bounding_box,
                 consumer_key, consumer_secret, access_token, access_secret, geojson, codes):
        self.db_tweets = db_tweets
        self.db_users = db_users
        self.api = api
        self.bounding_box = bounding_box
        self.consumer_key = consumer_key
        self.consumer_secret = consumer_secret
        self.access_token = access_token
        self.access_secret = access_secret
        with open(geojson) as fp:
            self.geo = json.load(fp)
        with open(codes) as fp:
            reader = csv.reader(fp)
            self.codes = {rows[1]: rows[0] for rows in reader}
        self.cl = self.train()
        self.stop = set(stopwords.words("english"))

    def train(self):
        tweets = []
        with open("training/pos.json") as pos:
            for line in pos:
                js = json.loads(line)
                tweets.append((js["text"], "pos"))

        with open("training/neg.json") as neg:
            for line in neg:
                js = json.loads(line)
                tweets.append((js["text"], "neg"))
        random.shuffle(tweets)

        train = tweets[:3000]

        return NaiveBayesClassifier(train)

    def on_status(self, status):
        print("status: {}".format(status.text))

    def on_data(self, data):
        tweet = json.loads(data)
        if self.check_coords(tweet):
            self.save_tweet(tweet)
        if tweet["user"]["id_str"] not in self.db_users:
            try:
                for status in tweepy.Cursor(
                        self.api.user_timeline,
                        screen_name=tweet["user"]["screen_name"],
                        tweet_mode="extended").items():
                    user_tweet = status._json
                    if self.check_coords(user_tweet):
                        self.save_tweet(user_tweet)
                self.db_users[tweet["user"]["id_str"]] = {"complete": "y"}
                print("user: " + tweet["user"]["id_str"] + " completed")
            except Exception as e:
                print("exception: {}".format(e))
        return True

    def save_tweet(self, tweet):
        tweet_id = tweet["id_str"]
        if tweet_id not in self.db_tweets:
            text = tweet["full_text"] if "full_text" in tweet else tweet["text"]
            coords = self.get_coords(tweet)
            lga_name = self.get_lga(coords)
            if lga_name:
                self.db_tweets[tweet_id] = {"tweet": {
                    "created_at": tweet["created_at"],
                    "text": text,
                    "filtered_text": self.remove_stopwords(text),
                    "coordinates": coords,
                    "lga_name": lga_name,
                    "lga_code": self.codes[lga_name],
                    "sentiment": self.get_sentiment(text)
                }}
                print("new tweet: {}".format(tweet_id))

    def remove_stopwords(self, tweet):
        return " ".join(set(tweet.lower().split()) - self.stop)

    def check_coords(self, tweet):
        coords = self.get_coords(tweet)
        if coords and self.bounding_box[2] > coords[0] > self.bounding_box[0] \
                and self.bounding_box[3] > coords[1] > self.bounding_box[1]:
            return True
        return False

    def get_coords(self, tweet):
        if tweet["coordinates"] is not None:
            return tweet["coordinates"]["coordinates"]
        elif tweet["place"] is not None:
            return [
                self.mean(
                    tweet["place"]["bounding_box"]["coordinates"][0][0][0],
                    tweet["place"]["bounding_box"]["coordinates"][0][2][0]
                ),
                self.mean(
                    tweet["place"]["bounding_box"]["coordinates"][0][0][1],
                    tweet["place"]["bounding_box"]["coordinates"][0][2][1]
                ),
            ]
        return None

    def get_lga(self, coords):
        for feature in self.geo["features"]:
            polygon = shape(feature["geometry"])
            if polygon.contains(Point(*coords)):
                return feature["properties"]["vic_lga__3"]
        return None

    def get_sentiment(self, text):
        prob_dist = self.cl.prob_classify(text)
        return {
            "classification": prob_dist.max(),
            "p_pos": round(prob_dist.prob("pos"), 2),
            "p_neg": round(prob_dist.prob("neg"), 2)
        }

    def mean(self, i1, i2):
        return (i1 + i2) / 2

    def on_error(self, status):
        print("error: {}".format(status))

    def on_exception(self, exception):
        print("exception: {}".format(exception))
