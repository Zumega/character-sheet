<?php
// Closing connection
mysqli_kill($mysqli, $mysqli->thread_id);
mysqli_close($mysqli);
?>