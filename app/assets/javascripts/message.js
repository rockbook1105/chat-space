$(function(){
  function buildHTML(message){
    if (message.image.url == null){
      var html = `<div class= "message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">${ message.user_name }
                      </div>
                      <div class="upper-message__date">${ message.created_at }
                      </div>
                    </div>
                    <div class="lower-messagge">
                    <p class="lower-messagge__content">${ message.content }
                    </p>
                    </div>
                  </div>`
      return html;
    }else{
      var html = `<div class= "message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">${ message.user_name }
                      </div>
                      <div class="upper-message__date">${ message.created_at }
                      </div>
                    </div>
                    <div class="lower-messagge">
                    <p class="lower-messagge__content">${ message.content }
                    </p>
                    <img src="${message.image.url}" width="256", height="256">
                    </div>
                  </div>`
      return html;
    }
    }

    // function scrollMessage() {
    //   var messageHeight = $('.messages')[0].top;
    //   $('.messages').animate({
    //     scrollTop: messageHeight
    //   }, 'slow', 'swing')
    // }
    $('#new_message').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $('.form__submit').removeAttr('data-disable-with')
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data) {
        var html = buildHTML(data);
        $(".messages").append(html);
        console.log(html)
        $('#new_message').prop("disable", true);
        $('#new_message')[0].reset();
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast')
      });
    });
});
// .animate({ scrollTop: $('.messages').scrollHeight }, 'fast');
