<?php
require 'includes/connection_Open.php';
  $query = 'SELECT * FROM sheet_'. $comp_asset .' WHERE id = '. $_SESSION['id'];
  $result = mysql_query($query) or die('Query failed: ' . mysql_error());
require 'includes/connection_Close.php';
$amount = mysql_num_rows($result);

?>
<div class="module comp_asset <?= $comp_asset ?> clear">
  <div>
    You have <span id="<?= $comp_asset ?>Cnt"><?= $amount; ?></span> <?= $comp_asset; ?>
    <input type="button" onClick="javascript:COMP_ASSET_FIELD_COUNT('<?= $comp_asset ?>', 1);" id="<?= $comp_asset ?>Up" class="btnUpDown btnUp" tabindex="-1" />
    <input type="button" onClick="javascript:COMP_ASSET_FIELD_COUNT('<?= $comp_asset ?>', 0);" id="<?= $comp_asset ?>Down" class="btnUpDown btnDown<?= ($amount > 1) ? '' : ' hide' ?>" tabindex="-1" />
  </div>
  <div id="<?= $comp_asset ?>Fields" class="">
    <?php
      require './includes/comp_assetFields.php';
    ?>
  </div>
</div>
