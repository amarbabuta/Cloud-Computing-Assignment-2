# comp90024_harvester

Script to harvest tweets using the twitter APIs, and store them in a CouchDB database.

To run the harvester, first copy `config.eg.json` to `config.json` and fill in the values. Install dependencies using `pipenv install`.

Once dependencies are installed you must download the TextBlob corpora using `pipenv run corpora`.

You can now run the harvester using `pipenv run start`.