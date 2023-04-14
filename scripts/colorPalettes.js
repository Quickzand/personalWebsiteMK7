function openColorPalettes() {
	$("#colorPalettes").addClass("open");
}

function closeColorPalettes() {
	$("#colorPalettes").removeClass("open");
}

function toggleColorPalettes() {
	$("#colorPalettes").toggleClass("open");
}

const colorPalettes = [
	{
		name: "Default",
		colors: {
			mainBackgroundColor: "#121212",
			outsetBackgroundColor: "#222222",
			secondaryBackgroundColor: "#010101",
			firstAccentColor: "#23d183",
			secondAccentColor: "#06ace8",
			mainFontColor: "#fdfdfd",
			mainTextShadowColor: "rgba(0, 0, 0, 0.5)",
			mainGlassyBackgroundColor: "rgba(0, 0, 0, 0.5)",
		},
		previewColors: ["#23d183", "#06ace8"],
	},
	{
		name: "Glow Wave",
		colors: {
			mainBackgroundColor: "#101010",
			outsetBackgroundColor: "#111111",
			secondaryBackgroundColor: "#010101",
			firstAccentColor: "#FF2F2F",
			secondAccentColor: "#06ace8",
			mainFontColor: "#fdfdfd",
			mainTextShadowColor: "rgba(0, 0, 0, 0.5)",
			mainGlassyBackgroundColor: "rgba(0, 0, 0, 0.5)",
		},
		previewColors: ["#FF2F2F", "#06ace8"],
	},
	{
		name: "Light",
		colors: {
			mainBackgroundColor: "#f5f5f5",
			outsetBackgroundColor: "#e5e5e5",
			secondaryBackgroundColor: "#d5d5d5",
			firstAccentColor: "#23d183",
			secondAccentColor: "#06ace8",
			mainFontColor: "#121212",
			mainTextShadowColor: "rgba(255, 255, 255, 0.5)",
			mainGlassyBackgroundColor: "rgba(255, 255, 255, 0.5)",
		},
		previewColors: ["#23d183", "#f5f5f5"],
	},
];

var colorPalettesList = $("#colorPalettesList");
function buildColorPalettes() {
	colorPalettesList.empty();
	colorPalettes.forEach((palette) => {
		var paletteElement = $("<div></div>");
		paletteElement.addClass("colorPalette");
		paletteElement.css("--preview-color-1", palette.previewColors[0]);
		paletteElement.css("--preview-color-2", palette.previewColors[1]);
		paletteElement.attr("data-palette-name", palette.name);
		paletteElement.click(() => {
			applyColorPalette(palette);
		});
		colorPalettesList.append(paletteElement);
	});

	// set the color palette to the one stored in the cookie
	var colorPalette = $.cookie("colorPalette");
	if (colorPalette) {
		applyColorPalette(
			colorPalettes.find((palette) => palette.name == colorPalette)
		);
	}
}

function applyColorPalette(palette) {
	var root = $(":root");
	root.css("--main-background-color", palette.colors.mainBackgroundColor);
	root.css("--outset-background-color", palette.colors.outsetBackgroundColor);
	root.css(
		"--secondary-background-color",
		palette.colors.secondaryBackgroundColor
	);
	root.css("--first-accent-color", palette.colors.firstAccentColor);
	root.css("--second-accent-color", palette.colors.secondAccentColor);
	root.css("--main-font-color", palette.colors.mainFontColor);
	root.css("--main-text-shadow-color", palette.colors.mainTextShadowColor);
	root.css(
		"--main-glassy-background-color",
		palette.colors.mainGlassyBackgroundColor
	);

	$(".colorPalette").removeClass("active");

	// find the color palette element with the same name as the palette
	// and add the active class to it
	$(".colorPalette").each((index, element) => {
		if ($(element).attr("data-palette-name") == palette.name) {
			$(element).addClass("active");
		}
	});

	// set the color pallette cookie
	$.cookie("colorPalette", palette.name, { expires: 365 });
}

buildColorPalettes();
