<?php
session_start();
require 'connection_Open.php';
  $query = "SELECT  `intSkill`, `intSkillDice`, `intSubSkill_0`, `intSubSkillDice_0`, `intSubSkill_1`, `intSubSkillDice_1`, `intSubSkill_2`, `intSubSkillDice_2` FROM `sheet_user_skills` WHERE `id` = ". $_SESSION['id'] ." ORDER BY `intOrder`";
  $result = mysql_query($query) or die('Query failed: ' . mysql_error());

  require_once 'skill_types.php';

  $arySkills = array(
    "=================",
    "Animal Handaling",
    "Medical Expertise",
    "Artistry",
    "Perception",
    "Covert",
    "Performance",
    "Craft",
    "Pilot*",
    "Discipline",
    "Planetary Vehicles",
    "Guns",
    "Ranged Weapons",
    "Heavy Weapons",
    "Scientific Expertise",
    "Influence",
    "Survival",
    "Knowledge",
    "Technical Eng.*",
    "Mechanical Eng.*",
    "Unarmed Combat",
    "Linguist*",
    "Athletics",
    "Melee Weapons"
  );
  sort($arySkills);

  $i = 0;
  while ($line = mysql_fetch_row($result)) {
    $fieldCntr = 0;
    ?>
    <div class="column skillsInput">
      <div class="skilColum_1">
        <select name="Skills_<?= $i; ?>" id="Skills_<?= $i; ?>" onChange="GetSkillFields()" tabindex="-1">
    <?php
    foreach($arySkills as $k=>$value){
      $arySubSkill = $value;
      if($line['intSkill'] == $k) {
        $sel = 'selected="selected"';
      } else {
        $sel = "";
      }?>
            <option value="<?= $value ."\"". $sel; ?>"><?= $value; ?></option>
    <?php }
    unset($k, $value);
    list($fKey, $fValue) = explode(":", $aryKeyValue[1]);
    ?>
        </select>
        <span><input type="text" value="<?= $fValue; ?>" id="Skill_<?= $i; ?>_<?= $fieldCntr; ?>" name="Field_<?= $i; ?>_<?= $fieldCntr++; ?>" class="smallInput" onBlur="GetSkillFields()" /></span>
      </div>
      <div class="skilColum_2">
    <?php for($a=1; $a<=3; $a++){ ?>
          <select type="text" id="Skill_<?= $i; ?>_<?= $fieldCntr; ?>" name=\"Field_<?= $i; ?>_<?= $fieldCntr++; ?>" onChange="GetSkillFields()" tabindex="-1">
            <option value="0">==========</option>
    <?php
      foreach($arySubSkill as $key=>$value){
        list($fKey, $fValue) = explode(":", $aryKeyValue[$a +1]);
        if ($fValue == $value) {
          $sel = 'selected="selected"';
        } else {
          $sel = "";
        }
        echo "      <option value=\"". $value ."\"". $sel .">". ucwords($value) ."</option>\n";
      }
      unset($value, $fValue, $fKey);
      ?>
          </select>
    <?php } ?>
      </div>
       <div class="skilColum_3">
    <?php
    for ($a=1; $a<=3; $a++){
      list($fKey, $fValue) = explode(":", $aryKeyValue[$a +4]);?>
          <input type="text" value="<?= $fValue; ?>" id="Skill_<?= $i; ?>_<?= $fieldCntr; ?>" name="Field_<?= $i; ?>_<?= $fieldCntr++; ?>" class="smallInput" onBlur="GetSkillFields()" />
    <?php } ?>
      </div>
    </div>
  <?php }
require 'connection_Close.php';
?>
<div>
  <?php
    echo ($maxCount >= 1)? "* Skilled use only" : "" ;
  ?>
</div>

