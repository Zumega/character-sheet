var jQ = jQuery,
  sheet = {
    settings: {
      saveUrl: './includes/save.php',
      newSkillUrl: './includes/single_skill.php'
//      maxAttrPoints: 42,
//      maxSkillPoints: 20,
    },
    data: {
      defalutPoints: {},
      characterInfo: {},
      attributes: {},
      derivedTraits: {},
      rolledTraits: {},
      skills: {},
      allskills: {
        animal_handaling: Array("Animal Training", "Riding", "Veterinary", "Zoology"),
        medical_expertise: Array("dentistry", "forensics", "general practice", "genetics", "internal medicine", "neurology", "pharmaceuticals", "physiology", "psychiatry", "rehabilitation", "surgery", "toxicology", "veterinary medicine"),
        artistry: Array("Appraisal", "Cooking", "Forgery", "Game Design", "Painting", "Photography", "Poetry", "Sculpting", "Writing"),
        perception: Array("deduction", "empathy", "gambling", "hearing", "intuition", "investigation", "read lips", "search", "sight", "smell", "tactics", "taste", "tracking"),
        covert: Array("camouflage", "disable devices", "forgery", "infiltration", "open locks", "sabotage", "sleight of hand", "stealth", "streetwise", "surveillance"),
        performance: Array("acting", "dancing", "costuming", "keyboard instruments", "impersonation", "mimicry", "oratory", "percussion instruments", "singing", "stringed instruments", "wind instruments"),
        craft: Array("architecture", "blacksmithing", "carpentry", "cooking", "leather working", "metalworking", "pottery", "sewing"),
        pilot: Array("aerial navigation", "astrogation", "astronomy", "astrophysics", "space survival", "gunships", "hang glinders", "helicopters", "large cruisers", "mid-bulk transports", "patrol vessels", "rocket shuttles", "ultra-light aircraft", "short range shuttles"),
        discipline: Array("concentration", "interrogation", "intimidation", "leadership", "mental resistance", "morale"),
        planetary_vehicles: Array("aquatic navigation", "cars", "canoes", "equestrian", "ground vehicle repair", "horse-drawn conveyances", "hovercraft", "industrial vehicles", "land navigation", "large ground transports", "military combat vehicles", "powerboats", "sailing", "scooters", "scuba diving", "skiffs", "submarines", "yachts"),
        guns: Array("assault rifles", "energy weapons", "grenade launchers", "gunsmithing", "machine guns", "pistols", "rifles", "shotguns"),
        ranged_weapons: Array("Blowguns", "bows", "crossbows", "darts", "grenade", "javelin", "ranged weaponsmithing", "slings", "throwing axes", "throwing knives"),
        heavy_weapons: Array("artillery", "catapults", "demolitions", "forward observer", "mounted guns", "repair heavy weapons", "rocket launchers", "ship's cannons", "siege weapons"),
        scientific_expertise: Array("earth sciences", "historical sciences", "life sciences", "mathematical sciences"),
        influence: Array("administration", "barter", "bureaucracy", "conversation", "counseling", "interrogation", "intimidation", "leadership", "marketing", "persuasion", "politics", "seduction", "streetwise"),
        survival: Array("aerial survival", "aquatic survival", "general navigation", "land survival", "nature", "space survival", "specific environment survival", "specific condition survival", "tracking", "trapping"),
        knowledge: Array("appraisal", "cultures", "history", "law", "literature", "philosophy", "religion", "sports"),
        technical_eng: Array("Communication systems", "computer programming", "hacking", "create/alter technical devices", "demolitions", "electronics", "technical repair", "technical security systems"),
        mechanical_eng: Array("create mechanical devices", "machinery maintenance", "mechanical repairs", "fix mechanical security systems", "plumbing"),
        unarmed_combat: Array("boxing", "brawling", "judo", "karate", "kung fu", "savate", "wrestling"),
        linguist: Array("Arabic", "Armenian", "French", "German", "Hindu", "Japanese", "Latin", "Portuguese", "Russian", "Tagalog", "Swahili", "Swedish"),
        athletics: Array("climbing", "contortion", "dodge", "juggling", "jumping", "gymnastics", "parachuting", "parasailing", "pole vaulting", "riding", "running", "swimming", "weight lifting"),
        melee_weapons: Array("clubs", "knives", "melee weaponsmithing", "nunchaku", "pole arms", "swords", "whips")
      },
      equipment: {},
      allItems: '',
      hasChanged: false
    },
    functions: {
      init: function(){
        sheet.settings.saveObj = jQ('#saveMessage');
        sheet.settings.woundBarObj = jQ('#woundPointBar');
        sheet.settings.stunBarObj = jQ('#stunPointBar');
        sheet.settings.woundCounterBarObj = jQ('#woundCounterBar');
        sheet.settings.stunCounterBarObj = jQ('#stunCounterBar');
        sheet.settings.usedAttrPointsObj = jQ('#usedAttrPoints');

        sheet.functions.getDefalutPoints();
        sheet.functions.getCharacterInfo();
        sheet.functions.getAttributes();
        sheet.functions.getDerivedTraits();
        sheet.functions.getSkills();
        sheet.functions.getEquipment();

        sheet.data.hasChanged = false;

        sheet.functions.setStunWoundClicks();
        sheet.functions.getChanges();
        sheet.functions.ouchCheck();
        sheet.functions.checkAttributeInputs();
        sheet.functions.setDerivedTraits();
        sheet.functions.rolledTraits();
        sheet.functions.skillCountChanger();
        sheet.functions.skillUpdater();
        sheet.functions.setEquipmentTabs();

      },
      getDefalutPoints: function(){
//        store data in obj
        sheet.data.defalutPoints.maxAttrPoints = parseInt(jQ('#attrPoints').val());
        sheet.data.defalutPoints.usedAttrPoints = parseInt(jQ('#usedAttrPoints').val());
        sheet.data.defalutPoints.maxSkillPoints = parseInt(jQ('#skillPoints').val());
        sheet.data.defalutPoints.hiddenSkillPoints = parseInt(jQ('#hiddenSkillPoints').val());
        sheet.data.defalutPoints.usedSkillPoints = parseInt(jQ('#usedSkillPoints').val());
      },
      getCharacterInfo: function(){
//        check if there are any changes
        if(
          sheet.data.characterInfo.name !== jQ('#charName').val() ||
          sheet.data.characterInfo.nickname !== jQ('#nickName').val() ||
          sheet.data.characterInfo.playerName !== jQ('#playerName').val() ||
          sheet.data.characterInfo.homeWorld !== jQ('#homeWorld').val() ||
          sheet.data.characterInfo.concept !== jQ('#concept').val() ||
          sheet.data.characterInfo.plotPoints !== parseInt(jQ('#plot').val()) ||
          sheet.data.characterInfo.woundPoints !== parseInt(jQ('#woundPoints').val()) ||
          sheet.data.characterInfo.stunPoints !== parseInt(jQ('#stunPoints').val())
          )
            {
          sheet.data.hasChanged = true;
        }
//        store data in obj
        sheet.data.characterInfo.name = jQ('#charName').val();
        sheet.data.characterInfo.nickname = jQ('#nickName').val();
        sheet.data.characterInfo.playerName = jQ('#playerName').val();
        sheet.data.characterInfo.homeWorld = jQ('#homeWorld').val();
        sheet.data.characterInfo.concept = jQ('#concept').val();
        sheet.data.characterInfo.plotPoints = parseInt(jQ('#plot').val());
        sheet.data.characterInfo.woundPoints = parseInt(jQ('#woundPoints').val());
        sheet.data.characterInfo.stunPoints = parseInt(jQ('#stunPoints').val());

        return sheet.data.hasChanged;
      },
      setStunWoundClicks: function(){
        jQ(document).find('.characterInfo .btnUpDown').click(function(){
          var $this = jQ(this);

          switch($this.attr('id')){
            case 'woundPointsUp':
              $this.siblings('input[type=text]').val(sheet.data.characterInfo.woundPoints += 1);
              if(sheet.data.characterInfo.woundPoints > 0) {
                $this.siblings('input[type=button]').removeClass('hide');
              }
              break;
            case 'woundPointsDown':
              $this.siblings('input[type=text]').val(sheet.data.characterInfo.woundPoints -= 1);
              if(sheet.data.characterInfo.woundPoints === 0){
                $this.addClass('hide');
              }
              break;
            case 'stunPointsUp':
              $this.siblings('input[type=text]').val(sheet.data.characterInfo.stunPoints += 1);
              if(sheet.data.characterInfo.stunPoints > 0) {
                $this.siblings('input[type=button]').removeClass('hide');
              }
              break;
            case 'stunPointsDown':
              $this.siblings('input[type=text]').val(sheet.data.characterInfo.stunPoints -= 1);
              if(sheet.data.characterInfo.stunPoints === 0){
                $this.addClass('hide');
              }
              break;
          }

          sheet.functions.save('characterInfo');
          sheet.functions.ouchCheck();
        });
      },
      ouchCheck: function(){
        var totalPoints = sheet.data.characterInfo.woundPoints + sheet.data.characterInfo.stunPoints,
          wounPercent = (100 / sheet.data.derivedTraits.lifePoints) * sheet.data.characterInfo.woundPoints,
          stunPercent = (100 / sheet.data.derivedTraits.lifePoints) * sheet.data.characterInfo.stunPoints,
          barColor = ((100 / sheet.data.derivedTraits.lifePoints) * totalPoints) / 100,
          woundCounterBar = 100 - wounPercent,
          stunCounterBar = 100 - stunPercent;

        sheet.settings.woundBarObj.css({"width": wounPercent +'%', "background": 'rgba(255, 0, 0, '+ barColor +')'});
        sheet.settings.stunBarObj.css({"width": stunPercent + '%', "background": 'rgba(255, 0, 255, '+ barColor +')'});
        sheet.settings.woundCounterBarObj.css({"width": woundCounterBar +'%'});
        sheet.settings.stunCounterBarObj.css({"width": stunCounterBar + '%'});

        sheet.functions.deathCheck();
      },
      deathCheck: function(){
        if(sheet.data.derivedTraits.lifePoints === (sheet.data.characterInfo.woundPoints + sheet.data.characterInfo.stunPoints)) {
          alert('You DEAD!!');
        }
      },
      getAttributes: function(){
//        check if there are any changes
        if(
          sheet.data.attributes.strength !== parseInt(jQ('#str').val()) ||
          sheet.data.attributes.agility !== parseInt(jQ('#agl').val()) ||
          sheet.data.attributes.vitality !== parseInt(jQ('#vit').val()) ||
          sheet.data.attributes.alertness !== parseInt(jQ('#alert').val()) ||
          sheet.data.attributes.intelligence !== parseInt(jQ('#intl').val()) ||
          sheet.data.attributes.willpower !== parseInt(jQ('#willpower').val())
          )
            {
          sheet.data.hasChanged = true;
        }
//        store data in obj
        sheet.data.attributes.strength = parseInt(jQ('#str').val());
        sheet.data.attributes.agility = parseInt(jQ('#agl').val());
        sheet.data.attributes.vitality = parseInt(jQ('#vit').val());
        sheet.data.attributes.alertness = parseInt(jQ('#alert').val());
        sheet.data.attributes.intelligence = parseInt(jQ('#intl').val());
        sheet.data.attributes.willpower = parseInt(jQ('#willpower').val());

        return sheet.data.hasChanged;
      },
      checkAttributeInputs: function(){
        sheet.data.defalutPoints.usedAttrPoints = jQ("#usedAttrPoints");

        jQ(document).find(".attributes").find("input[type!=hidden]").blur(function(){
          var $this = jQuery(this);

          if($this.val() === ""){
            $this.val(0);
          }

          if ($this.val() % 2){
            alert("The number needs to corispond to a dice number\nMeaning it needs to be even.");
            $this.select();
            $this.focus();
            return;
          }

          var aryFields = jQ(document).find(".attributes").find("input"),
          sum = 0;

          for (i = 0; i < aryFields.length; i++){
            sum += parseInt(aryFields[i].value);
          }

          sheet.data.defalutPoints.usedAttrPoints = sum;
          sheet.settings.usedAttrPointsObj.val(sum);

          if (sum > sheet.data.defalutPoints.maxAttrPoints){
            alert('You have use to many points\nYou only have '+ sheet.data.defalutPoints.maxAttrPoints +' points to use.\nAnd you have used '+ sum +' so far.');
            $this.select();
            $this.focus();
          }
        });
      },
      getDerivedTraits: function() {
        var init = {
          d1: parseInt(jQ("#agl").val()),
          d2: parseInt(jQ("#alert").val()),
          d3: 0,
          d4: 0,
          initiative: 0
        },
        life = {
          d1: parseInt(jQ("#vit").val()),
          d2: parseInt(jQ("#willpower").val()),
          d3: 0,
          d4: 0,
          lifePoints: 0,
          endurance: 0
        },
        rollBreakdown = function(data){
          if(data.d1 > 12){
            data.d3 = data.d1 % 12;
            data.d1 = 12;
          }
          if(data.d2 > 12){
            data.d4 = data.d2 % 12;
            data.d2 = 12;
          }
          return data;
        }

        init = rollBreakdown(init);
        life.lifePoints = life.d1 + life.d2;
        life = rollBreakdown(life);

        init.initiative = "D"+ init.d1 +" + D" + init.d2;
        init.initiative += (init.d3 != 0)? " + D"+ init.d3 : '';
        init.initiative += (init.d4 != 0)? " + D"+ init.d4 : '' ;

        life.endurance = "D"+ life.d1 +" + D"+ life.d2;
        life.endurance += (life.d3 != 0)? " + D"+ life.d3 : '' ;
        life.endurance += (life.d4 != 0)? " + D"+ life.d4 : '' ;

        jQ("#int").val(init.initiative);
        jQ("#lifePoints").val(life.lifePoints);
        jQ("#endur").val(life.endurance);

        sheet.data.derivedTraits.initiative = init.initiative;
        sheet.data.derivedTraits.lifePoints = life.lifePoints;
        sheet.data.derivedTraits.endurance = life.endurance;

        sheet.functions.ouchCheck();
      },
      setDerivedTraits: function() {
        jQ("#agl, #alert, #vit, #willpower").blur(function(){
          sheet.functions.getDerivedTraits();
        });
      },
      rolledTraits: function() {
        jQ('#curntInt, #curntEndur, #curntResist').blur(function() {
          if(
          sheet.data.rolledTraits.initiative !== jQ('#curntInt').val() ||
          sheet.data.rolledTraits.endurance !== jQ('#curntEndur').val() ||
          sheet.data.rolledTraits.resistance !== jQ('#curntResist').val()
          ) {
              sheet.data.hasChanged = true;
          }


          sheet.data.rolledTraits.initiative = jQ('#curntInt').val();
          sheet.data.rolledTraits.endurance = jQ('#curntEndur').val();
          sheet.data.rolledTraits.resistance = jQ('#curntResist').val();

          sheet.functions.save('rolledTraits');

        });
      },
      getSkills: function(){
        var i=0;
        jQ('#skillsContainer').find('select, input').each(function(){
          var $this = jQ(this);

          if(sheet.data.skills[$this.attr('name')] !== $this.val()) {
            sheet.data.hasChanged = true;
          }
          sheet.data.skills[$this.attr('name')] = $this.val();
        });
        i=0;
        return sheet.data.hasChanged;
      },
      skillCountChanger: function() {
        jQ(document).find('.skillsSpecialties .btnUpDown').click(function(){
          var $this = jQ(this),
              $countField = jQ('#SkillsCnt'),
              skillCount = parseInt($countField.text());

          switch($this.attr('id')){
            case 'skillUp':
              jQ.ajax({
                url: sheet.settings.newSkillUrl,
                type: 'POST',
                data: {'data': skillCount },
                dataType: 'html',
                jsonpCallback: 'newSkill_callback',
                success: function(response){
                  jQ('#skillsContainer').append(response);
                  if(sheet.functions.getSkills()){
                    sheet.data.hasChanged = false;
                    sheet.functions.save('skills');
                  }
                },
                error: function(one, text, error){
                  console.log(one);
                  console.log(text);
                  console.log(error);
                }
              });

              skillCount += 1;
              $countField.text(skillCount);
              break;
            case 'skillDown':
              jQ('#skillsContainer').find('.column:last-child').fadeOut('fast',function(){
                jQ(this).remove();
                skillCount -= 1;

                delete sheet.data.skills['Skills_'+ skillCount];
                delete sheet.data.skills['Field_'+ skillCount +'_0'];
                delete sheet.data.skills['Field_'+ skillCount +'_1'];
                delete sheet.data.skills['Field_'+ skillCount +'_2'];
                delete sheet.data.skills['Field_'+ skillCount +'_3'];
                delete sheet.data.skills['Field_'+ skillCount +'_4'];
                delete sheet.data.skills['Field_'+ skillCount +'_5'];
                delete sheet.data.skills['Field_'+ skillCount +'_6'];

                sheet.functions.getSkills()
                sheet.functions.save('skills');
                $countField.text(skillCount);
              });
              break;
          }

          if(skillCount === 0){
            jQ('#skillDown').addClass('hide');
          }else{
            jQ('#skillDown').removeClass('hide');
          }
        });
      },
      getEquipment: function(){
        jQ(document).find('.equipInput textarea').each(function(){
          var $this = jQ(this);

          if($this.attr('id') !== 'allitems'){
            if(sheet.data.equipment[$this.attr('id')] !== $this.val()){
              sheet.data.hasChanged = true;
            }
            sheet.data.equipment[$this.attr('id')] = $this.val();
          }
        });
        return sheet.data.hasChanged;
      },
      setEquipmentTabs: function(){
        jQ(document).find('.equipTab').click(function(){
          var $this = jQ(this),
              tabid = $this.children('label').attr('for');

          jQ(document).find('.equipTab').each(function(){
            if(jQ(this).hasClass('active')){
              jQ(this).removeClass('active');
            }
          });
          $this.addClass('active');

          sheet.data.equipment.activeTab = tabid;
          sheet.functions.setEquipmentFields(tabid);
          sheet.data.hasChanged = false;
          sheet.functions.save('equipment');
        });
      },
      setEquipmentFields: function(id){
        jQ(document).find('.equipInput textarea').each(function(){
          var $this = jQ(this);
          if($this.hasClass('active')){
            $this.removeClass('active')
          }
          if($this.attr('id') === id){
            $this.addClass('active');
          }
        });
      },
      getChanges: function() {
//        attache the BLUR listener
        jQ(document).find('.characterInfo input[type=text]').blur(function(){
          if(sheet.functions.getCharacterInfo()){
            sheet.data.hasChanged = false;
            sheet.functions.ouchCheck();
            sheet.functions.save('characterInfo');
          }
        });

        jQ(document).find('.attributes input[type=text]').blur(function(){
          if(sheet.functions.getAttributes()){
            sheet.data.hasChanged = false;
            sheet.functions.save('attributes');
          }
        });

        jQ('#skillsContainer').on("change", 'select', function(){
          if(sheet.functions.getSkills()){
            sheet.data.hasChanged = false;
            sheet.functions.save('skills');
          }
        });

        jQ('#skillsContainer').on("blur", "input[type=text]", function(){
          if(sheet.functions.getSkills()){
            sheet.data.hasChanged = false;
            sheet.functions.save('skills');
          }
        });

        jQ(document).find('.equipInput textarea').blur(function(){
          if(jQ(this).attr('id') !== 'allitems'){
            sheet.functions.updateAllItemsField();

            if(sheet.functions.getEquipment()){
              sheet.data.hasChanged = false;
              sheet.functions.save('equipment');
            }
          }
        });
      },
      updateAllItemsField: function(){
        var content = {};

//        jQ('#allitems').val('');
        jQ(document).find('.equipInput textarea').each(function(){
          content[jQ(this).attr('id')] = jQ(this).val();
        });
        delete content.allitems;
        delete content.notes;

        sheet.data.allItems = '';
        for(var el in content){
          console.log(el);
          sheet.data.allItems += el.charAt(0).toUpperCase() + el.slice(1) +':\n'+ content[el] +'\n\n\n';
        }

        jQ('#allitems').val(sheet.data.allItems);
      },
      skillUpdater: function(){
        jQ('#skillsContainer').on('change', '.skilColum_1 select', function(){
          var $this = jQ(this),
              activeValue = $this.val(),
              options = {},
              thisId = $this.attr('id');
          activeValue = activeValue.replace(/[ ]/gi, '_');
          activeValue = activeValue.replace(/[\.*]/gi, '');

//          get new options
          for(skills in sheet.data.allskills){
            if(activeValue === skills){
              for(var i=0; i<(sheet.data.allskills[skills]).length; i+=1){
                var list = sheet.data.allskills[skills];

                for(var a=0; a<list.length; a+=1){
                  options[list[a].toLowerCase()] = list[a];
                }
              }
            }
          }

//          remove old options
          jQ('#'+ thisId +'_1 option:gt(0)').remove();
          jQ('#'+ thisId +'_2 option:gt(0)').remove();
          jQ('#'+ thisId +'_3 option:gt(0)').remove();

//          set new options
          jQ.each(options, function(key, value) {
            jQ('#'+ thisId +'_1').append($("<option></option>").attr("value", key).text(value));
            jQ('#'+ thisId +'_2').append($("<option></option>").attr("value", key).text(value));
            jQ('#'+ thisId +'_3').append($("<option></option>").attr("value", key).text(value));
          });

        });
      },
      save: function(saveArea){
        var values = sheet.data[saveArea];

        jQ.ajax({
          url: sheet.settings.saveUrl,
          type: 'POST',
          data: {'data': {'content': JSON.stringify(values) , 'saveArea': saveArea }},
          dataType: 'jsonp',
          jsonpCallback: saveArea +'_callback',
          success: function(response){
            if(response.status !== 'done'){
              sheet.settings.saveObj.text(response.status);
            }else{
              sheet.settings.saveObj.text('Saved');
            }

            sheet.settings.saveObj.animate({
              top: '+=50'
            }, 500).delay(2000).animate({
              top: '-=50'
            }, 500);
          },
          error: function(one, text, error){
            console.log(one);
            console.log(text);
            console.log(error);
          }
        });
      }
    }
  };

jQ(document).ready(function(){
  sheet.functions.init();
});
