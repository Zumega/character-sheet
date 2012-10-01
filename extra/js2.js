var jQ = jQuery;
var strUpDown = strHP = strWound = strStun = "";
var aryRoll = new Array();
var aryDice = new Array();
var aryAreas = new Array();
var maxAttrPoints = 42;
var maxSkillPoints = 20;
var doneCount = 0;


var sheet = {
  functions:{
    clickCount:function() {
      sheet.clickCount++;
    },
    triggers:function(){
      jQ(".attributes input[type!=hidden]").trigger('blur');//trigger the blur on one of the attribute field to calculate the total used points
    },
    setCharacterObj:function(){
      var info = {};
      info.name = jQ('#charName').val();
      info.nick = jQ('#nickName').val();
      info.player = jQ('#playerName').val();
      info.home = jQ('#homeWorld').val();
      info.concept = jQ('#concept').val();
      info.plotPoints = parseInt(jQ('#plot').val());
      info.wound = parseInt(jQ('#woundPoints').val());
      info.stun = parseInt(jQ('#stunPoints').val());
      sheet.data.characterInfo = info;
    },
    setAttributesObj:function(){
      var info = {};
      info.strength = parseInt(jQ('#str').val());
      info.agility = parseInt(jQ('#agl').val());
      info.vitality = parseInt(jQ('#vit').val());
      info.alertness = parseInt(jQ('#alert').val());
      info.intelligence = parseInt(jQ('#intl').val());
      info.willpower = parseInt(jQ('#willpower').val());
      sheet.data.attributes = info;
    },
    setDerivedTraitsObj:function(){
      var info = {};
      info.lifePoints = parseInt(jQ('#lifePoints').val());
      info.initiative = parseInt(jQ('#curntInt').val());
      info.endurance = parseInt(jQ('#curntEndur').val());
      info.resistance = parseInt(jQ('#curntResist').val());
      sheet.data.derivedTraits = info;
    },
    storeCharacerInfo:function(){
      jQ('.characterInfo input:text ').blur(function(){
        sheet.functions.setCharacterObj();

        var saveValues = "{character_info:"+ JSON.stringify(sheet.data.characterInfo) +"}";
//        sheet.functions.save(saveValues);
        console.log(saveValues);
      });
    },
    storeAttributesInfo:function(){
      jQ('.attributes input:text').blur(function(){
        sheet.functions.setAttributesObj();

        var saveValues = "{attributes:"+ JSON.stringify(sheet.data.attributes) +"}";
//        sheet.functions.save(saveValues);
        console.log(saveValues);
      });
    },
    storeDerivedTraits:function(){
      jQ('.derivedTraits input:text').blur(function(){
        sheet.functions.setDerivedTraitsObj();

        var saveValues = "{derived_traits:"+ JSON.stringify(sheet.data.derivedTraits) +"}";
//        sheet.functions.save(saveValues);
        console.log(saveValues);
      });
    },
    calculateDirvedTraits:function(){
      jQ("#agl, #alert, #vit, #willpower").blur(function(){
        var d1 = d2 = d3 = d4 = 0;

        switch (this.id){
          case "agl":
          case "alert":
            d1 = parseInt(jQ("#agl").val());
            d2 = parseInt(jQ("#alert").val());
            if(d1 > 12){
              d3 = d1%12;
              d1 = 12;
            }
            if(d2 > 12){
              d4 = d2%12;
              d2 = 12;
            }

            initiative = "D"+ d1 +" + D"+ d2;
            initiative += (d3 != 0)? " + D"+ d3 : '' ;
            initiative += (d4 != 0)? " + D"+ d4 : '' ;
            jQ("#int").val(initiative);
            break;
          case "vit":
          case "willpower":
            d1 = parseInt(jQ("#vit").val());
            d2 = parseInt(jQ("#willpower").val());
            if(d1 > 12){
              d3 = d1%12;
              d1 = 12;
            }
            if(d2 > 12){
              d4 = d2%12;
              d2 = 12;
            }

            lifePoints = d1+d2;

            if (lifePoints != 0){
              jQ("#lifePoints").val(lifePoints);
              sheet.functions.ouchCheck();
            }
            endurance = "D"+ d1 +" + D"+ d2;
            endurance += (d3 != 0)? " + D"+ d3 : '' ;
            endurance += (d4 != 0)? " + D"+ d4 : '' ;

            jQ("#endur").val(endurance);
            break;
        }
        sheet.functions.setDerivedTraitsObj();
      });
    },
    ouchCheck:function(){
      var HP = jQ("#lifePoints").val();
      var WPValue = parseInt(jQ("#woundPoints").val());
      var SPValue = parseInt(jQ("#stunPoints").val());
      var TotalP = WPValue + SPValue;

      var WPercent = (100 / HP) * WPValue;
      var SPercent = (100 / HP) * SPValue;

      var WndColor = 100 - (100 / HP) * TotalP;
      var StnColor = 100 - (100 / HP) * TotalP;

      jQ("#woundPointBar").css({"width":WPercent + '%', "background":'rgb(100%, '+ WndColor +'%, '+ WndColor +'%)'});
      jQ("#stunPointBar").css({"width":SPercent + '%', "background":'rgb(100%, '+ StnColor +'%, 100%)'});

      if (WPValue >= 1)   {
        jQ("#woundPointsDown").css("visibility", "visible");
      } else  {
        jQ("#woundPointsDown").css("visibility", "hidden");
      }
      if (SPValue >= 1)   {
        jQ("#stunPointsDown").css("visibility", "visible");
      } else  {
        jQ("#stunPointsDown").css("visibility", "hidden");
      }
      sheet.functions.deathCheck();

      var saveValues = "{character_info:"+ JSON.stringify(sheet.data.characterInfo) +"}";
//      sheet.functions.save(saveValues);
      console.log(saveValues);
    },
    deathCheck:function() {
      var strTotal = parseInt(jQ('#woundPoints').val()) + parseInt(jQ('#stunPoints').val());
      if(strTotal >= parseInt(jQ("#lifePoints").val())) {
        alert('You DEAD!!');
      }
    },
    up_down:function() {
      jQ('.btnUpDown').click(function(){
        var objID = jQ(this).attr('id');
        // find wound/stun point input field by looking for the identifier in the id
        var ElId = (objID.match('woundPoints')) ? 'woundPoints' : 'stunPoints' ;

        // get input field value by looking for the identifier in the id
        strUpDown = parseInt(jQ("#"+ElId).val());
        strUpDown = (objID.match('Up')) ? strUpDown + 1 : strUpDown - 1;

        // pass new value to functions
        jQ("#"+ElId).val(strUpDown);
        if(ElId === 'woundPoints'){
          sheet.data.characterInfo.wound = strUpDown;
        }else{
          sheet.data.characterInfo.stun = strUpDown;
        }
        sheet.functions.ouchCheck();
      });
    }
  },
  data:{}
}



DICE = function(DiceNum) {
  if (DiceNum == 0) {
    //clear dice display
    jQ('#diceDisplay').html("");
    while(aryDice.length > 0){
      aryDice.pop();
    }
    while(aryRoll.length > 0){
      aryRoll.pop();
    }
    jQ(".diceSumArea").each(function(){jQ(this).text('0')});
  } else {
    //builds the display

    //creates dice roll
    var iRanNum = Math.round(Math.random()*DiceNum);
    while (iRanNum > DiceNum || iRanNum <= 0) {
      iRanNum = Math.round(Math.random()*DiceNum);
    }

    //what two numbers to add together
    aryRoll.unshift(iRanNum);
    while(aryRoll.length > 5){
      aryRoll.pop();
    }

    DiceLastRollsSum(aryRoll);

    // create and edit display of dice rolls
    jQ('#diceDisplay input').each(function(key, values){
      aryDice[key] = values.value;
    });
    var TotalDiceCounter = aryDice.unshift("D"+ DiceNum +" = "+ iRanNum);
    if (TotalDiceCounter > 20){
      aryDice.pop();
      TotalDiceCounter = aryDice.length;
    }

    var displayHTML = "";
    for (i=0; i<TotalDiceCounter; i++){
      displayHTML += "<input readonly='readonly' type='text' id='dice_"+ i +"' name='dice_"+ i +"' value='"+ aryDice[i] +"' />\n";
    }

    jQ('#diceDisplay').html(displayHTML);
  }
};

DiceLastRollsSum = function(aryRoll){
  aryRollsMath = new Array();
  if (aryRoll.length>4){
    aryRollsMath[0] = (aryRoll.length >= 2) ? aryRoll[0] + aryRoll[1] : 0 ;
    aryRollsMath[1] = (aryRoll.length >= 3) ? aryRoll[0] + aryRoll[1] + aryRoll[2] : 0 ;
    aryRollsMath[2] = (aryRoll.length >= 4) ? aryRoll[0] + aryRoll[1] + aryRoll[2] + aryRoll[3] : 0 ;
    aryRollsMath[3] = (aryRoll.length >= 5) ? aryRoll[0] + aryRoll[1] + aryRoll[2] + aryRoll[3] + aryRoll[4] : 0 ;
  }else{
    aryContent = new Array();
    jQ("#diceDisplay input").each(function(k,v){
      aryContent[k] = parseInt(jQ(this).val().replace(/D[0-9]{1,2} = /, ""));
    })
    aryContent.splice(0, 0, aryRoll[0]);

    aryRollsMath[0] = (aryContent.length >= 2) ? aryContent[0] + aryContent[1] : 0 ;
    aryRollsMath[1] = (aryContent.length >= 3) ? aryContent[0] + aryContent[1] + aryContent[2] : 0 ;
    aryRollsMath[2] = (aryContent.length >= 4) ? aryContent[0] + aryContent[1] + aryContent[2] + aryContent[3] : 0 ;
    aryRollsMath[3] = (aryContent.length >= 5) ? aryContent[0] + aryContent[1] + aryContent[2] + aryContent[3] + aryContent[4] : 0 ;
  }

  for(i=0; i<aryRollsMath.length; i++){
    jQ('#diceNum_'+ (i + 2)).html(aryRollsMath[i]);
  }
}







SKILLZ = function(el) {
  var skillsCnt = document.getElementById("SkillsCnt");
  if (el.id == "sklzUp") {
    if (skillsCnt.innerHTML != 0){
      content = GetSkillFields();
    }
    skillsCnt.innerHTML ++;
  } else {
    skillsCnt.innerHTML --;
    //BakeCookie('Skills_'+ skillsCnt.innerHTML, "", -1);
  }

  (skillsCnt.innerHTML > 0)? jQ("#sklzDown").css("visibility", "visible") : jQ("#sklzDown").css("visibility", "hidden");

  CALL_FIELDS("SkilsContainer", skillsCnt.innerHTML);
  //BakeCookie("SkillCount", skillsCnt.innerHTML);
}

CALL_FIELDS = function(container, count){
  switch (container){
    case "SkilsContainer":
      urlSlug = "skills_input";
      break;
    case "compFields":
    case "assetFields":
      urlSlug = "comp_assetFields";
      break;
  }

  var URL = "./includes/"+ urlSlug +".php?count=" + count +"&container="+ container;

  jQ.get(URL,function(data) {
    jQ("#"+container).html(data);
  });
}

GetSkillFields = function(){
  cnt = document.getElementById("SkillsCnt").innerHTML;
  fields = "";
  for (i=0; i<cnt; i++){
    mainID = "Skills_"+ (i);
    subID = "Skill_"+ (i);
    fields = mainID +":"+ jQ("#"+ mainID).val() +"|"+
      subID +"_0:"+ jQ("#"+ subID +"_0").val() +"|"+
      subID +"_1:"+ jQ("#"+ subID +"_1").val() +"|"+
      subID +"_2:"+ jQ("#"+ subID +"_2").val() +"|"+
      subID +"_3:"+ jQ("#"+ subID +"_3").val() +"|"+
      subID +"_4:"+ jQ("#"+ subID +"_4").val() +"|"+
      subID +"_5:"+ jQ("#"+ subID +"_5").val() +"|"+
      subID +"_6:"+ jQ("#"+ subID +"_6").val();
    //BakeCookie(mainID , fields);
  }
  return(fields);
}

SelectSkills = function(){
  jQ("#SkilsContainer select").live("change", function(){
    el = jQ(this);
    switch(el.val()){
      case "Animal Handaling":
        splSkills = ["Animal Training", "Riding", "Veterinary", "Zoology"];
        break;
      case "Medical Expertise":
        splSkills = ["dentistry", "forensics", "general practice", "genetics", "internal medicine", "neurology", "pharmaceuticals", "physiology", "psychiatry", "rehabilitation", "surgery", "toxicology", "veterinary medicine"];
        break;
      case "Artistry":
        splSkills = ["Appraisal", "Cooking", "Forgery", "Game Design", "Painting", "Photography", "Poetry", "Sculpting", "Writing"];
        break;
      case "Perception":
        splSkills = ["deduction", "empathy", "gambling", "hearing", "intuition", "investigation", "read lips", "search", "sight", "smell", "tactics", "taste", "tracking"];
        break;
      case "Covert":
        splSkills = ["camouflage", "disable devices", "forgery", "infiltration", "open locks", "sabotage", "sleight of hand", "stealth", "streetwise", "surveillance"];
        break;
      case "Performance":
        splSkills = ["acting", "dancing", "costuming", "keyboard instruments", "impersonation", "mimicry", "oratory", "percussion instruments", "singing", "stringed instruments", "wind instruments"];
        break;
      case "Craft":
        splSkills = ["architecture", "blacksmithing", "carpentry", "cooking", "leather working", "metalworking", "pottery", "sewing"];
        break;
      case "Pilot*":
        splSkills = ["aerial navigation", "astrogation", "astronomy", "astrophysics", "space survival", "gunships", "hang glinders", "helicopters", "large cruisers", "mid-bulk transports", "patrol vessels", "rocket shuttles", "ultra-light aircraft", "short range shuttles"];
        break;
      case "Discipline":
        splSkills = ["concentration", "interrogation", "intimidation", "leadership", "mental resistance", "morale"];
        break;
      case "Planetary Vehicles":
        splSkills = ["aquatic navigation", "cars", "canoes", "equestrian", "ground vehicle repair", "horse-drawn conveyances", "hovercraft", "industrial vehicles", "land navigation", "large ground transports", "military combat vehicles", "powerboats", "sailing", "scooters", "scuba diving", "skiffs", "submarines", "yachts"];
        break;
      case "Guns":
        splSkills = ["assault rifles", "energy weapons", "grenade launchers", "gunsmithing", "machine guns", "pistols", "rifles", "shotguns"];
        break;
      case "Ranged Weapons":
        splSkills = ["Blowguns", "bows", "crossbows", "darts", "grenade", "javelin", "ranged weaponsmithing", "slings", "throwing axes", "throwing knives"];
        break;
      case "Heavy Weapons":
        splSkills = ["artillery", "catapults", "demolitions", "forward observer", "mounted guns", "repair heavy weapons", "rocket launchers", "ship's cannons", "siege weapons"];
        break;
      case "Scientific Expertise":
        splSkills = ["earth sciences", "historical sciences", "life sciences", "mathematical sciences"];
        break;
      case "Influence":
        splSkills = ["administration", "barter", "bureaucracy", "conversation", "counseling", "interrogation", "intimidation", "leadership", "marketing", "persuasion", "politics", "seduction", "streetwise"];
        break;
      case "Survival":
        splSkills = ["aerial survival", "aquatic survival", "general navigation", "land survival", "nature", "space survival", "specific environment survival", "specific condition survival", "tracking", "trapping"];
        break;
      case "Knowledge":
        splSkills = ["appraisal", "cultures", "history", "law", "literature", "philosophy", "religion", "sports"];
        break;
      case "Technical Eng.*":
        splSkills = ["Communication systems", "computer programming", "hacking", "create/alter technical devices", "demolitions", "electronics", "technical repair", "technical security systems"];
        break;
      case "Mechanical Eng.*":
        splSkills = ["create mechanical devices", "machinery maintenance", "mechanical repairs", "fix mechanical security systems", "plumbing"];
        break;
      case "Unarmed Combat":
        splSkills = ["boxing", "brawling", "judo", "karate", "kung fu", "savate", "wrestling"];
        break;
      case "Linguist*":
        splSkills = ["Arabic", "Armenian", "French", "German", "Hindu", "Japanese", "Latin", "Portuguese", "Russian", "Tagalog", "Swahili", "Swedish"];
        break;
      case "Athletics":
        splSkills = ["climbing", "contortion", "dodge", "juggling", "jumping", "gymnastics", "parachuting", "parasailing", "pole vaulting", "riding", "running", "swimming", "weight lifting"];
        break;
      case "Melee Weapons":
        splSkills = ["clubs", "knives", "melee weaponsmithing", "nunchaku", "pole arms", "swords", "whips"];
        break;
      default:
        splSkills = ["=========="];
    }
    elID = el.attr("id").replace("Skills", "Skill");
    jQ("#"+ elID +"_1, #"+ elID +"_2, #"+ elID +"_3").html("<option value=\"0\">==========</option>")
    optCounter = 1;
    jQ.each(splSkills, function(){
      aryText = this.split(" ");
      text="";
      for(i=0; i<aryText.length; i++){
        text += aryText[i].substr(0, 1).toUpperCase() + aryText[i].substr(1) + " ";
      }
      jQ("#"+ elID +"_1, #"+ elID +"_2, #"+ elID +"_3").append("<option value='"+ this +"'>"+ text +"</value>")
    })
  })
}

CloseModule = function(){
  jQ(".close").click(function(){
    objID = jQ(this).parent().attr('id');
    jQ("."+objID).toggle('fast');
  });
}

EquiptmentTabs = function(){
  //changes CSS for tabs
  jQ(".equipInput textarea").blur(function(){
    SaveEquip();
  })
  jQ(".equipTab").click(function(){
    jQ('.equipTab').each(function(){
      if(jQ(this).hasClass('active')){
       jQ(this).removeClass('active');
      }
    });
    jQ(this).addClass('active');
    jQ("#activeTab").val(jQ(this).children('label').attr('for'));
    if (jQ(this).children('label').attr('for') == 'allitems') FillAllEquip();


    //changes CSS for textareas
    txtareaID = jQ(this).children('label').attr('for');
    jQ('.equipInput textarea').each(function(){
      if(jQ(this).hasClass('selected')){
       jQ(this).removeClass('selected').addClass('unselected');
      }
    });
    jQ("#"+txtareaID).removeClass('unselected').addClass('selected').focus();

    jQ("#"+txtareaID).each(function(){ //change event or something you want

      /* simple js */
      if (this.createTextRange) {
        var r = this.createTextRange();
        r.collapse(false);
        r.select();
      }

      $(this).focus(); //set focus

    });
  });
}

SaveEquip = function(){
  json="data={";
  jQ(".equipment :input[type!=button]").each(function(){
    json+='"'+jQ(this).attr('name')+'":"'+ (jQ(this).val()).replace(/"/, '&quot;') +'",';
  });
  json = json.replace(/\n/g, '[n]');
  json = json.replace(/\t/g, '[t]');
  json = json.replace(/,$/, '}');
  saveURL = window.location.href + "/includes/save.php";
 //   console.log(json);
  jQ.post(saveURL, json);
}

EquipStartUp = function(){
  active = jQ("#activeTab").val();
  jQ(".equipTab").each(function(){
    el = jQ(this).children("label");
    label = el.attr("for");
    if (label == active) {
      el.parent().addClass("active");
      jQ("#"+label).removeClass("unselected").addClass("selected");
    }else{
      el.parent().removeClass("active");
      jQ("#"+label).removeClass("selected").addClass("unselected");
    }

    if (label == 'allitems') FillAllEquip();
  })
  EquiptmentTabs();
}

FillAllEquip =function(){
  jQ.get("includes/getEquip.php", function(data){
    jQ("#allitems").val(data);
  });
}

COMP_ASSET_FIELD_COUNT = function(type, direction) {
  numEl = document.getElementById(type+"Cnt");

  if (direction == 1){
    numEl.innerHTML++
  }else{
    numEl.innerHTML--
  }

  (numEl.innerHTML > 1) ? document.getElementById(type+"Down").style.visibility = "visible" : document.getElementById(type+"Down").style.visibility = "hidden";
  (numEl.innerHTML < 5) ? document.getElementById(type+"Up").style.visibility = "visible" : document.getElementById(type+"Up").style.visibility = "hidden";

  CALL_FIELDS(type +"Fields", numEl.innerHTML);
}



AttrInputs = function(){
  maxPnts = jQ("#attrPoints").val();
  elUsedPnts = jQ("#usedAttrPoints");
  jQ(".attributes input[type!=hidden]").blur(function(){
    if(jQuery(this).val() == ""){
      jQuery(this).val(0);
    }
    if (this.value % 2){
      alert("The number needs to corispond to a dice number\nMeaning it needs to be even.");
      this.select();
      this.focus();
      return;
    }


    aryFields = jQ(".attributes input[type!=hidden]");
    sum=0;
    for (i=0; i<aryFields.length; i++){
      sum += parseInt(aryFields[i].value);
    }
    elUsedPnts.val(sum);
    if (sum > maxPnts){
      alert('You have use to many points\nYou only have '+ maxPnts +' points to use.\nAnd you have used '+ sum +' so far.');
      this.select();
      this.focus();
    }
  });
}

ShowModule = function(id){
  jQ("#"+ id +", ."+ id +"").show('fast');
}

BakeCookie = function(cKey, cValue, cDate){
  if (cDate) {
		date = new Date();
		date.setTime(date.getTime()+(cDate*24*60*60*1000));
		expDate = date.toGMTString();
	}	else {
    expDate = "";
  }
  document.cookie = cKey +'='+ cValue +'; expire='+ expDate;
}

EatCookie = function(Cname){
  el = document.cookie;
  if(el.length >0){
    Cstart = el.indexOf(Cname +"=");
    if (Cstart!=-1){
      Cstart = Cstart + Cname.length +1;
      Cend = (el.indexOf(";", Cstart) != -1)? el.indexOf(";", Cstart) : el.length ;

      return unescape(el.substring(Cstart, Cend));
    }
  }
  return null;
}

jQ(".asset .radioBttn").live("change",function(){
  startVal = (jQ("#hiddenSkillPoints").val()*1);
  val=0;
  jQ(".comp .radioBttn:checked, .asset .radioBttn:checked").each(function(){
    val -= (jQ(this).val()*1);
  })
  jQ("#skillPoints").val(startVal + val);
})

jQ(".comp select, .asset select, .skillsInput select").live("change", function(){
  current = jQ(this).val();
  jQ(".comp option, .asset option, .skillsInput option").each(function(){
    if (jQ(this).val() == current){
      jQ(this).attr('disabled', "disabled");
    }
  })
})

jQ(".comp textarea, .asset textarea").live("focus",function(){
  if(jQ(this).val()=="(NOTES)"){
    jQ(this).val("").css("color", "#000");
  }
});
jQ(".comp textarea, .asset textarea").live("blur",function(){
  if(jQ(this).val()==""){
    jQ(this).val("(NOTES)").css("color", "#ccc");
  }
});

RunTypeCheck = function(){
  jQ("#woundPoints, #stunPoints, .attributes input, .derivedTraits input").blur(function(){
    if(jQ(this).val()){
      if(isNaN(jQ(this).val())){
        alert("This field you just left needs to be a number!");
        return;
      }
    }
  })
}

LogSign = function(id) {
  var aryInputs = document.getElementsByTagName("input");
  var sLogSign = "";

  if (id == 0) {
    sLogSign = "L";
  } else {
    sLogSign = "S";
  }

  for (i=0; i<aryInputs.length; i++) {
    if (aryInputs[i].id.substr(aryInputs[i].id.length-1,1) == sLogSign) {
      document.getElementById("frmUName").value = aryInputs[i].value;
      document.getElementById("frmEMail").value = aryInputs[i+1].value;
      document.getElementById("frmPWord").value = aryInputs[i+2].value;
      document.getElementById("frmLogSign").value = sLogSign;
      break;
    }
  }
  document.getElementById('LogSign').submit();
}

Areas = function(){
  jQ("input[name=area]").each(function(index, value){
    aryAreas[index] = value.value;
  });

}

SaveSheet = function(area) {
  json="data={";
  jQ("."+ aryAreas[area] +" :input[type!=button]").each(function(){
    json+='"'+jQ(this).attr('name')+'":"'+ (jQ(this).val()).replace(/"/, '&quot;') +'",';
  });
  json = json.replace(/,$/, '}');
  saveURL = window.location.href + "/includes/save.php";
  jQ.post(saveURL, json);
  if (area >= aryAreas.length-1){
    clearTimeout(t);
    console.log("Your Shit is safe!!");
  } else {
    area++;
    t = setTimeout("SaveSheet("+ area +")", 2 * 1000);
  }
}

SaveArea = function(){
  json="data={";
  jQ(".skillsSpecialties :input[type!=button]").each(function(){
    json+='"'+jQ(this).attr('name')+'":"'+ (jQ(this).val()).replace(/"/, '&quot;') +'",';
  });
  json = json.replace(/\n/g, '[n]');
  json = json.replace(/\t/g, '[t]');
  json = json.replace(/,$/, '}');
  saveURL = window.location.href + "/includes/save.php";
  //console.log(json);
  jQ.post(saveURL, json, function(data){
    console.log(data);
  });
}


jQ(document).ready(function(){
  sheet.clickCount = 0;
  sheet.functions.calculateDirvedTraits();
  sheet.functions.setCharacterObj();
  sheet.functions.setAttributesObj();
  sheet.functions.triggers();
  sheet.functions.storeCharacerInfo();
  sheet.functions.storeAttributesInfo();
  sheet.functions.storeDerivedTraits();



  console.log(sheet);

  CloseModule();
  AttrInputs();
  SelectSkills();
  EquipStartUp();
  RunTypeCheck();
  Areas();

  sheet.functions.up_down();

  //saveInterval=self.setInterval("SaveSheet(0)",1*30*1000);
});