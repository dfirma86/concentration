import React, { Component } from 'react'
// import { toSeconds } from './helpers'
import './YouWinModal.css'

export default class YouWinModal extends Component {
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
		return (
			<div
				className='YouWinModal'
				style={{
					display: !this.props.gameState && 'none'
				}}
			>
				<div className='messageBox'>
					<h1 className='modal-message'>COMPLETE!</h1>
					<h1 className='modal-message'>TIME: {this.props.time}</h1>
					<h1 className='modal-message'>TRY AGAIN?</h1>
					<div className='button-container'>
						<i
							className='fas fa-check'
							onClick={this.handleReset}
						></i>
						<i className='fas fa-cog'></i>
					</div>
				</div>
			</div>
		)
	}
}
