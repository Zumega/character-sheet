<?php
session_start();
require_once 'connection_Open.php';
  $query = "SELECT `blbWeapons` ,  `blbGear` ,  `blbArmor` ,  `blbMoney`  FROM  `sheet_equipment` WHERE id=". $_SESSION["id"];
  $result = mysql_query($query) or die('Query failed: ' . mysql_error());
  $line = mysql_fetch_array($result, MYSQL_ASSOC);
require_once 'connection_Close.php';

foreach($line as $k=>$v){
  $content .= str_replace("blb", "", $k). ":[n]";
  $content .= "[t]". str_replace("[n]", "[n][t]", $v) ."[n][n]--------------------------------[n][n]";
}
echo str_replace("[n]", "\n", str_replace("[t]", "\t", $content));
?>