$(function() {


  function appendSearchUser(user) {
    var html = `<div class="chat-group-user clearfix id='chat-group-user-${ user.id }'">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn id='chat-group-user__btn--add'" data-user-id=${ user.id } data-user-name=${ user.name }>追加</a>
                </div>`
    $("#user-search-result").append(html);
  }

  function addUser(id,name) {
    var html = `<div class='chat-group-user clearfix' id='chat-group-user-${ id }'>
                <input name='group[user_ids][]' type='hidden' value='${ id }'>
                <p class='chat-group-user__name'>${ name }</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn data-user-id="${ id }" data-user-name="${ name }"'>削除</a>
              </div>`
    $("#chat-group-users").append(html)
  }

  function removeUser(id,name) {
    var html = `<div class='chat-group-user clearfix' id='chat-group-user-${ id }'>
                        <input name='group[user_ids][]' type='hidden' value='${ id }'>
                        <p class='chat-group-user__name'>${ name }</p>
                        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn data-user-id="${ id }" data-user-name="${ name }"'>削除</a>
                      </div>`
    $('#chat-group-users').remove(html)
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      users.forEach(function(user) {
        appendSearchUser(user);
      });
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました")
    });
  });


  $("#user-search-result").on("click",'.chat-group-user__btn',function(){
    var id = $(this).data("user-id");
    var name = $(this).data("user-name");
    addUser(id, name);
    $(this).parent('.chat-group-user').remove();
  });

  $('#chat-group-users').on('click', '.user-search-remove', function(){
    var id = $(this).data("user-id");
    var name = $(this).data("user-name");
    $(this).parent().remove();
  })

});

