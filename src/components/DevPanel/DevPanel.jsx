import React, { Component, PropTypes } from 'react'

export default class DevPanel extends Component{
	componentDidMount(){
		if(!this.props.connected){
			this.props.connect()
		}
	}
	onConnectBtnClick(){
		if(!this.props.connected){
			this.props.connect()
		}
	}
	onDisconnectBtnClick(){
		if(this.props.connected){
			this.props.disconnect()
		}
	}
	render(){
		const { 
			loaded, 
			connected, 
			message, } = this.props

		return(
			<div className="dev-panel well">
				<textarea
							className="form-control"
							rows="1"
							readOnly
							placeholder="Waiting ..."
							value={`loaded = '${loaded}', connected='${connected}', message='${message}'`}/>
				<button 
					className="btn btn-primary"
					onClick={::this.onConnectBtnClick}
				>
					Connect
				</button>
				<button 
					className="btn btn-danger"
					onClick={::this.onDisconnectBtnClick}>
					 Disconnect
				</button>
			</div>
		)
	}
}

DevPanel.propTypes = {
	loaded: PropTypes.bool.isRequired,
	connected: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired,
	connect: PropTypes.func.isRequired,
	disconnect: PropTypes.func.isRequired
}