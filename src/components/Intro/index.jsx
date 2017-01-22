import React, { Component, PropTypes } from 'react'

export default class Intro extends Component {
	render() {
		return (
			<div>
				Hello! Introduce yourself:
				<input type="text" />
			</div>
		)
	}
}

Intro.propTypes = {

}
