export function randomId(username, title) {
	let userHash = username;
	let titleHash = title;
	if (username.length > 3) {
		userHash = username.substring(0, 3);
	}
	if (title.length > 3) {
		titleHash = title.substring(0, 3);
	}
	const s4Hash = s4() + s4() + "-" + s4();
	return `${userHash}-${titleHash}-${s4Hash}`;
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function s4() {
	return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
