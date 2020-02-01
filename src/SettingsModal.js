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
		this.state = { curDeckSize: this.props.deckSize }
		this.handleClick = this.handleClick.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleCancel = this.handleCancel.bind(this)
	}
	async handleClick(size) {
		await this.setState({
			curDeckSize: this.props.deckSizes[size].cardAmount
		})
	}
	handleSubmit() {
		this.props.apply(this.state.curDeckSize)
	}
	handleCancel() {
		this.props.cancel()
	}
	render() {
		// console.log('from modal', this.props.settings)
		return (
			<div
				className='SettingsModal'
				style={{ display: !this.props.settings ? 'none' : 'flex' }}
			>
				<div className='settings-box'>
					<div className='difficulty-container'>
						<div className='difficulty-label label'>
							<h2>difficulty</h2>
						</div>
						<div className='difficulty-options'>
							<div className='option-button easy'>
								<h3>easy</h3>
							</div>
							<div className='option-button normal'>
								<h3>normal</h3>
							</div>
							<div className='option-button hard'>
								<h3>hard</h3>
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
							>
								<h3>small</h3>
							</div>
							<div
								className='option-button medium'
								onClick={() => this.handleClick('medium')}
							>
								<h3>medium</h3>
							</div>
							<div
								className='option-button large'
								onClick={() => this.handleClick('large')}
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
