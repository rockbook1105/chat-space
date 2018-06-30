$(function(){
  function buildHTML(message){
    if (message.image.url == null){
      message.image.url = ""
    }
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
                    <img src="${message.image.url}",size="256">
                    </div>
                  </div>`
      return html;
    }


    function scrollMessage() {
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast')
    }

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
        scrollMessage()
      });
    });
});

