import React, { Component } from 'react'
import { toSeconds } from './helpers'
import './MessageModal.css'

export default class MessageModal extends Component {
	constructor(props) {
		super(props)
		this.handleReset = this.handleReset.bind(this)
	}
	handleReset() {
		this.props.reset()
	}
	componentDidUpdate() {}
	render() {
		// Convert time from ms to sec
		// let time = toSeconds(this.props.time)
		let time = `${toSeconds(this.props.time)} sec.`
		// console.log('gameState from modal', this.props.time)
		return (
			<div
				className='MessageModal'
				style={{
					display: !this.props.gameState ? 'none' : 'flex'
					// display:
					// 	!this.props.gameState ||
					// 	this.props.gameState === undefined
					// 		? 'none'
					// 		: 'flex'
				}}
			>
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
								className='fas fa-cog'
								onClick={this.props.settings}
							></i>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
