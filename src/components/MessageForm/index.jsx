import React, { Component, PropTypes } from 'react'
import './style.css'

export default class MessageForm extends Component {
	onInputKeyPress(e){
		if(e.key == 'Enter' && !e.shiftKey){
		e.preventDefault()
			this.sendMessage()
		}
	}
	sendMessage(){
		const message = this.refs.msgInput.innerText.trim()
		console.log(message)

		if(message){
			this.props.send(message)
		}
		
		this.refs.msgInput.innerText = ""
	}
	componentDidMount(){
		this.refs.msgInput.focus()
	}
	render() {
		return (
			<div className="panel-footer">
				<div
					contentEditable
					className="form-control message-form-text"
					onKeyPress={::this.onInputKeyPress}
					ref="msgInput"></div>
			</div>
		)
	}
}

MessageForm.propTypes = {
	send: PropTypes.func.isRequired
}