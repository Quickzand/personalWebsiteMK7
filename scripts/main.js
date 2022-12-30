function stopBodyScroll() {
	$("html").addClass("noScroll");
}

function startBodyScroll() {
	$("html").removeClass("noScroll");
}

function hideNavBar() {
	$("nav").addClass("hidden");
	$("#mobileNav").addClass("hidden");
}

function showNavBar() {
	$("nav").removeClass("hidden");
	$("#mobileNav").removeClass("hidden");
}
