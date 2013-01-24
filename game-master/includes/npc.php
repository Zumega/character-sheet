<?php
$npcID = $_REQUEST['npcId'];
require_once './variables.php';

require '../../includes/connection_Open.php';
$query = 'SELECT type.txtType, act.intId, act.tnyintHitPoints, act.tnyintWoundPoints, act.tnyintStunPoints, act.tnyintStrength, act.tnyintInitiative, act.tnyintEndurance
          FROM sheet_npc_active AS act
          INNER JOIN sheet_npc_type AS type
          ON act.tnyintType = type.tnyintType
          WHERE intId = '. $npcID .'
          AND act.tnyintDead = 0';
require '../../includes/query_process.php';
$results = $result->fetch_array(MYSQLI_ASSOC);
require '../../includes/connection_Close.php';
//echo "<pre>";
//print_r($data);
//die;

$html = '<div class="characterStats '. strtolower($results['txtType']) .'_'. $results['intId'] .'"><ul>';
foreach($results as $key => $content) {
  if($key != 'intId') {
    switch($key) {
      case 'varInitiativeDice':
      case 'varEnduranceDice':
        $content = _getRoll($content);
        break;
    }

    $html .= '<li><span>';
    $html .= (array_key_exists($key, $queryLableNames)) ? $queryLableNames[$key] : $key ;
    $html .= '</span><span>'. $content .'</span></li>';
  }
}
$html .= '</ul></div>';

echo json_encode(array('type'=>'npc', 'userId'=>$userId, 'html'=>$html));

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

function _getRoll($content) {
  $dice = explode('|', $content);
  $data = null;

  foreach($dice as $k => $val) {
    $dice[$k] = 'D'. $val;
  }

  return join(' + ', $dice);
}
?>