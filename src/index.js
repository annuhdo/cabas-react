import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import NotFound from './components/NotFound';
import FrontPage from './components/FrontPage';


import './css/style.css';
import App from './components/App';

const Root = () => {
	return (
		<BrowserRouter>
		<div>
			<Match exactly pattern="/" component={FrontPage} />
			<Match exactly pattern="/lists/:listId" component={App} />
			<Miss component={NotFound} />
		</div>
		</BrowserRouter>
	)
}

render(<Root/>, document.querySelector('#root'));