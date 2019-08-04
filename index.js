// TOREAD: https://core.telegram.org/bots/api
const request = require('request')
const fs = require('fs')
const path = require('path')
//const


const token = JSON.parse( fs.readFileSync('api-token.json')).token
let parameters = JSON.parse(fs.readFileSync('default-parameters.json'))

const base = `https://api.telegram.org/bot${token}/`
console.log(`Token: ${token}`) 

let updateOffset=-1
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
            //console.log(res.body+`${typeof(res.body)}`)

            let contents = res.body||{'ok':false}
            if(!contents.ok){
                console.log(contents)
                throw new Error("Not Ok")
            }
            // contents - Now work on response
            if(contents.result.length>0){
                console.log(`Update:${JSON.stringify(contents.result)}`)
                // Ready to work on
                contents.result.forEach(e=>{
                    console.log(e.update_id)
                    
                })


            }
            else{
                console.log("Empty contents")
            }

            // Allow function to run in next interval since complete
            upDateOngoing=false;
        })
    }    
},1000 )