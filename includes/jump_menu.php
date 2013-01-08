<?php
function _jumpMenu() {
  $areas = array(
    'top' => 'Top',
    'characterInfo' => 'Character Info',
    'attributes' => 'Attributes',
    'derivedTraits' => 'Derived Traits',
    'skillsSpecialties' => 'Skills and Specialties',
    'equipment' => 'Equipment',
    'complications' => 'Complications',
    'assets' => 'Assets',
    'info' => 'Info',
    'dice' => 'Dice',
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
