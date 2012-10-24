<?php
require 'includes/connection_Open.php';
$query = "SELECT * FROM sheet_roll_traits WHERE id = ". $_SESSION['id'];
require './includes/query_process.php';
$line = $result->fetch_assoc();
require_once 'includes/connection_Close.php';

?>

<div class="module derivedTraits clear">
  <div class="row">
    <div class="cell">
      <label for="lifePoints">Life Points:</label>
      <input type="text" id="lifePoints" name="traitField" readonly="readonly" class="noEdit" tabindex="-1" value="<?= $lifePoints; ?>" />
      <input type="hidden" id="maxLifePoints" value="<?= $maxLife; ?>" tabindex="-1" />
    </div>
    <div class="cell">
      <label for="int">Initiative Dice:</label>
      <input type="text" id="int" name="traitField" readonly="readonly" class="noEdit" tabindex="-1" value="<?= $initiativeDice ?>" />
    </div>
    <div class="cell">
      <label for="curntInt">Rolled Initiative:</label>
      <input type="text" id="curntInt" name="traitField" value="<?= $line['intInitiative'] ?>" />
    </div>
  </div>

  <div class="row">
    <div class="cell">
      &nbsp;
    </div>
    <div class="cell">
      <label for="endur">Endurance Dice:</label>
      <input type="text" id="endur" name="traitField" readonly="readonly" class="noEdit" tabindex="-1" value="<?= $enduranceDice ?>" />
    </div>
    <div class="cell">
      <label for="curntEndur">Rolled Endurance:</label>
      <input type="text" id="curntEndur" name="traitField" value="<?= $line['intEndurance'] ?>" />
    </div>
  </div>

  <div class="row">
    <div class="cell">
      &nbsp;
    </div>
    <div class="cell">
      <label for="resist">Resistance Dice:</label>
      <input type="text" id="resist" name="traitField" readonly="readonly" class="noEdit" tabindex="-1" value="D10" />
    </div>
    <div class="cell">
      <label for="curntResist">Rolled Resistance:</label>
      <input type="text" id="curntResist" name="traitField" value="<?= $line['intResistance'] ?>" />
    </div>
  </div>
</div>
