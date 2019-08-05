// Obtain a sendMessage Object

module.exports = (updateObject)=>{
    return {
        "chat_id": updateObject.from.id,
        "text":updateObject.text,
        "reply_to_message_id": updateObject.message_id
    }
    //return JSON.stringify(updateObject)
}