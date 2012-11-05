<?php
require 'includes/connection_Open.php';
$query = 'SELECT * FROM sheet_'. $comp_asset .' WHERE id = '. $_SESSION['id'] .' ORDER BY intOrder';
require './includes/query_process.php';
require 'includes/connection_Close.php';
$amount = $sqlInfo->num_rows();

?>
<div class="module comp_asset <?= $comp_asset ?> clear">
  <div>
    You have <span id="<?= $comp_asset ?>Cnt"><?= $amount; ?></span> <?= $comp_asset; ?>
    <div class="compAssetButtons">
      <input type="button" id="<?= $comp_asset ?>Up" class="btnUpDown btnUp" tabindex="-1" />
      <input type="button" id="<?= $comp_asset ?>Down" class="btnUpDown btnDown<?= ($amount > 0) ? '' : ' hide' ?>" tabindex="-1" />
    </div>
  </div>
  <div id="<?= $comp_asset ?>Fields" class="">
    <?php
      require './includes/comp_assetFields.php';
    ?>
  </div>
</div>
