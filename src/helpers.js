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
	let numArr = num.toString().split('')
	numArr.splice(-3, 0, '.')
	return numArr.join('')
}

function getWidth(arr) {
	if (arr.length === 16) return '26rem'
	if (arr.length === 24) return '38rem'
	if (arr.length === 32) return '51rem'
}


export { shuffle, toSeconds, getWidth }
