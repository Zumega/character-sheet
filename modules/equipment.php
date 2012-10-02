<?php
require 'includes/connection_Open.php';
  $query = 'SELECT '.
          'CONCAT("Weapons:\n\t", `blbWeapons`, '.
          '"\n\nGear:\n\t", `blbGear`, '.
          '"\n\nArmor:\n\t", `blbArmor`, '.
          '"\n\nMoney:\n\t", `blbMoney`'.
          ') AS "blbAllItems", '.
          '`tnytxtActiveTab`, `blbWeapons`, `blbGear`, `blbArmor`, `blbMoney`, `blbNotes`'.
          'FROM  `sheet_equipment` WHERE id='. $_SESSION['id'];
//  echo $query;
//  die;

  $result = mysql_query($query) or die('Query failed: ' . mysql_error());
  $line = mysql_fetch_array($result, MYSQL_ASSOC);
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
    </ul>
  </div>
  <?php
  echo "<pre>";
  print_r($line);
  echo "</pre>";
  ?>

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
