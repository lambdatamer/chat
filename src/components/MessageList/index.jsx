import React, { Component, PropTypes } from 'react'
import { Message } from '..'
import './style.css'

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
			<div className="panel-body">
				{list}
			</div>
		)
	}
}

MessageList.propTypes = {
	messages: PropTypes.array.isRequired,
}

