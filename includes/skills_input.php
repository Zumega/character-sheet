<?php
// don't forget to update single_skill.php
  require_once 'skill_types.php';
  $i = $fieldCntr = 0;
  $arySubSkill = $selected = '';
  $skills = array();
  $usedSkills = array();

while ($row = mysql_fetch_assoc($result)) {
  $skills[] = $row;
  $usedSkills[] = $row['varSkill'];
}

if(!empty($skills)){
  foreach ($skills as $row) {
    $fieldCntr = 0;
    $rowValues = (array) $row;
//    echo '<pre>';
//    print_r($rowValues);
//    echo '</pre>';
  ?>
  <div class="column skillsInput">
    <div class="skilColum_1">
      <select name="skill_<?= $i; ?>" id="skill_<?= $i; ?>" tabindex="-1">
      <?php

      foreach($arySkills as $currentValue => $subSkills){
        if($row['varSkill'] === strtolower($currentValue)) {
          $selected = 'selected="selected"';
          $arySubSkill = $subSkills;
        } else {
          $selected = '';
        }
        $disabled = (in_array(strtolower($currentValue), $usedSkills)) ? ' disabled="disabled"' : '' ;
        ?>
        <option value="<?= strtolower($currentValue) ?>"<?= $selected; ?><?= $disabled; ?>><?= $currentValue; ?></option>
      <?php }
      unset($currentValue, $value);
      ?>
      </select>
      <span><input type="text" value="<?= $row['intSkillDice']; ?>" id="skill_<?= $i ?>_<?= $fieldCntr; ?>" name="field_<?= $i ?>_<?= $fieldCntr++; ?>" class="smallInput" /></span>
    </div>
    <div class="skilColum_2">
    <?php for($a=0; $a<3; $a+=1){ ?>
      <select id="skill_<?= $i ?>_<?= $fieldCntr; ?>" name="field_<?= $i ?>_<?= $fieldCntr++; ?>" tabindex="-1">
        <option value="0">==========</option>
        <?php
        if(!empty($arySubSkill)){
          foreach($arySubSkill as $value){
            $key = 'varSubSkill_'.($a);
            $selected = ($rowValues[$key] === strtolower($value)) ? ' selected="selected"' : '' ;
            $disabled = (in_array(strtolower($value), $rowValues)) ? ' disabled="disabled"' : '' ;
        ?>
        <option value="<?= strtolower($value) ?>"<?= $selected; ?><?= $disabled; ?>><?= ucwords($value); ?></option>
    <?php }
        }?>
      </select>
    <?php }
    unset($value, $a);
    ?>
    </div>
    <div class="skilColum_3">
    <?php
      for($a=0; $a<3; $a+=1){
        $key = 'intSubSkillDice_'. ($a);?>
        <input type="text" value="<?= $row[$key] ?>" id="skill_<?= $i ?>_<?= $fieldCntr ?>" name="field_<?= $i ?>_<?= $fieldCntr++ ?>" class="smallInput" />
      <?php }
      unset($a); ?>
    </div>
  </div>

  <?php
  $i += 1;
  }
}
?>
