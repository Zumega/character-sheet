var sign = {
      data: {},
      init: function() {
        sign.pickForm();
        sign.enterSubmit();
        sign.submitForm();
//        validateForm();
//        clearForm();
        sign.note();
      },
      pickForm: function() {
//        used to bring more focus to active form
        jQ('#signIn, #signUp').on('focus', 'input', function() {
          var $this = jQ(this),
              thisId = $this.parent().parent().parent().attr('id'),
              thatId = $this.parent().parent().parent().siblings('.signContianer').attr('id');

          sign.data.activeFormId = thisId;
          sign.data.inactiveFormId = thatId;

          jQ('#'+ thatId).animate({
            'opacity': '.5'
          }, 500, function() {

            jQ('#'+ thatId).find('.hideButton').slideUp('fast');
            jQ('#'+ thatId).find('input[type!=button]').val('');
            jQ('#'+ thatId).find('.errorMssg').slideUp('fast');
          });
          jQ('#'+ thisId).animate({
            'opacity': '1'
          }, 500, function() {
            jQ('#'+ thisId).find('.hideButton').slideDown('fast');
          });

          sign.clearForm($this);
        });
      },
      enterSubmit: function() {
        jQ('#signIn, #signUp').on('keyup', 'input', function(event) {
          if(event.keyCode === 13 && !jQ(this).hasClass('signButton')) {
            var $this = jQ(this),
                formId = null;

            while(!$this.hasClass('signContianer')) {
              $this = $this.parent();
            }

            formId = $this.attr('id');
            formId = 'submit'+ formId.charAt(0).toUpperCase() + formId.slice(1);

            jQ('#'+ formId).trigger('click');
          }
        });
      },
      submitForm: function() {
        jQ('#submitSignIn, #submitSignUp').on('click', function(event) {
          event.preventDefault();

          if(sign.validateForm()) {
            jQ('#'+ sign.data.inactiveFormId).slideUp();

            var url = (sign.data.activeFormId === 'signIn') ? './sign/in.php' : './sign/up.php' ,
                $this = jQ('#'+ sign.data.activeFormId);

            $this.find('.signLoading').slideDown('fast');
            $this.find('.sign').slideUp('fast', function() {
              var postData = {
                'email': sign.data.email,
                'name': sign.data.name,
                'charName': sign.data.charName
              }

              jQ.ajax({
                url: url,
                type: 'POST',
                data: postData,
                dataType: 'jsonp',
                jsonpCallback: 'sign',
                success: function(data) {
                  if(data.success){
                    window.location = './';
                  } else {
                    $this.find('.signLoading').slideUp('fast');
                    $this.find('.sign').slideDown('fast');
                    $this.find('.errorMssg').text(data.errors).show();
                    $this.find('input:first').select();

                    if(data.why === 'no record') {
                      jQ('#'+ sign.data.inactiveFormId).slideDown('fast');
                    }
                  }
                },
                error: function(a, b, error) {}
              });
            });
          };
        });
      },
      validateForm: function() {
        var isValid = true;

        jQ('#'+ sign.data.activeFormId).find('input[type!=button]').each(function() {
          var $this = jQ(this);

          sign.data[$this.attr('name')] = $this.val();

          switch ($this.val()) {
            case '':
              $this.val('Manditory');
              isValid = false;
              break;
            case 'Manditory':
            case 'Still Manditory':
              $this.val('Still Manditory');
              isValid = false;
              break;
          }
        });

        return isValid;
      },
      clearForm: function($this) {
        if($this.val() === 'Manditory' || $this.val() === 'Still Manditory') {
          $this.val('');
        }
      },
      note: function() {
        jQ('#submitNote').on('click', function(event) {
          event.preventDefault();

          jQ(this).parent().fadeOut('fast');

          jQ('#inEmail').val('test@test.com').focus();
          setTimeout(function() {
            jQ('#inName').val('Test').focus();
          }, .5 * 1000);
          setTimeout(function() {
            jQ('#inCharName').val('Test').focus();
          }, 1.25 * 1000);
          setTimeout(function() {
            jQ('#submitSignIn').focus();
          }, 1.5 * 1000);
          setTimeout(function() {
            jQ('#submitSignIn').trigger('click');
          }, 2.25 * 1000);
        });
      }
    };


jQ(document).ready(function() {
  sign.init();
});