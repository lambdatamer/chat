import React, { Component, PropTypes } from 'react'
import './style.css'

export default class UserList extends Component {
	render() {
		const { userList } = this.props
		let users = []
		let key = 0

		for(let uid in this.props.userList){
			users.push(
				<tr key={key++}><td>
					{userList[uid]}
				</td></tr>
			)
		}

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

UserList.propTypes = {
	userList: PropTypes.object
}
