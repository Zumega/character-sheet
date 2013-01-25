<?php
require '../../includes/connection_Open.php';
$query = 'SELECT
          tnyintType,
          txtType,
          CONCAT(varStrengthDice ,  ",",  varInitiativeDice ,  ",",  varHitPoint_EnduranceDice ,  ",",  varResistanceDice) AS stats
          FROM  sheet_npc_type';
require '../../includes/query_process.php';
require '../../includes/connection_Close.php';

?>

<div class="createNPC clear" id="npc_1" data-index="1">
  <div class="deleteNPC">DELETE</div>
  <div>
    Use predefined stats?
    <select class="chooseBaseStats" name="baseStats">
      <option value="0" selected="selected" data-npcStats="0,0|0,0|0,0">No Thanks</option>
      <?php
        while($row = $result->fetch_assoc()) {
          ?>
      <option value="<?= $row['tnyintType']; ?>" data-npcStats="<?= $row['stats']; ?>"><?= $row['txtType']; ?></option>
          <?php
        }
      ?>
    </select>
    <input type="checkbox" name="canEdit_1" id="canEdit_1" /><label for="canEdit_1">Edit</label>
  </div>

  <h2>Roll Stats</h2>
  <div class="newNPC">
    <div class="row npcStats">
      <div class="cell">Stat Name</div>
      <div class="cell">Strength</div>
      <div class="cell">Initiative</div>
      <div class="cell">Endurance</div>
      <div class="cell">Resistance</div>
    </div>
    <div class="row npcDice">
      <div class="cell">Dice To Roll</div>
      <div class="cell"><input type="text" value="D0" /></div>
      <div class="cell"><input type="text" value="D0 + D0" /></div>
      <div class="cell"><input type="text" value="D0 + D0" /></div>
      <div class="cell"><input type="text" value="D0" /></div>
    </div>
    <div class="row rollDice">
      <div class="cell"><input type="button" disabled="disabled" value="Roll all dice" /></div>
      <div class="cell"><input type="button" disabled="disabled" data-dice="0" data-id="Strength" value="Roll a D0" /></div>
      <div class="cell"><input type="button" disabled="disabled" data-dice="0" data-id="Initiative" value="Roll a D0" /></div>
      <div class="cell"><input type="button" disabled="disabled" data-dice="0" data-id="Endurance" value="Roll a D0" /></div>
      <div class="cell"><input type="button" disabled="disabled" data-dice="0" data-id="Resistance" value="Roll a D0" /></div>
    </div>
    <div class="row npcValues">
      <div class="cell npcNameInput"><input type="text" value="" class="active" /> -  HP: <span class="npcHP">0</span></div>
      <div class="cell npcStrength">0</div>
      <div class="cell npcInitiative">0</div>
      <div class="cell npcEndurance">0</div>
      <div class="cell npcResistance">0</div>
    </div>
  </div>
</div>
<input class="editNPCs" id="moreNPCs" type="button" value="More NPCs" />
<input class="editNPCs" id="saveNPCs" type="button" value="Save" />