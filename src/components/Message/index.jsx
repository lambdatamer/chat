import React, { Component, PropTypes } from 'react';

export default class Message extends Component {
	render() {
		const {
			name,
			text,
			time } = this.props
		return (
			<div className="panel panel-default">
				<strong className="author">{name}:</strong>
				<div className="text">{text}</div>
				<p className="time text-right">at {time}</p>
			</div>
		)
	}
}

Message.propTypes = {
	name: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired
}