// Send update object for processing and request to send reply

const process = require('./process')
const request = require('request')

module.exports.call = async (base,updateObject)=>{
    if('message' in updateObject){
        let responseObject = await process(updateObject.message)
        //console.log(process.process(updateObject.message))
        if(responseObject)
        {
            request.post({
                "url":`${base}sendMessage`,
                "json":true,
                "body":responseObject
            },(err,res,body)=>{
                if(err) console.log(err)
                if(body.ok) console.log(`Successfully sent: ${body}`)
            })
        }
    }
}