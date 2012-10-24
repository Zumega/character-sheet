<?php
require 'includes/connection_Open.php';
$query = "SELECT * FROM  `sheet_dice` WHERE id=". $_SESSION['id'];
require './includes/query_process.php';
$line = $result->fetch_assoc();
require 'includes/connection_Close.php';

$diceDisplay = "";
$aryMath = array();
$inputCount = 0;

if(!empty($line['intDice_0'])) {
  foreach($line as $k=>$roll) {
    if ($k!="id" && $roll!="") {
      $aryMath[] = preg_replace('/(D[0-9]{1,2} = )/', "", $roll);
      $diceDisplay .= '<input data-roll="'. $aryMath[count($aryMath)-1] .'" readonly="readonly" type="text" id="'. str_replace("intD", "d", $k) .'" name="'. str_replace("intD", "d", $k) .'" value="'. $roll .'" tabindex="-1" />'."\n";
    }
  }
}
for($i=$inputCount; $i<14; $i+=1){
  $diceDisplay .= '<input data-roll="" readonly="readonly" type="text" id="dice_'. $i .'" name="dice_'. $i .'" value="" class="hide" tabindex="-1" />'."\n";
}
?>
<div class="module dice clear">
  <input type="hidden" name="area" value="dice" />
  <ul class="diceUI clear">
    <li><span data-dice="0">Clear the dice</span></li>
    <?php
      for ($i=2; $i<=$highDice; $i+=2){
        echo '<li><span data-dice="'. $i .'">D'. $i .'</span></li>';
      }
    ?>
  </ul>
  <ul class="diceSum">
    <li class="diceSumLabel">Sum of rolls:</li>
    <li>two rolls: <span id="diceNum_2" class="diceSumArea"><?= $aryMath[0] + $aryMath[1]; ?></span></li>
    <li>three rolls: <span id="diceNum_3" class="diceSumArea"><?= $aryMath[0] + $aryMath[1] + $aryMath[2]; ?></span></li>
    <li>four rolls: <span id="diceNum_4" class="diceSumArea"><?= $aryMath[0] + $aryMath[1] + $aryMath[2] + $aryMath[3]; ?></span></li>
    <li>five rolls: <span id="diceNum_5" class="diceSumArea"><?= $aryMath[0] + $aryMath[1] + $aryMath[2] + $aryMath[3] + $aryMath[4]; ?></span></li>
  </ul>
  <div id="diceDisplay"><?= $diceDisplay; ?></div>
</div>
