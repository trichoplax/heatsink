class Simulation {
	constructor(
		radiusInput,
		numberOfMetalPiecesInput,
		shapeCanvas,
		temperatureCanvas
	) {
		this.radiusInput = radiusInput
		this.numberOfMetalPiecesInput = numberOfMetalPiecesInput
		this.shapeCanvas = shapeCanvas
		this.temperatureCanvas = temperatureCanvas
		this.restart()
	}
	
	restart() {
		this.radius = this.radiusInput.value
		this.numberOfMetalPieces = this.numberOfMetalPiecesInput.value
		this.width = this.radius * 2 + 1
		this.shapeCanvas.width = this.width
		this.shapeCanvas.height = this.width
		this.temperatureCanvas.width = this.width
		this.temperatureCanvas.height = this.width
	}
}

document.addEventListener('DOMContentLoaded', () => {
	radiusInput = document.querySelector('#radius')
	numberOfMetalPiecesInput = document.querySelector('#number_of_metal_pieces')
	shapeCanvas = document.querySelector('#shape_canvas')
	temperatureCanvas = document.querySelector('#temperature_canvas')
	
	simulation = new Simulation(
		radiusInput,
		numberOfMetalPiecesInput,
		shapeCanvas,
		temperatureCanvas
	)
	
	document.querySelector('#restart').addEventListener('click', () => {
		simulation.restart()
	})
})


