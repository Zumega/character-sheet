<?php
session_start();
  $maxCount = $_REQUEST[count];
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


require_once 'connection_Open.php';
$query = "SELECT `intSkill`, `intSkillDice`, `intSubSkill_0`, `intSubSkillDice_0`, `intSubSkill_1`, `intSubSkillDice_1`, `intSubSkill_2`, `intSubSkillDice_2` FROM `sheet_user_skills` WHERE `id` = ".$_SESSION['id'] ." ORDER BY `intOrder`";
$result = mysql_query($query) or die('Query failed: ' . mysql_error()); 

$i = $fieldCntr = 0;
while ($row = mysql_fetch_assoc($result)){
//echo "<pre>";
//print_r($row);
//echo "<pre>";
?>
  <div class="column skillsInput">
    <div class="skilColum_1">
      <select name="Skills_<?= $i; ?>" id="Skills_<?= $i; ?>" onChange="GetSkillFields();" tabindex="-1">
      <?php
      foreach($arySkills as $value){
        echo $row["intSkill"] ." || ". $value."\n";
        if($row["intSkill"] == $value) {
          $sel = ' selected="selected"';
          $arySubSkill = $arySubSkills[$row["intSkill"]];
        } else {
          $sel = "";
        }
        ?>
          <option value="<?= $value ?>"<?= $sel ?>><?= $value; ?></option>
      <?php }
      unset($value);?>
      </select>
      <span><input type="text" value="<?= $row["intSkillDice"]; ?>" id="Skill_<?= $i ."_". $fieldCntr; ?>" name="Field_<?= $i ."_". $fieldCntr++; ?>" class="smallInput" onBlur="GetSkillFields()" /></span>
    </div>
    <div class="skilColum_2">
    <?php for($a=1; $a<=3; $a++){ ?>
      

      <select id="Skill_<?= $i ."_". $fieldCntr; ?>" name="Field_<?= $i ."_". $fieldCntr++; ?>" onChange="GetSkillFields()" tabindex="-1">
        <option value="0">==========</option>
        <?php

        foreach($arySubSkill as $value){
          $key = "intSubSkill_".($a-1);
          if ($row[$key] == $value) {
            $sel = ' selected="selected"';
          } else {
            $sel = "";
          }
        ?>
        <option value="<?= $value ?>"<?= $sel ?>><?= ucwords($value) ?></option>
    <?php } ?>
      </select>
    <?php }
    unset($value, $a);
    ?>
    </div>
    <div class="skilColum_3">
    <?php
      for ($a=1; $a<=3; $a++){
        $key = "intSubSkillDice_".($a-1);?>
        <input type="text" value="<?= $row[$key] ?>" id="Skill_<?= $i ."_". $fieldCntr ?>" name="Field_<?= $i ."_". $fieldCntr++ ?>" class="smallInput" onBlur="GetSkillFields()" />
      <?php }
      unset($a); ?>
    </div>
  </div>
<?php
};
?>
<div style="clear:both;">
  <?php
    echo ($maxCount >= 1)? "* Skilled use only" : "" ;
  ?>
</div>
