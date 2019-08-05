module.exports.call = (updateObject)=>{
    if('message' in updateObject){
        console.log(updateObject.message.text)
        //console.log("New Message")
    }
}