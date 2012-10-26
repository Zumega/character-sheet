<?php
  if (!$result = $mysqli->query($query)) {
    echo "Query failed: (" . $mysqli->errno . ") " . $mysqli->error;
  }

  $sqlInfo = $mysqli->prepare($query);
  $sqlInfo->execute();
  $sqlInfo->store_result();
?>