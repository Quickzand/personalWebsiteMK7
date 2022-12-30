const gridContainer = $("#gridContainer");

// If the window is 750px wide or less, cell size = 50px, otheriwse  100
const cellSize = $(window).width() <= 750 ? 50 : 100;
$("#gridContainer").css("--cell-size", cellSize + "px");

var colCount = Math.ceil($(window).width() / cellSize);
var rowCount = Math.ceil($(window).height() / cellSize);

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
			console.log("HERE");
		}
		gridContainer.append(cell);
		cells.push(cell);
	}
	animatedIntro = true;
}

$(window).on("scroll", function () {
	// If scrolled past 100vh, animatedIntro = true;
	if ($(window).scrollTop() > $(window).height()) {
		animatedIntro = true;
	} else {
		animatedIntro = false;
	}
});

// on resize recalculate everything
$(window).on("resize", function () {
	gridContainer.empty();
	colCount = Math.ceil($(window).width() / cellSize);
	rowCount = Math.ceil($(window).height() / cellSize);
	cellCount = colCount * rowCount;
	gridContainer.css({
		"--colCount": Math.floor(colCount),
		"--rowCount": Math.floor(rowCount),
	});
	createCells(cellCount);
});

// every second picks a random cell and adds the class "animating" to it and then removes it 5 seconds later
var currRow = 0;
const maxDeviance = 1;
// Picks a number between 0 and colCount
var currColNumber = Math.floor(Math.random() * colCount);
setTimeout(function () {
	setInterval(function () {
		// var randomCell = cells[Math.floor(Math.random() * cells.length)];
		// Picks a random cell from the current row and adds the class "animating" to it and then removes it 5 seconds later
		// console.log(Math.floor(Math.random() * colCount + currRow * colCount));
		var upUntilCurrRow = currRow * colCount;
		// Picks a number between -maxDeviance and maxDeviance
		var randomDeviance =
			Math.floor(Math.random() * (maxDeviance * 2 + 1)) - maxDeviance;
		// Adds the deviance to the current col number
		var randomColNumber = currColNumber + randomDeviance;
		// If the random col number is less than 0, set it to 0
		if (randomColNumber < 0) randomColNumber = 0;
		// If the random col number is greater than the col count, set it to the col count
		if (randomColNumber > colCount - 1) randomColNumber = colCount;
		// Set randomCell to the cell at the random col number
		var randomCell = cells[upUntilCurrRow + randomColNumber];

		try {
			randomCell.addClass("animating");
		} catch (e) {
			console.log("ERROR");
		}
		setTimeout(function () {
			randomCell.removeClass("animating");
		}, 5000);
		currRow++;
		if (currRow >= rowCount) {
			currRow = 0;
			currColNumber = Math.floor(Math.random() * colCount);
		}
	}, 50);
}, 5000);

var nameLetters = $("#name span");
// For every letter in the name, add an index css variable to it
for (var i = 0; i < nameLetters.length; i++) {
	nameLetters[i].style.setProperty("--index", i);
}
