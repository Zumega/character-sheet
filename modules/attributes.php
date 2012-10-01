<?php
require 'includes/connection_Open.php';
  $query = "SELECT * FROM  `sheet_attributes` WHERE id=". $_SESSION['id'];
  $result = mysql_query($query) or die('Query failed: ' . mysql_error());
  $line = mysql_fetch_array($result, MYSQL_ASSOC);
require 'includes/connection_Close.php';



$d1 = $line['intAgility'];
$d2 = $line['intAlertness'];
$d3 = $d4 = 0;

if($d1 > 12){
  $d3 = $d1 % 12;
  $d1 = 12;
}
if($d2 > 12){
  $d4 = $d2 % 12;
  $d2 = 12;
}

$initiativeDice = "D". $d1 ." + D". $d2;
$initiativeDice .= ($d3 != 0) ? " + D". $d3 : '' ;
$initiativeDice .= ($d4 != 0) ? " + D". $d4 : '' ;

$d1 = $line['intVitality'];
$d2 = $line['intWillpower'];
$d3 = $d4 = 0;
if($d1 > 12){
  $d3 = $d1 % 12;
  $d1 = 12;
}
if($d2 > 12){
  $d4 = $d2 % 12;
  $d2 = 12;
}

$lifePoints = $d1 + $d2;
$enduranceDice = "D". $d1 ." + D". $d2;
$enduranceDice .= ($d3 != 0) ? " + D". $d3 : '' ;
$enduranceDice .= ($d4 != 0) ? " + D". $d4 : '' ;



?>
<div class="module attributes clear">
  <div class="row">
    <div class="cell">
      <label for="str">Strength:</label>
      <input type="text" id="str" name="strength" value="<?= $line['intStrength']; ?>" />
    </div>
    <div class="cell">
      <label for="agl">Agility:</label>
      <input type="text" id="agl" name="agility" value="<?= $line['intAgility']; ?>" />
    </div>
    <div class="cell">
      <label for="vit">Vitality:</label>
      <input type="text" id="vit" name="vitality" value="<?= $line['intVitality']; ?>" />
    </div>
  </div>

  <div class="row">
    <div class="cell">
      <label for="alert">Alertness:</label>
      <input type="text" id="alert" name="alertness" value="<?= $line['intAlertness']; ?>" />
    </div>
    <div class="cell">
      <label for="intl">Intelligence:</label>
      <input type="text" id="intl" name="intelligence" value="<?= $line['intIntelligence']; ?>" />
    </div>
    <div class="cell">
      <label for="willpower">Willpower:</label>
      <input type="text" id="willpower" name="willpower" value="<?= $line['intWillpower']; ?>"   />
    </div>
  </div>
</div>
