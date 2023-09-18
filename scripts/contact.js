$("input[type='text']").on("focus", function () {
	// Add focus class to the parent element
	$(this).parent().addClass("focus");
});

// Remove focus class from the parent element
$("input[type='text']").on("blur", function () {
	$(this).parent().removeClass("focus");
});

// If an input has a value, add the valuecontained class to the parent element
$("input[type='text']").on("change", function () {
	if ($(this).val()) {
		$(this).parent().addClass("valueContained");
	} else {
		$(this).parent().removeClass("valueContained");
	}
});

// ensures the email field is valid email using regex
$("input[name='email']").on("change", function () {
	var email = $(this).val();
	var emailRegex =
		/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (emailRegex.test(email)) {
		$(this).parent().addClass("valid");
		$(this).parent().removeClass("invalid");
	} else if (!emailRegex.test(email) && email.length > 0) {
		$(this).parent().addClass("invalid");
		$(this).parent().removeClass("valid");
	} else {
		$(this).parent().removeClass("invalid");
		$(this).parent().removeClass("valid");
	}
});

$("#contactSubmitButton").on("click", function () {
	var email = $("input[name='email']").val();
	var message = $("textarea[name='message']").val();

	if (email.length > 0 && message.length > 0) {
		// Send the data to email.php
		$.ajax({
			type: "POST",
			url: "scripts/email.php",
			data: {
				email: email,
				message: message,
			},
			success: function (data) {
				console.log("SUCCESS: ", data);
			},
			error: function (data) {
				console.log("ERROR: ", data);
			},
		});
	}
});
