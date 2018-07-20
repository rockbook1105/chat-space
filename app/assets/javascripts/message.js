$(function(){
  function buildHTML(message){
    if (message.image.url == null){
      message.image.url = ""
    }
      var html = `<div class= "message" data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">${ message.name }
                      </div>
                      <div class="upper-message__date">${ message.created_at }
                      </div>
                    </div>
                    <div class="lower-messagge">
                    <p class="lower-messagge__content">${ message.text }
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

  var autoReload = setInterval(function(){
    if(location.pathname.match(/\/groups\/\d+\/messages/)){
      messageUpdate();
    }else{
      clearInterval(autoReload);
    }
  }, 5000);

    function messageUpdate(){
      // if($('.message')[0]){
        var messageId = $('.message').last().data('message-id');
        console.log(messageId)
      // }else{
        // return false
      // }

    $.ajax({
      url: location.href,
      type: "GET",
      data: { id: messageId },
      dataType: 'json'
    })
    .done(function(data){
      console.log(data)
      if(data.length){
      $.each(data, function(i, message){
        var insert_html = buildHTML(message);
        $('.messages').append(insert_html);
        scrollMessage()
        console.log("自動更新に成功しました!")
      });
    }
    })
    .fail(function(data){
      alert('メッセージの更新に失敗しました')
    })
  }
});
