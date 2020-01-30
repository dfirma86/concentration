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
				<div className='messageBox'>
					<div>
						<h2 className='modal-message'>COMPLETE!</h2>
					</div>
					<div>
						<h2 className='modal-message'>TIME: {time}</h2>
					</div>
					<div>
						<h2 className='modal-message'>TRY AGAIN?</h2>
					</div>

					<div className='button-container'>
						<i
							className='fas fa-check'
							onClick={this.handleReset}
						></i>
						<i
							className='fas fa-cog'
							onClick={() =>
								alert('THIS BUTTON DOESNT WORK YET SUCKA!')
							}
						></i>
					</div>
				</div>
			</div>
		)
	}
}
