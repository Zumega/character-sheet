<?php
  $siteURL = "http://". $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
  $jumpMenu = "./includes/jump_menu.php";
  $tabIndex = 0;
  $queryLableNames = array(
    'characterInfo'=> 'Character Info',
    'attributes' => 'Attributes',
    'derivedTraits' => 'Traits',
    'equipment' => 'Equipment',
    'dice' => 'Dice',
    'skills' => 'Skills',
    'comp' => 'Complications',
    'asset' => 'Accests',
    'txtCharName' => 'Charcter Name',
    'txtNickName' => 'Nick Name',
    'txtPlayerName' => 'Player Name',
    'txtHomeWorld' => 'Home World',
    'txtConcept' => 'Concept',
    'intPlotPoints' => 'Plot Points',
    'intWoundPoints' => 'Wound Points',
    'intStunPoints' => 'Stun Points',
    'intStrength' => 'Strength',
    'intAgility' => 'Agility',
    'intVitality' => 'Vitality',
    'intAlertness' => 'Alertness',
    'intIntelligence' => 'Intelligence',
    'intWillpower' => 'Willpower',
    'intInitiative' => 'Initiative',
    'intEndurance' => 'Endurance',
    'intResistance' => 'Resistance',
    'blbWeapons' => 'Weapons',
    'blbGear' => 'Gear',
    'blbArmor' => 'Armor',
    'blbMoney' => 'Money',
    'blbNotes' => 'Notes'
  );
?>