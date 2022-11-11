var aboutHeaderText =
	"My goal as a software engineer is to create code with perspective and purpose - and to ultimately make the world a more human friendly place. Here's how I've been working towards that goal:";
// Places about header text into about header element while giving each a random animation delay
var aboutHeaderTextElement = $("#aboutHeaderText");

var hasAnimatedYet = false;
// When about header is on screen run animation
var aboutHeader = $("#aboutHeader");
$(window).scroll(function () {
	if (!hasAnimatedYet & isElementOnScreen(aboutHeader)) {
		hasAnimatedYet = true;
		for (var i = 0; i < aboutHeaderText.length; i++) {
			var char = aboutHeaderText.charAt(i);
			// Add the character to the header element after i * 0.02 seconds
			// setTimeout(
			// 	function (char, isFinalChar) {
			// 		aboutHeaderTextElement.append(char);
			// 		aboutHeaderTextElement.append($("#blinker"));
			// 		if (isFinalChar) {
			// 			$("#aboutHeader").addClass("animateOut");
			// 		}
			// 	},
			// 	i * 50,
			// 	char,
			// 	i === aboutHeaderText.length - 1
			// );
		}
	}
});

function isElementOnScreen() {
	var element = $("#aboutHeader");
	var top = element.offset().top;
	var bottom = top + element.outerHeight();

	var viewportTop = $(window).scrollTop();
	var viewportBottom = viewportTop + $(window).height();

	return top < viewportBottom && bottom > viewportTop;
}

// As the user scrolls down the page, each #aboutCard element is moved to the left
// and the #aboutCardText element is faded in
var aboutCards = $(".aboutCard");
var education = $("#education");
$(window).on("scroll", function () {
	var scrollPos = window.scrollY;
	// The position where the #experience container is in the center of the screen
	var middlePos = education.offset().top - $(window).height() / 2;
	// Get the current scroll position relative to the middle position
	var relativeScrollPos = scrollPos - middlePos;
	// Based on the relative scroll position, move the #aboutCard elements to the left
	aboutCards.each(function (index, element) {
		var card = $(element);
		var multiplier = relativeScrollPos > 0 ? 1 : -1;
		$(card).css(
			"--xOffset",
			// relativeScrollPos
			multiplier * 1.04 ** (Math.abs(relativeScrollPos) * 0.23)
		);
	});
});

// For every about card, add a mousex and mouseY css variable to track the mouses' position on the element
// var aboutCards = $(".aboutCard");
// // On mouse move, update the css variables
// $(document).mousemove(function (e) {
// 	aboutCards.each(function () {
// 		var card = $(this);
// 		card.mousemove(function (e) {
// 			var mouseX = e.pageX - card.offset().left;
// 			var mouseY = e.pageY - card.offset().top;
// 			card.css("--mouseX", mouseX + "px");
// 			card.css("--mouseY", mouseY + "px");
// 		});
// 	});
// });
