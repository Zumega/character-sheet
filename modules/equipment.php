<?php
require 'includes/connection_Open.php';
  $query = 'SELECT '.
          'CONCAT("'. str_replace(" ", "", $equipTabs[1]) .':\n", `blb'. str_replace(" ", "", $equipTabs[1]) .'`, '.
          '"\n\n\n'. str_replace(" ", "", $equipTabs[2]) .':\n", `blb'. str_replace(" ", "", $equipTabs[2]) .'`, '.
          '"\n\n\n'. str_replace(" ", "", $equipTabs[3]) .':\n", `blb'. str_replace(" ", "", $equipTabs[3]) .'`, '.
          '"\n\n\n'. str_replace(" ", "", $equipTabs[4]) .':\n", `blb'. str_replace(" ", "", $equipTabs[4]) .'`'.
          ') AS "blbAllItems", '.
          '`tnytxtActiveTab`, `blbWeapons`, `blbGear`, `blbArmor`, `blbMoney`, `blbNotes`'.
          'FROM  `sheet_equipment` WHERE id='. $_SESSION['id'];

require './includes/query_process.php';
$line = $result->fetch_assoc();
require 'includes/connection_Close.php';
?>
<div class="module equipment clear">
  <input type="hidden" name="area" value="equipment" />
  <input type="hidden" id="activeTab" name="activeTab" value="<?= $line['tnytxtActiveTab']; ?>" />
  <div class="equipTabs">
    <ul>
    <?php
      foreach($equipTabs as $value){
        $forValue = str_replace(' ', '', strtolower($value));
        $classValue = ($forValue === $line['tnytxtActiveTab']) ? ' active' : '' ;
      ?>
      <li class="equipTab<?= $classValue; ?>">
        <label for="<?= $forValue; ?>" class=""><?= $value; ?></label>
      </li>
    <?php
      }
    ?>
      <li class="expandContract"><div class="arrow"></div></li>
    </ul>
  </div>
  <div class="equipInput">
  <?php
    foreach($equipTabs as $value){
      $idName = str_replace(' ', '', strtolower($value));
      $classValue = ($idName === $line['tnytxtActiveTab']) ? ' active' : '' ;
      $readonly = ($idName === 'allitems') ? ' readonly="readonly"' : '' ;
      $fieldValue = $line["blb".str_replace(" ", "", $value)];
    ?>
    <textarea<?= $readonly; ?> id="<?= $idName; ?>" name="<?= $idName; ?>" class="<?= $classValue ?>" tabindex="-1"><?= $fieldValue; ?></textarea>
    <?php
    }
  ?>
  </div>
</div>
