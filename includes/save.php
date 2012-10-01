<?php
session_start();
$json = json_decode($_POST['data']['content'], true);

//print_r($json);
//echo $_POST['callback'] .'({'status':''. $json .''})';
//die();

//echo $_POST['data']['saveArea'];
//exit();
switch ($_POST['data']['saveArea']){
  case 'characterInfo':
    $isMany = false;
    $dataBase = 'sheet_character_info';
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
    $dataBase = 'sheet_attributes';
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
    $dataBase = 'sheet_roll_traits';
    $content = array(
        'intInitiative' => $json['initiative'],
        'intEndurance' => $json['endurance'],
        'intResistance' => $json['resistance']
    );
    break;
  case 'dice':
    $isMany = false;
    $dataBase = 'sheet_dice';
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
    $dataBase = 'sheet_equipment';
    $content = array(
      'tnytxtActiveTab' => $json['activeTab'],
      'blbWeapons' => $json['weapons'],
      'blbGear' => $json['gear'],
      'blbArmor' => $json['armor'],
      'blbMoney' => $json['money'],
      'blbNotes' => $json['notes']
    );
    break;
  case 'skillsSpecialties':
    $isMany = true;
    $dataBase = 'sheet_user_skills';
    $content = array();
    for($i=0; $i<(count($json)/8)-1; $i++){
      $content[$i] = array(
        'intSkill' => $json['Skills_'.$i],
        'intSkillDice' => $json['Field_'.$i.'_0'],
        'intSubSkill_0' => $json['Field_'.$i.'_1'],
        'intSubSkill_1' => $json['Field_'.$i.'_2'],
        'intSubSkill_2' => $json['Field_'.$i.'_3'],
        'intSubSkillDice_0' => $json['Field_'.$i.'_4'],
        'intSubSkillDice_1' => $json['Field_'.$i.'_5'],
        'intSubSkillDice_2' => $json['Field_'.$i.'_6']
      );
    }
//      print_r($content);
//      exit();
    break;
  case '':
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


require_once 'connection_Open.php';
  if ($isMany){
    $keys = $value = "";
    $query = "SELECT  `id` ,  `intOrder` FROM  `sheet_user_skills` WHERE  `id` = ". $_SESSION['id'];
    $result = mysql_query($query) or die('Query failed: ' . mysql_error());
    $count=mysql_num_rows($result);

    if (count($content) == $count){
      foreach($content as $num=>$item){
        $pairs="";
        foreach($item as $k=>$v){
          $pairs .= $k ." = \"". mysql_real_escape_string(htmlspecialchars($v)) ."\", ";
        }
        unset($query, $result);
        $query = "UPDATE ". $dataBase ." SET ". preg_replace('/, $/', "", $pairs) ." WHERE id = " . $_SESSION["id"] . " and intOrder = ". $num;
        $result = mysql_query($query) or die('Query failed: ' . mysql_error());
        unset($pairs, $k, $v);
      }
      unset($query, $result, $num, $item);
    }elseif($count == 0){
      foreach($content as $num=>$item){
        foreach($item as $k=>$v){
           $keys .=  "`". $k ."`, ";
           $value .=  "'". mysql_real_escape_string(htmlspecialchars($v)) ."', ";
        }
        unset($query, $result);
        $query = "INSERT INTO  ". $dataBase ." (  `id` ,  `intOrder`, ". preg_replace('/, $/', "", $keys) .") VALUES ( ". $_SESSION["id"] .", ". $num .", ". preg_replace('/, $/', "", $value) ." )";
        $result = mysql_query($query) or die('Query failed: ' . mysql_error());
        unset($keys, $value, $k, $v);
      }
      unset($query, $result, $num, $item);
    }else{
      $query = "DELETE FROM  ". $dataBase ." WHERE id = ". $_SESSION["id"];
      $result = mysql_query($query) or die('Query failed: ' . mysql_error());

      foreach($content as $num=>$item){
        foreach($item as $k=>$v){
           $keys .=  "`". $k ."`, ";
           $value .=  "'". mysql_real_escape_string(htmlspecialchars($v)) ."', ";
        }
        unset($query, $result);
        $query = "INSERT INTO  ". $dataBase ." (  `id` ,  `intOrder`, ". preg_replace('/, $/', "", $keys) .") VALUES ( ". $_SESSION["id"] .", ". $num .", ". preg_replace('/, $/', "", $value) ." )";
        $result = mysql_query($query) or die('Query failed: ' . mysql_error());
        unset($keys, $value);
      }
      unset($query, $result, $num, $item);
    }
  }else{
    $pairs="";
    foreach($content as $k=>$v){
      $pairs .= $k ." = \"". mysql_real_escape_string(htmlspecialchars($v)) ."\", ";
    }
    $query = "UPDATE ". $dataBase ." SET ". preg_replace('/, $/', "", $pairs) ." WHERE id = " . $_SESSION["id"] . "";
    $result = mysql_query($query) or die($_POST['callback'] .'({"status":"'. mysql_error() .'"})');
    echo $_POST['callback'] .'({"status":"done"})';
  }
require_once 'connection_Close.php';
?>
