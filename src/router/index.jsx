import { Route, IndexRoute } from 'react-router'
import React from 'react'
import { App, Nav } from '../containers'
import { Intro, NotFound} from '../components'

export const routes = (
	<div>
		<Route path="/" component={Nav}>
			<Route path="chat" component={App} />
			<Route path="hello" component={Intro} />
			{/*
			<Route path="nickname" />
			<Route path="about" />
			*/}
			<Route path="*" component={NotFound} />
		</Route>
		
	</div>
)