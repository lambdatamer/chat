import React, { Component, PropTypes } from 'react'

export default class DevPanel extends Component{
	static propTypes = {
		loaded: PropTypes.bool.isRequired,
		connected: PropTypes.bool.isRequired,
		message: PropTypes.string.isRequired,
		connect: PropTypes.func.isRequired,
		disconnect: PropTypes.func.isRequired
	}

	render(){
		const { 
			loaded, 
			connected, 
			message, 
			connect, 
			disconnect } = this.props

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
					onClick={connect}
				>
					Connect
				</button>
				<button 
					className="btn btn-danger"
					onClick={disconnect}>
					 Disconnect
				</button>
			</div>
		)
	}
}