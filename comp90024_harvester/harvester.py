#!/usr/bin/env python3
import tweepy
import couchdb
import json
import math
from urllib3.exceptions import ProtocolError
from twitter_client import MyStreamListener


VIC = [140.9637383263, -39.1701944869, 150.2020069979, -33.9807673149]
SA = [129.0001501594, -38.2743169232, 140.9993882971, -25.9963925613]


def create_sub_box(bounding_box, num):
    sub_box = []
    interval = math.floor(
        (bounding_box[2] - bounding_box[0]) / num * 100000000) / 100000000
    for i in range(num):
        sub_box.append([bounding_box[0] + interval * i,
                        bounding_box[1],
                        bounding_box[0] + interval * (i + 1),
                        bounding_box[3]])

    sub_box[num - 1][2] = bounding_box[2]

    return sub_box


def main():
    with open("config.json") as fp:
        config = json.load(fp)
        consumer_key = config["consumer_key"]
        consumer_secret = config["consumer_secret"]
        access_token = config["access_token"]
        access_secret = config["access_secret"]
        db_host = config["db_host"]
        num_harvesters = config["num_harvesters"]
        harvester_id = config["harvester_id"] - 1

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_secret)

    api = tweepy.API(auth, wait_on_rate_limit=True)

    db_tweets = "tweets"
    db_user_name = "users"
    db_address = "http://{}:5984/".format(db_host)
    couch = couchdb.Server(db_address)

    if db_tweets in couch:
        db_tweets = couch[db_tweets]
    else:
        db_tweets = couch.create(db_tweets)

    if db_user_name in couch:
        db_users = couch[db_user_name]
    else:
        db_users = couch.create(db_user_name)

    search_box = create_sub_box(VIC, num_harvesters)[harvester_id]

    myStreamListener = MyStreamListener(
        db_tweets,
        db_users,
        api,
        search_box,
        consumer_key,
        consumer_secret,
        access_token,
        access_secret,
        "vic.json",
        "vic_codes.csv")
    myStream = tweepy.Stream(auth=api.auth, listener=myStreamListener)

    while True:
        try:
            myStream.filter(locations=search_box)
        except ProtocolError:
            continue


if __name__ == "__main__":
    main()
