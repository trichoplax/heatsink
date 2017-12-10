class Simulation {
	constructor(heatsink, timerTracker) {
		this.heatsink = heatsink
		this.timerTracker = timerTracker
		
		this.optimiseScore()		
	}
	
	optimiseScore() {
	}
}

class Heatsink {
	constructor(temperatureMap, heatsinkCanvas, radius, numberOfMetalPieces, scoreArea) {
		this.radius = radius
		this.numberOfMetalPieces = numberOfMetalPieces
		this.temperatureMap = temperatureMap
		this.canvas = heatsinkCanvas
		this.scoreArea = scoreArea
		
		this.width = this.radius * 2 + 1
		this.canvas.width = this.width
		this.canvas.height = this.width
		
		this.context = this.canvas.getContext('2d')
		this.imageData = this.context.createImageData(this.canvas.width, this.canvas.height)
		
		this.metalLocations = []
		for (let i = 0; i < this.width * this.width; i++) {
			this.metalLocations.push(0)
		}
		
		this.initialise()
		this.randomise()
		this.display()
		this.score = this.measureScore(this.metalLocations)
		this.scoreArea.value = this.score
	}
	
	initialise() {
		let numberPlaced = 0
		for (let y = 0; y < this.width; y++) {
			for (let x = 0; x < this.width; x++) {
				if (numberPlaced < this.numberOfMetalPieces) {
					this.setToMetal(x, y)
					numberPlaced++
				} else {
					this.setToInsulator(x, y)
				}				
			}
		}		
	}
	
	randomise() {
		for (let y = 0; y < this.width; y++) {
			for (let x = 0; x < this.width; x++) {
				let randomX = Math.floor(Math.random() * this.width)
				let randomY = Math.floor(Math.random() * this.width)
				this.swap(x, y, randomX, randomY)
			}
		}
	}
	
	display() {
		for (let y = 0; y < this.width; y++) {
			for (let x = 0; x < this.width; x++) {
				this.setImageData(x, y)
			}
		}
		this.context.putImageData(this.imageData, 0, 0)
	}
	
	improve() {
		let perturbedMetalLocations = this.metalLocations.slice()
		x1 = Math.floor(Math.random() * this.width)
		y1 = Math.floor(Math.random() * this.width)
		x2 = Math.floor(Math.random() * this.width)
		y2 = Math.floor(Math.random() * this.width)
		this.swap(x1, y1, x2, y2)
		let perturbedScore = this.measureScore(perturbedLocations)
		if (perturbedScore <= this.score) {
			this.metalLocations = perturbedMetalLocations
			this.score = perturbedScore
			this.scoreArea.value = this.score
		}
	}
	
	measureScore(locations) {
		this.temperatureMap.metalLocations = locations
		return this.temperatureMap.measureSteadyTemperature
	}
	
	setImageData(x, y) {
		let data = this.imageData.data
		let offset = this.offset(x, y)
		let intensity = this.metalLocations[offset] * 255
		let dataOffset = offset * 4
		data[dataOffset] = intensity
		data[dataOffset + 1] = intensity
		data[dataOffset + 2] = intensity
		data[dataOffset + 3] = 255
	}
	
	swap(x1, y1, x2, y2) {
		let material1 = this.getMaterial(x1, y1)
		let material2 = this.getMaterial(x2, y2)
		this.setMaterial(x1, y1, material2)
		this.setMaterial(x2, y2, material1)
	}
	
	setToMetal(x, y) {
		this.setMaterial(x, y, 1)
	}
	
	setToInsulator(x, y) {
		this.setMaterial(x, y, 0)
	}
	
	setMaterial(x, y, material) {
		let offset = this.offset(x, y)
		this.metalLocations[offset] = material
	}
	
	getMaterial(x, y) {
		let offset = this.offset(x, y)
		return this.metalLocations[offset]
	}
	
	offset(x, y) {
		return x + y * this.width
	}
}

class TemperatureMap {
	constructor(temperatureCanvas, radius) {
		this.temperatureCanvas = temperatureCanvas
		this.temperatureContext = this.temperatureCanvas.getContext('2d')
	}
	
	display() {}
}

document.addEventListener('DOMContentLoaded', () => {
	let radiusInput = document.querySelector('#radius')
	let numberOfMetalPiecesInput = document.querySelector('#number_of_metal_pieces')
	let heatsinkCanvas = document.querySelector('#heatsink_canvas')
	let temperatureCanvas = document.querySelector('#temperature_canvas')
	let scoreArea = document.querySelector('#score')
	let simulation = null
	let timerTracker = {timerId: 0}
	
	let restart = () => {
		clearTimeout(timerTracker.timerId)
		let radius = radiusInput.value
		let numberOfMetalPieces = numberOfMetalPiecesInput.value
		let temperatureMap = new TemperatureMap(temperatureCanvas, radius)
		let heatsink = new Heatsink(temperatureMap, heatsinkCanvas, radius, numberOfMetalPieces, scoreArea)
		simulation = new Simulation(heatsink, timerTracker)
	}
	document.querySelector('#restart').addEventListener('click', restart)
})


