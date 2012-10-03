<?php
  require_once 'variables.php';
  $values = array(
      'name' => $_POST["frmUName"],
      'email' => $_POST["frmEMail"],
      'pass' =>  $_POST["frmPWord"],
      'logSign' => $_POST["frmLogSign"]
  );

	$UNameVerify = $EMailVerify = $PWordVerify = 0; // match/valid

	if (!is_null($values['logSign'])) {
		if (!strlen($values['name'])) {
			$UNameVerify = 1;
		}
		if (!preg_match("/([a-zA-Z0-9\._-])+@([a-zA-Z0-9\._-])+\.([a-z]{2,3})$/", $values['email'])) {
			$EMailVerify = 1;
		}
		if (!strlen($values['pass'])) {
			$PWordVerify = 1;
		}
	}

	if ($UNameVerify + $EMailVerify + $PWordVerify == 0 && !is_null($values['logSign'])) {
		require_once 'connection_Open.php';

    foreach($values as $k=>$v){
      $values[$k] = mysql_real_escape_string(stripslashes($v));
    }

		switch($values['logSign']) {
			case "L":
				$query = "SELECT id, txtEmail, txtPass FROM `sheet_users` WHERE txtEmail='". $values['email'] ."' and txtPass='". $values['pass'] ."' and intDelete=0";
				$result = mysql_query($query) or die('Query failed: ' . mysql_error());
				$count = mysql_num_rows($result);

				if ($count == 1) {
          $line = mysql_fetch_array($result, MYSQL_ASSOC);
					session_start();
					$_SESSION["id"] = $line[id];
					header("location:". $siteURL);
				}	else {
					echo "<h4>Wrong Username, Password or your sheet has been deleted.</h4>";
				}
				break;
			case "S":
				$query = "SELECT txtEmail FROM `sheet_users` WHERE txtEmail='". $values['email'] ."'";
				$result = mysql_query($query) or die('Query failed: ' . mysql_error());
				$count=mysql_num_rows($result);

				if ($count == 1) {
					echo "<h4>Email address already registered.</h4>";
				}	else {
					$query = "INSERT INTO sheet_users( `txtName` , `txtPass` , `txtEmail` ) VALUES ('". $values['name'] ."', '". $values['pass'] ."', '". $values['email'] ."')";
					mysql_query($query) or die('Query failed: ' . mysql_error());

          $query = "SELECT id FROM `sheet_users` WHERE txtEmail='". $values['email'] ."'";
          $result = mysql_query($query) or die('Query failed: ' . mysql_error());
          $line = mysql_fetch_array($result, MYSQL_ASSOC);

					$queryInfo = "INSERT INTO sheet_character_info (id) VALUES ($line[id])";
					mysql_query($queryInfo) or die('Query failed: ' . mysql_error());
					$queryAttr = "INSERT INTO sheet_attributes (id) VALUES ($line[id])";
					mysql_query($queryAttr) or die('Query failed: ' . mysql_error());
					$queryEquip = "INSERT INTO sheet_equipment (id) VALUES ($line[id])";
					mysql_query($queryEquip) or die('Query failed: ' . mysql_error());
					$queryDice = "INSERT INTO sheet_dice (id) VALUES ($line[id])";
					mysql_query($queryDice) or die('Query failed: ' . mysql_error());
					$queryTraits = "INSERT INTO sheet_roll_traits (id) VALUES ($line[id])";
					mysql_query($queryTraits) or die('Query failed: ' . mysql_error());
          
//          if i need more tables set up
//					$query = "INSERT INTO sheet_dice (id) VALUES ($line[id])";
//					mysql_query($query) or die('Query failed: ' . mysql_error());

					require_once 'connection_Close.php';

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
				}
				break;
		}
	} elseif (!is_null($values['logSign'])) {
    echo "something is not valid";
  }
?>
