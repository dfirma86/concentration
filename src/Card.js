import React, { Component } from 'react'
import './Card.css'

export default class Card extends Component {
	constructor(props) {
		super(props)
		// this.state = { isClicked: false }
		this.handleClick = this.handleClick.bind(this)
	}
	async handleClick() {
		await this.setState({ isClicked: true })
		await this.props.flip(this.props.info.name, this.props.info.id)
		// if (this.state.isClicked) {
		// 	console.log(this.props.info.isFlipped)
		// }
		this.setState({ isClicked: false })
	}
	render() {
		// let flipped = this.props.info.isFlipped
		// let filpAnimation = {transform: 'rotateY(180deg)'}
		let canClick =
			!this.props.info.isFlipped &&
			!this.props.info.isDisabled &&
			!this.props.info.isMatched
		return (
			<div
				className='cardContainer'
				onClick={canClick ? this.handleClick : null}
				style={
					this.props.info.isFlipped || this.props.info.isMatched
						? { padding: '0' }
						: null
				}
				// style={
				// 	this.state.isClicked && this.props.info.isFlipped
				// 		? { padding: '0.3rem' }
				// 		: null
				// }
				// style={
				// 	this.props.info.isFlipped || this.props.info.isMatched
				// 		? { marginTop: '0' }
				// 		: null
				// }
			>
				<div
					className='card'
					style={
						this.props.info.isFlipped || this.props.info.isMatched
							? { transform: 'rotateY(180deg)' }
							: null
					}
				>
					<div className='back'>
						<i className='card-icon fas fa-question'></i>
					</div>
					<div className='front'>
						<i className={`card-icon ${this.props.info.faClass}`}></i>
					</div>
				</div>
			</div>
		)
	}
}
