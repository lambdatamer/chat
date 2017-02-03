import React, { Component, PropTypes } from 'react'
import './style.css'

export default class MessageForm extends Component {
	onInputKeyPress(e){
		if(e.key == 'Enter' && !e.shiftKey){
			e.preventDefault()
			this.sendMessage()
		}
	}
	onSendBtnClick(){
		this.sendMessage()
		this.refs.msgInput.focus()
	}
	sendMessage(){
		const message = this.refs.msgInput.innerText.trim()

		if(message){
			this.props.send(message)
		}
		
		this.refs.msgInput.innerText = ''
	}
	componentDidMount(){
		this.refs.msgInput.focus()
	}
	render() {
		return (
			<div className="container panel-footer message-form">
				<div className="row">
					<div className="col-md-12 col-sm-10 col-xs-9 message-form-text">
						<div
							contentEditable
							className="form-control"
							onKeyPress={::this.onInputKeyPress}
							ref="msgInput"></div>
					</div>
					<div className="col-sm-2 col-xs-3 hidden-lg hidden-md send-btn-wrapper">
						<div className="btn btn-primary center-block "
							onClick={::this.onSendBtnClick}
						>Send</div>
					</div>
				</div>
			</div>
		)
	}
}

MessageForm.propTypes = {
	send: PropTypes.func.isRequired
}