var nameLetters = $("#name span");
// For every letter in the name, add an index css variable to it
for (var i = 0; i < nameLetters.length; i++) {
	nameLetters[i].style.setProperty("--index", i);
}

var mouse = {
	x: 0,
	y: 0,
};

class Cell {
	opacity = 0;
	introAnimationDelay = 0;

	currentlyAnimating = false;
	mouseOver = false;
	additionalInset = 0;

	constructor(x, y, introAnimationDelay, skipIntro) {
		this.x = x;
		this.y = y;
		this.introAnimationDelay = introAnimationDelay;
		// Runs introanimation after a delay
		if (!skipIntro) {
			setTimeout(() => {
				this.introAnimation(1);
			}, this.introAnimationDelay);
		} else {
			this.opacity = 1;
		}
	}

	draw() {
		gridCTX.fillStyle = hexToRGBA(
			$(":root").css("--main-background-color"),
			this.opacity
		);
		// Draws cell taking into account the cell gap
		gridCTX.fillRect(
			this.x + (cellGap + this.additionalInset) / 2,
			this.y + (cellGap + this.additionalInset) / 2,
			cellSize - (cellGap + this.additionalInset),
			cellSize - (cellGap + this.additionalInset)
		);
	}

	update() {
		this.draw();
		// If the mouse is over the cell, set the opacity to 0.5
		// if (
		// 	mouse.x > this.x &&
		// 	mouse.x < this.x + cellSize &&
		// 	mouse.y > this.y &&
		// 	mouse.y < this.y + cellSize
		// ) {
		// 	this.additionalInset = 3;
		// 	this.mouseOver = true;
		// }

		// if (this.mouseOver) {
		// 	if (
		// 		mouse.x < this.x ||
		// 		mouse.x > this.x + cellSize ||
		// 		mouse.y < this.y ||
		// 		mouse.y > this.y + cellSize
		// 	) {
		// 		this.additionalInset = 0;
		// 		this.mouseOver = false;
		// 	}
		// }
	}

	introAnimation(duration) {
		if (this.currentlyAnimating) return;
		this.currentlyAnimating = true;
		duration ? duration : (duration = 0.5);
		this.opacity = 0;
		// Animate the opacity of the cell using no libraries
		var opacityInterval = setInterval(() => {
			this.opacity += 0.01;
			if (this.opacity >= 1) {
				this.opacity = 1;
				this.currentlyAnimating = false;
				clearInterval(opacityInterval);
			}
		}, (duration * 1000) / 100);
	}

	flash(duration, delay) {
		if (this.currentlyAnimating) return;
		this.currentlyAnimating = true;
		duration = duration ? duration : 0.5;
		delay = delay ? delay : 0;
		var darkening;
		setTimeout(() => {
			this.opacity = 1;
			darkening = true;
			// Animate the opacity of the cell using no libraries
			var opacityInterval = setInterval(() => {
				if (this.opacity <= 0) {
					darkening = false;
				}
				if (darkening) {
					this.opacity -= 0.01;
				} else {
					this.opacity += 0.01;
				}
				if (this.opacity >= 1) {
					this.opacity = 1;
					this.currentlyAnimating = false;
					clearInterval(opacityInterval);
				}
			}, duration);
		}, delay);
	}

	// Shrinks cell slowly and then quickly expands it
	snapShrink(duration) {
		if (this.currentlyAnimating) return;
		this.currentlyAnimating = true;
		duration = duration ? duration : 0.5;
		var shrinking = true;
		var insetTo = 13;
		// Animate the opacity of the cell using no libraries
		var shrinkInterval = setInterval(() => {
			if (this.additionalInset >= insetTo) {
				shrinking = false;
			}
			if (shrinking) {
				this.additionalInset += 1;
			}
			if (!shrinking) {
				this.additionalInset -= 5;
			}
			if (this.additionalInset <= 0) {
				this.additionalInset = 0;
				this.currentlyAnimating = false;
				clearInterval(shrinkInterval);
			}
		}, 50);
	}
}

function hexToRGBA(hex, opacity) {
	try {
		var r = parseInt(hex.slice(1, 3), 16);
		var g = parseInt(hex.slice(3, 5), 16);
		var b = parseInt(hex.slice(5, 7), 16);

		return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
	} catch {
		return "rgba(0, 0, 0, 0, " + opacity + ")";
	}
}

// CANVAS STUFF
var gridCanvas = $("#gridCanvas");
// Make the canvas the size of the window
gridCanvas.attr("width", $(window).width());
gridCanvas.attr("height", $(window).height());
$(window).on("resize", function () {
	gridCanvas.attr("width", $(window).width());
	gridCanvas.attr("height", $(window).height());
	colCount = Math.ceil($(window).width() / cellSize);
	rowCount = Math.ceil($(window).height() / cellSize);
	createCells(colCount, rowCount, true);
});

const cellSize = $(window).width() <= 750 ? 75 : 150;

var cellGap = 0.4;


var colCount = Math.ceil($(window).width() / cellSize);
var rowCount = Math.ceil($(window).height() / cellSize);

var gridCTX = gridCanvas[0].getContext("2d");

var cells = [];

function createCells(colCount, rowCount, skipIntro) {
	cells = [];
	var cellCount = 0;
	for (var i = 0; i < rowCount; i++) {
		cells.push([]);
		for (var j = 0; j < colCount; j++) {
			cells[i].push(
				new Cell(j * cellSize, i * cellSize, cellCount * 10, skipIntro)
			);
			cellCount++;
		}
	}
}

function animateRaindrop() {
	var rainDrop = [];
	// Picks a random cell in the first row
	var randomCell = Math.floor(Math.random() * colCount);
	rainDrop.push(cells[0][randomCell]);
	for (var i = 1; i < rowCount; i++) {
		// Pick a random number between -1 and 1
		var randomNum = Math.floor(Math.random() * 3) - 1;
		// Add the random number to the current cell's x position
		randomCell += randomNum;
		// If the cell is out of bounds, set it to the edge of the grid
		if (randomCell < 0) randomCell = 0;
		if (randomCell >= colCount) randomCell = colCount - 1;
		// Add the cell to the raindrop array
		rainDrop.push(cells[i][randomCell]);
	}
	for (var i = 0; i < rainDrop.length; i++) {
		rainDrop[i].flash(10, i * 100);
	}
}

function animateSnapShrink() {
	// Picks a random row
	var randomRow = Math.floor(Math.random() * cells.length);
	// Picks a random cell in the row
	var randomCell = Math.floor(Math.random() * cells[randomRow].length);
	cells[randomRow][randomCell].snapShrink();
}

createCells(colCount, rowCount);

// Run animateRaindrop every 1 seconds after 5 seconds
setTimeout(function () {
	setInterval(animateRaindrop, 1500);
}, 5000);

// Runs animateSnapShrink every 1 seconds after 5 seconds
setTimeout(function () {
	setInterval(animateSnapShrink, 200);
}, 5000);

drawFrame();

function drawFrame() {
	// Only preform if canvas on screen
	gridCTX.clearRect(0, 0, gridCanvas.width(), gridCanvas.height());
	for (var i = 0; i < cells.length; i++) {
		for (var j = 0; j < cells[i].length; j++) cells[i][j].update();
	}
	requestAnimationFrame(drawFrame);
}

$("body").on("mousemove", function (e) {
	var rect = gridCanvas[0].getBoundingClientRect();
	mouse.x = e.clientX - rect.left;
	mouse.y = e.clientY - rect.top;
});
