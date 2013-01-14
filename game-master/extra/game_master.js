var jQ = jQuery,
    gm = {
      data: {},
      functions: {
        init:function() {
          gm.functions.getPlayers();
          gm.functions.groupPlayers();

        },
        getPlayers: function() {
          gm.data.playerIDs = playerIds;
          gm.data.activePlayerCount = 0;

          for(playerid in gm.data.playerIDs) {
            var playerId = gm.data.playerIDs[playerid];

            jQ.ajax({
              url: './includes/player.php',
              type: 'POST',
              data: {'playerId': playerId},
              dataType: 'html',
              success: function(response) {
                gm.data.activePlayerCount += 1;
                var $infoObj = jQ('#characterInfoContainer');

                $infoObj.append(response);
                $infoObj.find('.charactersInfo').css({
                  'width': (100 / gm.data.activePlayerCount) +'%'
                });
              },
              error: function(one, text, error) {
//                sheet.functions.ajaxError(error);
              }
            });
          }
        },
        groupPlayers: function() {
          var allCheck = function () {
            if(gm.data.activePlayerCount === 0) {
              jQ('#players').find('li[data-playerid="all_0"]').addClass('active');
            } else {
              jQ('#players').find('li[data-playerid="all_0"]').removeClass('active');
            }
          }
          jQ('#players').find('li').on("click", function() {
            var $this = jQ(this),
                playerId = $this.data().playerid,
                $charInfo = jQ('#characterInfoContainer').find('.charactersInfo');

            if (playerId === 'all_0') {
              if($this.hasClass('active')) {
                gm.data.activePlayerCount = jQ('#players').find('.playerTab').length -1;
                $charInfo.show();
                $this.parent().children().removeClass('active');
              } else {
                gm.data.activePlayerCount = 0;
                $charInfo.hide();
                $this.parent().children().addClass('active');
              }
            } else {
              $this.toggleClass('active');

              if($this.hasClass('active')) {
                gm.data.activePlayerCount -= 1;
              } else {
                gm.data.activePlayerCount += 1;
              }

              jQ('#characterInfoContainer').find('.'+ playerId).toggle();
              allCheck();
            }

            $charInfo.css({
              'width': (100 / gm.data.activePlayerCount) +'%'
            });
          });
        }
      }
    };


jQ(document).ready(function() {
  gm.functions.init();
});