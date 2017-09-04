import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import NotFound from './components/NotFound';
import Login from './components/Login';

import App from './components/App';

const Root = () => {
	return (
		<BrowserRouter>
		<div>
			<Match exactly pattern="/lists/:listId" component={App} />
			<Miss component={NotFound} />
			
			<Match exactly pattern="/" component={Login} />
		</div>
		</BrowserRouter>
	)
}

render(<Root/>, document.querySelector('#root'));