const tsa = require('torrent-search-api')
tsa.enableProvider('ThePirateBay')
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



let magnet = async searchterm=>{
    console.log(`Search for:${searchterm}`)
    let result = await tsa.search(searchterm)
    let resultString=''
    for(let i=0;i<3;i++){
        let magnet = await tsa.getMagnet(result[i]) || ' '
        resultString = resultString + `*${result[i].title.replace(/[\[\]]/g,'')}* - ${magnet}\n`
    }
    console.log(resultString)
    //console.log(await tsa.getMagnet(result[0]))
    return resultString
}


// The main function, calls the rest
exports.makeResponse = async (text)=>{
    let command = this.getCommand(text)
    let pred = this.getPredicate(text)
    let resultString=''
    if(command=="magnet"){
        resultString = await magnet(pred);
    }
    else{
        resultString = pred
    }
    return resultString
}