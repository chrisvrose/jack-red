// Make a response e

//Check if can be responded to
exports.canRespond = msg=>{
    //let words = msg.split(" ")
    return('!'==msg[0])
}

exports.getCommand = msg=>{
    let words = msg.split(" ")
    return words[0].substring(1)
}

exports.getPredicate = msg=>{
    let pred =  msg.split(" ")
    pred.shift();
    return pred.join(" ")
}

exports.magnet = searchterm=>{

}