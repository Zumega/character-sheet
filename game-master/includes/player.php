<?php
$playerID = $_REQUEST['playerId'];
require_once './variables.php';

require '../../includes/connection_Open.php';
$query = 'SELECT
          "section" AS characterInfo, info.id, info.txtCharName, info.txtNickName, info.txtPlayerName, info.txtHomeWorld, info.txtConcept, info.intPlotPoints, info.intWoundPoints, info.intStunPoints,
          "section" AS attributes, attr.intStrength, attr.intAgility, attr.intVitality, attr.intAlertness, attr.intIntelligence, attr.intWillpower,
          "section" AS derivedTraits, traits.intInitiative, traits.intEndurance, traits.intResistance,
          "section" AS equipment, equip.blbWeapons, equip.blbGear, equip.blbArmor, equip.blbMoney, equip.blbNotes,
          "section" AS dice, intDice_0, intDice_1, intDice_2, intDice_3, intDice_4, intDice_5, intDice_6, intDice_7, intDice_8, intDice_9, intDice_10, intDice_11, intDice_12, intDice_13
          FROM sheet_character_info AS info
          INNER JOIN sheet_attributes AS attr
          ON info.id = attr.id
          INNER JOIN sheet_roll_traits AS traits
          ON info.id = traits.id
          INNER JOIN sheet_equipment AS equip
          ON info.id = equip.id
          INNER JOIN sheet_dice as dice
          ON info.id = dice.id
          WHERE info.id = '. $playerID;
require '../../includes/query_process.php';
$results = $result->fetch_array(MYSQLI_ASSOC);

$data = array();
foreach($results as $key => $value) {
  if($value === 'section') {
    $parentKey = $key;
  } else {
    if($key === 'id') {
      $userId = $value;
    } else {
      if (array_key_exists($key, $queryLableNames)) {
        $key = $queryLableNames[$key];
      } else {
        $key = 'Roll '. substr($key, 8);
      }

      $data[$parentKey][$key] = $value;
    }
  }
}

$query = 'SELECT
          varSkill, intSkillDice, varSubSkill_0, intSubSkillDice_0, varSubSkill_1, intSubSkillDice_1, varSubSkill_2, intSubSkillDice_2
          FROM sheet_user_skills
          WHERE id = '. $userId .'
          ORDER BY intOrder';
require '../../includes/query_process.php';

while($skillResults = $result->fetch_array(MYSQLI_ASSOC)) {
  foreach($skillResults as $k => $v) {
    $skillResults[$k] = _firstCase($v);
  }
  $data['skills'][count($data['skills'])] = $skillResults;
}

require_once '../../includes/skill_types.php';

$query = 'SELECT
          txtComplication, tnyMajorMinor, blbNote
          FROM sheet_complications
          WHERE id = '. $userId .'
          ORDER BY intOrder';
require '../../includes/query_process.php';

while($compResults = $result->fetch_array(MYSQLI_ASSOC)) {
  $compResults['txtComplication'] = _firstCase($compResults['txtComplication']);
  $data['comp'][count($data['comp'])] = $compResults;
}

$query = 'SELECT
          txtAsset, tnyMajorMinor, blbNote
          FROM sheet_assets
          WHERE id = '. $userId .'
          ORDER BY intOrder';
require '../../includes/query_process.php';

while($assetResults = $result->fetch_array(MYSQLI_ASSOC)) {
  $assetResults['txtAsset'] = _firstCase($assetResults['txtAsset']);
  $data['asset'][count($data['asset'])] = $assetResults;
}

require '../../includes/connection_Close.php';
//echo "<pre>";
//print_r($data);
//die;

//echo json_encode($data);


?>
<div class="charactersInfo <?= strtolower($data['characterInfo']['Player Name']) .'_'. $userId; ?>">
    <?php
    foreach($data as $key => $content) {
      ?>
    <ul class="<?= $key; ?>">
      <li class="statHeader">
        <?= (array_key_exists($key, $queryLableNames)) ? $queryLableNames[$key] : $key ; ?>
      </li>
      <?php
        foreach($content as $label => $value) {
          $label = (array_key_exists($label, $queryLableNames)) ? $queryLableNames[$label] : $label ;
          ?>
      <li>
        <span>
        <?php
          if(strrpos($label, 'Dice') === false) {
            echo (is_numeric($label)) ? $label + 1 : $label ;
          } else {
            ?>
            &nbsp;
            <?php
          }
        ?>
        </span>
        <span>
          <?php
            if(empty($value)) {
              ?>
              &nbsp;
              <?php
            } else {
              if(is_array($value)) {
                ?>
              <ul>
                <?php
                  foreach($value as $k => $val) {
                    ?>
                <li>
                  <?php
                    if(array_key_exists(_firstCase($val), $arySkills)) {
                      echo _firstCase($val);
                    } else {
                      if(strrpos($k, 'SubSkill_') > 0) {
                        echo (is_numeric($val)) ? 'N/A' : _firstCase($val) ;
                      } elseif(strrpos($k, 'MajorMinor') > 0) {
                        switch($val) {
                          case 4:
                            echo 'Major';
                            break;
                          case 2:
                            echo 'Minor';
                            break;
                          default:
                            echo 'Unchecked';
                        }
                      } else {
                        echo _firstCase($val);
                      }
                    }
                  ?>
                </li>
                    <?php
                  }
                ?>
              </ul>
                <?php
              } else {
                echo $value;
              }
            }
          ?>
        </span>
      </li>
          <?php
        }
      ?>
    </ul>
      <?php
    }
    ?>
  </div>
</div>

<?php
function _firstCase($data) {
  $data = explode(' ', str_replace('_', ' ', $data));

  if(is_array($data)) {
    $return = array();
    foreach($data as $k => $string) {
      $return[$k] = ucfirst($string);
    }
    return join(' ', $return);
  } else {
    return ucfirst($data);
  }
}
?>