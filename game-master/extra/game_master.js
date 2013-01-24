var jQ = jQuery,
    gm = {
      data: {
        npc:{}
      },
      functions: {
        init:function() {
//          gm.functions.getCharacters();
//          gm.functions.groupCharacters();
////          gm.functions.moveCharacters();

            gm.functions.getCreateNPC();
        },
        getCharacters: function() {
          gm.data.playerIDs = playerIds;
          gm.data.playerCount = 0;
          for(i in playerIds) {
            gm.data.playerCount += 1;
          }
          gm.data.activePlayerCount = gm.data.playerCount

          gm.data.npcIDs = npcIds;
          gm.data.npcCount = 0;
          for(i in npcIds) {
            gm.data.npcCount += 1;
          }
          gm.data.activeNpcCount = gm.data.npcCount

          var types = new Array('player', 'npc');

          for(var i=0; i<=1; i+=1) {
            var type = types[i];

            jQ('#'+ type +'Info').text('');

            for(id in gm.data[type +'IDs']) {
              var characterId = gm.data[type +'IDs'][id],
                  data = {};

              data[type +'Id'] = characterId;

              jQ.ajax({
                url: './includes/'+ type +'.php',
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function(response) {
                  var type = (response.type === 'player') ? 'Player' : 'NPC' ,
                      $infoObj = jQ('#'+ type.toLowerCase() +'Info'),
                      counter = 0;

                  $infoObj.append(response.html);
                  $infoObj.find('.characterStats').css({
                    'width': (100 / gm.data[type.toLowerCase() +'Count']) +'%'
                  });

                  if(jQ('#playerInfo').find('.characterStats').length === gm.data.playerCount) {
                    gm.functions.moveCharacters('player');
                  }
                  if(jQ('#npcInfo').find('.characterStats').length === gm.data.npcCount) {
                    gm.functions.moveCharacters('npc');
                  }
                },
                error: function(one, text, error) {
  //                sheet.functions.ajaxError(error);
                }
              });
            }
          }
        },
        groupCharacters: function() {
          var allCheck = function (activeCount, objID) {
            if(gm.data[activeCount] === 0) {
              jQ('#'+ objID +'s').find('li[data-characterid="all_0"]').addClass('active');
            } else {
              jQ('#'+ objID +'s').find('li[data-characterid="all_0"]').removeClass('active');
            }
          },
          ucFirst = function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }

          jQ('#players, #npcs').find('li').on("click", function() {
            var $this = jQ(this),
                objID = ($this.parent().attr('id')).slice(0,-1),
                characterId = $this.data().characterid,
                $charInfo = jQ('#'+ objID +'Info').find('.characterStats'),
                activeCount = 'active'+ ucFirst(objID) +'Count';

            if (characterId === 'all_0') {
              if($this.hasClass('active')) {
                gm.data[activeCount] = jQ('#'+ objID +'s').find('.characterTab').length -1;
                $charInfo.show();
                $this.parent().children().removeClass('active');
              } else {
                gm.data[activeCount] = 0;
                $charInfo.hide();
                $this.parent().children().addClass('active');
              }
            } else {
              $this.toggleClass('active');

              if($this.hasClass('active')) {
                gm.data[activeCount] -= 1;
              } else {
                gm.data[activeCount] += 1;
              }

              jQ('#'+ objID +'Info').find('.'+ characterId).toggle();
              allCheck(activeCount, objID);
            }

            $charInfo.css({
              'width': (100 / gm.data[activeCount]) +'%'
            });
          });
        },
        moveCharacters: function(type) {
          for(id in gm.data[type +'IDs']) {
            jQ('#'+ type +'Info').append(jQ('#'+ type +'Info').find('.characterStats[data-id="'+ gm.data[type +'IDs'][id] +'"]'));
          }
        },
        getCreateNPC: function() {
//          jQ('#newNPCs').on("click", function(e) {
//            e.preventDefault();

            jQ.ajax({
              url: './includes/createNPC.php',
              type: 'POST',
              dataType: 'html',
              success: function(response) {
                jQ('#createNpcContainer').append(response);
                gm.functions.createNPCs.init();
              },
              error: function(one, text, error) {
  //                sheet.functions.ajaxError(error);
              }
            });
//          });
        },
        createNPCs: {
          init: function() {
            jQ(document).find('.chooseBaseStats').on("change", function() {
              var $this = jQ(this);

              gm.data.npc.rawDice = $this.find(':selected').data('npcstats').split(','),
              gm.data.npc.dice = new Array(),
              gm.data.npc.id = $this.parent().parent().attr('id');

              for(id in gm.data.npc.rawDice){
                gm.data.npc.dice[id] = gm.data.npc.rawDice[id].split('|');
              }

              gm.functions.createNPCs.setBaseStats();
              gm.functions.createNPCs.setRollButtons();
              gm.functions.createNPCs.setNpcName();

              gm.functions.createNPCs.getRolls();

              gm.functions.createNPCs.rollDice();
            });
          },
          setBaseStats: function() {
            jQ('#'+ gm.data.npc.id).find('.npcDice input').each(function(index) {
              var $this = jQ(this),
                  currentVal = gm.data.npc.dice[index],
                  newVal = new Array(),
                  newHP = 0;

              for(id in currentVal) {
                if(parseInt(currentVal[id]) === 0) {
                  $this.removeAttr('disabled');
                } else {
                  $this.attr('disabled','disabled');
                }

                newVal[id] = 'D'+ currentVal[id];

                if(index === 2) {
                  var val = newVal[id].substr(1);
                  newHP += parseInt(val);
                }
              }

              newVal = newVal.join(" + ");

              $this.val(newVal);
              if(index === 2) {
                jQ('#'+ gm.data.npc.id).find('.npcHP').text(newHP);
              }
            });
          },
          setRollButtons: function() {
            jQ('#'+ gm.data.npc.id).find('.rollDice input').each(function(index) {
              var $this = jQ(this);

              if(index === 0) {
                $this.data('dice', gm.data.npc.rawDice);
                $this.removeAttr('disabled');

                if (parseInt(gm.data.npc.dice[index]) === 0) {
                  $this.attr('disabled', 'disabled');
                }
              } else {
                var currentVal = gm.data.npc.dice[index -1],
                    newVal = new Array(),
                    btnTxt = 'Roll ';

                if (currentVal.length === 1) { btnTxt += 'a '; }

                $this.removeAttr('disabled');

                for(id in currentVal) {
                  if (parseInt(currentVal[id]) === 0) {
                    $this.attr('disabled', 'disabled');
                  }
                  newVal[id] = 'D'+ currentVal[id];
                }
                btnTxt += newVal.join(" + ");

                $this.val(btnTxt);
              }
            });
          },
          setNpcName: function() {
            var $this = jQ('#'+ gm.data.npc.id).find('.chooseBaseStats'),
                thisName = '';

            if(parseInt($this.val()) > 0) {
              thisName = $this.find(':selected').text();
            }

            jQ('#'+ gm.data.npc.id).find('.npcNameInput input').val(thisName);
          },
          getRolls: function() {
            jQ('#'+ gm.data.npc.id).find('.npcValues div').each(function(index) {
              if(index > 0) {
                var $this = jQ(this),
                    rolledValue = 0,
                    currentDice = gm.data.npc.dice[index -1],
                    min = currentDice.length,
                    max = 12;


                switch(currentDice.length) {
                  case 1:
                    max = parseInt(currentDice[0]);
                    break;
                  case 2:
                    max = parseInt(currentDice[0]) + parseInt(currentDice[1]);
                    break;
                  case 3:
                    max = parseInt(currentDice[0]) + parseInt(currentDice[1]) + parseInt(currentDice[2]);
                    break;
                  case 4:
                    max = parseInt(currentDice[0]) + parseInt(currentDice[1]) + parseInt(currentDice[2]) + parseInt(currentDice[3]);
                    break;
                }

                if(max > min) {
                  while (rolledValue < min || rolledValue > max) {
                    rolledValue = Math.round(Math.random() * max);
                  }
                }

                $this.text(rolledValue);
              }
            });


          },
          rollDice: function() {
            jQ('#'+ gm.data.npc.id).find('.rollDice').on("click", 'input', function(e) {
              e.preventDefault();

              var $this = jQ(this);

              console.log($this.val());
            });
          }
        }
      }
    };


jQ(document).ready(function() {
  gm.functions.init();
});