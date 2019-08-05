// TOREAD: https://core.telegram.org/bots/api
const request = require('request')
const fs = require('fs')
const path = require('path')
const respond = require('./scripts/respond')

const token = JSON.parse( fs.readFileSync('api-token.json')).token
let parameters = JSON.parse(fs.readFileSync('default-parameters.json'))

const base = `https://api.telegram.org/bot${token}/`
console.log(`Token: ${token}`) 

let upDateOngoing=false



setInterval(()=>{

    if(!upDateOngoing){
        upDateOngoing=true;
        request.post(
            {
                "url":`${base}getUpdates`,"json":true,"body": parameters
            },
            (err,res,body)=>{

            // Checking response
            if(err){
                throw err;
            }

            let contents = res.body||{'ok':false}
            if(!contents.ok){
                console.log(contents)
                throw new Error("Not Ok")
            }
            // contents - Now work on response
            if(contents.result.length>0){
                //console.log(`Update:${JSON.stringify(contents.result)}`)
                // Ready to work on
                if(parameters.offset===null){
                    parameters.offset = contents.result[0].update_id + 1
                }
                contents.result.forEach(e=>{
                    if(e.update_id + 1 > parameters.offset)
                    {
                        parameters.offset = e.update_id + 1
                    }
                    //console.log(e.update_id)
                    respond.call(e)
                })


            }
            else{
                console.log("Polling Timed out, empty.")
            }

            // Allow function to run in next interval since complete
            upDateOngoing=false;
        })
    }    
},1000 )