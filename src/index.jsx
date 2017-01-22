import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import configureStore from './store/configureStore'
import { Router, browserHistory } from 'react-router'
import { routes } from './router'
import './style.css'

const store = configureStore()

render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes}>
		</Router>
	</Provider>,
	document.getElementById('root')
)

