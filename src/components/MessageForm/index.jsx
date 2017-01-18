import React, { Component, PropTypes } from 'react'

export default class MessageForm extends Component {
	onSendBtnClick(e){
		e.preventDefault()
		this.sendMessage()
	}
	onInputKeyPress(e){
		if(e.key == 'Enter'){
			this.sendMessage()
		}
	}
	sendMessage(){
		const message = this.refs.msgInput.value.trim()
		
		if(message){
			this.props.send(message)
		}
		
		this.refs.msgInput.value = ''
		this.refs.msgInput.focus()
	}
	componentDidMount(){
		this.refs.msgInput.focus()
	}
	render() {
		return (
			<div>
				<div className="form-inline">
					<div className="form-group">
						<input 
							className="form-control input" 
							type="text"
							onKeyPress={::this.onInputKeyPress}
							ref="msgInput"></input>
					</div>
					<button type="submit" className="btn btn-success"
						onClick={::this.onSendBtnClick}
					>
						Send
					</button>
				</div>
			</div>
		)
	}
}

MessageForm.propTypes = {
	send: PropTypes.func.isRequired
}