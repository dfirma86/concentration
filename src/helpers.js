function shuffle(arr) {
	let currIdx = arr.length
	let tempVal, randIdx
	while (0 !== currIdx) {
		randIdx = Math.floor(Math.random() * currIdx)
		currIdx -= 1
		tempVal = arr[currIdx]
		arr[currIdx] = arr[randIdx]
		arr[randIdx] = tempVal
	}
	return arr
}

function toSeconds(num) {
	// seconds conversion
	return num
		.toString()
		.split('')
		.splice(-3, 0, '.')
}

export { shuffle, toSeconds }
