<?php
// don't forget to update skills_input.php
  require_once 'skill_types.php';
  $skillNum = $_POST['data'];
  $fieldCntr = 0;
?>

<div class="column skillsInput">
  <div class="skilColum_1">
    <select name="Skill_<?= $skillNum; ?>" id="Skill_<?= $skillNum; ?>" tabindex="-1">
    <?php

    foreach($arySkills as $k => $value){
      $selected = ($k === 0) ? 'selected="selected"' : '' ;
      ?>
      <option value="<?= strtolower($k) ?>"<?= $selected ?>><?= $k; ?></option>
    <?php }
    unset($k, $value);
    ?>
    </select>
    <span><input type="text" value="0" id="Skill_<?= $skillNum ?>_<?= $fieldCntr; ?>" name="Field_<?= $skillNum ?>_<?= $fieldCntr++; ?>" class="smallInput" /></span>
  </div>
  <div class="skilColum_2">
  <?php for($a=1; $a<=3; $a++){ ?>
    <select id="Skill_<?= $skillNum ?>_<?= $fieldCntr; ?>" name="Field_<?= $skillNum ?>_<?= $fieldCntr++; ?>" tabindex="-1">
      <option value="0">==========</option>
    </select>
  <?php }
  unset($value, $a);
  ?>
  </div>
  <div class="skilColum_3">
  <?php
    for ($a=1; $a<=3; $a++){
      ?>
      <input type="text" value="0" id="Skill_<?= $skillNum ?>_<?= $fieldCntr ?>" name="Field_<?= $skillNum ?>_<?= $fieldCntr++ ?>" class="smallInput" />
    <?php }
    unset($a); ?>
  </div>
</div>
