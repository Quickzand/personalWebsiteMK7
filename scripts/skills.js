const programmingLanguages = [
	{
		name: "HTML",
		level: 1,
		icon: "images/skills/html.png",
		accentColor: "#e0421e",
	},
	{
		name: "CSS",
		level: 1,
		icon: "images/skills/css.png",
		accentColor: "#1e8fe0",
	},
	{
		name: "Javascript",
		level: 1,
		icon: "images/skills/javascript.png",
		accentColor: "#e0d21e",
	},
	{
		name: "SQL",
		level: 0.6,
		icon: "images/skills/sql.png",
		accentColor: "#1453a0",
	},
	{
		name: "PHP",
		level: 0.8,
		icon: "images/skills/php.png",
		accentColor: "#6874b9",
	},
	{
		name: "C",
		level: 0.8,
		icon: "images/skills/c.png",
		accentColor: "#0b478c",
	},
	{
		name: "Python",
		level: 0.95,
		icon: "images/skills/python.png",
		accentColor: "#fddf55",
	},
	{
		name: "Java",
		level: 0.95,
		icon: "images/skills/java.png",
		accentColor: "#4f6dbc",
	},
	{
		name: "GO",
		level: 0.25,
		icon: "images/skills/go.png",
		accentColor: "#00a8e0",
	},
];

const technologies = [
	{
		name: "Git",
		level: 0.9,
		icon: "images/skills/git.png",
		accentColor: "#f14e32",
	},
	{
		name: "Node.js",
		level: 0.8,
		icon: "images/skills/node.png",
		accentColor: "#8cc84b",
	},
	{
		name: "Electron",
		level: 0.8,
		icon: "images/skills/electron.png",
		accentColor: "#47848c",
	},
	{
		name: "React",
		level: 0.8,
		icon: "images/skills/react.png",
		accentColor: "#61dafb",
	},
	{
		name: "JQuery",
		level: 0.95,
		icon: "images/skills/jquery.png",
		accentColor: "#0769ad",
	},
	{
		name: "PWA",
		level: 0.5,
		icon: "images/skills/pwa.png",
	},
	{
		name: "Web Sockets",
		level: 0.45,
		icon: "images/skills/websocket.png",
	},
	{
		name: "AWS",
		level: 0.85,
		icon: "images/skills/aws.png",
	},
];

const profs = [
	{
		name: "MacOS",
		level: 1,
		icon: "images/skills/macos.png",
	},
	{
		name: "Windows",
		level: 0.9,
		icon: "images/skills/windows.png",
	},
	{
		name: "Linux",
		level: 0.8,
		icon: "images/skills/linux.png",
	},
	{
		name: "Android",
		level: 0.3,
		icon: "images/skills/android.png",
	},
	{
		name: "iOS",
		level: 0.95,
		icon: "images/skills/ios.png",
	},
	{
		name: "Office Suite",
		level: 0.95,
		icon: "images/skills/office.png",
	},
	{
		name: "Adobe Photoshop",
		level: 0.95,
		icon: "images/skills/photoshop.jpg",
	},
	{
		name: "Final Cut Pro X",
		level: 0.95,
		icon: "images/skills/finalcut.png",
	},
	{
		name: "Slack",
		level: 0.75,
		icon: "images/skills/slack.png",
	},
	{
		name: "Unity",
		level: 0.5,
		icon: "images/skills/unity.svg",
	},
];

function skillBuilder(skill) {
	var skillContainer = $("<div>").addClass("skillContainer");
	var skillName = $("<h3>").text(skill.name).addClass("skillName");
	var skillIcon = $("<img>").attr("src", skill.icon).addClass("skillIcon");
	var progressCircle = $("<div>").addClass("progressCircle");
	// Set the css variable --progress to the skill level
	progressCircle.css("--progress", skill.level);
	progressCircle.attr("data-tilt", "true");
	progressCircle.attr("data-tilt-max", "40");
	progressCircle.attr("data-tilt-reverse", "true");
	progressCircle.attr("data-tilt-speed", "1000");
	progressCircle.attr("data-tilt-reset", "false");
	progressCircle.attr("data-tilt-scale", "1.2");

	var progressCircleInner = $("<div>").addClass("progressCircleInner");
	progressCircleInner.append(skillIcon, skillName);
	progressCircle.append(progressCircleInner);
	skill.accentColor
		? progressCircle.css("--accentColor", skill.accentColor)
		: progressCircle.css("--accentColor", "var(--main-background-color");

	skillContainer.append(progressCircle);
	return skillContainer;
}

var count = 0;

for (var i = 0; i < programmingLanguages.length; i++) {
	var skill = programmingLanguages[i];
	var skillContainer = skillBuilder(skill);
	//  Adds a css variable animation-delay to the skill container
	skillContainer.css("--animation-delay", i * 0.15 + "s");
	$("#programmingLanguages").append(skillContainer);
	count++;
}

// Upon entering #programmingLanguages section, animate in the skills
$("#programmingLanguages").waypoint(function () {
	$(".skillContainer").each(function (i) {
		var skillContainer = $(this);
		setTimeout(function () {
			skillContainer.addClass("animateIn");
		}, i * 100);
	});
});
