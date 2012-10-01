<?php

  $aryComp = array("Allergy", "Amorous", "Amputee", "Bleeder", "Blind", "Branded", "Chip on the Shoulder", "Credo", "Combat Paralysis", "Coward", "Crude", "Dead Broke", "Deadly Enemy", "Deaf", "Dull Sense", "Easy mark", "Ego Signature", "Filcher", "Forked Tongue", "Greedy", "Hero Worship", "Hooked", "Leaky Brainpan", "Lightweight", "Little Person", "Loyal", "Memorable", "Mute", "Non-Fightin' Type", "Overconfident", "Paralyzed", "Phobia", "Portly", "Prejudice", "Sadistic", "Scrawny", "Slow Learner", "Soft", "Stingy", "Straight Shooter", "Superstitious", "Things Don't Go Smooth", "Traumatic Flashes", "Twitchy", "Ugly as Sin", "Weak Stomach");
  $aryAsset = array("Allure", "Athlete", "Born Behind the Wheel", "Cortex Specter", "Fightin' Type", "Friends in High Places", "Friends in low Places", "Good Name", "Healthy as a Horse", "Heavy Tolerance", "Highly Educated", "Intimidatin' Manner", "Leadership", "Lightnin' Reflexes", "Math Whiz", "Mean Left Hook", "Mechanical Empathy", "Military Rank", "Moneyed Individual", "Natural Linguist", "Nature Lover", "Nose for Trouble", "Reader", "Registered Companion", "Religiosity", "Sharp Sense", "Steady Calm", "Sweet and Cheerful", "Talented", "Things Go Smooth", "Total Recall", "Tough as Nails", "Trustworthy Gut", "Two-Fisted", "Walking Timepiece", "Wears a Badge");
  sort($aryComp);
  sort($aryAsset);

  $maxCount = $_REQUEST[count];
  $comp_asset = $_REQUEST[container];

  for ($i=0; $i<$maxCount; $i++){
    echo "<div class=\"section\">\n";
    echo "  <div>\n";
    echo "    <select id=\"TypeName_". $i ."_". $comp_asset ."\" name=\"Field_". $i ."_". $comp_asset ."\" tabindex=\"-1\">";
    echo "      <option value=\"\">========</option>";
    $array = ($comp_asset == "compFields") ? $aryComp : $aryAsset ;
    foreach ($array as $value){
      echo "      <option value=\"". str_replace("'", "", str_replace(" ", "_", strtolower($value))) ."\">". $value ."</option>";
    }

    echo "    </select>";
    echo "  </div>\n";
    echo "  <div class=\"column rightAlign\">\n";
    echo "    <label for=\"Max_". $i ."_". $comp_asset ."\">Major:</label>\n";
    echo "    <input type=\"radio\" id=\"Max_". $i ."_". $comp_asset ."\" name=\"MaxMin_". $i ."_". $comp_asset ."\" value=\"4\" class=\"radioBttn\" tabindex=\"-1\" />\n";
    echo "  </div>\n";
    echo "  <div class=\"column\">\n";
    echo "    <input type=\"radio\" id=\"Min_". $i ."_". $comp_asset ."\" name=\"MaxMin_". $i ."_". $comp_asset ."\" value=\"2\" class=\"radioBttn\" tabindex=\"-1\" />\n";
    echo "    <label for=\"Min_". $i ."_". $comp_asset ."\">:Minor</label>\n";
    echo "  </div>\n";
    echo "  <textarea id=\"Des_". $i ."_". $comp_asset ."\" name=\"Desc_". $i ."_". $comp_asset ."\" class=\"smallTextArea\">(NOTES)</textarea>\n";
    echo "</div>\n";
  }
?>