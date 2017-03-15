import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Message } from '..'
import './style.css'

export default class MessageList extends Component {
	componentDidUpdate() {
		const node = ReactDOM.findDOMNode(this)

		if(node.scrollHeight - node.scrollTop - node.clientHeight === node.scrollHeight - this.prevHeight){
			node.scrollTop = node.scrollHeight
		}
		this.prevHeight = node.scrollHeight
	}
	componentDidMount() {
		const node = ReactDOM.findDOMNode(this)
		this.prevHeight = node.scrollHeight
	}
	render() {
		const { messages } = this.props

		const list = messages.map((elem, index) => {
			const now = new Date(elem.time)
			const time = now.toLocaleString()
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
			<div className="panel-body message-list" ref='list'>
				{list}
			</div>
		)
	}
}

MessageList.propTypes = {
	messages: PropTypes.array.isRequired,
}

