const projects = [
	{
		id: "dequeue",
		name: "Dequeue",
		description:
			"Dequeue is an app that allows you to control your computer from your phone, made by myself and Ayden Colby! It has a home screen allowing you to control more general things like volume, music, or terminal commands, and a section which allows you to create your own shortcuts and scripts to run on your computer remotely. This is my first time working with a mobile centric design and my first time using progressive web apps.",
		preview: "images/projects/dequeuePreview.png",
		tags: [
			{
				name: "Electron",
				icon: "images/tags/electron.svg",
			},
			{
				name: "Node.js",
				icon: "images/tags/node.svg",
			},
			{
				name: "Python",
				icon: "images/tags/python.svg",
			},
			{
				name: "React Native",
				icon: "images/tags/pwa.svg",
			},
		],
		links: [
			{
				type: "website",
				text: "Website",
				url: "www.beaned.com",
			},
			{
				type: "collaborator",
				text: "Ayden Colby",
				url: "www.aydencolby.com",
			},
			{
				type: "github",
				text: "GitHub",
				url: "www.github.com/",
			},
		],
		images: [
			"images/projects/dequeue/dequeue1.png",
			"images/projects/dequeue/dequeue6.png",
			"images/projects/dequeue/dequeue2.png",
			"images/projects/dequeue/dequeue3.png",
			"images/projects/dequeue/dequeue4.png",
			"images/projects/dequeue/dequeue5.png",
		],
	},
	{
		name: "Homesub",
		preview: "images/projects/homesubPreview.png",
		id: "homesub",
		description:
			"Homesub is my coronavirus relief effort. As someone who has experienced firsthand how difficult it can be to be completely disconnected from the physical environment of school, I wanted to find a way to help my classmates through the rough transition period to online learning. Seeing the difficulties that computer science students had with writing their code from home, I created a website for them to write, test, and submit all of their code from. Homesub was my first time working with any sort of backend, and was a valuable learning experience when it came to working with server side development.",
		tags: [
			{
				name: "HTML",
			},
			{
				name: "CSS",
			},
			{
				name: "JavaScript",
			},
			{
				name: "PHP",
			},
			{
				name: "mySQL",
			},
		],
	},
	{
		name: "Wiki What",
		preview: "images/projects/WWPreview.png",
		id: "wikiWhat",
		hasPassword: true,
		description:
			"Dequeue is a web application that allows users to create and join virtual queues for businesses. Users can create a queue for a business and share the link with others to join the queue. Users can also join a queue that has already been created by another user. Users can also view the status of their queue and the status of the queues they have joined. Dequeue was built using React, Node.js, Express, and MongoDB.",
		tags: [
			{
				name: "HTML",
			},
			{
				name: "CSS",
			},
			{
				name: "JavaScript",
			},
			{
				name: "Python",
			},
		],
	},
	{
		name: "Wifi Panda",
		preview: "images/projects/wifiPandaPreview.png",
		id: "wifiPanda",
		description:
			"Dequeue is a web application that allows users to create and join virtual queues for businesses. Users can create a queue for a business and share the link with others to join the queue. Users can also join a queue that has already been created by another user. Users can also view the status of their queue and the status of the queues they have joined. Dequeue was built using React, Node.js, Express, and MongoDB.",
		tags: [
			{
				name: "HTML",
			},
			{
				name: "CSS",
			},
			{
				name: "JavaScript",
			},
			{
				name: "PHP",
			},
		],
	},
	{
		name: "Meets Stories",
		preview: "images/projects/meetsPreview.png",
		hasPassword: true,
		id: "meetsStories",
		description:
			"Dequeue is a web application that allows users to create and join virtual queues for businesses. Users can create a queue for a business and share the link with others to join the queue. Users can also join a queue that has already been created by another user. Users can also view the status of their queue and the status of the queues they have joined. Dequeue was built using React, Node.js, Express, and MongoDB.",
		tags: [
			{
				name: "HTML",
			},
			{
				name: "CSS",
			},
			{
				name: "JavaScript",
			},
			{
				name: "PHP",
			},
			{
				name: "mySQL",
			},
		],
	},
	{
		name: "Tankz",
		preview: "images/projects/tankzPreview.png",
		id: "tankz",
		description:
			"Dequeue is a web application that allows users to create and join virtual queues for businesses. Users can create a queue for a business and share the link with others to join the queue. Users can also join a queue that has already been created by another user. Users can also view the status of their queue and the status of the queues they have joined. Dequeue was built using React, Node.js, Express, and MongoDB.",
		tags: [
			{
				name: "HTML",
			},
			{
				name: "CSS",
			},
			{
				name: "JavaScript",
			},
			{
				name: "Node.js",
			},
			{
				name: "mySQL",
			},
			{
				name: "WebSockets",
			},
		],
	},
	{
		name: "Host Directory",
		preview: "images/projects/directoryPreview.png",
		id: "hostDirectory",
		description:
			"Dequeue is a web application that allows users to create and join virtual queues for businesses. Users can create a queue for a business and share the link with others to join the queue. Users can also join a queue that has already been created by another user. Users can also view the status of their queue and the status of the queues they have joined. Dequeue was built using React, Node.js, Express, and MongoDB.",
		tags: [
			{
				name: "HTML",
			},
			{
				name: "CSS",
			},
			{
				name: "JavaScript",
			},
			{
				name: "PHP",
			},
		],
	},
];

function projectPreviewBuilder(projectInfo) {
	var projectPreview = $("<div>").addClass("projectPreview");
	var projectPreviewImage = $("<img>")
		.attr("src", projectInfo.preview)
		.attr("alt", projectInfo.name + " preview image");
	var projectPreviewName = $("<h2>")
		.text(projectInfo.name)
		.addClass("projectPreviewName");
	var projectPreviewDescription = $("<p>")
		.addClass("projectPreviewDescription")
		.text(projectInfo.description);
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
			projectPreviewTag.append(projectPreviewTagIcon);
			projectPreviewTagContainer.append(projectPreviewTag);
		});
	projectPreview.append(
		projectPreviewImage,
		projectPreviewName,
		projectPreviewDescription,
		projectPreviewTagContainer
	);

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

projectsConstructor(projects);

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
	if (!data) return;
	$("#projectName").text(data.name);
	$("#projectTime").text(data.time);
	$("#projectLinks").empty();
	data.links = data.links ? data.links : [];
	for (var i = 0; i < data.links.length; i++) {
		var projectLink = projectLinkConstructor(data.links[i]);
		$("#projectLinks").append(projectLink);
	}
	$("#projectDescription").text(data.description);
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
			console.log(this);
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
			name = "GitHub";
			projectLinkIcon = $(githubSVG);
			break;
		case "collaborator":
			name = linkData.collaboratorName
				? linkData.collaboratorName
				: "Collaborator";
			projectLinkIcon = $(collaboratorSVG);
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
