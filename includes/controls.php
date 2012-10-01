<?php
require_once 'connection_Open.php';
$query = "SELECT  intStrength + intAgility + intVitality + intAlertness + intIntelligence + intWillpower usedPoints FROM sheet_attributes WHERE id = ". $_SESSION['id'];
$result = mysql_query($query) or die('Query failed: ' . mysql_error());
$line = mysql_fetch_array($result, MYSQL_ASSOC);
require_once 'connection_Close.php';

?>

<div class="controlsContainer">
  <ul>
    <li>
      <label for="attrPoints">Attribute Points:</label>
      <ul>
        <li>Max: <input type="text" value="<?= $attrPoints ?>" id="attrPoints" name="attrPoints" readonly="readonly" tabindex="-1" />
        <li>Used: <input type="text" value="<?= $line['usedPoints'] ?>" id="usedAttrPoints" name="usedAttrPoints" readonly="readonly" tabindex="-1" />
      </ul>
    </li>
    <li>
      <label for="skillPoints">Skill Points:</label>
      <ul>
        <li>
          Max: <input type="text" value="<?= $skillPoints ?>" id="skillPoints" name="skillPoints" readonly="readonly" tabindex="-1" />
          <input type="hidden" value="<?= $skillPoints ?>" id="hiddenSkillPoints" name="hiddenSkillPoints" readonly="readonly" tabindex="-1" />
        </li>
        <li>Used: <input type="text" value="0" id="usedSkillPoints" name="usedSkillPoints" readonly="readonly" tabindex="-1" /></li>
      </ul>
    </li>
    <li><a href="javascript:SaveArea();">Save</a></li>
    <li><a href="<?= $siteURL ?>logout">Log out</a></li>
  </ul>
</div>
