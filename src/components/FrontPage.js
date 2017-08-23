import React from 'react';
import { randomId } from '../helpers.js';

class FrontPage extends React.Component {
	constructor() {
		super();
		this.goToStore = this.goToStore.bind(this);
	}

	goToStore(event) {
		event.preventDefault();
		// first grab the text from the box

		const listId = this.storeInput.value;

		// second transition from / to /store/:storeId
		this.context.router.transitionTo(`/lists/${listId}`)
	}

	render() {
		return (
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Please Enter a Store</h2>
				<input type="text" required placeholder="Store Name" defaultValue={randomId()} ref={(input) => ( this.storeInput = input )} />
				<button type="submit">Visit Store -></button>
			</form>
		)
	}
}

FrontPage.contextTypes = {
	router: React.PropTypes.object
}

export default FrontPage;