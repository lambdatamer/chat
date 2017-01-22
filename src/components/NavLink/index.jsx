import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class NavLink extends Component {
	render() {
		return (
			<Link activeClassName="active" {...this.props}></Link>
		)
	}
}

NavLink.propTypes = {

}
