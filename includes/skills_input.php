<?php
  require_once 'skill_types.php';
  $i = $fieldCntr = 0;
  $arySubSkill = $selected = '';

while ($row = mysql_fetch_assoc($result)) {
  $fieldCntr = 0;
?>
<div class="column skillsInput">
  <div class="skilColum_1">
    <select name="Skills_<?= $i; ?>" id="Skills_<?= $i; ?>" tabindex="-1">
    <?php

    foreach($arySkills as $k => $value){
      if($row['varSkill'] === strtolower($k)) {
        $selected = 'selected="selected"';
        $arySubSkill = $value;
      } else {
        $selected = '';
      }
      ?>
      <option value="<?= strtolower($k) ?>"<?= $selected ?>><?= $k; ?></option>
    <?php }
    unset($k, $value);
    ?>
    </select>
    <span><input type="text" value="<?= $row['intSkillDice']; ?>" id="Skill_<?= $i ?>_<?= $fieldCntr; ?>" name="Field_<?= $i ?>_<?= $fieldCntr++; ?>" class="smallInput" /></span>
  </div>
  <div class="skilColum_2">
  <?php for($a=1; $a<=3; $a++){ ?>
    <select id="Skill_<?= $i ?>_<?= $fieldCntr; ?>" name="Field_<?= $i ?>_<?= $fieldCntr++; ?>" tabindex="-1">
      <option value="0">==========</option>
      <?php
      foreach($arySubSkill as $value){
        $key = 'varSubSkill_'.($a-1);
        if ($row[$key] === strtolower($value)) {
          $selected = ' selected="selected"';
        } else {
          $selected = '';
        }
      ?>
      <option value="<?= strtolower($value) ?>"<?= $selected ?>><?= ucwords($value) ?></option>
  <?php } ?>
    </select>
  <?php }
  unset($value, $a);
  ?>
  </div>
  <div class="skilColum_3">
  <?php
    for ($a=1; $a<=3; $a++){
      $key = 'intSubSkillDice_'. ($a-1);?>
      <input type="text" value="<?= $row[$key] ?>" id="Skill_<?= $i ?>_<?= $fieldCntr ?>" name="Field_<?= $i ?>_<?= $fieldCntr++ ?>" class="smallInput" />
    <?php }
    unset($a); ?>
  </div>
</div>

<?php
$i += 1;
} ?>
