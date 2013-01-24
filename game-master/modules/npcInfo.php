<?php
require '../includes/connection_Open.php';
$query = 'SELECT
          IF(varName IS NULL, txtType, varName) as name, intId
          FROM sheet_npc_active AS act
          INNER JOIN sheet_npc_type AS type
          ON act.tnyintType = type.tnyintType
          WHERE intGameId = 1 AND act.tnyintDead = 0
          ORDER BY tnyintInitiative;';
require '../includes/query_process.php';
require '../includes/connection_Close.php';

require_once './includes/npcSettings.php';
?>

<div class="characterTabs clear">
  <ul id="npcs">
    <li class="characterTab" data-characterid="all_0">ALL</li>
    <?php
    $counters = array();
    $ids = array();

    while($row = $result->fetch_assoc()) {
      $ids[count($ids)] = $row['intId'];
      $counters[$row['name']] = (empty($counters[$row['name']])) ? 1 :  $counters[$row['name']] + 1;
      ?>
    <li class="characterTab" data-characterid="<?= strtolower($row['name']) .'_'. $row['intId'] ?>"><?= strtoupper($row['name']); ?></li>
      <?php
    }
    ?>
    <li class="expandContract"><div class="arrow"></div></li>
  </ul>
</div>
<div id="npcInfo" class="characterInfoContainer">LOADING...</div>
<script>
  var npcIds = <?= json_encode($ids); ?>;
</script>