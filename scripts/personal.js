const imgCount = 24;

let colWidth = 500;
let rowHeight = 300;

var colCount;
var rowCount;

var globalImageSpeed = 5;

var personalImageGridCanvas = $("#personalImageGrid");
var personalImageGridContext = personalImageGridCanvas[0].getContext("2d");

class GridImage {
	inset = 0;
	imageWidth = 0;
	imageHeight = 0;
	dx = 0;
	dy = 0;

	constructor(image, col, row) {
		this.image = image;
		this.col = col;
		this.row = row;
		image.onload = () => {
			this.imageWidth = this.image.width;
			this.imageHeight = this.image.height;
		};
	}

	update() {
		// Gets the aspect ratio of col and row and the image
		this.aspectRatio = colWidth / rowHeight;
		this.imageAspectRatio = this.imageWidth / this.imageHeight;
		// Sets the crop values
		this.cx = 0;
		this.cy = 0;
		this.cw = this.imageWidth;
		this.ch = this.imageHeight;
		// Sets the crop values based on the aspect ratio
		if (this.aspectRatio > this.imageAspectRatio) {
			this.cw = this.imageWidth;
			this.ch = this.imageWidth / this.aspectRatio;
			this.cy = (this.imageHeight - this.ch) / 2;
		}
		if (this.aspectRatio < this.imageAspectRatio) {
			this.cw = this.imageHeight * this.aspectRatio;
			this.ch = this.imageHeight;
			this.cx = (this.imageWidth - this.cw) / 2;
		}

		this.dx += Math.abs(globalImageSpeed);
		// If image is out of frame, reset dx
		if (this.isOffScreenRight()) {
			// Move image to the left side of the screen
			this.dx = (this.col + 1) * colWidth * -1;
		}

		this.draw();
	}

	isOffScreenRight() {
		return this.col * colWidth + this.dx > personalImageGridCanvas.width();
	}

	isOffScreenLeft() {
		return this.col * colWidth + this.dx < 0;
	}

	draw() {
		// Draws image using the crops
		personalImageGridContext.drawImage(
			this.image,
			this.cx,
			this.cy,
			this.cw,
			this.ch,
			this.col * colWidth + this.inset + this.dx,
			this.row * rowHeight + this.inset,
			colWidth - this.inset * 2,
			rowHeight - this.inset * 2
		);
	}
}

var gridImages = [];

function drawImageGridFrame() {
	personalImageGridContext.clearRect(
		0,
		0,
		personalImageGridCanvas.attr("width"),
		personalImageGridCanvas.attr("height")
	);
	for (let i = 0; i < gridImages.length; i++) {
		gridImages[i].update();
	}
}

function constructGridImages() {
	var imagesPerRow = 5;
	for (let i = 0; i < imgCount; i++) {
		var img = new Image();
		img.src = "images/personal/resized/" + i + ".jpeg";
		var gridImage = new GridImage(
			img,
			i % imagesPerRow,
			Math.floor(i / imagesPerRow)
		);
		gridImages.push(gridImage);
		colCount = (i % imagesPerRow) + 1;
		rowCount = Math.floor(i / imagesPerRow) + 1;
	}
}

// Resizes the canvas to fit the window
function resizeCanvas() {
	personalImageGridCanvas.attr("width", personalImageGridCanvas.width());
	personalImageGridCanvas.attr("height", personalImageGridCanvas.height());
}

// Resizes the canvas when the window is resized
$(window).on("resize", function () {
	resizeCanvas();
});

// On scroll, vary gloabalImageSpeed based on scroll speed
var scrollVelocity;
var oldScrollPosition = 0;
function measureScrollSped() {
	var newScrollPosition = $(window).scrollTop();
	scrollVelocity = newScrollPosition - oldScrollPosition;
	oldScrollPosition = newScrollPosition;
	globalImageSpeed = scrollVelocity / 50 + 0.5;
}
window.setInterval(measureScrollSped, 100);

resizeCanvas();

constructGridImages();
setInterval(() => requestAnimationFrame(drawImageGridFrame), 1000 / 60);
