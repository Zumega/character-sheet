<?php
  require_once './includes/comps_assets.php';
  $arrayToUse = ($comp_asset === 'complications') ? $aryComp : $aryAsset ;
  $counter = 0;
  $usedCompAsset = array();
  $cellTitle = 'txt'. ucfirst(substr($comp_asset, 0, (strlen($comp_asset) - 1)));

  while ($row = mysql_fetch_assoc($result)) {
    $compAssets[] = $row;
    $usedCompAsset[] = $row[$cellTitle];
  }

  if(!empty($compAssets)){
    foreach ($compAssets as $row) {
    ?>
    <div class="section">
      <div>
        <select id="typeName_<?= $counter .'_'. $comp_asset; ?>" name="field_<?= $counter .'_'. $comp_asset; ?>" tabindex="-1">
        <?php
        foreach ($arrayToUse as $text){
          $value = str_replace('\'', '', str_replace(' ', '_', strtolower($text)));
          $selected = ($value === $row[$cellTitle]) ? ' selected="selected"' : '' ;
          $disabled = (in_array(strtolower($value), $usedCompAsset)) ? ' disabled="disabled"' : '' ;
          ?>
          <option value="<?= $value; ?>"<?= $disabled; ?><?= $selected; ?>><?= $text; ?></option>
          <?php
        }?>
        </select>
      </div>
      <?php
        switch($row['tnyMajorMinor']){
          case 2:
            $minorActive = ' checked="checked"';
            $majorActive = '';
            break;
          case 4:
            $minorActive = '';
            $majorActive = ' checked="checked"';
            break;
          default:
            $minorActive = '';
            $majorActive = '';
            break;
        }
      ?>

      <div class="column rightAlign">
        <label for="maj_<?= $counter .'_'. $comp_asset; ?>">Major:</label>
        <input type="radio" id="maj_<?= $counter .'_'. $comp_asset; ?>" name="majMin_<?= $counter .'_'. $comp_asset; ?>"<?= $majorActive; ?> value="4" class="radioBttn" tabindex="-1" />
      </div>
      <div class="column">
        <input type="radio" id="min_<?= $counter .'_'. $comp_asset; ?>" name="majMin_<?= $counter .'_'. $comp_asset; ?>"<?= $minorActive; ?> value="2" class="radioBttn" tabindex="-1" />
        <label for="min_<?= $counter .'_'. $comp_asset; ?>">:Minor</label>
      </div>
      <?php
        $css = ($row['blbNote'] === '(NOTES)') ? ' new' : '' ;
      ?>

      <textarea id="desc_<?= $counter .'_'. $comp_asset; ?>" name="desc_<?= $counter .'_'. $comp_asset; ?>" class="smallTextArea<?= $css;?>"><?= $row['blbNote']; ?></textarea>
    </div>
    <?php
    $counter += 1;
  }
}
unset($compAssets, $usedCompAsset, $cellTitle, $value);
?>