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

		return (
			<div className="panel panel-default user-list">
				<div className="panel-heading">
					Users
				</div>
				<div className="panel-body">
					<table className="table">
					<thead><tr><th>You</th></tr></thead>
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
