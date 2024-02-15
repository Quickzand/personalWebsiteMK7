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
	opacity = 1;
	introAnimationDelay = 0;
	currentSize = cellSize;
	shadowBlur = 0;
	currentlyAnimating = false;
	additionalInset = 1; // Added property for snapShrink
	isUnderMouse = false;

	mouseLocked = false;

	constructor(x, y, introAnimationDelay, skipIntro) {
		this.x = x;
		this.y = y;
		this.introAnimationDelay = introAnimationDelay;

		if (!skipIntro) {
			setTimeout(() => {
				this.introAnimation(1);
			}, this.introAnimationDelay);
		}
	}

	draw() {
		var drawOpacity = this.opacity;

		if (!this.currentlyAnimating) {
			// Get the current row
			let i = cells.indexOf(cells.find((row) => row.includes(this)));
			let j = cells[i].indexOf(this);
			drawOpacity = this.computeAntiAliasedOpacity(i, j);
		}

		gridCTX.fillStyle = hexToRGBA(
			$(":root").css("--main-background-color"),
			this.opacity
		);

		gridCTX.fillRect(
			this.x,
			this.y,
			this.currentSize + 2,
			this.currentSize + 2
		);
	}

	getAdjacentOpacity(i, j, distance) {
		let totalOpacity = 0;
		let count = 0;

		if (i - distance >= 0) {
			// Make sure the adjacent cell is ot currnetly mouseLocked
			if (!cells[i - distance][j].mouseLocked) {
				totalOpacity += cells[i - distance][j].opacity;
				count++;
			}
		}
		if (i + distance < cells.length) {
			// Make sure the adjacent cell is ot currnetly mouseLocked
			if (!cells[i + distance][j].mouseLocked) {
				totalOpacity += cells[i + distance][j].opacity;
				count++;
			}
		}
		if (j - distance >= 0) {
			// Make sure the adjacent cell is ot currnetly mouseLocked
			if (!cells[i][j - distance].mouseLocked) {
				totalOpacity += cells[i][j - distance].opacity;
				count++;
			}
		}
		if (j + distance < cells[i].length) {
			// Make sure the adjacent cell is ot currnetly mouseLocked
			if (!cells[i][j + distance].mouseLocked) {
				totalOpacity += cells[i][j + distance].opacity;
				count++;
			}
		}

		return count > 0 ? totalOpacity / count : 0;
	}

	computeAntiAliasedOpacity(i, j) {
		let drawOpacity = this.opacity;
		for (let distance = 1; distance <= 1; distance++) {
			let adjacentOpacity = this.getAdjacentOpacity(i, j, distance);
			drawOpacity = (drawOpacity + adjacentOpacity) / 2;
		}
		return drawOpacity;
	}

	update() {
		// Check if the mouse is over this cell and adjust properties
		this.checkMouseHover();

		// Drawing the cell with its current properties
		this.draw();
	}

	checkMouseHover() {
		// Calculate the boundaries of the cell
		const cellBounds = {
			left: this.x,
			right: this.x + cellSize,
			top: this.y,
			bottom: this.y + cellSize,
		};

		// Check if the mouse is within the bounds of this cell
		if (
			mouse.x >= cellBounds.left &&
			mouse.x <= cellBounds.right &&
			mouse.y >= cellBounds.top &&
			mouse.y <= cellBounds.bottom
		) {
			this.opacity = 0.25; // Cell is under mouse, reduce opacity
			this.mouseLocked = true;
		} else {
			// If not under mouse, gradually increase opacity back to 1
			if (this.opacity < 1 && this.mouseLocked) {
				this.opacity += 0.01; // Adjust this rate as needed for smoothness
				if (this.opacity > 1) {
					this.opacity = 1;
					this.mouseLocked = false;
				}
			}
		}
	}

	introAnimation(duration) {
		if (this.currentlyAnimating) return;
		this.currentlyAnimating = true;
		duration = duration || 0.5;
		this.opacity = 0;
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
		duration = duration || 0.5;
		delay = delay || 0;
		let darkening;

		setTimeout(() => {
			this.opacity = 1;
			darkening = true;
			var opacityInterval = setInterval(() => {
				if (darkening) {
					this.opacity -= 0.01;
					this.shadowBlur += 0.5;
				} else {
					this.opacity += 0.01;
					this.shadowBlur -= 0.5;
				}
				if (this.opacity <= 0.5) {
					darkening = false;
				}
				if (this.opacity >= 1) {
					this.opacity = 1;
					this.shadowBlur = 0;
					this.currentlyAnimating = false;
					clearInterval(opacityInterval);
				}
			}, duration);
		}, delay);
	}

	snapShrink(duration) {
		if (this.currentlyAnimating) return;
		this.currentlyAnimating = true;
		duration = duration ? duration : 0.5;
		var shrinking = true;
		var insetTo = 13;
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

function sizeCanvas() {
	gridCanvas.attr("width", $(window).width());
	gridCanvas.attr("height", $(window).height());
	colCount = Math.ceil($(window).width() / cellSize);
	rowCount = Math.ceil($(window).height() / cellSize);
	createCells(colCount, rowCount, true);
}
$(window).on("resize", sizeCanvas);

$(window).on("load", sizeCanvas);

var cellSize = 70;

var cellGap = 0.4;

// ...

// Calculate the number of columns and rows using Math.ceil
var colCount = Math.ceil($(window).width() / cellSize);
var rowCount = Math.ceil($(window).height() / cellSize);

// Adjust cellSize to fit entire screen with these counts
cellSize = Math.min(
	$(window).width() / colCount,
	$(window).height() / rowCount
);

// Recalculate columns and rows with the new cellSize
colCount = Math.ceil($(window).width() / cellSize);
rowCount = Math.ceil($(window).height() / cellSize);

var totalWidth = colCount * cellSize + (colCount - 1) * cellGap;
var totalHeight = rowCount * cellSize + (rowCount - 1) * cellGap;

// Adjust the cellSize if the total grid dimensions exceed the window's dimensions
if (totalWidth > $(window).width()) {
	cellSize = $(window).width() / colCount;
}

if (totalHeight > $(window).height()) {
	cellSize = $(window).height() / rowCount;
}

// Set the starting positions to 0
var startX = 0;
var startY = 0;

// ...

var gridCTX = gridCanvas[0].getContext("2d");

var cells = [];

function createCells(colCount, rowCount, skipIntro) {
	cells = [];
	var cellCount = 0;
	for (var i = 0; i < rowCount; i++) {
		cells.push([]);
		for (var j = 0; j < colCount; j++) {
			cells[i].push(
				new Cell(
					startX + j * (cellSize + cellGap),
					startY + i * (cellSize + cellGap),
					cellCount * 10,
					skipIntro
				)
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

		// If the cell is mouseLocked, skip it
		if (cells[i][randomCell].mouseLocked) {
			continue;
		}

		// Add the cell to the raindrop array
		rainDrop.push(cells[i][randomCell]);
	}
	for (var i = 0; i < rainDrop.length; i++) {
		// Compute a random number between 1 and 20 for the length of the flash
		var randomFlashLength = Math.floor(Math.random() * 15) + 1;

		// Compute a random number between 25 and 125 for the delay of the flash
		var randomFlashDelay = Math.floor(Math.random() * 100) + 25;

		// Flash the current cell for the random length
		rainDrop[i].flash(randomFlashLength, i * randomFlashDelay);
	}
}

function animateSnapShrink() {
	// Picks a random row
	var randomRow = Math.floor(Math.random() * cells.length);
	// Picks a random cell in the row
	var randomCell = Math.floor(Math.random() * cells[randomRow].length);
	cells[randomRow][randomCell].snapShrink(100);
}

function animateExplosion() {
	// Starting from the center, animate outwards in a circle
	console.log("EXPLODING");

	var centerX, centerY;

	if (colCount % 2 === 0) {
		centerX = colCount / 2 - 1;
	} else {
		centerX = Math.floor(colCount / 2);
	}

	if (rowCount % 2 === 0) {
		centerY = rowCount / 2 - 1;
	} else {
		centerY = Math.floor(rowCount / 2);
	}

	var maxRadius = Math.max(colCount, rowCount) / 2;
	var radius = 0;

	function animateCircle() {
		for (var i = 0; i < rowCount; i++) {
			for (var j = 0; j < colCount; j++) {
				// Check if the cell is approximately at the current radius from the center
				var distance = Math.sqrt(
					Math.pow(j - centerX, 2) + Math.pow(i - centerY, 2)
				);
				if (Math.abs(distance - radius) < 0.5) {
					cells[i][j].flash(5, 0);
				}
			}
		}

		radius += 1;

		// If the radius is smaller than the max radius, continue expanding
		if (radius < maxRadius + 5) {
			setTimeout(animateCircle, 50); // adjust the time as needed
		}
	}

	animateCircle();
}

createCells(colCount, rowCount, true);
// Only animate the raindrop if it is not within 10 seconds of the minute mark

setInterval(function () {
	var date = new Date();
	if ((date.getSeconds() < 58) & (date.getSeconds() > 2)) {
		animateRaindrop();
	}
}, 500);
// setInterval(animateSnapShrink, 500);

// setInterval(animateExplosion, 5000);
// Every minute, on the minute mark, animate the explosion
setInterval(function () {
	var date = new Date();
	if (date.getSeconds() === 0) {
		animateExplosion();
	}
}, 1000);

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
