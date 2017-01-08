import React, { Component, PropTypes } from 'react'

export default class MessageForm extends Component {
	static propTypes = {
		send: PropTypes.func.isRequired
	}

	onSubmit(e){
		e.preventDefault()
		this.props.send(this.refs.msgInput.value.trim())
		this.refs.msgInput.value = ''
	}
	render() {
		return (
			<div>
				<div className="form-inline">
					<div className="form-group">
						<input 
							className="form-control input" 
							type="text"
							ref="msgInput"></input>
					</div>
					<button type="submit" className="btn btn-success"
						onClick={::this.onSubmit}
					>
						Send
					</button>
				</div>
			</div>
		)
	}
}
