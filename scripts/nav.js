$(".navButton").each(function () {
	$(this).click(function () {
		$(".navButton").removeClass("selected");
		$(this).addClass("selected");
	});
});

var navElement = $("nav");
// Run nav scroll on scroll
$(window).scroll(function () {
	// If scrolled 100 px add hidden class to $("nav")
	if ($(window).scrollTop() > 100) {
		navElement.addClass("scrolled");
	} else {
		navElement.removeClass("scrolled");
	}
});
