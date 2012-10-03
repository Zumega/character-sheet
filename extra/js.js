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
      hasChanged: false
    },
    functions: {
      init: function(){
        sheet.settings.saveObj = jQ('#saveMessage');
        sheet.settings.woundBarObj = jQ('#woundPointBar');
        sheet.settings.stunBarObj = jQ('#stunPointBar');
        sheet.settings.usedAttrPointsObj = jQ('#usedAttrPoints');

        sheet.functions.getDefalutPoints();
        sheet.functions.getCharacterInfo();
        sheet.functions.getAttributes();
        sheet.functions.getDerivdTraits();
        sheet.functions.getSkills();

        sheet.data.hasChanged = false;

        sheet.functions.setStunWoundClicks();
        sheet.functions.getChanges();
        sheet.functions.ouchCheck();
        sheet.functions.checkAttributeInputs();
        sheet.functions.rolledTraits();
        sheet.functions.skillCountChanger();

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
          WPercent = (100 / sheet.data.derivedTraits.lifePoints) * sheet.data.characterInfo.woundPoints,
          SPercent = (100 / sheet.data.derivedTraits.lifePoints) * sheet.data.characterInfo.stunPoints,
          WndColor = 100 - (100 / sheet.data.derivedTraits.lifePoints) * totalPoints,
          StnColor = 100 - (100 / sheet.data.derivedTraits.lifePoints) * totalPoints;

        sheet.settings.woundBarObj.css({"width": WPercent +'%', "background": 'rgb(100%, '+ WndColor +'%, '+ WndColor +'%)'});
        sheet.settings.stunBarObj.css({"width": SPercent + '%', "background": 'rgb(100%, '+ StnColor +'%, 100%)'});

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
      getDerivdTraits: function() {
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
              sheet.data.derivedTraits.initiative = initiative;
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
              jQ("#lifePoints").val(lifePoints);
              sheet.data.derivedTraits.lifePoints = lifePoints;
              sheet.functions.ouchCheck();

              endurance = "D"+ d1 +" + D"+ d2;
              endurance += (d3 != 0)? " + D"+ d3 : '' ;
              endurance += (d4 != 0)? " + D"+ d4 : '' ;

              jQ("#endur").val(endurance);
              sheet.data.derivedTraits.endurance = endurance;
              break;
          }
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
          case 'skills':
            values = sheet.data.skills;
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
