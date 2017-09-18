import Rebase from 're-base';
import firebase from 'firebase';

export const app = firebase.initializeApp({
	apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL
})

export const base = Rebase.createClass(
	app.database()
);