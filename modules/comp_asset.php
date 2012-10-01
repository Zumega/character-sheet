<div class="module comp_asset <?= $comp_asset ?> clear">
  <div>
    You have <span id="<?= $comp_asset ?>Cnt"><?= $startCompAsset ?></span> <?= ($comp_asset == "comp") ? "complications" : "assets" ; ?>
    <input type="button" onClick="javascript:COMP_ASSET_FIELD_COUNT('<?= $comp_asset ?>', 1);" id="<?= $comp_asset ?>Up" class="btnUpDown btnUp" tabindex="-1" />
    <input type="button" onClick="javascript:COMP_ASSET_FIELD_COUNT('<?= $comp_asset ?>', 0);" id="<?= $comp_asset ?>Down" class="btnUpDown btnDown hide" tabindex="-1" />
  </div>
  <div id="<?= $comp_asset ?>Fields"></div>
  <script type="text/javascript">
//    CALL_FIELDS("<?= $comp_asset ?>Fields", <?= $startCompAsset ?>);
  </script>
</div>
