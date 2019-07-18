// TOREAD: https://core.telegram.org/bots/api
const request = require('request')
const fs = require('fs')
const path = require('path')




const token = JSON.parse( fs.readFileSync('api-token.json')).token
const base = `https://api.telegram.org/bot${token}/`
console.log(`Token: ${token}`) 
request(`${base}getUpdates`,(err,res,body)=>{
    if(err){
        throw err;
    }
    // If response malformed then move into next
    let contents = JSON.parse(res.body||{'ok':false})
    if(!contents.ok){
        throw new Error("Not Ok")
    }
    console.log(`${JSON.stringify(contents.result)}`)
})