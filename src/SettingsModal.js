import React, { Component } from 'react'
import './SettingsModal.css'

export default class SettingsModal extends Component {
	static defaultProps = {
		deckSizes: {
			small: { cardAmount: 16 },
			medium: { cardAmount: 24 },
			large: { cardAmount: 32 }
		}
	}
	constructor(props) {
		super(props)
		this.state = {
			curCardAmount: this.props.gameState.deckSize
		}
		this.handleClick = this.handleClick.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleCancel = this.handleCancel.bind(this)
	}
	handleClick(size) {
		this.setState({
			curCardAmount: this.props.deckSizes[size].cardAmount
		})
	}

	handleSubmit() {
		this.props.apply(this.state.curCardAmount)
	}
	handleCancel() {
		this.props.cancel()
	}
	render() {
		return (
			<div className='SettingsModal'>
				<div className='settings-box'>
					<div className='difficulty-container'>
						<div className='difficulty-label label'>
							<h2>difficulty</h2>
						</div>
						<div className='difficulty-options'>
							<div className='option-button easy'>
								<h3 onClick={() => alert('UNDER CONSTRUCTION')}>
									easy
								</h3>
							</div>
							<div className='option-button normal'>
								<h3 onClick={() => alert('UNDER CONSTRUCTION')}>
									normal
								</h3>
							</div>
							<div className='option-button hard'>
								<h3 onClick={() => alert('UNDER CONSTRUCTION')}>
									hard
								</h3>
							</div>
						</div>
					</div>

					<div className='deck-size-container'>
						<div className='deck-size-label label'>
							<h2>deck size</h2>
						</div>
						<div className='deck-size-options'>
							<div
								className='option-button small'
								onClick={() => this.handleClick('small')}
								style={
									this.state.curCardAmount === 16
										? { color: 'purple' }
										: null
								}
							>
								<h3>small</h3>
							</div>
							<div
								className='option-button medium'
								onClick={() => this.handleClick('medium')}
								style={
									this.state.curCardAmount === 24
										? { color: 'purple' }
										: null
								}
							>
								<h3>medium</h3>
							</div>
							<div
								className='option-button large'
								onClick={() => this.handleClick('large')}
								style={
									this.state.curCardAmount === 32
										? { color: 'purple' }
										: null
								}
							>
								<h3>large</h3>
							</div>
						</div>
					</div>
					<div className='settings-modal-button-container'>
						<i
							className='fas fa-check'
							onClick={this.handleSubmit}
						></i>
						<i
							className='fas fa-times'
							onClick={this.handleCancel}
						></i>
					</div>
				</div>
			</div>
		)
	}
}
