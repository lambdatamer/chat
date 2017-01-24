import React, { Component, PropTypes } from 'react'
import './style.css'

export default class Intro extends Component {
	onJoinBtnClick(){
		const ls = window.localStorage
		ls['nickname'] = this.refs.NicknameField.value
		this.context.router.push('/chat')
	}
	onNickNameChange(){
		if(this.refs.NicknameField.value.trim() === ''){
			this.refs.JoinBtn.setAttribute('disabled', true)
		}else{
			this.refs.JoinBtn.removeAttribute('disabled')
		}
	}
	componentDidMount() {
		this.refs.NicknameField.focus()
	}
	render() {
		return (
			<div className="container signin-wrapper">
				<div className="panel panel-default center-block sign-in">
					<div className="panel-heading">
						<div className="text-center">Hello!</div>
					</div>
					<div className="panel-body">
						<div className="sign-in-greeting">Introduce yourself:</div>
						<input className="form-control"
							type="text"
							ref="NicknameField"
							onChange={::this.onNickNameChange}
							placeholder="Type your nickname..."
							/>
						<button className="btn btn-block btn-primary"
							ref="JoinBtn"
							onClick={::this.onJoinBtnClick}>Join chat</button>
					</div>
				</div>
			</div>
		)
	}
}

Intro.propTypes = {

}
