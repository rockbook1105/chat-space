$(function() {

  var word = ""

  function appendSearchUser(user){
    var html = `<div class="chat-group-user clearfix id='chat-group-user-${ user.id }'">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn id='chat-group-user__btn--add'" data-user-id=${ user.id } data-user-name=${ user.name }>追加</a>
                </div>`
     $('.user-search-result').append(html);
  }

  function appendNoUser(message){
    var html =`<div class="chat-group-user clearfix">
                 <div class="chat-group-user__messagge">
                   <div class="chat-group-user__message-list">${message}
                   </div>
                 </div>
               </div>`
    $('.user-search-result').append(html);
  }

  function addUser(id,name) {
    var html = `<div class='chat-group-user clearfix' id='chat-group-user-${ id }'>
                <input name='group[user_ids][]' type='hidden' value='${ id }'>
                <p class='chat-group-user__name'>${ name }</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn data-user-id="${ id }" data-user-name="${ name }"'>削除</a>
              </div>`
    $("#chat-group-users").append(html)
  }

  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault()
    var input = $("#user-search-field").val();
    var newInputs = input.split(" ").filter(function(e){return e;});
    var searchElements = newInputs.join("|");
    var reg = new RegExp(searchElements)
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: reg },
        dataType: 'json'
      })
      .done(function(users){
        if(input.length != 0 && searchElements != word){
          $.each(users, function(i, user){
            if(user.name.match(reg) && searchElements.length < 2){
              appendSearchUser(user);
            }
          });
        }
        if (input == ""){
          appendNoUser("一致するユーザーはいません")
        }
        word = searchElements
      })
      .fail(function(){
        alert('error');
      });
  });

  $(".user-search-result").on("click",'.chat-group-user__btn',function(){
    $(this).parent('.chat-group-user').remove();
    var id = $(this).data("user-id");
    var name = $(this).data("user-name");
    addUser(id, name);
  });

  $('#chat-group-users').on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  })
});

