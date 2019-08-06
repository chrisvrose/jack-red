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

exports.magnet = async searchterm=>{
    console.log(`Search for:${searchterm}`)
    let result = await tsa.search(searchterm,5)
    let resultString=''
    for(let i=0;i<3;i++){
        let magnet = await tsa.getMagnet(result[i]) || ' '
        resultString = resultString + `*${result[i].title.replace(/[\[\]]/g,'')}* - ${magnet}\n`
    }
    console.log(resultString)
    //console.log(await tsa.getMagnet(result[0]))
    return resultString
}