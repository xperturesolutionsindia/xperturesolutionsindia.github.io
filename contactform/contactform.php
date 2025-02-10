<?php
if (
  empty($_POST['name']) || 
  empty($_POST['subject']) || 
  empty($_POST['message']) || 
  !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)
) {
  http_response_code(400);
  echo "Please fill out all fields and provide a valid email.";
  exit();
}

$name = htmlspecialchars(strip_tags(trim($_POST['name'])));
$email = htmlspecialchars(strip_tags(trim($_POST['email'])));
$m_subject = htmlspecialchars(strip_tags(trim($_POST['subject'])));
$message = htmlspecialchars(strip_tags(trim($_POST['message'])));

// Email recipient and subject
$to = "xperturesolutions@gmail.com"; // Replace with your email address
$subject = "Message from: $name - $m_subject";

// Email body
$body = "You have received a new message from your website contact form.\n\n";
$body .= "Here are the details:\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Subject: $m_subject\n";
$body .= "Message:\n$message\n";

// Email headers
$header = "From: $email\r\n";
$header .= "Reply-To: $email\r\n";
$header .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email and handle errors
if (mail($to, $subject, $body, $header)) {
  http_response_code(200);
  echo "Your message has been sent successfully.";
} else {
  http_response_code(500);
  echo "There was an error sending your message. Please try again later.";
}
?>
