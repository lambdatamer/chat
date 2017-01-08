import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { Root } from './containers'
import configureStore from './store/configureStore'
import './style/style.css'

const store = configureStore()

render(
	<Provider store={store}>
		<Root />
	</Provider>,
	document.getElementById('root')
)

