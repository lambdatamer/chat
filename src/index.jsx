import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import configureStore from './store/configureStore'
import { App, Nav } from './containers'
import { Login, NotFound } from './components'
import './style.css'


const store = configureStore()

ReactDOM.render((
	<Provider store={store}>
		<Router>
			<div>
				<Nav />
				<Route path="/chat" component={App} />
				<Route path="/login" component={Login} />
			</div>
		</Router>
	</Provider>
), document.getElementById('root'))
