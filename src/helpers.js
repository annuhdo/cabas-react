export function randomId() {
	const s4Hash = s4() + s4() + "-" + s4();
	return `list-${s4Hash}`;
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function s4() {
	return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
