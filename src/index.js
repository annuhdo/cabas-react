import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import NotFound from './components/NotFound';
import Login from './components/Login';

import App from './components/App';

const Root = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Login}/>
		        <Route path="/lists/:listId" component={App}/>
		        <Route component={NotFound}/>
		    </Switch>
        </Router>
	)
}

render(<Root/>, document.querySelector('#root'));