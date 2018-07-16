$(function(){
  function buildHTML(message){
    if (message.image.url == null){
      message.image.url = ""
    }
      var html = `<div class= "message" data-message-id="${message.id}">
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
        $('#new_message').prop("disable", true);
        $('#new_message')[0].reset();
        scrollMessage()
      });
    });

  $(function(){
    if(location.href.match(/\/groups\/\d+\/messages/)){
      setInterval(messageUpdate, 5000);
    }
  });
    function messageUpdate(){
      if($('.message')[0]){
        var message_id = $('.message').last().data('message-id');
        console.log(message_id)
      }else{
        return false
      }

    $.ajax({
      url: location.href,
      type: "GET",
      data: { id: message_id },
      dataType: 'json'
    })
    .done(function(messages){
      console.log(messages)
      if(messages.length){
      $.each(messages, function(i, messagge){
        var insert_html = buildHTML(message);
        $('.messages').append(insert_html);
        scrollMessage()
      });
    }
    })
    .fail(function(data){
      alert('メッセージの更新に失敗しました')
    })
  }
});
