var jQ = jQuery,
  sheet = {
    settings: {
      saveUrl: './includes/save.php',
      newSkillUrl: './includes/single_skill.php',
      newCompAssetUrl: './includes/single_comp_asset.php',
      queueTimer: null
    },
    data: {
      hash: null,
      defaultPoints: {},
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
      usedSkills: new Array(),
      usedSubSkills:  new Array(),
      equipment: {},
      allItems: '',
      equipResize: '+=300',
      comp: {},
      asset: {},
      allCompAsset: {
        comp: Array('========', 'Allergy', 'Amorous', 'Amputee', 'Bleeder', 'Blind', 'Branded', 'Chip on the Shoulder', 'Credo', 'Combat Paralysis', 'Coward', 'Crude', 'Dead Broke', 'Deadly Enemy', 'Deaf', 'Dull Sense', 'Easy mark', 'Ego Signature', 'Filcher', 'Forked Tongue', 'Greedy', 'Hero Worship', 'Hooked', 'Leaky Brainpan', 'Lightweight', 'Little Person', 'Loyal', 'Memorable', 'Mute', 'Non-Fightin\' Type', 'Overconfident', 'Paralyzed', 'Phobia', 'Portly', 'Prejudice', 'Sadistic', 'Scrawny', 'Slow Learner', 'Soft', 'Stingy', 'Straight Shooter', 'Superstitious', 'Things Don\'t Go Smooth', 'Traumatic Flashes', 'Twitchy', 'Ugly as Sin', 'Weak Stomach'),
        asset: Array('========', 'Allure', 'Athlete', 'Born Behind the Wheel', 'Cortex Specter', 'Fightin\' Type', 'Friends in High Places', 'Friends in low Places', 'Good Name', 'Healthy as a Horse', 'Heavy Tolerance', 'Highly Educated', 'Intimidatin\' Manner', 'Leadership', 'Lightnin\' Reflexes', 'Math Whiz', 'Mean Left Hook', 'Mechanical Empathy', 'Military Rank', 'Moneyed Individual', 'Natural Linguist', 'Nature Lover', 'Nose for Trouble', 'Reader', 'Registered Companion', 'Religiosity', 'Sharp Sense', 'Steady Calm', 'Sweet and Cheerful', 'Talented', 'Things Go Smooth', 'Total Recall', 'Tough as Nails', 'Trustworthy Gut', 'Two-Fisted', 'Walking Timepiece', 'Wears a Badge')
      },
      usedComp: new Array(),
      usedAsset: new Array(),
      dice: {},
      displayDice: new Array(),
      usedDice: new Array(),
      hasChanged: false,
      lastActiveArea: null,
      saveArea: ''
    },
    functions: {
      init: function() {
/* ****************************************
*  commented out functions are to
*  show where they are in the document
**************************************** */
        sheet.functions.getHash();

        sheet.functions.setObjects();
        sheet.functions.getDefalutPoints();

        sheet.functions.getCharacterInfo();
        sheet.functions.getAttributes();
        sheet.functions.getDerivedTraits();
        sheet.functions.getRolledTraits();
        sheet.functions.getSkills();
        sheet.functions.getEquipment();
        sheet.functions.getComplications();
        sheet.functions.getAssets();
        sheet.functions.getDice();
//        getDiceRoll()
//        getLastRolls()

        sheet.functions.setStunWoundClicks();
        sheet.functions.ouchCheck();
//        deathCheck()

        sheet.functions.setDerivedTraits();
        sheet.functions.skillCountChanger();
        sheet.functions.skillUpdater();
        sheet.functions.subSkillUpdater();
        sheet.functions.setEquipmentTabs();
        sheet.functions.setEquipmentResizer();
//        setEquipmentFields()
//        updateAllItemsField()
        sheet.functions.compCountChanger();
        sheet.functions.compUpdater();
        sheet.functions.assetCountChanger();
        sheet.functions.assetUpdater();
//        checkInputs:
//          generic()
        sheet.functions.setDiceClicks();

        sheet.functions.getChanges();
//        getSpecialChanges:
//          skill()
//          comp()
//          asset()
//        saveQueue();
//        save()
//        ajaxError()
        sheet.functions.showHideModules();
        sheet.functions.controlsNumbers();
//        popup();
//        unLoad();
        sheet.functions.signOut();
      },
      getHash: function() {
        sheet.data.hash = mykey;
      },
      setObjects: function() {
//        store dom in obj
        sheet.settings.saveObj = jQ('#saveMessage');
        sheet.settings.woundBarObj = jQ('#woundPointBar');
        sheet.settings.stunBarObj = jQ('#stunPointBar');
        sheet.settings.woundCounterBarObj = jQ('#woundCounterBar');
        sheet.settings.stunCounterBarObj = jQ('#stunCounterBar');
        sheet.settings.usedAttrPointsObj = jQ('#usedAttrPoints');
        sheet.settings.usedSkillPointsObj = jQ('#usedSkillPoints');
      },
      getDefalutPoints: function() {
//        store data in obj
        sheet.data.defaultPoints.maxLifePoints = parseInt(jQ('#maxLifePoints').val());
        sheet.data.defaultPoints.maxAttrPoints = parseInt(jQ('#attrPoints').val());
        sheet.data.defaultPoints.usedAttrPoints = parseInt(jQ('#usedAttrPoints').val());
        sheet.data.defaultPoints.maxSkillPoints = parseInt(jQ('#skillPoints').val());
        sheet.data.defaultPoints.usedSkillPoints = parseInt(jQ('#usedSkillPoints').val());
      },
      getCharacterInfo: function() {
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
      getAttributes: function() {
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
      getDerivedTraits: function($this) {
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
        rollBreakdown = function(data) {
          if(data.d1 > 12) {
            data.d3 = data.d1 % 12;
            data.d1 = 12;
          }
          if(data.d2 > 12) {
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


        if(life.lifePoints > sheet.data.defaultPoints.maxLifePoints) {
          sheet.functions.popup('You have to many life points.<br \/><br \/>You have '+ life.lifePoints +'<br \/><br \/>You can only have '+ sheet.data.defaultPoints.maxLifePoints);
          if(typeof $this !== 'undefined') {
            $this.select();
            $this.focus();
          }
        }

        sheet.functions.ouchCheck();
      },
      getRolledTraits: function() {
          if(
            sheet.data.rolledTraits.initiative !== jQ('#curntInt').val() ||
            sheet.data.rolledTraits.endurance !== jQ('#curntEndur').val() ||
            sheet.data.rolledTraits.resistance !== jQ('#curntResist').val()
            )
              {
              sheet.data.hasChanged = true;
          }

          sheet.data.rolledTraits.initiative = jQ('#curntInt').val();
          sheet.data.rolledTraits.endurance = jQ('#curntEndur').val();
          sheet.data.rolledTraits.resistance = jQ('#curntResist').val();

          return sheet.data.hasChanged;
      },
      getSkills: function() {
        var usedSkillCounter = 0,
            usedSubSkillCounter = 0;

        jQ('#skillsContainer').find('select, input').each(function() {
          var $this = jQ(this);

          if(sheet.data.skills[$this.attr('name')] !== $this.val()) {
            sheet.data.hasChanged = true;
          }
          sheet.data.skills[$this.attr('name')] = $this.val();

          if($this.attr('name').indexOf('s') === 0 && $this.val() !== '=================') {
            sheet.data.usedSkills[usedSkillCounter] = $this.val();
            usedSkillCounter += 1;
          }
          if($this.attr('name').indexOf('f') === 0 && isNaN($this.val())) {
            sheet.data.usedSubSkills[usedSubSkillCounter] = $this.val();
            usedSubSkillCounter += 1;
          }
        });

        return sheet.data.hasChanged;
      },
      getEquipment: function() {
        jQ(document).find('.equipInput textarea').each(function() {
          var $this = jQ(this);

          if($this.attr('id') !== 'allitems') {
            if(sheet.data.equipment[$this.attr('id')] !== $this.val()) {
              sheet.data.hasChanged = true;
            }
            sheet.data.equipment[$this.attr('id')] = $this.val();
          }
        });
        jQ(document).find('.equipTab').each(function() {
          var $this = jQ(this);

          if($this.hasClass('active')) {
            sheet.data.equipment.activeTab = $this.children('label').text().toLowerCase().replace(' ', '');
          }
        });
        return sheet.data.hasChanged;
      },
      getComplications: function() {
        var usedCompCounter = 0;

        jQ('#complicationsFields').find('select, input, textarea').each(function() {
          var $this = jQ(this);

          if((sheet.data.comp[$this.attr('id')] !== $this.val())) {
            sheet.data.hasChanged = true;
          }

          if($this.attr('type') === 'radio') {
            sheet.data.comp[$this.attr('id')] = ($this.is(':checked')) ? $this.val() : '';
          }else{
            if($this.is('select')) {
              sheet.data.usedComp[usedCompCounter] = $this.val();
              usedCompCounter += 1;
            }
            sheet.data.comp[$this.attr('id')] = $this.val();
          }
        });

        return sheet.data.hasChanged;
      },
      getAssets: function() {
        var usedAssetCounter = 0;

        jQ('#assetsFields').find('select, input, textarea').each(function() {
          var $this = jQ(this);

          if((sheet.data.asset[$this.attr('id')] !== $this.val())) {
            sheet.data.hasChanged = true;
          }

          if($this.attr('type') === 'radio') {
            sheet.data.asset[$this.attr('id')] = ($this.is(':checked')) ? $this.val() : '';
          }else{
            if($this.is('select')) {
              sheet.data.usedAsset[usedAssetCounter] = $this.val();
              usedAssetCounter += 1;
            }
            sheet.data.asset[$this.attr('id')] = $this.val();
          }
        });

        return sheet.data.hasChanged;
      },
      getDice: function() {
        jQ('#diceDisplay').find('input').each(function() {
          var $this = jQ(this);

          sheet.data.displayDice[sheet.data.displayDice.length] = $this.val();
          if($this.data('roll').length > 0) {
            sheet.data.usedDice[sheet.data.usedDice.length] = $this.data('roll');
          }
        });
      },
      getDiceRoll: function(dice) {
        var roll = 0;

        while (roll > dice || roll <= 0) {
          roll = Math.round(Math.random() * dice);
        }

        sheet.data.usedDice.unshift(parseInt(roll));
        while(sheet.data.usedDice.length > 5){
          sheet.data.usedDice.pop();
        }

        return roll;
      },
      getLastRolls: function() {
        var diceMath = {
                twoDice: (sheet.data.usedDice.length >= 2) ? sheet.data.usedDice[0] + sheet.data.usedDice[1] : 0,
                threeDice: (sheet.data.usedDice.length >= 3) ? sheet.data.usedDice[0] + sheet.data.usedDice[1] + sheet.data.usedDice[2] : 0,
                fourDice: (sheet.data.usedDice.length >= 4) ? sheet.data.usedDice[0] + sheet.data.usedDice[1] + sheet.data.usedDice[2] + sheet.data.usedDice[3] : 0,
                fiveDice: (sheet.data.usedDice.length >= 5) ? sheet.data.usedDice[0] + sheet.data.usedDice[1] + sheet.data.usedDice[2] + sheet.data.usedDice[3] + sheet.data.usedDice[4] : 0
              }

        jQ('#diceNum_2').text(diceMath.twoDice);
        jQ('#diceNum_3').text(diceMath.threeDice);
        jQ('#diceNum_4').text(diceMath.fourDice);
        jQ('#diceNum_5').text(diceMath.fiveDice);
      },
      setStunWoundClicks: function() {
        jQ(document).find('.characterInfo .btnUpDown').click(function() {
          var $this = jQ(this);

          switch($this.attr('id')) {
            case 'woundPointsUp':
              $this.siblings('input[type=text]').val(sheet.data.characterInfo.woundPoints += 1);
              break;
            case 'woundPointsDown':
              $this.siblings('input[type=text]').val(sheet.data.characterInfo.woundPoints -= 1);
              break;
            case 'stunPointsUp':
              $this.siblings('input[type=text]').val(sheet.data.characterInfo.stunPoints += 1);
              break;
            case 'stunPointsDown':
              $this.siblings('input[type=text]').val(sheet.data.characterInfo.stunPoints -= 1);
              break;
          }

          sheet.functions.saveQueue('characterInfo');
          sheet.functions.ouchCheck();
        });
      },
      ouchCheck: function() {
        var totalPoints = sheet.data.characterInfo.woundPoints + sheet.data.characterInfo.stunPoints,
          woundPercent = (100 / sheet.data.derivedTraits.lifePoints) * sheet.data.characterInfo.woundPoints,
          stunPercent = (100 / sheet.data.derivedTraits.lifePoints) * sheet.data.characterInfo.stunPoints,
          barOpacity = ((100 / sheet.data.derivedTraits.lifePoints) * totalPoints) / 100,
          woundCounterBar = 100 - woundPercent,
          stunCounterBar = 100 - stunPercent;

        sheet.settings.woundBarObj.animate({
          width: woundPercent +'%'
        }).css('backgroundColor', 'rgba(255,0,0,'+ barOpacity +')');
        sheet.settings.stunBarObj.animate({
          width: stunPercent +'%'
        }).css('backgroundColor', 'rgba(255,0,255,'+ barOpacity +')');
        sheet.settings.woundCounterBarObj.animate({
          width: woundCounterBar +'%'
        });
        sheet.settings.stunCounterBarObj.animate({
          width: stunCounterBar +'%'
        });

//        update button 'down' hide/show
        if(sheet.data.characterInfo.woundPoints > 0) {
          jQ('#woundPointsDown').removeClass('hide');
        }
        if(sheet.data.characterInfo.woundPoints === 0) {
          jQ('#woundPointsDown').addClass('hide');
        }
        if(sheet.data.characterInfo.stunPoints > 0) {
          jQ('#stunPointsDown').removeClass('hide');
        }
        if(sheet.data.characterInfo.stunPoints === 0) {
          jQ('#stunPointsDown').addClass('hide');
        }
        if((sheet.data.characterInfo.woundPoints + sheet.data.characterInfo.stunPoints) >= sheet.data.derivedTraits.lifePoints) {
          jQ('#woundPointsUp, #stunPointsUp').addClass('hide');
        }
        if((sheet.data.characterInfo.woundPoints + sheet.data.characterInfo.stunPoints) < sheet.data.derivedTraits.lifePoints) {
          jQ('#woundPointsUp, #stunPointsUp').removeClass('hide');
        }

        sheet.functions.deathCheck();
      },
      deathCheck: function() {
        if(sheet.data.derivedTraits.lifePoints <= (sheet.data.characterInfo.woundPoints + sheet.data.characterInfo.stunPoints)) {
          sheet.functions.popup('You DEAD!!', 'dead');
        }
      },
      setDerivedTraits: function() {
        jQ("#agl, #alert, #vit, #willpower").blur(function() {
          sheet.functions.getDerivedTraits(jQ(this));
        });
      },
      skillCountChanger: function() {
        jQ(document).find('.skillsSpecialties .btnUpDown').click(function() {
          var $this = jQ(this),
              $countField = jQ('#SkillsCnt'),
              skillCount = parseInt($countField.text());

          switch($this.attr('id')) {
            case 'skillUp':
              jQ.ajax({
                url: sheet.settings.newSkillUrl,
                type: 'POST',
                data: {'data': skillCount, 'used': sheet.data.usedSkills },
                dataType: 'html',
                success: function(response) {
                  jQ('#skillsContainer').append(response).find('.column:last-child').slideDown('fast');
                  if(sheet.functions.getSkills()) {
                    sheet.data.hasChanged = false;
                    sheet.functions.saveQueue('skills');
                  }
                },
                error: function(one, text, error) {
                  sheet.functions.ajaxError(error);
                }
              });

              skillCount += 1;
              $countField.text(skillCount);
              if(skillCount > 0) {
                jQ('#skillDown').removeClass('hide');
              }
              break;
            case 'skillDown':
              jQ('#skillsContainer').find('.column:last-child').slideUp('fast',function() {
                jQ(this).remove();
                skillCount -= 1;

                sheet.data.usedSkills.pop();
                delete sheet.data.skills['skill_'+ skillCount];
                delete sheet.data.skills['field_'+ skillCount +'_0'];
                delete sheet.data.skills['field_'+ skillCount +'_1'];
                delete sheet.data.skills['field_'+ skillCount +'_2'];
                delete sheet.data.skills['field_'+ skillCount +'_3'];
                delete sheet.data.skills['field_'+ skillCount +'_4'];
                delete sheet.data.skills['field_'+ skillCount +'_5'];
                delete sheet.data.skills['field_'+ skillCount +'_6'];

                if(skillCount > 0) {
                  jQ('#skillsContainer').find('input:first-child').trigger('blur');
                }

                sheet.functions.getSkills()
                sheet.functions.saveQueue('skills');
                $countField.text(skillCount);

                if(skillCount === 0) {
                  jQ('#skillDown').addClass('hide');
                }
              });
              break;
          }
        });
      },
      skillUpdater: function() {
        jQ('#skillsContainer').on('change', '.skilColum_1 select', function() {
          var $this = jQ(this),
              thisId = $this.attr('id'),
              activeValue = $this.val(),
              options = {};
          activeValue = activeValue.replace(/[ ]/gi, '_');
          activeValue = activeValue.replace(/\.|\*/gi, '');

          if(sheet.functions.getSkills()) {
//            get new options
            for(skills in sheet.data.allskills) {
              if(activeValue === skills) {
                for(var i=0; i<(sheet.data.allskills[skills]).length; i+=1) {
                  var list = sheet.data.allskills[skills];

                  for(var a=0; a<list.length; a+=1) {
                    options[list[a].toLowerCase()] = list[a];
                  }
                }
              }
            }

//            remove old options
            jQ('#'+ thisId +'_1 option:gt(0)').remove();
            jQ('#'+ thisId +'_2 option:gt(0)').remove();
            jQ('#'+ thisId +'_3 option:gt(0)').remove();

//            set new options
            jQ.each(options, function(key, value) {
              jQ('#'+ thisId +'_1').append(jQ("<option></option>").attr("value", key).text(value));
              jQ('#'+ thisId +'_2').append(jQ("<option></option>").attr("value", key).text(value));
              jQ('#'+ thisId +'_3').append(jQ("<option></option>").attr("value", key).text(value));
            });

            jQ('#skillsContainer').find('.skilColum_1 option').each(function() {
//              enable and disable used skills
              jQ(this).removeAttr('disabled');

              for(var used in sheet.data.usedSkills) {
                if(sheet.data.usedSkills[used] === jQ(this).val()) {
                  jQ(this).attr('disabled', 'disabled');
                }
              }
            });

            sheet.functions.getSpecialChanges.skill();
          };
        });
      },
      subSkillUpdater: function() {
        jQ('#skillsContainer').on('change', '.skilColum_2 select', function() {
          var $this = jQ(this),
              $options = jQ('#skillsContainer .skilColum_2 option'),
              usedSubSkillCounter = 0;

//          reset used subkills
          sheet.data.usedSubSkills = [];
          jQ('#skillsContainer').find('.skilColum_2 select').each(function() {
            var $el = jQ(this);
            if($el.attr('name').indexOf('f') === 0 && isNaN($el.val())) {
              sheet.data.usedSubSkills[usedSubSkillCounter] = $el.val();
              usedSubSkillCounter += 1;
            }
          });

//          enable and disable used subskills
          $options.each(function() {
            jQ(this).removeAttr('disabled');
          });
          $options.each(function() {
            for(var used in sheet.data.usedSubSkills) {
              if(sheet.data.usedSubSkills[used] === jQ(this).val()) {
                jQ(this).attr('disabled', 'disabled');
              }
            }
          });

          sheet.functions.getSpecialChanges.skill();
        });
      },
      setEquipmentTabs: function() {
        jQ(document).find('.equipTab').click(function() {
          var $this = jQ(this),
              tabid = $this.children('label').attr('for');

          jQ(document).find('.equipTab').each(function() {
            if(jQ(this).hasClass('active')) {
              jQ(this).removeClass('active');
            }
          });
          $this.addClass('active');

          sheet.data.equipment.activeTab = tabid;
          sheet.functions.setEquipmentFields(tabid);
          sheet.data.hasChanged = false;
          sheet.functions.saveQueue('equipment');
        });
      },
      setEquipmentResizer: function() {
        jQ(document).find('.expandContract').click(function() {
          jQ(this).toggleClass('active');
          jQ(document).find('.equipInput textarea').each(function() {
            jQ(this).animate({
              'height': sheet.data.equipResize
            },
            500);
          });
          sheet.data.equipResize = (sheet.data.equipResize === '+=300') ? '-=300' : '+=300' ;
        });
      },
      setEquipmentFields: function(id) {
        jQ(document).find('.equipInput textarea').each(function() {
          var $this = jQ(this);
          if($this.hasClass('active')) {
            $this.removeClass('active')
          }
          if($this.attr('id') === id) {
            $this.addClass('active');
          }
        });
      },
      updateAllItemsField: function() {
        var content = {};

        jQ(document).find('.equipInput textarea').each(function() {
          content[jQ(this).attr('id')] = jQ(this).val();
        });

        delete content.allitems;
        delete content.notes;

        sheet.data.allItems = '';
        for(var el in content) {
          sheet.data.allItems += el.charAt(0).toUpperCase() + el.slice(1) +':\n'+ content[el] +'\n\n\n';
        }

        jQ('#allitems').val(sheet.data.allItems);
      },
      compCountChanger: function() {
        jQ('#complicationsUp, #complicationsDown').on('click', function() {
          var $this = jQ(this),
              $countField = jQ('#complicationsCnt'),
              compCount = parseInt($countField.text());;

          switch($this.attr('id')) {
            case 'complicationsUp':
              jQ.ajax({
                url: sheet.settings.newCompAssetUrl,
                type: 'POST',
                data: {'count': compCount, 'type': 'complications', 'used': sheet.data.usedComp},
                dataType: 'html',
                success: function(response) {
                  jQ('#complicationsFields').append(response).find('.section:last-child').slideDown('fast');
                  if(sheet.functions.getComplications()) {
                    sheet.data.hasChanged = false;
                    sheet.functions.saveQueue('comp');
                  }
                },
                error: function(one, text, error) {
                  sheet.functions.ajaxError(error);
                }
              });

              compCount += 1;
              $countField.text(compCount);

              if(compCount > 0 ) {
                jQ('#complicationsDown').removeClass('hide');
              }
              break;
            case 'complicationsDown':
              jQ('#complicationsFields').find('.section:last-child').slideUp('fast', function() {
                jQ(this).remove();
                compCount -= 1;

                sheet.data.usedComp.pop();
                delete sheet.data.comp['desc_'+ compCount +'_complications'];
                delete sheet.data.comp['maj_'+ compCount +'_complications'];
                delete sheet.data.comp['min_'+ compCount +'_complications'];
                delete sheet.data.comp['typeName_'+ compCount +'_complications'];

                sheet.functions.getComplications()
                sheet.functions.saveQueue('comp');
                $countField.text(compCount);

                if(compCount === 0 ) {
                  $this.addClass('hide');
                }
              });
              break;
          }
        });
      },
      compUpdater: function() {
        jQ('#complicationsFields').on("change", "select, input", function() {
          sheet.functions.getSpecialChanges.comp();
        });
        jQ('#complicationsFields').on("focus", "textarea", function() {
          var $this = jQ(this);

          if($this.val() === '(NOTES)') {
            $this.removeClass('new').val('');
          }
        });
        jQ('#complicationsFields').on("blur", "textarea", function() {
          var $this = jQ(this);

          if($this.val() === '') {
            $this.addClass('new').val('(NOTES)');
          }
          sheet.functions.getSpecialChanges.comp();
        });

        jQ('#complicationsFields').on("change", "select", function() {
          jQ('#complicationsFields').find('option').each(function() {
//            enable and disable used skills
            jQ(this).removeAttr('disabled');

            for(var used in sheet.data.usedComp) {
              if(sheet.data.usedComp[used] === jQ(this).val()) {
                jQ(this).attr('disabled', 'disabled');
              }
            }
          });
        });
      },
      assetCountChanger: function() {
        jQ('#assetsUp, #assetsDown').on('click', function() {
          var $this = jQ(this),
              $countField = jQ('#assetsCnt'),
              assetCount = parseInt($countField.text());

          switch($this.attr('id')) {
            case 'assetsUp':
              jQ.ajax({
                url: sheet.settings.newCompAssetUrl,
                type: 'POST',
                data: {'count': assetCount, 'type': 'assets', 'used': sheet.data.usedAsset},
                dataType: 'html',
                success: function(response) {
                  jQ('#assetsFields').append(response).find('.section:last-child').slideDown('fast');
                  if(sheet.functions.getAssets()) {
                    sheet.data.hasChanged = false;
                    sheet.functions.saveQueue('asset');
                  }
                },
                error: function(one, text, error) {
                  sheet.functions.ajaxError(error);
                }
              });

              assetCount += 1;
              $countField.text(assetCount);

              if(assetCount > 0 ) {
                jQ('#assetsDown').removeClass('hide');
              }
              break;
            case 'assetsDown':
              jQ('#assetsFields').find('.section:last-child').slideUp('fast', function() {
                jQ(this).remove();
                assetCount -= 1;

                sheet.data.usedAsset.pop();
                delete sheet.data.asset['desc_'+ assetCount +'_assets'];
                delete sheet.data.asset['maj_'+ assetCount +'_assets'];
                delete sheet.data.asset['min_'+ assetCount +'_assets'];
                delete sheet.data.asset['typeName_'+ assetCount +'_assets'];

                sheet.functions.getAssets();
                sheet.functions.saveQueue('asset');
                $countField.text(assetCount);

                if(assetCount === 0 ) {
                  $this.addClass('hide');
                }
              });
              break;
          }
        });
      },
      assetUpdater: function() {
        jQ('#assetsFields').on("change", "select, input", function() {
          sheet.functions.getSpecialChanges.asset();
        });
        jQ('#assetsFields').on("focus", "textarea", function() {
          var $this = jQ(this);

          if($this.val() === '(NOTES)') {
            $this.removeClass('new').val('');
          }
        });
        jQ('#assetsFields').on("blur", "textarea", function() {
          var $this = jQ(this);

          if($this.val() === '') {
            $this.addClass('new').val('(NOTES)');
          }
          sheet.functions.getSpecialChanges.asset();
        });

        jQ('#assetsFields').on("change", "select", function() {
          jQ('#assetsFields').find('option').each(function() {
//            enable and disable used assets
            jQ(this).removeAttr('disabled');

            for(var used in sheet.data.usedAsset) {
              if(sheet.data.usedAsset[used] !== '========' && sheet.data.usedAsset[used] === jQ(this).val()) {
                jQ(this).attr('disabled', 'disabled');
              }
            }
          });
        });
      },
      checkInputs: {
        generic: function($this, $inputs, type) {
          var sum = 0;

          if($this.val() === "") {
            $this.val(0);
          }
          if ($this.val() % 2 || isNaN($this.val())) {
            sheet.functions.popup("The number needs to corispond to a dice number<br \/><br \/>Meaning it needs to be even.");
            if(typeof $this !== 'undefined') {
              $this.select();
              $this.focus();
            }
            return false;
          }

          $inputs.each(function() {
            sum += parseInt(jQ(this).val());
          });

          sheet.data.defaultPoints['used'+ type +'Points'] = sum;
          sheet.settings['used'+ type +'PointsObj'].val(sum);

          if (sum > sheet.data.defaultPoints['max'+ type +'Points']) {
            sheet.functions.popup('You have use to many points<br \/><br \/>You only have '+ sheet.data.defaultPoints['max'+ type +'Points'] +' points to use.<br \/><br \/>And you have used '+ sum +' so far.');
            if(typeof $this !== 'undefined') {
              $this.select();
              $this.focus();
            }
            return false;
          }
        }
      },
      setDiceClicks: function() {
        jQ(document).find('.diceUI li span').click(function() {
          var $this = jQ(this);

          if($this.data('dice') === 0) {
            sheet.data.usedDice = [];
            sheet.data.dice = {};

            for(var id in sheet.data.displayDice) {
              jQ('#dice_'+ id).addClass('hide').val('').data('roll', '');
            }

            sheet.data.displayDice = [];
          } else {
            var rolled = sheet.functions.getDiceRoll($this.data('dice'));
            sheet.data.displayDice.unshift('D'+ $this.data('dice') +' = '+ rolled);

            while(sheet.data.displayDice.length > 14) {
              sheet.data.displayDice.pop();
            }
            for(var id in sheet.data.displayDice) {
              var $diceDisplay = jQ('#dice_'+ id);

              sheet.data.dice['dice_'+ id] = sheet.data.displayDice[id];
              $diceDisplay.val(sheet.data.displayDice[id]);

              if(sheet.data.displayDice[id].length > 0 && $diceDisplay.hasClass('hide')){
                $diceDisplay.removeClass('hide');
              }
            }
          }

          sheet.functions.getLastRolls();
          sheet.functions.saveQueue('dice');
        });
      },
      getChanges: function() {
//        attache the BLUR listener
        jQ(document).find('.characterInfo input[type=text]').blur(function() {
          if(sheet.functions.getCharacterInfo()) {
            sheet.data.hasChanged = false;
            sheet.functions.ouchCheck();
            sheet.functions.save('characterInfo');
          }
        });

        jQ(document).find('.attributes input[type=text]').blur(function() {
          if(sheet.functions.getAttributes()) {
            sheet.data.hasChanged = false;
            sheet.functions.save('attributes');
          }
        });

        jQ(document).find(".attributes input[type!=hidden]").blur(function() {
          sheet.functions.checkInputs.generic(jQ(this), jQ(document).find(".attributes input"), 'Attr');
        });

        jQ('#skillsContainer').on('blur', 'input',  function() {
          sheet.functions.checkInputs.generic(jQ(this), jQ('#skillsContainer').find('input'), 'Skill');
        });

        jQ('#curntInt, #curntEndur, #curntResist').blur(function() {
          if(sheet.functions.getRolledTraits()) {
            sheet.data.hasChanged = false;
            sheet.functions.save('rolledTraits');
          }
        });

        jQ('#skillsContainer').on("blur", "input[type=text]", function() {
          if(sheet.functions.getSkills()) {
            sheet.data.hasChanged = false;
            sheet.functions.save('skills');
          }
        });

        jQ(document).find('.equipInput textarea').blur(function() {
          if(jQ(this).attr('id') !== 'allitems') {
            sheet.functions.updateAllItemsField();

            if(sheet.functions.getEquipment()) {
              sheet.data.hasChanged = false;
              sheet.functions.save('equipment');
            }
          }
        });

        jQ(document).find('.diceUI span').click(function() {
          if(sheet.functions.getDice()) {
            sheet.data.hasChanged = false;
          }
        });
      },
      getSpecialChanges: {
        skill: function() {
//          not part of getCanges() do to calculations that need to be done before save
          if(sheet.functions.getSkills()) {
            sheet.data.hasChanged = false;
            sheet.functions.save('skills');
          }
        },
        comp: function() {
//          not part of getCanges() do to calculations that need to be done before save
          if(sheet.functions.getComplications()) {
            sheet.data.hasChanged = false;
            sheet.functions.save('comp');
          }
        },
        asset: function() {
//          not part of getCanges() do to calculations that need to be done before save
          if(sheet.functions.getAssets()) {
            sheet.data.hasChanged = false;
            sheet.functions.save('asset');
          }
        }
      },
      saveQueue: function(saveArea){
        if (sheet.settings.queueTimer === null) {
          sheet.data.saveArea = saveArea;
          sheet.settings.queueTimer = setTimeout('sheet.functions.save(); sheet.settings.queueTimer = null;', 3 * 1000);
        }
      },
      save: function(saveArea) {
        saveArea = saveArea || sheet.data.saveArea;

        jQ.ajax({
          url: sheet.settings.saveUrl,
          type: 'POST',
          data: {'data': {'content': JSON.stringify(sheet.data[saveArea]) , 'saveArea': saveArea, 'hash': sheet.data.hash}},
          dataType: 'jsonp',
          jsonpCallback: saveArea +'_callback',
          success: function(response) {
            switch (response.status) {
              case 'done':
                sheet.settings.saveObj.text('Saved');
                break;
              case 'Bad Key':
                sheet.functions.badKey();
              default:
                sheet.settings.saveObj.text(response.status);
            }

            sheet.settings.saveObj.animate({
              top: '+=50'
            }, 500).delay(1000).animate({
              top: '-=50'
            }, 500);
          },
          error: function(one, text, error) {
            sheet.functions.ajaxError(error);
          }
        });
      },
      badKey: function() {
        setTimeout(function() {
          jQ(document).find('.signOut').trigger('click');
        }, 5 * 1000);
        sheet.functions.popup('Your identifacation has been compromised you will be signed out', 'badidea');
      },
      ajaxError: function(error) {
        var html = "<div class='ajaxError'>"+ error +"<\/div>";
        jQ('body').append(html);
      },
      showHideModules: function() {
        jQ(document).find('.close').on('click', function() {
          var $element = jQ(document).find('.'+ jQ(this).parent().attr('id'));

          jQ(this).toggleClass('active');

          if($element.css('display') === 'none') {
            $element.slideDown();
          } else {
            $element.slideUp();
          }
        });
      },
      controlsNumbers: function() {
        jQ('#controlsContainer').click(function() {
          jQ(this).animate({
            top: '-300px'
          },
          700,
          function(){
            jQ('#controlTab').animate({
              top: '0px'
            }, 100);
          });
        });

        jQ('#controlTab').click(function() {
          jQ(this).animate({
            top: '-30px'
          },
          100,
          function() {
            jQ('#controlsContainer').animate({
              top: '0px'
            },
            700);
          });
        });

        jQ('#controlsContainer').delay(5000).trigger('click');
      },
      popup: function(text, type) {
        type = type || '' ;

        if(jQ('#bgOverlay').length === 0) {
          var overlay = '<div id="bgOverlay" class="bgOverlay"><\/div>'+
                        '<div id="popUp" class="popUp"><\/div>';
          jQ('body').append(overlay);
        }

        switch(type) {
          case 'badidea':
          case 'dead':
            jQ('#bgOverlay').addClass('deathOverlay');
            break;
          default:
            jQ('#bgOverlay').removeClass('deathOverlay');
        }

        jQ('#bgOverlay, #popUp').show();

        jQ('#popUp').html(text).css({
          'top': '20%',
          'left': (jQ(window).width() / 2) - (jQ('#popUp').width() / 2) +'px'
        });
        
        if(type !== 'badidea') {
          jQ('#bgOverlay, #popUp').on('click', function() {
            console.log(0);
            jQ('#bgOverlay, #popUp').hide();
          });

          jQ(document).keyup(function(event) {
            if((event.keyCode === 27 || event.keyCode === 13)) {
              jQ('#bgOverlay, #popUp').hide();
            }
          });
        }
      },
      unload: function() {
        jQ.ajax({
          url: './signout/',
          type: 'POST',
          data: {'data': 'unload'}
        });
      },
      signOut: function() {
        jQ(document).find('.signOut').click(function(event) {
          event.preventDefault();

          window.location = jQ(this).attr('href');
        });
      }
    }
  };

jQ(document).ready(function() {
  sheet.functions.init();
});