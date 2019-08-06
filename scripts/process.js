// Obtain a sendMessage Object
const makeResponse = require('./makeResponse')

module.exports = async (messageObject)=>{
    if(makeResponse.canRespond(messageObject.text)){
        console.log(makeResponse.getCommand(messageObject.text))
        return {
            "chat_id": messageObject.from.id,
            "text": await makeResponse.makeResponse( messageObject.text ),
            "parse_mode": "Markdown",
            "reply_to_message_id": messageObject.message_id
        }

    }
    else{
        return null
    }
}