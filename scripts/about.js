var aboutHeaderText =
	"Hi, I'm Matthew! I am a Computer Science student at the University of Central Florida, with an extensive background in fullstack web development. My goal as a software engineer is to create code with perspective and purpose - and to ultimately, make the world a more human friendly place. Here's how I've been working towards that goal:";
// Places about header text into about header element while giving each a random animation delay
var aboutHeaderTextElement = $("#aboutHeaderText");

$("#aboutHeaderPlaceholderText").text(aboutHeaderText);

var hasAnimatedYet = false;
var hasStartedAnimating = false;
var skippedAnimation = false;
// When about header is on screen run animation
var aboutHeader = $("#aboutHeader");
$(window).scroll(function () {
	if (!hasStartedAnimating & isElementOnScreen(aboutHeader)) {
		hasStartedAnimating = true;
		var currDelay = 0;
		for (var i = 0; i < aboutHeaderText.length; i++) {
			var char = aboutHeaderText.charAt(i);
			// Add the character to the header element after i * 0.02 seconds

			currDelay += 15;
			setTimeout(
				function (char, isFinalChar) {
					if (!skippedAnimation) {
						aboutHeaderTextElement.append(char);
						aboutHeaderTextElement.append($("#blinker"));
						if (isFinalChar) {
							$("#aboutHeader").addClass("animateOut");
							hasAnimatedYet = true;
						}
					}
				},
				currDelay,
				char,
				i === aboutHeaderText.length - 1
			);
			if (char == ".") currDelay += 1000;
			if (char == "!" || char == "-") currDelay += 500;
			if (char == ",") currDelay += 50;
		}
	}

	if (
		!hasAnimatedYet & !isElementOnScreen(aboutHeader) & hasStartedAnimating ||
		!hasAnimatedYet &
			!isElementOnScreen(aboutHeader) &
			(window.scrollPos > aboutHeader.offset().top)
	) {
		aboutHeaderTextElement.empty();
		skippedAnimation = true;
		aboutHeaderTextElement.append(aboutHeaderText);
		aboutHeaderTextElement.append($("#blinker"));
	}
});

function isElementOnScreen() {
	var element = $("#aboutHeader");
	var top = element.offset().top;
	var bottom = top + element.outerHeight();

	var viewportTop = $(window).scrollTop();
	var viewportBottom = viewportTop + $(window).height();

	return top < viewportBottom && bottom > viewportTop;
}

// As the user scrolls down the page, each #aboutCard element is moved to the left
// and the #aboutCardText element is faded in
var aboutCards = [];
var education = $("#education");
var experience = $("#experience");
$(window).on("scroll", function () {
	if (!education.isInViewport() && !experience.isInViewport()) {
		return;
	}
	var scrollPos = window.scrollY;
	// The position where the #experience container is in the center of the screen
	var middlePos = education.offset().top - $(window).height() / 2;
	// Get the current scroll position relative to the middle position
	var relativeScrollPos = scrollPos - middlePos;
	// Based on the relative scroll position, move the #aboutCard elements to the left
	for (var i = 0; i < aboutCards.length; i++) {
		var card = aboutCards[i];
		var multiplier = relativeScrollPos > 0 ? 1 : -1;
		$(card).css(
			"--xOffset",
			// relativeScrollPos
			multiplier * 1.03 ** (Math.abs(relativeScrollPos) * 0.23)
		);
	}
});

// For every about card, add a mousex and mouseY css variable to track the mouses' position on the element
// var aboutCards = $(".aboutCard");
// // On mouse move, update the css variables
// $(document).mousemove(function (e) {
// 	aboutCards.each(function () {
// 		var card = $(this);
// 		card.mousemove(function (e) {
// 			var mouseX = e.pageX - card.offset().left;
// 			var mouseY = e.pageY - card.offset().top;
// 			card.css("--mouseX", mouseX + "px");
// 			card.css("--mouseY", mouseY + "px");
// 		});
// 	});
// });

// EXPERIENCE / EDUCATION SECTION

const aboutData = [
	{
		name: "Amazon",
		timeline: "June 2023 - August 2023",
		description: "Software Development Engineer Intern",
		shortDescription:
			"Created react-based app to collect audio data from users",
		logo: "images/amazon.png",
		image: "images/test.jpg",
		cards: [
			{
				content:
					" Designed and implemented dynamic storage scaling for AI training platform utilizing Shell Scripting, CloudFormation, and Lambda Functions",
			},
			{
				content:
					"Worked with AWS services to preform rolling deployment of new EC2 based service to over 6,000 users",
			},
			{
				content:
					"Wrote scripts in NodeJS for data aggregation, sanitation, and analysis",
			},
		],
		tags: ["CloudFormation", "AWS", "NodeJS", "Bash", "Lambda", "EC2"],
		location: $("#experience .aboutCardsContainer"),
	},
	{
		name: "SightPlan",
		timeline: "October 2022 - Present",
		description: "IOS Development Intern",
		logo: "images/sightplan.png",
		image: "images/aboutCards/downtownOrlando.jpeg",
		cards: [
			{
				content:
					"Worked in agile development style to plan, design, and implement new features",
			},
			{
				content: "Utilized xCode to write, debug and test code",
			},
			{
				content:
					"Implemented design using objective C, Storyboards, and Swift UI",
			},
		],
		tags: ["Swift", "AWS", "xCode", "objectiveC", "swiftui"],
		location: $("#experience .aboutCardsContainer"),
	},
	{
		name: "Amazon",
		timeline: "June 2022 - August 2022",
		description: "Software Development Engineer Intern",
		shortDescription:
			"Created react-based app to collect audio data from users",
		logo: "images/amazon.png",
		image: "images/aboutCards/spheres.jpeg",
		cards: [
			{
				content:
					"Designed and constructzzed mobile React application to collect and test audio data",
			},
			{
				content:
					"Learned and contributed to AWS Lambda backend, maintained service and trained others on service",
			},
			{
				content:
					"Implemented feature on robotic assistant to create timelapse of location or object",
			},
		],
		tags: ["React", "AWS"],
		location: $("#experience .aboutCardsContainer"),
	},

	{
		name: "University of Central Florida",
		timeline: "August 2021 - Present",
		description: "College of Engineering and Computer Science",
		shortDescription: "Ya know",
		logo: "images/ucf.png",
		image: "images/aboutCards/reflectionPond.jpeg",
		location: $("#education .aboutCardsContainer"),
	},
	{
		name: "Suncoast High Shool",
		timeline: "August 2017 - June 2021",
		description: "Math, Science, and Engineering and Computer Science Programs",
		shortDescription:
			"Created react-based app to collect audio data from users",
		logo: "images/suncoast.png",
		image: "images/aboutCards/suncoastCampus.jpg",
		location: $("#education .aboutCardsContainer"),
	},
];

function openAboutPopover(data) {
	$("#aboutPopover").addClass("open");
	$("#aboutPopoverTitleText").text(data.name);
	$("#aboutPopoverBackground").attr("src", data.image);
	$("#aboutPopoverTitleIcon").attr("src", data.logo);
	$("#aboutPopoverDescription").text(data.description);

	$("#aboutPopoverCards").empty();

	stopBodyScroll();
	hideNavBar();

	if (data.cards) {
		for (var i = 0; i < data.cards.length; i++) {
			var currentCard = data.cards[i];
			var card = $("<div class='aboutPopoverCard'></div>");
			var cardContent = $("<div class='aboutPopoverCardContent'></div>");
			cardContent.text(currentCard.content);
			card.append(cardContent);
			card.css("--index", i);
			$("#aboutPopoverCards").append(card);
		}
	}

	$("#aboutPopoverTags").empty();
	if (data.tags) {
		for (var i = 0; i < data.tags.length; i++) {
			var currentTag = tagBuilder(data.tags[i]);
			currentTag.css("--index", i);
			$("#aboutPopoverTags").append(currentTag);
		}
	}
}

function tagBuilder(tagName) {
	var tag = $("<div class='aboutPopoverTag'></div>");
	var tagImg = $("<img class='aboutPopoverTagImg'/>");
	var tagLabel = $("<div class='aboutPopoverTagLabel'></div>");
	tagName = tagName.toLowerCase();

	switch (tagName) {
		case "react":
			tagImg.attr("src", "images/reactLogo.png");
			tagImg.addClass("spinReactLogo");
			tagImg.attr("alt", "React Logo");
			tagLabel.text("React");
			break;
		case "aws":
			tagImg.attr("src", "images/awsLogo.png");
			tagImg.attr("alt", "AWS Logo");
			tagLabel.text("AWS");
			break;
		case "swift":
			tagImg.attr("src", "images/swiftLogo.png");
			tagImg.attr("alt", "Swift Logo");
			tagLabel.text("Swift");
			break;
		case "xcode":
			tagImg.attr("src", "images/xcodeLogo.png");
			tagImg.attr("alt", "Xcode Logo");
			tagLabel.text("Xcode");
			break;
		case "objectivec":
			tagImg.attr("src", "images/objectiveCLogo.png");
			tagImg.attr("alt", "Objective-C Logo");
			tagLabel.text("Objective-C");
			break;
		case "swiftui":
			tagImg.attr("src", "images/swiftUILogo.png");
			tagImg.attr("alt", "SwiftUI Logo");
			tagLabel.text("SwiftUI");
			break;
		case "cloudformation":
			tagImg.attr("src", "images/cloudformationLogo.png");
			tagImg.attr("alt", "CloudFormation Logo");
			tagLabel.text("AWS Cloud Formation");
			break;
		case "nodejs":
			tagImg.attr("src", "images/nodejsLogo.png");
			tagImg.attr("alt", "NodeJS Logo");
			tagLabel.text("NodeJS");
			break;
		case "bash":
			tagImg.attr("src", "images/bashLogo.png");
			tagImg.attr("alt", "Bash Scripting Logo");
			tagLabel.text("Bash Scripting");
			break;
		case "lambda":
			tagImg.attr("src", "images/lambdaLogo.svg");
			tagImg.attr("alt", "AWS Lambda Logo");
			tagLabel.text("AWS Lambda");
			break;
		case "ec2":
			tagImg.attr("src", "images/ec2Logo.png");
			tagImg.attr("alt", "EC2 Logo");
			tagLabel.text("AWS EC2");
			break;
	}
	tag.append(tagImg);
	tag.append(tagLabel);
	return tag;
}

function aboutPopoverPeek(data) {
	$("#aboutPopover").addClass("peek");
}

function aboutPopoverClose() {
	$("#aboutPopover").removeClass("open");
	startBodyScroll();
	showNavBar();
}

function aboutCardsBuilder() {
	for (var i = 0; i < aboutData.length; i++) {
		var data = aboutData[i];
		var card = $("<div></div>").addClass("aboutCard");
		var cardContent = $("<div></div>").addClass("aboutCardContent");
		var cardIcon = $("<img></img>").addClass("aboutCardIcon");
		cardIcon.attr("src", data.logo);
		cardIcon.attr("alt", data.name + " Logo");
		var cardHeader = $("<div></div>").addClass("aboutCardHeader");
		cardHeader.append("<span>" + data.name + "</span>");
		var cardSubtitle = $("<div></div>").addClass("aboutCardSubtitle");
		cardSubtitle.append("<span>" + data.timeline + "</span>");
		cardHeader.append(cardSubtitle);
		cardContent.append(cardIcon);
		cardContent.append(cardHeader);

		var cardDescription = $("<div></div>").addClass("aboutCardDescription");
		cardDescription.append("<span>" + data.description + "</span>");

		var cardBG = $("<img/>").addClass("aboutCardBG");
		cardBG.attr("src", data.image);
		cardBG.attr("alt", data.name + " Background");

		card.append(cardContent);
		card.append(cardDescription);
		card.append(cardBG);

		card.data("data", data);

		data.location.append(card);

		aboutCards.push(card);

		card.on("click", function () {
			openAboutPopover($(this).data("data"));
		});
	}
}

aboutCardsBuilder();
// When the user clicks the #aboutPopoverClose element, close the popover
$("#aboutPopoverClose").click(function () {
	aboutPopoverClose();
});

// When events is in view, add animateIn
var events = $("#events");
$(window).on("scroll", function () {
	if (events.isInViewport()) {
		$("#events").addClass("animateIn");
	}
});

// Adds an index css variable to every .event
function eventIndexBuilder() {
	var events = $(".event");
	for (var i = 0; i < events.length; i++) {
		$(events[i]).css("--index", i);
	}
}

eventIndexBuilder();
