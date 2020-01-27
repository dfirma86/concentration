import React, { Component } from 'react'
import Card from './Card'
import YouWinModal from './YouWinModal'
import { shuffle } from './helpers'
import uuid from 'uuid/v4'
import './App.css'

class App extends Component {
	static defaultProps = {
		gameModes: [
			// { difficulty: 'easy', numCards: 16 },
			// { difficulty: 'medium', numCards: 36 },
			// { difficulty: 'hard', numCards: 64 }
		],
		cardFaces: [
			{ name: 'apple', faClass: 'fab fa-apple' },
			{ name: 'windows', faClass: 'fab fa-windows' },
			{ name: 'code', faClass: 'fas fa-code' },
			{ name: 'react', faClass: 'fab fa-react' },
			{ name: 'vue', faClass: 'fab fa-vuejs' },
			{ name: 'js', faClass: 'fab fa-js-square' },
			{ name: 'python', faClass: 'fab fa-python' },
			{ name: 'github', faClass: 'fab fa-github' }
		]
	}
	constructor(props) {
		super(props)
		this.state = {
			unmatchedCards: [],
			flippedCards: [],
			isGameOver: true,
			flipCount: 0,
			gameStartTime: '',
			gameEndTime: '',
			gameTime: 0
		}
		this.flip = this.flip.bind(this)
		this.handleReset = this.handleReset.bind(this)
	}
	startNewGame(gameMode) {
		let newCards = [
			...this.props.cardFaces.slice(0, 8),
			...this.props.cardFaces.slice(0, 8)
		].map((card) => ({
			...card,
			id: uuid(),
			isFlipped: false,
			isMatched: false,
			isDisabled: false
		}))
		this.setState({
			unmatchedCards: shuffle(newCards),
			isGameOver: false,
			flipCount: 0,
			gameStartTime: '',
			gameEndTime: '',
			gameTime: 0
		})
	}
	componentDidMount() {
		this.startNewGame()
	}
	componentDidUpdate() {
		let isMatchedArr = this.state.unmatchedCards.map(
			(card) => card.isMatched
		)
		if (!isMatchedArr.includes(false) && !this.state.isGameOver) {
			this.setState((st) => {
				let endTime = new Date()
				return {
					gameEndTime: endTime,
					gameTime: endTime - this.state.gameStartTime,
					isGameOver: true
				}
			})
		}
	}
	async flip(name, id) {
		let updatedFlippedCards = []
		let updatedCards = this.state.unmatchedCards.map((card) => {
			if (id === card.id) {
				card.isFlipped = !card.isFlipped
				updatedFlippedCards.push(card)
			}
			return card
		})
		if (this.state.flipCount < 1) this.startTimer()
		await this.setState((st) => ({
			unmatchedCards: updatedCards,
			flippedCards: [...st.flippedCards, ...updatedFlippedCards],
			flipCount: st.flipCount + 1
		}))

		// HANDLE FLIPPED CARDS
		if (this.state.flippedCards.length === 2) {
			// IF 2 CARDS AREN'T DRAWN YET
			if (
				this.state.flippedCards[0].name ===
				this.state.flippedCards[1].name
			) {
				// WHEN MATCH
				let updatedCards = this.state.unmatchedCards.map((card) => {
					if (card.name === this.state.flippedCards[1].name) {
						card.isMatched = true
					}
					return card
				})
				this.setState({
					unmatchedCards: updatedCards,
					flippedCards: []
				})
			} else {
				// WHEN NOT MATCH
				let updatedCards = this.state.unmatchedCards.map((card) => {
					card.isDisabled = true
					return card
				})
				this.setState({ unmatchedCards: updatedCards })
				setTimeout(() => {
					this.state.unmatchedCards.map((card) => {
						card.isFlipped = false
						card.isDisabled = false
						return card
					})
					this.setState({ flippedCards: [] })
				}, 1000)
			}
		}
	}
	startTimer() {
		this.setState({ gameStartTime: new Date() })
	}
	handleReset() {
		this.startNewGame()
	}
	render() {
		let cards = this.state.unmatchedCards.map((card) => (
			<Card
				info={card}
				key={card.id}
				gameState={this.state}
				flip={this.flip}
				startTimer={this.startTimer}
			/>
		))
		return (
			<div className='App'>
				<YouWinModal
					gameState={this.state.isGameOver}
					time={this.state.gameTime}
					reset={this.handleReset}
				/>
				<div className='gameContainer'>
					<h1>CONCENTRATION</h1>
					<div className='cardContainer'>{cards}</div>
					<div className='buttonContainer'>
						<div
							className='iconButton reset'
							onClick={this.handleReset}
						>
							<i className='fas fa-power-off'></i>
						</div>
						<div className='iconButton settings'>
							<i className='fas fa-cog'></i>
						</div>
						<div className='iconButton aboutMe'>
							<i className='fas fa-at'></i>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default App
