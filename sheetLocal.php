<?php
  session_start();
  if(!$_SESSION["id"]){
    header("location:index.php");
  }
  require_once './includes/variables.php';
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>New Sheet</title>
    <link href="./extra/mine.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="./extra/jQuery.js"></script>
    <script type="text/javascript" src="./extra/js.js"></script>
  </head>
  <body>
    <?php
      include "./includes/controls.php";
    ?>
    <div class="bodyContainer">
      <a name='top'></a>
      <?php
        include "./includes/jump_menu.php";
      ?>
      <h2 id="characterInfo"><span class="close">X</span>Character Info:</h2>
      <?php
        include "./modules/character.php";
        echo "\n";
        include "./includes/jump_menu.php";
      ?>
      <a name='Attributes'></a>
      <h2 id="attributes"><span class="close">X</span>Attributes:</h2>
      <?php
        include "./modules/attributes.php";
        echo "\n";
        include "./includes/jump_menu.php";
      ?>
      <a name='Derived_Traits'></a>
      <h2 id="derivedTraits"><span class="close">X</span>Derived Traits:</h2>
      <?php
        include "./modules/derived_traits.php";
        echo "\n";
        include "./includes/jump_menu.php";
      ?>
      <a name='Skills_and_Specialties'></a>
      <h2 id="skillsSpecialties"><span class="close">X</span>Skills and Specialties:</h2>
      <?php
        include "./modules/skills_specialties.php";
        echo "\n";
        include "./includes/jump_menu.php";
      ?>
      <div class='column'>
        <a name='Equipment'></a>
        <h2 id="equipment"><span class="close">X</span>Equipment:</h2>
        <?php
          include "./modules/equipment.php";
          echo "\n";
          include "./includes/jump_menu.php";
        ?>
        <a name='Info'></a>
        <h2 id="info"><span class="close">X</span>Info:</h2>
        <?php
          include "./modules/info.php";
          echo "\n";
          include "./includes/jump_menu.php";
        ?>
        <a name='Dice'></a>
        <h2 id="dice"><span class="close">X</span>Dice:</h2>
        <?php
          include "./modules/dice.php";
        ?>
      </div>
      <div class='column'>
        <div class='column'>
          <h2 class="comp_asset" id="comp"><span class="close">X</span>Complications:</h2>
          <?php
            $comp_asset = 'comp';
            include "./modules/comp_asset.php";
          ?>
        </div>
        <div class='column'>
          <h2 class="comp_asset" id="asset"><span class="close">X</span>Assets:</h2>
          <?php
            $comp_asset = 'asset';
            include "./modules/comp_asset.php";
          ?>
        </div>
      </div>
      <?php
        include "./includes/jump_menu.php";
      ?>
      <a name='bottom'></a>
    </div>
  </body>
</html>
