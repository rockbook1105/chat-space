json.id @message.id
json.text @message.content
json.created_at @message.created_at.to_s
json.name @message.user.name
json.image @message.image.url
