<?php
require '../includes/connection_Open.php';
$query = 'SELECT id, txtName FROM sheet_users WHERE intGameId = 1 ORDER BY txtName';
require '../includes/query_process.php';
require '../includes/connection_Close.php';
?>

<div class="characterTabs clear">
  <ul id="players">
    <li class="characterTab" data-characterid="all_0">ALL</li>
    <?php
    $ids = array();
    while($row = $result->fetch_assoc()) {
      $ids[count($ids)] = $row['id'];
      ?>
    <li class="characterTab" data-characterid="<?= strtolower($row['txtName']) .'_'. $row['id'] ?>"><?= strtoupper($row['txtName']); ?></li>
      <?php
    }
    ?>
    <li class="expandContract"><div class="arrow"></div></li>
  </ul>
</div>
<div id="playerInfo" class="characterInfoContainer">LOADING...</div>
<script>
  var playerIds = <?= json_encode($ids); ?>;
</script>