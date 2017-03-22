import React, { Component, PropTypes } from 'react'
import './style.css'

export default class Message extends Component {
  render() {
    const {
      name,
      text,
      time } = this.props
    return (
      <div className="message">
        <div className="message-name">{name}</div>
        <div className="message-time small hidden-xs">{time}</div>
        <div className="message-text">{text}</div>
        <div className="message-time small visible-xs">{time}</div>
        <div className="clearfix" />
      </div>
    )
  }
}

Message.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
}