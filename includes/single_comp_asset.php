<?php
  require_once './comps_assets.php';
  $number = $_POST['count'];
  $type = $_POST['type'];
  $dataArray = ($type === 'complications') ? $aryComp : $aryAsset ;
  $used = $_POST['used'];
?>

  <div class="section">
    <div>
      <select id="typeName_<?= $number; ?>_<?= $type; ?>" name="field_<?= $number; ?>_<?= $type; ?>" tabindex="-1">
      <?php
      foreach ($dataArray as $text){
        $value = str_replace('\'', '', str_replace(' ', '_', strtolower($text)));
        $selected = ($value === $row['txtComplicaiton']) ? ' selected="selected"' : '' ;
        $disabled = (in_array($value, $used)) ? ' disabled="disabled"' : '' ;
        ?>
        <option value="<?= $value ?>"<?= $selected; ?><?= $disabled; ?>><?= $text; ?></option>
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
      <label for="maj_<?= $number; ?>_<?= $type; ?>">Major:</label>
      <input type="radio" id="maj_<?= $number; ?>_<?= $type; ?>" name="majMin_<?= $number; ?>_<?= $type; ?>"<?= $majorActive; ?> value="4" class="radioBttn" tabindex="-1" />
    </div>
    <div class="column">
      <input type="radio" id="min_<?= $number; ?>_<?= $type; ?>" name="majMin_<?= $number; ?>_<?= $type; ?>"<?= $minorActive; ?> value="2" class="radioBttn" tabindex="-1" />
      <label for="min_<?= $number; ?>_<?= $type; ?>">:Minor</label>
    </div>
    <textarea id="desc_<?= $number; ?>_<?= $type; ?>" name="desc_<?= $number; ?>_<?= $type; ?>" class="smallTextArea new">(NOTES)</textarea>
  </div>