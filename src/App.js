import React, { Component } from 'react'
import Card from './Card'
import MessageModal from './MessageModal'
import SettingsModal from './SettingsModal'
import { shuffle, getWidth } from './helpers'
import uuid from 'uuid/v4'
import './App.css'

class App extends Component {
	static defaultProps = {
		cardFaces: [
			// first 8
			{ name: 'apple', faClass: 'fab fa-apple' },
			{ name: 'code', faClass: 'fas fa-code' },
			{ name: 'chrome', faClass: 'fab fa-chrome' },
			{ name: 'react', faClass: 'fab fa-react' },
			{ name: 'html', faClass: 'fab fa-html5' },
			{ name: 'github', faClass: 'fab fa-github' },
			{ name: 'js', faClass: 'fab fa-js-square' },
			{ name: 'wifi', faClass: 'fas fa-wifi' },
			// first 12
			{ name: 'windows', faClass: 'fab fa-windows' },
			{ name: 'branch', faClass: 'fas fa-code-branch' },
			{ name: 'laptop', faClass: 'fas fa-laptop-code' },
			{ name: 'keyboard', faClass: 'fas fa-keyboard' },
			// first 16
			{ name: 'css', faClass: 'fab fa-css3' },
			{ name: 'node', faClass: 'fab fa-node-js' },
			{ name: 'spotify', faClass: 'fab fa-spotify' },
			{ name: 'bug', faClass: 'fas fa-bug' }
		]
	}
	// { name: 'python', faClass: 'fab fa-python' },

	constructor(props) {
		super(props)
		this.state = {
			unmatchedCards: [],
			flippedCards: [],
			isGameOver: false,
			flipCount: 0,
			gameStartTime: '',
			gameEndTime: '',
			gameTime: 0,
			gamesPlayed: 0,
			isSettingsOn: false,
			deckSize: 16
		}
		this.flip = this.flip.bind(this)
		this.handleReset = this.handleReset.bind(this)
		this.toggleSettings = this.toggleSettings.bind(this)
		this.applySettings = this.applySettings.bind(this)
	}

	async startNewGame(deckSize) {
		// DOWNFLIPS ALL FLIPPED CARDS FOR NEW GAME
		let amtOfPairs =
			deckSize === undefined ? this.state.deckSize : deckSize

		let newCards = [
			...this.props.cardFaces.slice(0, amtOfPairs / 2),
			...this.props.cardFaces.slice(0, amtOfPairs / 2)
			// ...this.props.cardFaces.slice(0, 2), // test
			// ...this.props.cardFaces.slice(0, 2) // test
		].map((card) => ({
			...card,
			id: uuid(),
			isFlipped: false,
			isMatched: false,
			isDisabled: false
		}))
		await this.setState({
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
		// HANDLE WIN
		let isMatchedArr = this.state.unmatchedCards.map(
			(card) => card.isMatched
		)

		if (!isMatchedArr.includes(false) && !this.state.isGameOver) {
			this.setState((st) => {
				let endTime = new Date()
				return {
					gameEndTime: endTime,
					gameTime: endTime - this.state.gameStartTime,
					gamesPlayed: st.gamesPlayed + 1,
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
		//FLIP ALL ALL CARDS
		this.setState((st) => ({
			unmatchedCards: st.unmatchedCards.map((card) => {
				card.isFlipped = false
				card.isMatched = false
				return card
			}),
			isGameOver: false
		}))
		setTimeout(() => {
			this.startNewGame()
		}, 1000)
	}

	toggleSettings() {
		// this.setState((st) => ({ toggleSettings: !st.toggleSettings }))
		this.setState((st) => ({
			isSettingsOn: !st.isSettingsOn
		}))
	}

	applySettings(sizeSelected) {
		this.setState({ deckSize: sizeSelected })
		this.toggleSettings()
		this.startNewGame(sizeSelected)
	}

	render() {
		let cards = this.state.unmatchedCards.map((card) => (
			<Card // CLEAN
				info={card}
				key={card.id}
				gameState={this.state}
				flip={this.flip}
				startTimer={this.startTimer}
			/>
		))
		let cardsContainerWidth = getWidth(cards)
		return (
			<div className='App'>
				{this.state.isSettingsOn && (
					<SettingsModal
						gameState={this.state}
						apply={this.applySettings}
						cancel={this.toggleSettings}
					/>
				)}

				{this.state.isGameOver && !this.state.isSettingsOn && (
					<MessageModal //refactor! condense to single prop 'gameState' and update corresponding lines of code
						gameState={this.state}
						reset={this.handleReset}
						showSettings={this.toggleSettings}
					/>
				)}

				<div className='game-container'>
					<div className='banner-container'>
						<h1>CONCENTRATION</h1>
					</div>

					<div
						className='cards-container'
						style={{ width: cardsContainerWidth }}
					>
						{cards}
					</div>
					<div className='buttons-container'>
						<div className='button'>
							<i
								className='fas fa-power-off'
								onClick={this.handleReset}
							/>
						</div>
						<div className='button'>
							<i
								className='fas fa-cog main-settings-icon'
								onClick={this.toggleSettings}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default App
