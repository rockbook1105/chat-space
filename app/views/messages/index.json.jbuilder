json.array! @new_messages.each do |message|
  json.id message.id
  json.name message.user.name
  json.text message.content
  json.created_at message.created_at.to_s
  json.image message.image.url
end
