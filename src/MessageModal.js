import React, { Component } from 'react'
import { toSeconds } from './helpers'
import './MessageModal.css'

export default class MessageModal extends Component {
	constructor(props) {
		super(props)
		this.state = { isActive: false }
		this.handleReset = this.handleReset.bind(this)
	}
	handleReset() {
		this.props.reset()
	}
	render() {
		let time = `${toSeconds(this.props.gameState.gameTime)} sec.`
		return (
			<div className='MessageModal'>
				<div className='message-box'>
					<div className='modal-message complete'>
						<h2>COMPLETE!</h2>
					</div>
					<div className='modal-message time'>
						<h2>time: {time}</h2>
					</div>
					<div className='modal-message play-again'>
						<h3>play again?</h3>
						<div className='message-modal-button-container'>
							<i
								className='fas fa-check'
								onClick={this.handleReset}
							></i>
							<i
								className='fas fa-cog modal-message-icon'
								onClick={this.props.showSettings}
							></i>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
