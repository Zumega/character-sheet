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
        $query = 'SELECT users.id, txtName, txtEmail, txtCharName '.
  'FROM sheet_users AS users '.
  'INNER JOIN sheet_character_info AS info ON users.id = info.id '.
  'WHERE intDelete = 0 AND '.
  'users.txtName = info.txtPlayerName AND '.
  'txtEmail = "'. $email .'" AND '.
  'txtName = "'. $name .'" AND '.
  'txtCharName = "'. $charName .'"';
        $result = mysql_query($query) or die('Query failed: ' . mysql_error());
        $line = mysql_fetch_array($result, MYSQL_ASSOC);

        if(!empty($line)) {
          $hash = md5($line['txtName'] . $line['txtEmail'] . $line['txtCharName'] . time());

          session_start();
          $_SESSION['id'] = $line['id'];
          $_SESSION['hash'] = $hash;

          echo $_GET['callback'] .'({"success":true})';
        } else {
          echo $_GET['callback'] .'({"success":false, "errors":"You many not have an account or you may have missed typed something."})';
        }
      require '../includes/connection_Close.php';
    } else {
      echo $_GET['callback'] .'({"success":false, "errors":"'. $errorMssg .'"})';
    }

    return true;
  } else {
?>
<div id="signIn" class="signContianer">
  <div class="sign">
    <h2>Sign In:</h2>
    <div class="errorMssg"></div>
    <div>
      <label for="email">Email:</label>
      <input type="text" id="inEmail" name="email" value="" tabindex="<?= ++$tabIndex; ?>" />
    </div>
    <div>
      <label for="name">Your Name:</label>
      <input type="text" id="inName" name="name" value="" tabindex="<?= ++$tabIndex; ?>" />
    </div>
    <div>
      <label for="charName">Characters Name:</label>
      <input type="text" id="inCharName" name="charName" value="" tabindex="<?= ++$tabIndex; ?>" />
    </div>
    <div class="hideButton">
      <input type="button" class="signButton" id="submitSignIn" name="submitSignIn" value="Sign In" tabindex="<?= ++$tabIndex; ?>" />
    </div>
  </div>
  <div class="signLoading">Loading</div>
</div>
<?php } ?>