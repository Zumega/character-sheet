<?php
require '../includes/connection_Open.php';
$query = 'SELECT
          varName, intId
          FROM sheet_npc_active AS act
          WHERE intGameId = 1 AND act.tnyintDead = 0
          ORDER BY tnyintInitiative DESC, varName';
require '../includes/query_process.php';
require '../includes/connection_Close.php';

$npcCount = $sqlInfo->num_rows();

require_once './includes/npcSettings.php';
?>

<div class="characterTabs clear">
  <ul id="npcs">
    <?php
    if ($npcCount > 0) {
      ?>
    <li class="characterTab" data-characterid="all_0">ALL</li>
      <?php
    }

    $counters = array();
    $ids = array();

    while($row = $result->fetch_assoc()) {
      $ids[count($ids)] = $row['intId'];
      $counters[$row['varName']] = (empty($counters[$row['varName']])) ? 1 :  $counters[$row['varName']] + 1;
      ?>
    <li class="characterTab" data-characterid="<?= strtolower($row['varName']) .'_'. $row['intId'] ?>"><?= strtoupper($row['varName']); ?></li>
      <?php
    }
    ?>
    <li class="expandContract"><div class="arrow"></div></li>
  </ul>
</div>
<div id="npcInfo" class="characterInfoContainer">
  <?php
  if ($npcCount > 0) {
    ?>
    LOADING...
    <?php
  }
  ?>
</div>
<script>
  var npcIds = <?= json_encode($ids); ?>;
</script>