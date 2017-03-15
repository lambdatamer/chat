import React, { Component } from 'react'
import './style.css'

export default class Login extends Component {
	onJoinBtnClick(){
		localStorage['nickname'] = this.refs.NicknameField.value
		location.reload()
	}
	onNicknameChange(){
		if(this.refs.NicknameField.value.trim() === ''){
			this.refs.joinBtn.setAttribute('disabled', true)
		}else{
			this.refs.joinBtn.removeAttribute('disabled')
		}
	}
	componentDidMount() {
		this.refs.NicknameField.focus()
	}
	render() {
		return (
			<div className="sign-in-wrapper">
				<div className="panel panel-default sign-in">
					<div className="panel-heading">
						<div className="text-center">Hello!</div>
					</div>
					<div className="panel-body">
						<div className="sign-in-greeting">Introduce yourself:</div>
						<input className="form-control"
							type="text"
							ref="NicknameField"
							onChange={::this.onNicknameChange}
							placeholder="Type your nickname..."
							/>
						<button className="btn btn-block btn-primary"
							ref="joinBtn"
							onClick={::this.onJoinBtnClick}>Join chat</button>
					</div>
				</div>
			</div>
		)
	}
}

