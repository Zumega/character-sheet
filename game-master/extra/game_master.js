var jQ = jQuery,
    gm = {
      data: {},
      functions: {
        init:function() {
          gm.functions.getNpcInfo();
//          gm.functions.getCharacters();
          gm.functions.groupCharacters();
//          gm.functions.moveCharacters();

            gm.functions.getCreateNPC();
//            gm.functions.getNpcCount();
//            gm.functions.createNPCs.init();
//            gm.functions.createNPCs.setBaseStats();
//            gm.functions.createNPCs.setRollButtons();
//            gm.functions.createNPCs.setNpcName();
//            gm.functions.createNPCs.rollAllDice();
//            gm.functions.createNPCs.diceButton();
//            gm.functions.createNPCs.calcDice();
//            gm.functions.createNPCs.moreNPCs();
//            gm.functions.createNPCs.getSaveData();
//            gm.functions.createNPCs.saveNPC();
        },
        getNpcInfo: function() {
          jQ.ajax({
            url: './modules/npcInfo.php',
            type: 'POST',
            dataType: 'html',
            success: function(response) {
              jQ('#npcs').append(response);
              gm.functions.getCharacters();
            },
            error: function(one, text, error) {
//                sheet.functions.ajaxError(error);
            }
          });
        },
        getCharacters: function() {
          gm.data.playerIDs = playerIds;
          gm.data.playerCount = 0;
          for(i in playerIds) {
            gm.data.playerCount += 1;
          }
          gm.data.activePlayerCount = gm.data.playerCount
          gm.functions.getNpcCount();

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
                  var type = response.type,
                      $infoObj = jQ('#'+ type +'Info'),
                      counter = 0;

                  $infoObj.append(response.html);
                  $infoObj.find('.characterStats').css({
                    'width': (100 / gm.data[type +'Count']) +'%'
                  });

                  if(jQ('#'+ type +'Info').find('.characterStats').length === gm.data[type +'Count']) {
                    gm.functions.moveCharacters(type);
                  }
                },
                error: function(one, text, error) {
  //                sheet.functions.ajaxError(error);
                }
              });
            }
          }
        },
        getNpcCount: function() {
          if (typeof gm.data.npcIDs === "undefined") {
            gm.data.npcIDs = npcIds;
          }
          gm.data.npcCount = 0;
          for(i in gm.data.npcIDs) {
            gm.data.npcCount += 1;
          }
          gm.data.activeNpcCount = gm.data.npcCount
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
          };

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
            console.log(gm.data[type +'IDs'][id]);
            jQ('#'+ type +'Info').append(jQ('#'+ type +'Info').find('.characterStats[data-id="'+ gm.data[type +'IDs'][id] +'"]'));
          }
        },
        getCreateNPC: function() {
          jQ(document).on("click", "#newNPCs", function() {
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
          });
        },
        createNPCs: {
          init: function() {
            if(typeof gm.data.npc === 'undefined') { gm.data.npc = {}; }
            if(typeof gm.data.npc.saveData === 'undefined') { gm.data.npc.saveData = {}; }

            gm.functions.createNPCs.moreNPCs();
            gm.functions.createNPCs.saveNPC();

            jQ(document).find('.chooseBaseStats').on("change", function() {
              var $this = jQ(this),
                  rawDice = $this.find(':selected').data('npcstats').split(',');

              gm.data.npc.dice = new Array();
              gm.data.npc.id = $this.parent().parent().attr('id');

              for(id in rawDice){
                gm.data.npc.dice[id] = rawDice[id].split('|');
              }

              gm.functions.createNPCs.setBaseStats();
              gm.functions.createNPCs.setRollButtons();
              gm.functions.createNPCs.setNpcName();

              gm.functions.createNPCs.rollAllDice();
              gm.functions.createNPCs.diceButton();
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

                $this.val(btnTxt).data('dice', currentVal);
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
          rollAllDice: function() {
            jQ('#'+ gm.data.npc.id).find('.npcValues div').each(function(index) {
              if(index > 0) {
                var $this = jQ(this),
                    currentDice = gm.data.npc.dice[index -1];

                $this.text(gm.functions.createNPCs.calcDice(currentDice));
              }
            });


          },
          diceButton: function() {
            jQ('#'+ gm.data.npc.id).find('.rollDice').on("click", 'input', function(e) {
              e.preventDefault();
              var $this = jQ(this);

              if(typeof $this.data('dice') === 'undefined') {
                gm.functions.createNPCs.rollAllDice();
              } else {
                var rollVal = gm.functions.createNPCs.calcDice($this.data('dice'));

                jQ('#'+ gm.data.npc.id).find('.npc'+ $this.data('id')).text(rollVal);
              }
            });
          },
          calcDice: function(currentDice) {
            var rolledValue = 0,
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

            return rolledValue;
          },
          moreNPCs: function() {
            jQ("#moreNPCs").on("click", function(e) {
              e.preventDefault();

              var $clone = jQ(document).find('.createNPC:last').clone(true),
                  cloneIndex = parseInt($clone.data('index')) + 1;

              $clone.attr('id', 'npc_'+ cloneIndex).data('index', cloneIndex);

              $clone.insertBefore(jQ(this));
            });
          },
          getSaveData: function() {
            jQ(document).find('.createNPC').each(function(index) {
              var $this = jQ(this),
                  dice = {},
                  name = '',
                  hp = '',
                  rolls = {};

              $this.find('.rollDice input').each(function(index) {
                if(index > 0) {
                  var diceData = jQ(this).data('dice');
                  dice[index] = diceData.join('|');
                }
              });

              $this.find('.npcValues div').each(function(index) {
                if(index === 0) {
                  name = jQ(this).find('input').val();
                  hp = jQ(this).find('span').text();
                } else {
                  rolls[index] = jQ(this).text();
                }
              });

              gm.data.npc.saveData[$this.attr('id')] = {
                dice: dice,
                name: name,
                hp: hp,
                rolls: rolls
              };
            });

            return true;
          },
          saveNPC: function() {
            jQ(document).on("click", "#saveNPCs", function() {
              if (gm.functions.createNPCs.getSaveData()) {
                jQ.ajax({
                  url: './includes/saveNPC.php',
                  type: 'POST',
                  data:  {data: JSON.stringify(gm.data.npc.saveData)},
                  dataType: 'json',
                  success: function(response) {
                    gm.data.npcIDs = response.npcIDs;
                    gm.functions.getNpcCount();

                    jQ(document).find('.createNPC').slideUp('slow', function() {
                      jQ(this).replaceWith('');
                      gm.functions.getCharacters();
                    });
                  },
                  error: function(one, text, error) {
//console.log(one);
//console.log(text);
//console.log(error);
                  }
                });
              }
            });
          }
        }
      }
    };


jQ(document).ready(function() {
  gm.functions.init();
});