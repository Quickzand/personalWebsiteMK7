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

function openLinkInNewTab(link) {
	window.open(link, "_blank");
}

// Opens up share menu for resume.pdf
function shareResume() {
	if (navigator.share) {
		navigator
			.share({
				title: document.title,
				text: "Hello World",
				url: "resume.pdf",
			})
			.then(() => console.log("Successful share"))
			.catch((error) => console.log("Error sharing:", error));
	}
}

$.fn.isInViewport = function () {
	var elementTop = $(this).offset().top;
	var elementBottom = elementTop + $(this).outerHeight();

	var viewportTop = $(window).scrollTop();
	var viewportBottom = viewportTop + $(window).height();

	return elementBottom > viewportTop && elementTop < viewportBottom;
};
