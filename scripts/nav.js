$(".navButton").each(function () {
	$(this).on("click", function () {
		console.log("Removing selection from: ", $(".navButton.selected"));
		$(".navButton").removeClass("selected");
		$(this).addClass("selected");
		scrollToElement($(this).attr("data-navTo"));
	});
});


$(".mobileNavButton").each(function () {
	$(this).on("click", function () {
		console.log("Removing selection from: ", $(".navButton.selected"));
		$(".navButton").removeClass("selected");
		$(this).addClass("selected");
		scrollToElement($(this).attr("data-navTo"));
	});
});


function scrollToElement(id) {
	// A bit hackey but subtracting one px for scroll to register new section
	var pos = $("#" + id).position().top - 1;
	console.log($("#" + id).position());
	console.log("SCROLLING TO ", id, " AT ", pos);
	$("html, body").animate(
		{
			scrollTop: pos,
		},
		1500
	);
}

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
	$(".mobileNavButton").removeClass("selected")
	$("#mobileAboutNav").addClass("selected")
});

$("#skills").waypoint(function () {
	$(".navButton").removeClass("selected");
	$("#skillsNav").addClass("selected");
	$(".mobileNavButton").removeClass("selected")
	$("#mobileSkillsNav").addClass("selected")
});

$("#projects").waypoint(function () {
	$(".navButton").removeClass("selected");
	$("#projectsNav").addClass("selected");
	$(".mobileNavButton").removeClass("selected")
	$("#mobileProjectsNav").addClass("selected")
});

$("#contact").waypoint(function () {
	$(".navButton").removeClass("selected");
	$("#contactNav").addClass("selected");
	$(".mobileNavButton").removeClass("selected")
	$("#mobileContactNav").addClass("selected")
});
