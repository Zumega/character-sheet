<?php
session_start();
$json = json_decode($_POST['data']['content'], true);
$sessionId = $_SESSION['id'];
$saveArea = $_POST['data']['saveArea'];
$callBack = $_GET['callback'];
$hashSent = $_POST['data']['hash'];
$hashSession = $_SESSION['hash'];

require 'connection_Open.php';
$query = 'SELECT  hash FROM sheet_users WHERE  `id` = '. $sessionId;
require './query_process.php';
$line = $result->fetch_assoc();
require 'connection_Close.php';

//if ($hashSent === $hashSession && $hashSession === $line['hash']) {
  if($saveArea === 'all') {
    foreach($json as $saveArea=>$json){
      if(!empty($json)) {
        _saveMe($saveArea, $json, $sessionId, $callBack, false);
      }
    }
  } else {
    _saveMe($saveArea, $json, $sessionId, $callBack, true);
  }
//} else {
//  echo $callBack .'({\'status\':\'Bad Key\'})';
//}


function _saveMe($saveArea, $json, $sessionId, $callBack, $singleSave) {
  $isGood = true;

  switch ($saveArea) {
    case 'characterInfo':
      if($sessionId === '27') {
        $json['playerName'] = $json['name'] = 'Test';
      }

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
        'intDice_13' => $json['dice_13']
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
          'varSkill' => $json['skill_'.$i],
          'intSkillDice' => $json['field_'.$i.'_0'],
          'varSubSkill_0' => $json['field_'.$i.'_1'],
          'varSubSkill_1' => $json['field_'.$i.'_2'],
          'varSubSkill_2' => $json['field_'.$i.'_3'],
          'intSubSkillDice_0' => $json['field_'.$i.'_4'],
          'intSubSkillDice_1' => $json['field_'.$i.'_5'],
          'intSubSkillDice_2' => $json['field_'.$i.'_6']
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
          'txtComplication' => $json['typeName_'. $i .'_complications'],
          'tnyMajorMinor' => $majorMin,
          'blbNote' => $json['desc_'. $i .'_complications']
        );
      }
      break;
    case 'asset':
      $isMany = true;
      $dataBaseTable = 'sheet_assets';
      $content = array();
      for($i=0; $i<count($json)/4; $i+=1){
        $maj = (empty($json['maj_'. $i .'_assets'])) ? '' : $json['maj_'. $i .'_assets'] ;
        $min = (empty($json['min_'. $i .'_assets'])) ? '' : $json['min_'. $i .'_assets'] ;

        $majorMin = (empty($maj)) ? $min : $maj ;

        $content[$i] = array(
          'txtAsset' => $json['typeName_'. $i .'_assets'],
          'tnyMajorMinor' => $majorMin,
          'blbNote' => $json['desc_'. $i .'_assets']
        );
      }
      break;
    default :
      $isGood = false;
  }

  if($isGood) {
    require 'connection_Open.php';

    if ($isMany) {
      $keys = $value = '';
      $query = 'SELECT  count(`id`) count FROM '. $dataBaseTable .' WHERE  `id` = '. $sessionId;
      require './query_process.php';
      $line = $result->fetch_assoc();

      if(count($content) === $line['count']){
        foreach($content as $num=>$item){
          $pairs='';
          foreach($item as $k=>$v){
            $pairs .= $k .' = \''. $mysqli->real_escape_string(htmlspecialchars($v)) .'\', ';
          }
          unset($query, $result);
          $query = 'UPDATE '. $dataBaseTable .' SET '. preg_replace('/, $/', '', $pairs) .' WHERE id = ' . $sessionId . ' and intOrder = '. $num;
          _setQuery($mysqli, $query, $singleSave);
          unset($pairs, $k, $v);
        }
        unset($query, $result, $num, $item);
      }elseif($line['count'] === 0){
        foreach($content as $num=>$item){
          foreach($item as $k=>$v){
             $keys .=  '`'. $k .'`, ';
             $value .=  '\''. $mysqli->real_escape_string(htmlspecialchars($v)) .'\', ';
          }
          unset($query, $result);
          $query = 'INSERT INTO  '. $dataBaseTable .' (  `id` ,  `intOrder`, '. preg_replace('/, $/', '', $keys) .') VALUES ( '. $sessionId .', '. $num .', '. preg_replace('/, $/', '', $value) .' )';
          _setQuery($mysqli, $query, $singleSave);
          unset($keys, $value, $k, $v);
        }
        unset($query, $result, $num, $item);
      }else{
        $query = 'DELETE FROM '. $dataBaseTable .' WHERE id = '. $sessionId;
        _setQuery($mysqli, $query, $singleSave);
        unset($query, $result);

        foreach($content as $num=>$item){
          foreach($item as $k=>$v){
             $keys .=  '`'. $k .'`, ';
             $value .=  '\''. $mysqli->real_escape_string(htmlspecialchars($v)) .'\', ';
          }
          $query = 'INSERT INTO  '. $dataBaseTable .' (  `id` ,  `intOrder`, '. preg_replace('/, $/', '', $keys) .') VALUES ( '. $sessionId .', '. $num .', '. preg_replace('/, $/', '', $value) .' )';
          _setQuery($mysqli, $query, $singleSave);
          unset($query, $result, $keys, $value);
        }
        unset($query, $result, $num, $item);
      }
    } else {
      $pairs='';
      foreach($content as $k=>$v){
        $pairs .= $k .' = \''. $mysqli->real_escape_string(htmlspecialchars($v)) .'\', ';
      }
      $query = 'UPDATE '. $dataBaseTable .' SET '. preg_replace('/, $/', '', $pairs) .' WHERE id = ' . $sessionId . '';
      _setQuery($mysqli, $query, $singleSave);

      if($_POST['data']['saveArea'] === 'characterInfo') {
        $query = 'UPDATE sheet_users SET txtName = "'. $json['playerName'] .'" '.
                 'WHERE id = ' . $sessionId . '';
        _setQuery($mysqli, $query, $singleSave);
      }
    }
    if($singleSave) {
      echo $callBack .'({"status":"done"})';
    }
    require 'connection_Close.php';
  }
}

function _setQuery($mysqli, $query, $singleSave) {
  if (!$mysqli->query($query) && $singleSave) {
    echo $_POST['callback'] .'({"status":"'. $mysqli->errno .' :: '. $mysqli->error .'"})';
  }
}
?>
