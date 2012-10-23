<?php
  if(!empty($_GET['callback'])){

    $email = $_POST['email'];
    $name = $_POST['name'];
    $charName = $_POST['charName'];
    $passed = true;
    $errorMssg = '';

    include_once './emailverification.php';

    if(!validEmail($email)) {
      $errorMssg = 'Bad email address';
      $passed = false;
    };

    if($passed) {
      require '../includes/connection_Open.php';
        $query = "SELECT txtEmail FROM `sheet_users` WHERE txtEmail='". $email ."'";
				$result = mysql_query($query) or die('Query failed: ' . mysql_error());
				$count = mysql_num_rows($result);

        if ($count === 1) {
					$errorMssg = 'Email address already registered.';
				}	else {
          $query = "INSERT INTO sheet_users( `txtName`, `txtEmail` ) VALUES ('". $name ."', '". $email ."')";
          mysql_query($query) or die('Query failed: ' . mysql_error());

          $query = "SELECT id FROM `sheet_users` WHERE txtEmail='". $email ."'";
          $result = mysql_query($query) or die('Query failed: ' . mysql_error());
          $line = mysql_fetch_array($result, MYSQL_ASSOC);

          $queryInfo = "INSERT INTO sheet_character_info (id, txtCharName) VALUES ($line[id], '". $charName ."')";
          mysql_query($queryInfo) or die('Query failed: ' . mysql_error());

          $queryAttr = "INSERT INTO sheet_attributes (id) VALUES ($line[id])";
          mysql_query($queryAttr) or die('Query failed: ' . mysql_error());

          $queryEquip = "INSERT INTO sheet_equipment (id) VALUES ($line[id])";
          mysql_query($queryEquip) or die('Query failed: ' . mysql_error());

          $queryDice = "INSERT INTO sheet_dice (id) VALUES ($line[id])";
          mysql_query($queryDice) or die('Query failed: ' . mysql_error());

          $queryTraits = "INSERT INTO sheet_roll_traits (id) VALUES ($line[id])";
          mysql_query($queryTraits) or die('Query failed: ' . mysql_error());

          session_start();
          $_SESSION['id'] = $line['id'];
          $_SESSION['hash'] = $hash;

          echo $_GET['callback'] .'({"success":true})';
          return true;
        }
      require '../includes/connection_Close.php';
      echo $_GET['callback'] .'({"success":false, "errors":"'. $errorMssg .'"})';
    }

    return true;
  } else {
?>
<div id="signUp" class="signContianer">
  <div class="sign">
    <h2>Sign Up:</h2>
    <div class="errorMssg"></div>
    <div>
      <label for="email">Email:</label>
      <input type="text" id="upEmail" name="email" value="" tabindex="<?= ++$tabIndex; ?>" />
    </div>
    <div>
      <label for="name">Your Name:</label>
      <input type="text" id="upName" name="name" value="" tabindex="<?= ++$tabIndex; ?>" />
    </div>
    <div>
      <label for="charName">Characters Name:</label>
      <input type="text" id="upCharName" name="charName" value="" tabindex="<?= ++$tabIndex; ?>" />
    </div>
    <div class="hideButton">
      <input type="button" class="signButton" id="submitSignUp" name="submitSignUp" value="Sign Up" tabindex="<?= ++$tabIndex; ?>" />
    </div>
  </div>
  <div class="signLoading">Loading</div>
</div>
<?php } ?>