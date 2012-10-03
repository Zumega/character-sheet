<?php
  $aryComp = array('========', 'Allergy', 'Amorous', 'Amputee', 'Bleeder', 'Blind', 'Branded', 'Chip on the Shoulder', 'Credo', 'Combat Paralysis', 'Coward', 'Crude', 'Dead Broke', 'Deadly Enemy', 'Deaf', 'Dull Sense', 'Easy mark', 'Ego Signature', 'Filcher', 'Forked Tongue', 'Greedy', 'Hero Worship', 'Hooked', 'Leaky Brainpan', 'Lightweight', 'Little Person', 'Loyal', 'Memorable', 'Mute', 'Non-Fightin\' Type', 'Overconfident', 'Paralyzed', 'Phobia', 'Portly', 'Prejudice', 'Sadistic', 'Scrawny', 'Slow Learner', 'Soft', 'Stingy', 'Straight Shooter', 'Superstitious', 'Things Don\'t Go Smooth', 'Traumatic Flashes', 'Twitchy', 'Ugly as Sin', 'Weak Stomach');
  $aryAsset = array('========', 'Allure', 'Athlete', 'Born Behind the Wheel', 'Cortex Specter', 'Fightin\' Type', 'Friends in High Places', 'Friends in low Places', 'Good Name', 'Healthy as a Horse', 'Heavy Tolerance', 'Highly Educated', 'Intimidatin\' Manner', 'Leadership', 'Lightnin\' Reflexes', 'Math Whiz', 'Mean Left Hook', 'Mechanical Empathy', 'Military Rank', 'Moneyed Individual', 'Natural Linguist', 'Nature Lover', 'Nose for Trouble', 'Reader', 'Registered Companion', 'Religiosity', 'Sharp Sense', 'Steady Calm', 'Sweet and Cheerful', 'Talented', 'Things Go Smooth', 'Total Recall', 'Tough as Nails', 'Trustworthy Gut', 'Two-Fisted', 'Walking Timepiece', 'Wears a Badge');
  sort($aryComp);
  sort($aryAsset);
  $arrayToUse = ($comp_asset === 'complications') ? $aryComp : $aryAsset ;
  $counter = 0;


  while ($row = mysql_fetch_assoc($result)) {
    ?>
    <div class="section">
      <div>
        <select id="TypeName_<?= $counter .'_'. $comp_asset; ?>" name="Field_<?= $counter .'_'. $comp_asset; ?>" tabindex="-1">
        <?php
        foreach ($arrayToUse as $text){
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
          case 1:
            $minorActive = ' checked="checked"';
            $majorActive = '';
            break;
          case 2:
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
        <label for="Max_<?= $counter .'_'. $comp_asset; ?>">Major:</label>
        <input type="radio" id="Max_<?= $counter .'_'. $comp_asset; ?>" name="MaxMin_<?= $counter .'_'. $comp_asset; ?>"<?= $majorActive; ?> value="4" class="radioBttn" tabindex="-1" />
      </div>
      <div class="column">
        <input type="radio" id="Min_<?= $counter .'_'. $comp_asset; ?>" name="MaxMin_<?= $counter .'_'. $comp_asset; ?>"<?= $minorActive; ?> value="2" class="radioBttn" tabindex="-1" />
        <label for="Min_<?= $counter .'_'. $comp_asset; ?>">:Minor</label>
      </div>
      <?php
        if(empty($row['blbNote'])) {
          $text = '(NOTES)';
          $css = ' new';
        }else{
          $text = $row['blbNote'];
          $css = '';
        }
      ?>

      <textarea id="Des_<?= $counter .'_'. $comp_asset; ?>" name="Desc_<?= $counter .'_'. $comp_asset; ?>" class="smallTextArea<?= $css;?>"><?= $text;?></textarea>
    </div>
    <?php
    $counter += 1;
  }
?>