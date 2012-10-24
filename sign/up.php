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
				require '../includes/query_process.php';
				$count = $sqlInfo->num_rows();

        if ($count === 1) {
					$errorMssg = 'Email address already registered.';
				}	else {
          $query = "INSERT INTO sheet_users( `txtName`, `txtEmail` ) VALUES ('". $name ."', '". $email ."')";
          if(!_setQuery($mysqli, $query)) $errorMssg = 'Something went wrong please try agian.' ;
          $userId = $mysqli->insert_id;

          $queryInfo = "INSERT INTO sheet_character_info (id, txtCharName, txtPlayerName) VALUES ($userId, '". $charName ."', '". $name ."')";
          if(!_setQuery($mysqli, $queryInfo)) $errorMssg = 'Something went wrong please try agian.' ;

          $queryAttr = "INSERT INTO sheet_attributes (id, intStrength, intAgility, intVitality, intAlertness, intIntelligence, intWillpower) VALUES ($userId, 4, 4, 4, 4, 4, 4)";
          if(!_setQuery($mysqli, $queryAttr)) $errorMssg = 'Something went wrong please try agian.' ;

          $queryEquip = "INSERT INTO sheet_equipment (id, tnytxtActiveTab) VALUES ($userId, 'allitems')";
          if(!_setQuery($mysqli, $queryEquip)) $errorMssg = 'Something went wrong please try agian.' ;

          $queryDice = "INSERT INTO sheet_dice (id) VALUES ($userId)";
          if(!_setQuery($mysqli, $queryDice)) $errorMssg = 'Something went wrong please try agian.' ;

          $queryTraits = "INSERT INTO sheet_roll_traits (id) VALUES ($userId)";
          if(!_setQuery($mysqli, $queryTraits)) $errorMssg = 'Something went wrong please try agian.' ;

          session_start();
          $_SESSION['id'] = $userId;
//          todo: something with this hash
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
<?php }

function _setQuery($mysqli, $query) {
  if (!$mysqli->query($query)) {
    return false;
  }
  return true;
}
?>