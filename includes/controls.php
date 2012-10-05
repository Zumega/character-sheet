<?php
require_once 'connection_Open.php';
$queryAttr = "SELECT  intStrength + intAgility + intVitality + intAlertness + intIntelligence + intWillpower usedPoints FROM sheet_attributes WHERE id = ". $_SESSION['id'];
$resultAttr = mysql_query($queryAttr) or die('Query failed: ' . mysql_error());
$lineAttr = mysql_fetch_array($resultAttr, MYSQL_ASSOC);
$usedAttrPoints = $lineAttr['usedPoints'];

$querySkill = "SELECT SUM(intSubSkillDice_2 +  intSubSkillDice_1 +  intSubSkillDice_0 +  intSkillDice) AS usedPoints FROM  sheet_user_skills WHERE  id = ". $_SESSION['id'];
$resultSkill = mysql_query($querySkill) or die('Query failed: ' . mysql_error());
$lineSkill = mysql_fetch_array($resultSkill, MYSQL_ASSOC);
$usedSkillPoints = $lineSkill['usedPoints'];
require_once 'connection_Close.php';

?>

<div class="controlsContainer">
  <ul>
    <li>
      <label for="attrPoints">Attribute Points:</label>
      <ul>
        <li>Max: <input type="text" value="<?= $attrPoints ?>" id="attrPoints" name="attrPoints" readonly="readonly" class="noEdit" tabindex="-1" />
        <li>Used: <input type="text" value="<?= $usedAttrPoints ?>" id="usedAttrPoints" name="usedAttrPoints" readonly="readonly" class="noEdit" tabindex="-1" />
      </ul>
    </li>
    <li>
      <label for="skillPoints">Skill Points:</label>
      <ul>
        <li>Max: <input type="text" value="<?= $skillPoints ?>" id="skillPoints" name="skillPoints" readonly="readonly" class="noEdit" tabindex="-1" /></li>
        <li>Used: <input type="text" value="<?= $usedSkillPoints; ?>" id="usedSkillPoints" name="usedSkillPoints" readonly="readonly" class="noEdit" tabindex="-1" /></li>
      </ul>
    </li>
<!--    <li><a href="javascript:SaveArea();">Save</a></li>
    <li><a href="<?= $siteURL ?>logout">Log out</a></li>-->
  </ul>
</div>
