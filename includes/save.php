<?php
session_start();
$json = json_decode($_POST['data']['content'], true);

//print_r($json);
//echo $_POST['callback'] .'({\'status\':\''. $json .'\'})';
//die();

//echo $_POST['data']['saveArea'];
//exit();


switch ($_POST['data']['saveArea']){
  case 'characterInfo':
    $isMany = false;
    $dataBaseTable = 'sheet_character_info';
    $content = array (
      'txtCharName' => $json['name'],
      'txtNickName' => $json['nickname'],
      'txtPlayerName' => $json['playerName'],
      'txtHomeWorld' => $json['homeWorld'],
      'txtConcept' => $json['concept'],
      'intPlotPoints' => $json['plotPoints'],
      'intWoundPoints' => $json['woundPoints'],
      'intStunPoints' => $json['stunPoints']
    );
    break;
  case 'attributes':
    $isMany = false;
    $dataBaseTable = 'sheet_attributes';
    $content = array(
      'intStrength' => $json['strength'],
      'intAgility' => $json['agility'],
      'intVitality' => $json['vitality'],
      'intAlertness' => $json['alertness'],
      'intIntelligence' => $json['intelligence'],
      'intWillpower' => $json['willpower']
    );
    break;
  case 'rolledTraits':
    $isMany = false;
    $dataBaseTable = 'sheet_roll_traits';
    $content = array(
        'intInitiative' => $json['initiative'],
        'intEndurance' => $json['endurance'],
        'intResistance' => $json['resistance']
    );
    break;
  case 'dice':
    $isMany = false;
    $dataBaseTable = 'sheet_dice';
    $content = array(
      'intDice_0' => $json['dice_0'],
      'intDice_1' => $json['dice_1'],
      'intDice_2' => $json['dice_2'],
      'intDice_3' => $json['dice_3'],
      'intDice_4' => $json['dice_4'],
      'intDice_5' => $json['dice_5'],
      'intDice_6' => $json['dice_6'],
      'intDice_7' => $json['dice_7'],
      'intDice_8' => $json['dice_8'],
      'intDice_9' => $json['dice_9'],
      'intDice_10' => $json['dice_10'],
      'intDice_11' => $json['dice_11'],
      'intDice_12' => $json['dice_12'],
      'intDice_13' => $json['dice_13'],
      'intDice_14' => $json['dice_14'],
      'intDice_15' => $json['dice_15'],
      'intDice_16' => $json['dice_16'],
      'intDice_17' => $json['dice_17'],
      'intDice_18' => $json['dice_18'],
      'intDice_19' => $json['dice_19']
    );
    break;
  case 'equipment':
    $isMany = false;
    $dataBaseTable = 'sheet_equipment';
    $content = array(
      'tnytxtActiveTab' => $json['activeTab'],
      'blbWeapons' => $json['weapons'],
      'blbGear' => $json['gear'],
      'blbArmor' => $json['armor'],
      'blbMoney' => $json['money'],
      'blbNotes' => $json['notes']
    );
    break;
  case 'skills':
    $isMany = true;
    $dataBaseTable = 'sheet_user_skills';
    $content = array();
    for($i=0; $i<count($json)/8; $i+=1){
      $content[$i] = array(
        'varSkill' => $json['Skill_'.$i],
        'intSkillDice' => $json['Field_'.$i.'_0'],
        'varSubSkill_0' => $json['Field_'.$i.'_1'],
        'varSubSkill_1' => $json['Field_'.$i.'_2'],
        'varSubSkill_2' => $json['Field_'.$i.'_3'],
        'intSubSkillDice_0' => $json['Field_'.$i.'_4'],
        'intSubSkillDice_1' => $json['Field_'.$i.'_5'],
        'intSubSkillDice_2' => $json['Field_'.$i.'_6']
      );
    }
    break;
  case 'comp':
    $isMany = true;
    $dataBaseTable = 'sheet_complications';
    $content = array();
    for($i=0; $i<count($json)/4; $i+=1){
      $maj = (empty($json['maj_'. $i .'_complications'])) ? '' : $json['maj_'. $i .'_complications'] ;
      $min = (empty($json['min_'. $i .'_complications'])) ? '' : $json['min_'. $i .'_complications'] ;

      $majorMin = (empty($maj)) ? $min : $maj ;

      $content[$i] = array(
        'txtComplicaiton' => $json['typeName_'. $i .'_complications'],
        'tnyMajorMinor' => $majorMin,
        'blbNote' => $json['desc_'. $i .'_complications']
      );
    }
    break;
  case '':
    break;
  case '':
    break;
  case '':
    break;
  case '':
    break;
  default :
    echo'OOPS! you broke it!';
    exit();
}

//echo count($json) ."\n";
//print_r($json);
//die;


require_once 'connection_Open.php';
  if ($isMany){
    $keys = $value = '';
    $query = 'SELECT  count(`id`) count FROM '. $dataBaseTable .' WHERE  `id` = '. $_SESSION['id'];
    $result = mysql_query($query) or die('Query failed: ' . mysql_error());
    $result = mysql_fetch_array($result, MYSQL_ASSOC);

    if(count($content) === $result['count']){
      foreach($content as $num=>$item){
        $pairs='';
        foreach($item as $k=>$v){
          $pairs .= $k .' = \''. mysql_real_escape_string(htmlspecialchars($v)) .'\', ';
        }
        unset($query, $result);
        $query = 'UPDATE '. $dataBaseTable .' SET '. preg_replace('/, $/', '', $pairs) .' WHERE id = ' . $_SESSION['id'] . ' and intOrder = '. $num;
        $result = mysql_query($query) or die($_POST['callback'] .'({\'status\':\''. mysql_error() .'\'})');
        unset($pairs, $k, $v);
      }
      unset($query, $result, $num, $item);
    }elseif($result['count'] === 0){
      foreach($content as $num=>$item){
        foreach($item as $k=>$v){
           $keys .=  '`'. $k .'`, ';
           $value .=  '\''. mysql_real_escape_string(htmlspecialchars($v)) .'\', ';
        }
        unset($query, $result);
        $query = 'INSERT INTO  '. $dataBaseTable .' (  `id` ,  `intOrder`, '. preg_replace('/, $/', '', $keys) .') VALUES ( '. $_SESSION['id'] .', '. $num .', '. preg_replace('/, $/', '', $value) .' )';
        $result = mysql_query($query) or die($_POST['callback'] .'({\'status\':\''. mysql_error() .'\'})');
        unset($keys, $value, $k, $v);
      }
      unset($query, $result, $num, $item);
    }else{
      $query = 'DELETE FROM  '. $dataBaseTable .' WHERE id = '. $_SESSION['id'];
      $result = mysql_query($query) or die($_POST['callback'] .'({\'status\':\''. mysql_error() .'\'})');

      foreach($content as $num=>$item){
        foreach($item as $k=>$v){
           $keys .=  '`'. $k .'`, ';
           $value .=  '\''. mysql_real_escape_string(htmlspecialchars($v)) .'\', ';
        }
        unset($query, $result);
        $query = 'INSERT INTO  '. $dataBaseTable .' (  `id` ,  `intOrder`, '. preg_replace('/, $/', '', $keys) .') VALUES ( '. $_SESSION['id'] .', '. $num .', '. preg_replace('/, $/', '', $value) .' )';
        $result = mysql_query($query) or die('Query failed: ' . mysql_error());
        unset($keys, $value);
      }
      unset($query, $result, $num, $item);
    }
  }else{
    $pairs='';
    foreach($content as $k=>$v){
      $pairs .= $k .' = \''. mysql_real_escape_string(htmlspecialchars($v)) .'\', ';
    }
    $query = 'UPDATE '. $dataBaseTable .' SET '. preg_replace('/, $/', '', $pairs) .' WHERE id = ' . $_SESSION['id'] . '';
    $result = mysql_query($query) or die($_POST['callback'] .'({\'status\':\''. mysql_error() .'\'})');
  }
  echo $_GET['callback'] .'({\'status\':\'done\'})';
require_once 'connection_Close.php';
?>
