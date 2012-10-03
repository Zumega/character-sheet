<?php
session_start();

require 'includes/connection_Open.php';
$query = "SELECT * FROM `sheet_user_skills` where id = ". $_SESSION['id'] ." order by `intOrder`";
$result = mysql_query($query) or die('Query failed: ' . mysql_error());
require 'includes/connection_Close.php';

$skillCount = $amount = mysql_num_rows($result);
?>
<div class="module skillsSpecialties">
  <div>
    You have <span id="SkillsCnt"><?= $skillCount; ?></span> skill(s)
    <input type="button" id="skillUp" class="btnUpDown btnUp" tabindex="-1" />
    <input type="button" id="skillDown" class="btnUpDown btnDown <?= ($skillsFieldCnt === 0)? 'hide' : '' ; ?>" tabindex="-1" />
  </div>

  <div id="skillsContainer" class="clear">
    <?php
    require './includes/skills_input.php';
    ?>
  </div>
</div>