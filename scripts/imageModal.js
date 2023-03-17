function imageModalClose() {
	$("#imageModal").removeClass("open");
}

function imageModalOpen(imgSRC) {
	$("#imageModal").addClass("open");
	$("#imageModalImage").attr("src", imgSRC);
}
