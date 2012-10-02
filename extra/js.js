var jQ = jQuery,
  sheet = {
    settings: {
      saveUrl: './includes/save.php'
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
//        sheet.functions.gitSkills()
//        sheet.functions.skills.getSkillsChanges();
//        sheet.functions.skills.getSubSkillsChanges();

        sheet.functions.setStunWoundClicks();
        sheet.functions.getChanges();
        sheet.functions.ouchCheck();
        sheet.functions.checkAttributeInputs();
        sheet.functions.setDerivedTraits();
        sheet.functions.rolledTraits();

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
        jQ(document).find('.btnUpDown').click(function(){
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

      },

      skillsChanges: {
        getSkillsChanges: function() {
          var $parent = jQ(document).find('.skillsInput'),
            contentId = $parent.find('select:first-child').attr('id');

          $parent.find('.skilColum_1').find('select').change(function() {
            var $this = jQ(this),
                thisID = $this.attr('id').substr(7);

            if(typeof(sheet.data.skills[thisID]) === 'undefined') {
              sheet.data.skills[thisID] = {
                varSkill: $this.val()
              }
            } else {
              sheet.data.skills[thisID]['varSkill'] = $this.val();
            }

          });

          $parent.find('.skilColum_1').find('input[type=text]').blur(function() {
            var $this = jQ(this),
                thisID = $this.attr('id').substr(contentId.length);

            if(typeof(sheet.data.skills[thisID]) === 'undefined') {
              sheet.data.skills[thisID] = {
                intSkillDice: $this.val()
              }
            } else {
              sheet.data.skills[thisID]['intSkillDice'] = parseInt($this.val());
            }
          });
        },
        getSubSkillsChanges: function() {
          var $parent = jQ(document).find('.skillsInput'),
            contentId = $parent.find('select:first-child').attr('id');

          $parent.find('.skilColum_2').find('select').change(function() {
            var $this = jQ(this),
                thisID = $this.attr('id').substr(7);

            if(typeof(sheet.data.skills[thisID]['subskills']) === 'undefined') {
              sheet.data.skills[thisID]['subskills'] = {
                intSkillDice: $this.val()
              }
            } else {
              sheet.data.skills[thisID]['subskills']['intSkillDice'] = parseInt($this.val());
            }
          });
        }
      },


      getChanges: function() {
//        attache the BLUR listener
        jQ(document).find('.characterInfo').find('input[type=text]').blur(function(){
          if(sheet.functions.getCharacterInfo()){
            sheet.data.hasChanged = false;
            sheet.functions.ouchCheck();
            sheet.functions.save('characterInfo');
          }
        });
        jQ(document).find('.attributes').find('input[type=text]').blur(function(){
          if(sheet.functions.getAttributes()){
            sheet.data.hasChanged = false;
            sheet.functions.save('attributes');
          }
        });
      },
      save: function(saveArea){
        var values = '';
        switch(saveArea){
          case 'characterInfo':
            values = sheet.data.characterInfo;
            break;
          case 'attributes':
            values = sheet.data.attributes;
            break;
          case 'rolledTraits':
            values = sheet.data.rolledTraits;
            break;

        }

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
