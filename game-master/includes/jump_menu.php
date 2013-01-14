<?php
function _jumpMenu() {
  $areas = array(
    'top' => 'Top',
    'players' => 'Players',
    'npcs' => 'NPC\'s',
    'bottom' => 'Bottom'
  );
?>

<div class="jumpMenu">
  <ul>
    <?php
      foreach($areas as $link => $text) {
        ?>
        <li><a href="#<?= $link; ?>" class="smallLink" tabindex="-1"><?= $text; ?></a></li>
    <?php
      }
    ?>
  </ul>
</div>
<?php
}
?>
