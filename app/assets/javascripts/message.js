$(function(){
  function buildHTML(message){
    var addImage = '';
    if (message.image){
      addImage = `<img src="${message.image}",size="256", class= "lower-message__image">`
    }
      var html = `<div class= "message" data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">${ message.name }
                      </div>
                      <div class="upper-message__date">${ message.created_at }
                      </div>
                    </div>
                    <div class="lower-message">
                    <p class="lower-message__content">${ message.text }
                    </p>
                    ${addImage}
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
        $('#new_message').prop("disable", false);
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
        var messageId = $('.message').last().data('message-id');

    $.ajax({
      url: location.href,
      type: "GET",
      data: { id: messageId },
      dataType: 'json'
    })
    .done(function(data){
      if(data.length){
      data.forEach(function(message){
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
