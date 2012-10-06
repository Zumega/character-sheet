<?php
  require_once './comps_assets.php';
  $compNum = $_POST['data'];
?>

  <div class="section">
    <div>
      <select id="typeName_<?= $compNum; ?>_complications" name="field_<?= $compNum; ?>_complications" tabindex="-1">
      <?php
      foreach ($aryComp as $text){
        $value = str_replace('\'', '', str_replace(' ', '_', strtolower($text)));
        $selected = ($value === $row['txtComplicaiton']) ? ' selected="selected"' : '' ;
        ?>
        <option value="<?= $value ?>"<?= $selected; ?>><?= $text; ?></option>
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
      <label for="maj_<?= $compNum; ?>_complications">Major:</label>
      <input type="radio" id="maj_<?= $compNum; ?>_complications" name="majMin_<?= $compNum; ?>_complications"<?= $majorActive; ?> value="4" class="radioBttn" tabindex="-1" />
    </div>
    <div class="column">
      <input type="radio" id="min_<?= $compNum; ?>_complications" name="majMin_<?= $compNum; ?>_complications"<?= $minorActive; ?> value="2" class="radioBttn" tabindex="-1" />
      <label for="min_<?= $compNum; ?>_complications">:Minor</label>
    </div>
    <textarea id="desc_<?= $compNum; ?>_complications" name="desc_<?= $compNum; ?>_complications" class="smallTextArea new">(NOTES)</textarea>
  </div>