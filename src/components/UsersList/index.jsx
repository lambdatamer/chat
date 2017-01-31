import React, { Component, PropTypes } from 'react'
import './style.css'

export default class UsersList extends Component {
	render() {
		const { usersList } = this.props

		const users = usersList.map((user, index) => {
			return(
				<tr key={index}><td>{user.nickname}</td></tr>
				)
		})

		const userName = localStorage['nickname']

		return (
			<div className="panel panel-default user-list">
				<div className="panel-heading">
					Users
				</div>
				<div className="panel-body">
					<table className="table">
						<thead>
							<tr><th>
								{
								false ?
									userName
								:
									(
									<div className="form-group input-group btn-group nick-form">
										<input className="form-control" placeholder={userName}></input>
										<button className="btn btn-primary">OK</button>
									</div>
									)
								}
								</th></tr>
						</thead>
						<tbody>{users}</tbody>
					</table>
				</div>
			</div>
		)
	}
}

UsersList.propTypes = {
	usersList: PropTypes.array.isRequired
}
