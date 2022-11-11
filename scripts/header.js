const gridContainer = $("#gridContainer");

const cellSize = 100;
var colCount = $(window).width() / cellSize;
var rowCount = $(window).height() / cellSize;

var cellCount = colCount * rowCount;

var animatedIntro = false;

gridContainer.css({
	"--colCount": Math.floor(colCount),
	"--rowCount": Math.floor(rowCount),
});

var cells = [];

createCells(cellCount);

// Adds a new row to the grid
function createCells(cellCount) {
	cells = [];
	for (var i = 0; i < cellCount; i++) {
		var cell = $("<div class='cell'></div>");
		if (animatedIntro == false) {
			cell.css({
				"--animation-delay": i * 0.02 + "s",
			});
		} else {
			cell.css({
				"--animation-delay": 0 + "s",
			});
			cell.addClass("dontAnimateIntro");
		}
		gridContainer.append(cell);
		cells.push(cell);
	}
	animatedIntro = true;
}

// on resize recalculate everything
$(window).on("resize", function () {
	gridContainer.empty();
	colCount = $(window).width() / cellSize;
	rowCount = $(window).height() / cellSize;
	cellCount = colCount * rowCount;
	gridContainer.css({
		"--colCount": Math.floor(colCount),
		"--rowCount": Math.floor(rowCount),
	});
	createCells(cellCount);
});

// every second picks a random cell and adds the class "animating" to it and then removes it 5 seconds later
var currRow = 0;
setInterval(function () {
	var randomCell = cells[Math.floor(Math.random() * cells.length)];
	// Picks a random cell from the current row and adds the class "animating" to it and then removes it 5 seconds later
	// console.log(Math.floor(Math.random() * colCount + currRow * colCount));
	// var randomCell = cells[Math.floor(Math.random() * colCount + currRow)];
	try {
		randomCell.addClass("animating");
	} catch (e) {
		// console.log(Math.floor(Math.random() * colCount + currRow));
	}
	setTimeout(function () {
		randomCell.removeClass("animating");
	}, 5000);
	currRow++;
	if (currRow >= rowCount) currRow = 0;
}, 200);
