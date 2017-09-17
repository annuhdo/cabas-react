# cabas🎍
Real-time collaborative list web app 🔥
[Check it out!](https://cabas-a8b4a.firebaseapp.com/ "Official site")

This repo builds the react web-app for cabas. 

It's built using:

- [React](https://github.com/facebook/react) - UI and view.
- [Firebase](http://firebase.com) - Database and authentication.
- [re-base](https://github.com/tylermcginnis/re-base) - Synchronize data between React and Firebase.
- [React Router](https://github.com/ReactTraining/react-router) - Declarative routing for the app.

![cabas demo](./src/images/cabas_gif.gif "cabas demo")

## Features
- Real-time changes reflecting on all devices and for all users
- Allows collaboration between multiple users on a list
- Allows creating multiple lists
- Allows joining lists based on visiting a URL

## Install and run
- Configure the base_config.js file with your Firebase configuration.
- Rename base_config.js to base.js
``` bash
# Install packages
$ npm install

# Run on localhost
$ npm start
```

## Build for production
``` bash
# Build minified React app
$ npm run build
```

## Roadmap Features
- Confirmation modal when leaving a list
- Move all completed items to the end of the list
- Ability to kick users out of a list
- Sharing list by email

## Contributions, issues, requests
If you would like to contribute, have an issue, or got a request for a feature, please [open a new issue here](https://github.com/annuhdo/cabas/issues/new)
