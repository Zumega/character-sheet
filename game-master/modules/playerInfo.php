<?php
require '../includes/connection_Open.php';
$query = 'SELECT id, txtName FROM sheet_users WHERE intGameId = 1 ORDER BY txtName';
require '../includes/query_process.php';
require '../includes/connection_Close.php';
?>

<div class="playerTabs clear">
  <ul id="players">
    <li class="playerTab" data-playerId="all_0">ALL</li>
    <?php
    $counter = 0;
    $ids = array();
    $playerCount = $sqlInfo->num_rows();

    while($row = $result->fetch_assoc()) {
      $ids[count($ids)] = $row['id'];
      if($counter === 0) {
        $playerID = $row['id'];
        $playerName = $row['txtName'];
      } else {
        $addClass = '';
      }
      $counter += 1;
      ?>
    <li class="playerTab" data-playerId="<?= strtolower($row['txtName']) .'_'. $row['id'] ?>"><?= strtoupper($row['txtName']); ?></li>
      <?php
    }
    ?>
    <li class="expandContract"><div class="arrow"></div></li>
  </ul>
</div>
<div id="characterInfoContainer"></div>
<script>
  var playerIds = <?= json_encode($ids); ?>;
</script>