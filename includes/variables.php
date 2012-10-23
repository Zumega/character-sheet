<?php
  $siteURL = "http://". $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
  $jumpMenu = "./includes/jump_menu.php";
  $highDice = 12; // multipals of 2
  $maxLife = 34;
  $attrPoints = 42; // should this me 62 like the book says?
  $skillPoints = 20;
  $plotPoints = 4;
  $startCompAsset = 1;
  $comp_asset = ''; //variable so page can be used for Complications and Assets
  $equipTabs = array("All Items", "Weapons", "Gear", "Armor", "Money", "Notes");
  $tabIndex = 0;
?>
