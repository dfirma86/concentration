import React, { Component } from 'react'
import './Card.css'

export default class Card extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick() {
		this.props.flip(this.props.info.name, this.props.info.id)
	}
	render() {
		return (
			<div
				className='Card'
				onClick={
					this.props.info.isFlipped ||
					this.props.info.isDisabled ||
					this.props.info.isMatched
						? null
						: this.handleClick
				}
			>
				<i
					className={
						this.props.info.isFlipped || this.props.info.isMatched
							? this.props.info.faClass
							: 'fas fa-question'
					}
				></i>
				{/* <div className='test'></div> */}
			</div>
		)
	}
}
