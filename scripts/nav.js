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
		$("body").addClass("scrolled");
	} else {
		navElement.removeClass("scrolled");
		$("body").removeClass("scrolled");
	}
});

// Goes through each nav button and adds an index css variable
$(".navButton").each(function (index) {
	$(this).css("--index", index);
});

// adds an waypoint to about, skills, projects, and contact and when activated set selected to the corresponding nav button
$("#about").waypoint(function () {
	$(".navButton").removeClass("selected");
	$("#aboutNav").addClass("selected");
});

$("#skills").waypoint(function () {
	$(".navButton").removeClass("selected");
	$("#skillsNav").addClass("selected");
});

$("#projects").waypoint(function () {
	$(".navButton").removeClass("selected");
	$("#projectsNav").addClass("selected");
});

$("#contactCard").waypoint(function () {
	$(".navButton").removeClass("selected");
	$("#contactNav").addClass("selected");
});
