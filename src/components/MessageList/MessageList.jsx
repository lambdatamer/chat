import React, { Component, PropTypes } from 'react'

export default class MessageList extends Component {
	render() {
		const { messages } = this.props

		const list = messages.map((elem, index) => {
			console.log(elem)
			const time = (new Date(elem.time)).toLocaleTimeString()
			const text = decodeURI(elem.text)
			const name = elem.name
			return (
				<div className="message panel panel-default" key={index}>
					<strong className="author">{name}:</strong>
					<div className="text">{text}</div>
					<p className="time text-right">at {time}</p>
				</div>
			)
		})

		return (
			<div>
				<h1>Message List</h1>
				<div className="list">
				{list}
				</div>
			</div>
		)
	}
}
