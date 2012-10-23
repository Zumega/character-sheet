var sign = {
      data: {},
      init: function() {
        sign.pickForm();
//        clearForm();
        sign.submitForm();
//        validateForm();
      },
      pickForm: function() {
//        used to bring more focus to active form
        jQ('#signIn, #signUp').on('focus', 'input', function() {
          var $this = jQ(this),
              thisId = $this.parent().parent().parent().attr('id'),
              thatId = $this.parent().parent().parent().siblings().attr('id');

          sign.data.activeFormId = thisId;
          sign.data.inactiveFormId = thatId;

          jQ('#'+ thatId).animate({
            'opacity': '.5'
          }, 500, function() {
            jQ('#'+ thatId).find('.hideButton').slideUp('fast');
            jQ('#'+ thatId).find('input[type!=button]').val('');
          });
          jQ('#'+ thisId).animate({
            'opacity': '1'
          }, 500, function() {
            jQ('#'+ thisId).find('.hideButton').slideDown('fast');
          });

          sign.clearForm($this);
        });
      },
      clearForm: function($this) {
        if($this.val() === 'Manditory' || $this.val() === 'Still Manditory') {
          $this.val('');
        }
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
                  console.log(data);
                  if(data.success){
                    window.location = './';
                  } else {
                    $this.find('.signLoading').slideUp('fast');
                    $this.find('.sign').slideDown('fast');
                    $this.find('.errorMssg').text(data.errors).show();
                    $this.find('input:first').select();
                  }
                },
                error: function(a, b, error) {}
              });
            });
          };
        });
      },
      validateForm: function() {
        var returning = true;

        jQ('#'+ sign.data.activeFormId).find('input[type!=button]').each(function() {
          var $this = jQ(this);

          sign.data[$this.attr('name')] = $this.val();

          if($this.val() === '') {
            $this.val('Manditory');
            returning = false;
          } else if ($this.val() === 'Manditory') {
            $this.val('Still Manditory');
            returning = false;
          }
        });
        return returning;
      }
    };


jQ(document).ready(function() {
  sign.init();
});