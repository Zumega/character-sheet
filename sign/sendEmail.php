<?php

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
$headers .= 'From: SignUP@CharacterSheet.com' . "\r\n";

$to = $values['email'];
$subject = "Sign Up";

$Content = "<h1>Thank you for signing up, below is your information.</h1>Player Name: " . $values['name'] . "<br />Player Login: " . $values['email'] . "<br />Player Password: " . $values['pass'] . "
<h2>Please go to the <a href=\"". $siteURL ."\">Log In</a> page to start playing.</h2>";

$body = "<html><head><title>Sign Up</title></head><body>" . $Content . "</body></html>";
mail($to, $subject, $body, $headers);
header("location:". $siteURL ."?id=" . rand(100, 1000));

?>
