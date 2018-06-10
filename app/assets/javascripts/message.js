$(function(){
  function buildHTML(message){
      var html = `<div class= "message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">${ message.user.name }
                      </div>
                      <div class="upper-message__date">${ message.created_at }
                      </div>
                    </div>
                    <div class="lower-messagge">
                      <% if message.content.present? %>
                      <p class="lower-messagge__content">${ message.content }
                      </p>
                      <% if message.image.present? %>
                        <img src="${ message.image.url } width:"256" height:"256">
                        <% end %>
                      <% end %>
                    </div>
                  </div>`
      return html;
    }


    $('#new_message').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var href = $(this).attr('action')
      $.ajax({
        url: href,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data) {
        var html = buildHTML(data);
        $('.message').append(html)
        $('#message_content').val('')
        });
    });
})
