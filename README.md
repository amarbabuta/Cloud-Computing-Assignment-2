# Cloud-Computing-Assignment-2

# Comp90024_web

## Available Scripts

In the project directory, you can run:

### `npm run start:dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run start:server`

Serves the static files in the `build` folder using http-server.<br>
Open [http://localhost](http://localhost) to view it in the browser.

### `npm run start:prod`

Same as `npm start:server` except `pm2` is used to daemonize the app.<br>
Open [http://localhost](http://localhost) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# Comp90024_ansible

To run this playbook you must first connect to the University of Melbourne LAN

Place `openrc.sh` file in the project directory and run the following commands

Make sure you have an ssh key for GitHub in your ssh-agent before running the create script

To provision run

```bash
comp90024-create.sh
```

To delete run

```bash
comp90024-delete.sh
```



# Comp90024_couchdb

Views used in CouchDB to assist in analysis of tweets and crime data.




# Comp90024_harvester

Script to harvest tweets using the twitter APIs, and store them in a CouchDB database.

To run the harvester, first copy `config.eg.json` to `config.json` and fill in the values. Install dependencies using `pipenv install`.

Once dependencies are installed you must download the TextBlob corpora using `pipenv run corpora`.

You can now run the harvester using `pipenv run start`.
