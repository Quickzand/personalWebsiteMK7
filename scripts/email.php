<?php 
// This is the email address that the form will send a message to.
$myEmail =  "matthewsand22@gmail.com";

// This is the subject of the email that the form sends.
$subject =  "Contact Form Submission";

$email = $_GET['email'];
$message = $_GET['message'];

// This line sends the e-mail to me.
mail($myEmail, $subject, $message, "From:" . $email);

// This line sends the user back to the form with a success message.
header('Location: contact.html?success=true#contact');
?>