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
		accentColor: "#ebba30",
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
		level: 1,
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
		accentColor: "#4a00c5",
	},
	{
		name: "Web Sockets",
		level: 0.45,
		icon: "images/skills/websocket.png",
		accentColor: "#ef4b07",
	},
	{
		name: "AWS",
		level: 0.85,
		icon: "images/skills/aws.png",
		accentColor: "#f7941e",
	},
];

const profs = [
	{
		name: "MacOS",
		level: 1,
		icon: "images/skills/macos.png",
		accentColor: "#1f93f4",
	},
	{
		name: "Windows",
		level: 0.9,
		icon: "images/skills/windows.png",
		accentColor: "#209ceb",
	},
	{
		name: "Linux",
		level: 0.8,
		icon: "images/skills/linux.png",
		accentColor: "#ed9a0a",
	},
	{
		name: "Android",
		level: 0.3,
		icon: "images/skills/android.png",
		accentColor: "#95bd2c",
	},
	{
		name: "iOS",
		level: 0.95,
		icon: "images/skills/ios.png",
		accentColor: "#1f93f4",
	},
	{
		name: "Office Suite",
		level: 0.95,
		icon: "images/skills/office.png",
		accentColor: "#e42407",
	},
	{
		name: "Adobe Photoshop",
		level: 0.95,
		icon: "images/skills/photoshop.jpg",
		accentColor: "#43bae7",
	},
	{
		name: "Final Cut Pro X",
		level: 0.95,
		icon: "images/skills/finalcut.png",
		accentColor: "#fa55ae",
	},
	{
		name: "Slack",
		level: 0.75,
		icon: "images/skills/slack.png",
		accentColor: "#4a154b",
	},
	{
		name: "Unity",
		level: 0.5,
		icon: "images/skills/unity.svg",
		accentColor: "#ff7149",
	},
	{
		name: "Virtual Reality",
		level: 0.85,
		icon: "images/skills/vr.png",
		accentColor: "#0c64f1",
	},
];

function skillBuilder(skill) {
	var skillContainer = $("<div>").addClass("skillContainer");
	var skillName = $("<span>").text(skill.name).addClass("skillName");
	var skillIcon = $("<img>")
		.attr("src", skill.icon)
		.attr("alt", skill.name + " icon")
		.addClass("skillIcon");
	var skillHeader = $("<div>").addClass("skillHeader");

	skillHeader.append(skillName);
	skillHeader.append(skillIcon);

	var skillBar = $("<div>").addClass("skillBar");
	var skillBarBackgroundGradient = $("<div>").addClass(
		"skillBarBackgroundGradient"
	);
	if (skill.accentColor) {
		skillBar.css("--accent-color", skill.accentColor);
		skillBar.css("--first-gradient", hexModifier(skill.accentColor, -25));
		skillBar.css("--second-gradient", hexModifier(skill.accentColor, 65));
		skillBar.css(
			"--accent-color-slight-transparent",
			transparencyModifier(skill.accentColor, 0.5)
		);
		skillBarBackgroundGradient.css("--accent-color", skill.accentColor);
		skillBarBackgroundGradient.css(
			"--accent-color-slight-transparent",
			transparencyModifier(skill.accentColor, 1)
		);
		skillBarBackgroundGradient.css(
			"--first-gradient",
			hexModifier(skill.accentColor, -25)
		);
		skillBarBackgroundGradient.css(
			"--second-gradient",
			hexModifier(skill.accentColor, 65)
		);
		skillBar.append(skillBarBackgroundGradient);
	}

	skillBar.css("--skill-level", skill.level * 100 + "%");
	skillBarBackgroundGradient.css("--skill-level", skill.level * 100 + "%");

	skillBar.attr("data-skill-level", skill.level * 100 + "%");

	skillContainer.append(skillHeader);
	skillContainer.append(skillBar);
	skillContainer.append(skillBarBackgroundGradient);

	return skillContainer;
}

function orderBasedOffPercentage(skillList) {
	skillList.sort(function (a, b) {
		return b.level - a.level;
	});
}


// compare two hex values and return how close they are
function compareHex(hex1, hex2) {
	// Takes out # from hex value
	hex1 = hex1.substring(1);
	hex2 = hex2.substring(1);

	// Seperate hex value into r, g, b
	var r1 = hex1.substring(0, 2);
	var g1 = hex1.substring(2, 4);
	var b1 = hex1.substring(4, 6);

	var r2 = hex2.substring(0, 2);
	var g2 = hex2.substring(2, 4);
	var b2 = hex2.substring(4, 6);

	// Convert hex values to decimal
	r1 = parseInt(r1, 16);
	g1 = parseInt(g1, 16);
	b1 = parseInt(b1, 16);

	r2 = parseInt(r2, 16);
	g2 = parseInt(g2, 16);
	b2 = parseInt(b2, 16);

	// Add x to each decimal value
	var r = Math.abs(r1 - r2);
	var g = Math.abs(g1 - g2);
	var b = Math.abs(b1 - b2);

	var total = r + g + b;

	return total;
}

function hexModifier(hex, x) {
	// Takes out # from hex value
	hex = hex.substring(1);

	// Seperate hex value into r, g, b
	var r = hex.substring(0, 2);
	var g = hex.substring(2, 4);
	var b = hex.substring(4, 6);

	// Convert hex values to decimal
	r = parseInt(r, 16);
	g = parseInt(g, 16);
	b = parseInt(b, 16);

	// Add x to each decimal value
	r += x;
	g += x;
	b += x;

	// If any value is greater than 255, set it to 255
	if (r > 255) {
		r = 255;
	}
	if (g > 255) {
		g = 255;
	}
	if (b > 255) {
		b = 255;
	}

	// If any value is less than 0, set it to 0
	if (r < 0) {
		r = 0;
	}
	if (g < 0) {
		g = 0;
	}
	if (b < 0) {
		b = 0;
	}

	// Convert decimal values back to hex
	r = r.toString(16);
	g = g.toString(16);
	b = b.toString(16);

	// Add 0 to the front of each hex value if it is only 1 character long
	if (r.length == 1) {
		r = "0" + r;
	}
	if (g.length == 1) {
		g = "0" + g;
	}
	if (b.length == 1) {
		b = "0" + b;
	}

	// Combine r, g, b values back into hex
	var hexValue = r + "" + g + "" + b;

	return "#" + hexValue;
}

// Returns rgba value of hex with transparency
function transparencyModifier(hex, x) {
	// Takes out # from hex value
	hex = hex.substring(1);

	// Seperate hex value into r, g, b
	var r = hex.substring(0, 2);
	var g = hex.substring(2, 4);
	var b = hex.substring(4, 6);

	// Convert hex values to decimal
	r = parseInt(r, 16);
	g = parseInt(g, 16);
	b = parseInt(b, 16);

	// Add 0 to the front of each hex value if it is only 1 character long
	if (r.length == 1) {
		r = "0" + r;
	}
	if (g.length == 1) {
		g = "0" + g;
	}
	if (b.length == 1) {
		b = "0" + b;
	}

	// Combine r, g, b values back into hex
	var hexValue = r + "" + g + "" + b;

	return "rgba(" + r + "," + g + "," + b + "," + x + ")";
}

var count = 0;

orderBasedOffPercentage(programmingLanguages);
for (var i = 0; i < programmingLanguages.length; i++) {
	var skill = programmingLanguages[i];
	var skillContainer = skillBuilder(skill);
	//  Adds a css variable animation-delay to the skill container
	skillContainer.css("--animation-delay", i * 0.15 + "s");
	$("#programmingLanguages").append(skillContainer);
	count++;
}

// Upon entering #programmingLanguages section, animate in the skills
var skillsContainer = $("#skills");
$(window).on("scroll", function () {
	if (skillsContainer.isInViewport()) {
		$(".skillsHeader").addClass("animateIn");
		$(".skillContainer").each(function (i) {
			var skillContainer = $(this);
			skillContainer.addClass("animateIn");
			skillContainer.css("--index", i);
		});
	}
});

for (var i = 0; i < technologies.length; i++) {
	var skill = technologies[i];
	var skillContainer = skillBuilder(skill);
	skillContainer.css("--animation-delay", i * 0.15 + "s");
	$("#technologies").append(skillContainer);
	count++;
}

$("#technologies").waypoint(function () {
	$(".skillContainer").each(function (i) {
		var skillContainer = $(this);
		setTimeout(function () {
			skillContainer.addClass("animateIn");
		}, i * 100);
	});
});

for (var i = 0; i < profs.length; i++) {
	var skill = profs[i];
	var skillContainer = skillBuilder(skill);
	skillContainer.css("--animation-delay", i * 0.15 + "s");
	$("#proficiencies").append(skillContainer);
	count++;
}

$("#proficiencies").waypoint(function () {
	$(".skillContainer").each(function (i) {
		var skillContainer = $(this);
		setTimeout(function () {
			skillContainer.addClass("animateIn");
		}, i * 100);
	});
});

function animateSkills() {
	$(".skillContainer").removeClass("passiveAnimate");
	// Wait 0.5 seconds before adding the class passiveAnimate
	setTimeout(function () {
		$(".skillContainer").addClass("passiveAnimate");
	}, 500);
}

// Every 10 seconds add the class passiveAnimate to all skillContainers
// This will cause the skills to animate
setInterval(animateSkills, 10000);
