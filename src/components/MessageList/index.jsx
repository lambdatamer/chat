import React, { Component, PropTypes } from 'react'
import { Message } from '..'

export default class MessageList extends Component {
	render() {
		const { messages } = this.props

		const list = messages.map((elem, index) => {
			const time = (new Date(elem.time)).toLocaleTimeString()
			const text = decodeURI(elem.text)
			const name = elem.name
			return (
				<Message 
					key={index}
					time={time}
					text={text}
					name={name} />
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

MessageList.propTypes = {
	messages: PropTypes.array.isRequired,
}

