json.array! @new_messages.each do |message|
  json.id message.id
  json.name message.user.name
  json.text message.text
  json.created_at message.created_at.strftime("%Y年%m月%d日 %H:%M")
  json.image message.image
end
