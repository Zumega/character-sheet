<?php
session_start();
require_once 'connection_Open.php';
$query = "SELECT `blbWeapons` ,  `blbGear` ,  `blbArmor` ,  `blbMoney`  FROM  `sheet_equipment` WHERE id=". $_SESSION["id"];
require './includes/query_process.php';
$line = $result->fetch_assoc();
require_once 'connection_Close.php';

foreach($line as $k=>$v){
  $content .= str_replace("blb", "", $k). ":[n]";
  $content .= "[t]". str_replace("[n]", "[n][t]", $v) ."[n][n]--------------------------------[n][n]";
}
echo str_replace("[n]", "\n", str_replace("[t]", "\t", $content));
?>