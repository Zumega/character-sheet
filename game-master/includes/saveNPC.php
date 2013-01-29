<?php
session_start();
$gameID = $_SESSION['id'];
$data = json_decode($_POST['data'], true);

require '../../includes/connection_Open.php';
foreach($data as $k => $npc) {
  $query = 'INSERT INTO  `sheet_npc_active`
            (intGameId, varName, tnyintHitPoints, tnyintWoundPoints, tnyintStunPoints, tnyintStrength, tnyintInitiative, tnyintEndurance, tnyintResistance, tnyintDead)
            VALUES
            ('. $gameID .', "'. $npc['name'] .'", '. $npc['hp'] .', 0, 0, '. $npc['rolls'][1] .', '. $npc['rolls'][2] .', '. $npc['rolls'][3] .', '. $npc['rolls'][4] .', 0)';
  if (!$mysqli->query($query) && $singleSave) {
    echo '{"status":"'. $mysqli->errno .' :: '. $mysqli->error .'"}';
  }
}

$query = 'SELECT
          intId
          FROM sheet_npc_active AS act
          WHERE intGameId = 1 AND act.tnyintDead = 0
          ORDER BY tnyintInitiative, varName';
require '../../includes/query_process.php';

$npcIds = array();
while($row = $result->fetch_assoc()) {
  $npcIds[count($npcIds)] = $row['intId'];
}

require '../../includes/connection_Close.php';

echo '{"status":"success", "npcIDs":'. json_encode($npcIds) .'}';
?>
