<?php
require 'includes/connection_Open.php';
  $query = "SELECT * FROM  `sheet_character_info` WHERE id=". $_SESSION['id'];
  $result = mysql_query($query) or die('Query failed: ' . mysql_error());
  $line = mysql_fetch_array($result, MYSQL_ASSOC);
require 'includes/connection_Close.php';
?>
<div class="module characterInfo clear">
  <div class="row">
    <div class="cell">
      <label for="charName">Character Name:</label>
      <input type="text" id="charName" name="charName" value="<?= $line['txtCharName']; ?>" />
    </div>
    <div class="cell">
      <label for="nickName">Nick Name:</label>
      <input type="text" id="nickName" name="nickName" value="<?= $line['txtNickName']; ?>" />
    </div>
    <div class="cell">
      <label for="playerName">Player Name:</label>
      <input type="text" id="playerName" name="playerName" value="<?= $line['txtPlayerName']; ?>" />
    </div>
  </div>

  <div class="row">
    <div class="cell">
      <label for="homeWorld">Home World:</label>
      <input type="text" id="homeWorld" name="homeWorld" value="<?= $line['txtHomeWorld']; ?>" />
    </div>
    <div class="cell">
      <label for="concept">Concept:</label>
      <input type="text" id="concept" name="concept" value="<?= $line['txtConcept']; ?>" />
    </div>
    <div class="cell">
      <label for="plot">Plot Points:</label>
      <input type="text" id="plot" name="plot" value="<?= $line['intPlotPoints']; ?>" />
    </div>
  </div>

  <?php
    $woundPointsDownCss = ($line['intWoundPoints'] == 0) ? ' hide' : '' ;
    $stunPointsDownCss = ($line['intStunPoints'] == 0) ? ' hide' : '' ;
  ?>

  <div class="row">
    <div class="cell">
      <label for="woundPoints">Wound:</label>
      <input type="text" id="woundPoints" name="woundPoints" class="smallInput noFloat" value="<?= $line['intWoundPoints']; ?>" />
      <input type="button" id="woundPointsUp" class="btnUpDown btnUp" tabindex="-1" />
      <input type="button" id="woundPointsDown" class="btnUpDown btnDown<?= $woundPointsDownCss ?>" tabindex="-1" />
    </div>
    <div class="cell">
      <label for="stunPoints">Stun:</label>
      <input type="text" id="stunPoints" name="stunPoints" class="smallInput noFloat" value="<?= $line['intStunPoints']; ?>" />
      <input type="button" id="stunPointsUp" class="btnUpDown btnUp" tabindex="-1" />
      <input type="button" id="stunPointsDown" class="btnUpDown btnDown<?= $stunPointsDownCss ?>" tabindex="-1" />
    </div>
  </div>

  <div class="row">
    <div class="barContainer clear">
      <div id="woundPointBar" class="wpspBars wpBar"></div>
      <div id="woundCounterBar" class="counterBar wcBar"></div>
    </div>
  </div>
  <div class="row">
    <div class="barContainer clear">
      <div id="stunPointBar" class="wpspBars spBar"></div>
      <div id="stunCounterBar" class="counterBar scBar"></div>
    </div>
  </div>
</div>

