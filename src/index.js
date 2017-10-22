import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import { Login, NotFound } from './components/presentational'
import { App } from './components/container'

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

render(<Root/>, document.querySelector('#root'))