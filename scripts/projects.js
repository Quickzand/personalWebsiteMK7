// Load in projects from getProjectCardInfo.php
var projects = [];
$.ajax({
	url: "getProjectCardInfo.php",
	type: "GET",
	success: function (data) {
		projects = JSON.parse(data);
		projectsConstructor(JSON.parse(data));
	},
	error: function (data) {
		console.log("ERROR: ", data);
	},
});
function projectPreviewBuilder(projectInfo) {
	if (!projectInfo) return;
	var projectPreview = $("<div>").addClass("projectPreview");
	var projectPreviewTopRow = $("<div>").addClass("projectPreviewTopRow");
	var projectPreviewImage = $("<img>")
		.attr("src", projectInfo.preview)
		.attr("alt", projectInfo.name + " preview image");
	var projectPreviewBody = $("<div>").addClass("projectPreviewBody");
	var projectPreviewName = $("<h2>")
		.text(projectInfo.name)
		.addClass("projectPreviewName");
	var projectPreviewDescription = $("<p>")
		.addClass("projectPreviewDescription")
		.text(projectInfo.description);
	projectPreviewBody.append(projectPreviewName, projectPreviewDescription);
	projectPreviewTopRow.append(projectPreviewImage, projectPreviewBody);
	var projectPreviewTagContainer = $("<div>").addClass(
		"projectPreviewTagsContainer"
	);

	if (projectInfo.tags)
		projectInfo.tags.forEach(function (tag) {
			var projectPreviewTag = $("<div>").addClass("projectPreviewTag");
			var projectPreviewTagIcon = $("<img>")
				.attr("src", tag.icon)
				.attr("alt", tag.name + " icon");
			projectPreviewTag.text(tag.name);
			if (tag.highlighted) {
				projectPreviewTag.addClass("highlighted");
			}
			projectPreviewTag.append(projectPreviewTagIcon);
			projectPreviewTagContainer.append(projectPreviewTag);
		});
	projectPreview.append(projectPreviewTopRow, projectPreviewTagContainer);

	projectPreview.attr("data-projectID", projectInfo.id);
	if (projectInfo.hasPassword) {
		projectPreview.addClass("hasPassword");
		projectPreview.on("click", projectPopoverOpenWithPassword);
	} else {
		projectPreview.on("click", projectPopoverOpen);
	}
	return projectPreview;
}

function projectsConstructor(projects) {
	var projectsContainer = $("#projectsContainer");
	var highlightedProject = projectPreviewBuilder(projects[0]);
	highlightedProject.addClass("highlightedProject");
	var highlightedProjectGlow = $("<div>").addClass("highlightedProjectGlow");
	highlightedProject.append(highlightedProjectGlow);
	$("#highlightedProjectSubContainer").append(highlightedProject);
	for (var i = 1; i < projects.length; i++) {
		if (!projects[i]) continue;
		var projectPreview = projectPreviewBuilder(projects[i]);
		projectPreview.css("--index", i);
		projectsContainer.append(projectPreview);
	}
}

var projectsAnimatedIn = false;

// If projects is on screen then add .animateIn class to projects
$(window).scroll(function () {
	if (!projectsAnimatedIn)
		if ($("#projects").isInViewport()) {
			projectsAnimatedIn = true;
			$(".projectPreview").addClass("animateIn");
		}
});

function projectPopoverOpen(projectID) {
	$("#projectPopover").addClass("open");
	stopBodyScroll();
	startProjectLoad();
	projectID =
		typeof projectID === "string" ? projectID : $(this).attr("data-projectid");
	getProjectData(projectID);
}

function startProjectLoad() {
	$("#projectPopoverLoading").addClass("open");
	$("#projectPopoverContent").removeClass("open");
	$("#projectPopoverPasswordInput").removeClass("open");
	console.log("STARTING LOAD");
}

function stopProjectLoad() {
	$("#projectPopoverLoading").removeClass("open");
	$("#projectPopoverContent").addClass("open");
}

// MARK: PROJECT POPOVER STUFF
var githubSVG =
	'<svg viewBox="0 0 1024 1024"   xmlns="http://www.w3.org/2000/svg" class="contactIcon" id="Github"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" /></svg>';

var collaboratorSVG =
	'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"/></svg>';

var devpostSVG =
	'<svg viewBox="0 0 280 242" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path id="Logo" fill-rule="evenodd"  d="M 70.099609 242 L 0 120.699219 L 70.099609 -0.699219 L 210.199219 -0.699219 L 280.300781 120.699219 L 210.199219 242 L 70.099609 242 Z M 88.699219 194.300781 L 132.699219 194.300781 C 170.599197 194.300781 208.099609 172.499161 208.099609 120.699219 C 208.099609 66.799271 176.900726 47 134.800781 47 L 88.699219 47 L 88.699219 194.300781 Z M 118.099609 165.699219 L 118.099609 75.599609 L 133.699219 75.599609 C 164.899185 75.599609 177.799225 90.59964 177.699219 120.599609 C 177.699219 147.599579 163.499573 165.699219 132.599609 165.699219 L 118.099609 165.699219 Z"/></svg>';

var documentSVG =
	'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V4C19 3.44772 18.5523 3 18 3ZM6.41421 7H9V4.41421L6.41421 7ZM7 13C7 12.4477 7.44772 12 8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13ZM7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z"/></svg>';

function getProjectData(projectID) {
	// Get project data from database
	// Set project data to projectPopover
	// Close projectPopoverLoading
	var requestURL = "projectInfo.php?projectID=" + projectID;
	console.log(requestURL);
	// Get data from projectInfo.php with projectID as parameter
	fetch(requestURL)
		.then((response) => {
			return response.json();
		})
		.then(function (data) {
			insertProjectPopoverContent(data);
			// Set timeout of 0.5s
			setTimeout(() => {
				stopProjectLoad();
			}, 500);
		});
}

function projectPopoverOpenWithPassword() {
	$("#projectPopover").addClass("open");
	stopBodyScroll();
	$("#projectPopoverPasswordInput").addClass("open");
	currentPasswordProjectID = $(this).attr("data-projectID");
}

function projectPopoverClose() {
	$("#projectPopover").removeClass("open");
	$("#projectPopoverPasswordInput").removeClass("open");
	startBodyScroll();
}

var currentPasswordProjectID = "";

function attemptToGetProjectDataWithPass() {
	var projectID = currentPasswordProjectID;
	var password = $("#projectPopoverPasswordInput input").val();
	var requestURL =
		"projectInfo.php?projectID=" + projectID + "&password=" + password;
	console.log(requestURL);
	// Get data from projectInfo.php with projectID as parameter
	fetch(requestURL)
		.then((response) => {
			return response.json();
		})
		.then(function (data) {
			if (!data.error) {
				startProjectLoad();
				console.log(data);
				insertProjectPopoverContent(data);
				// Set timeout of 0.5s
				setTimeout(() => {
					stopProjectLoad();
				}, 500);
			} else {
				$("#projectPopoverPasswordInput input").val("");
				$("#projectPopoverPasswordInput input").attr(
					"placeholder",
					"Incorrect Password"
				);
				$("#projectPopoverPasswordInput input").addClass("error");
			}
		});
}

function setIncorrectPassword() {
	$("#projectPopoverPasswordInput input").val("");
	$("#projectPopoverPasswordInput input").attr(
		"placeholder",
		"Incorrect Password"
	);
	$("#projectPopoverPasswordInput input").addClass("error");
}

function unsetIncorrectPassword() {
	$("#projectPopoverPasswordInput input").val("");
	$("#projectPopoverPasswordInput input").attr("placeholder", "");
	$("#projectPopoverPasswordInput input").removeClass("error");
}

function insertProjectPopoverContent(data) {
	console.log(data);
	if (!data) return;
	$("#projectName").text(data.name);
	$("#projectTime").text(data.time);
	$("#projectLinks").empty();
	data.links = data.links ? data.links : [];
	for (var i = 0; i < data.links.length; i++) {
		var projectLink = projectLinkConstructor(data.links[i]);
		$("#projectLinks").append(projectLink);
	}

	// $("#projectDescription").text(data.description);
	$("#projectDescription").empty();
	data.sections = data.sections ? data.sections : [];
	data.sections.forEach((section) => {
		var sectionContainer = $("<div>").addClass("projectSectionContainer");
		var sectionTitle = $("<div>")
			.addClass("projectSectionTitle")
			.text(section.title);
		var sectionContent = $("<div>")
			.addClass("sectionContent")
			.text(section.content);
		sectionContainer.append(sectionTitle, sectionContent);
		$("#projectDescription").append(sectionContainer);
	});
	$("#projectImages").empty();
	data.images = data.images ? data.images : [];
	for (var i = 0; i < data.images.length; i++) {
		var image = data.images[i];
		var projectImage = projectImageConstructor(image);
		$("#projectImages").append(projectImage);
	}
	calculateAllImagesScale();
	// Set scroll to be in the center horitzontally
	$("#projectImages").scrollLeft($(window).width() / 2);
}

function projectImageConstructor(src) {
	var projectImage = $("<img>")
		.attr("src", src)
		.addClass("projectImage")
		.click(function () {
			var distanceFromCenter = calculateImageDistanceFromCenter(this);
			// If the image is not in the center, scroll to it and animate
			// Turn off snap scroll on projectImages div
			$("#projectImages").css("scroll-snap-type", "none");
			if (distanceFromCenter > 0.01) {
				$("#projectImages").animate(
					{
						scrollLeft:
							$("#projectImages").scrollLeft() +
							$(this).offset().left -
							$(window).width() / 2 +
							$(this).width() / 2,
					},
					500
				);
				// Turn on snap scroll on projectImages div
				setTimeout(() => {
					$("#projectImages").css("scroll-snap-type", "x mandatory");
				}, 500);
			} else {
				imageModalOpen(src);
			}
		});
	return projectImage;
}

function projectLinkConstructor(linkData) {
	var projectLink = $("<a>")
		.attr("href", linkData.href)
		.attr("target", "_blank")
		.addClass("projectLink");
	var name;
	var projectLinkIcon;

	switch (linkData.type.toLowerCase()) {
		case "github":
			name = linkData.name ? linkData.name : "GitHub";
			projectLinkIcon = $(githubSVG);
			break;
		case "collaborator":
			name = linkData.collaboratorName
				? linkData.collaboratorName
				: "Collaborator";
			projectLinkIcon = $(collaboratorSVG);
			break;
		case "devpost":
			name = "Devpost";
			projectLinkIcon = $(devpostSVG);
			break;
		case "document":
			name = linkData.name ? linkData.name : "Document";
			projectLinkIcon = $(documentSVG);
			break;
	}

	var projectLinkName = $("<div>").text(name);
	projectLink.append(projectLinkIcon, projectLinkName);
	return projectLink;
}

$("#projectImages").on("scroll", function () {
	calculateAllImagesScale();
});

function calculateAllImagesScale() {
	$(".projectImage").each(function () {
		calculateImageDistanceFromCenter(this);
	});
}

function calculateImageDistanceFromCenter(imageElement) {
	imageElement = $(imageElement);
	var imageCenter = imageElement.offset().left + imageElement.width() / 2;
	var windowCenter = $(window).width() / 2;
	// Calculates distance as a percentage of the window width, the further away the smaller the percent
	var distance = Math.abs(imageCenter - windowCenter) / $(window).width();

	imageElement.css("--scale", 1 - distance);
	return distance;
}
