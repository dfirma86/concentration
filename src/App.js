import React, { Component } from 'react'
import Card from './Card'
import MessageModal from './MessageModal'
import SettingsModal from './SettingsModal'
import { shuffle } from './helpers'
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
			showSettings: false,
			deckSize: 16
		}
		this.flip = this.flip.bind(this)
		this.handleReset = this.handleReset.bind(this)
		this.showSettings = this.showSettings.bind(this)
		this.applySettings = this.applySettings.bind(this)
	}

	async startNewGame(deckSize) {
		// DOWNFLIPS ALL FLIPPED CARDS FOR NEW GAME
		let amtOfPairs = deckSize === undefined ? 8 : deckSize / 2

		let newCards = [
			...this.props.cardFaces.slice(0, amtOfPairs),
			...this.props.cardFaces.slice(0, amtOfPairs)
		].map((card) => ({
			...card,
			id: uuid(),
			isFlipped: false,
			isMatched: false,
			isDisabled: false
		}))
		await this.setState({
			unmatchedCards: /* newCards,*/ shuffle(newCards),
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

	showSettings() {
		this.setState((st) => ({ showSettings: !st.showSettings }))
	}

	applySettings(sizeSelected) {
		this.setState({ deckSize: sizeSelected })
		this.showSettings()
		this.startNewGame(sizeSelected)
		console.log('size ', typeof sizeSelected)
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
		return (
			<div className='App'>
				<MessageModal //refactor! condense to single prop 'gameState' and update corresponding lines of code
					gameState={this.state.isGameOver}
					time={this.state.gameTime}
					reset={this.handleReset}
					gamesPlayed={this.state.gamesPlayed}
					settings={() => console.log('hiss')}
					// settings={this.showSettings}
				/>
				<SettingsModal
					settings={this.state.showSettings}
					apply={this.applySettings}
					deckSize={this.state.deckSize}
					cancel={this.showSettings}
				/>
				<div className='game-container'>
					<div className='banner-container'></div>
					<h1>CONCENTRATION</h1>
					<div className='cards-container'>{cards}</div>
					<div className='button-container'>
						<i
							className='fas fa-power-off'
							onClick={this.handleReset}
						/>

						<i className='fas fa-cog' onClick={this.showSettings} />

						<i
							className='fas fa-at'
							onClick={() =>
								alert(
									'DINO IS THE BEST CODER EVER! PLUS HE IS THE BEST IN ESCAPING ESCAPE ROOMS! LOL'
								)
							}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default App
