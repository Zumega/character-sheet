<?php
require 'includes/connection_Open.php';
  $query = "SELECT * FROM  `sheet_equipment` WHERE id=". $_SESSION['id'];
  $result = mysql_query($query) or die('Query failed: ' . mysql_error());
  $line = mysql_fetch_array($result, MYSQL_ASSOC);
require 'includes/connection_Close.php';
?>
<div class="module equipment clear">
  <input type="hidden" name="area" value="equipment" />
  <input type="hidden" id="activeTab" name="activeTab" value="<?= $line['tnytxtActiveTab']; ?>" />
  <div class="equipTabs">
    <ul>
      <?php
        $items = array("All Items", "Weapons", "Gear", "Armor", "Money", "Notes");
        $fields = "";
        $i = 0;
        foreach($items as $value){
          $first = ($i == 0) ? " active|first|" : "||un" ;
          $first = explode("|", $first);
          $i++;
          echo "<li class=\"equipTab" . $first[0] ."\">\n";
          echo "  <label for=\"". str_replace(" ", "", strtolower($value)) ."\" class=\"". $first[1] ."\">". $value ."</label>\n";
          echo "</li>\n";
          $readonly = ($value == "All Items") ? " readonly=readonly" : "" ;
          $fields .= "<textarea". $readonly ." id=\"". str_replace(" ", "", strtolower($value)) ."\" name=\"". str_replace(" ", "", strtolower($value)) ."\" class=\"". $first[2] ."selected\" tabindex=\"-1\">";
          $fields .= str_replace("[n]", "\n", $line["blb".str_replace(" ", "", $value)]) ."</textarea>";
        }
        unset($value);
      ?>
    </ul>
  </div>
  <div class="equipInput">
    <?= $fields; ?>
  </div>
</div>
