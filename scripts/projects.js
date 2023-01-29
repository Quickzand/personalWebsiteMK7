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
		id: "meets",
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
		id: "directory",
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
	var projectPreview = $("<a>").addClass("projectPreview");
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
