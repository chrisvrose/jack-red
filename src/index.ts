import delay from './misc/delay'
import {teleargs,envVars,getUpdateBody} from './misc/defs'
import getName from './misc/getName'
import {getMessage,getInit} from './tg/getWrapper';
import { assert } from 'console';

const token = process.env['JACK_TOKEN'] as string;
if(token===undefined){
    throw new Error('No token');
}

if (require.main === module) {
    
    loop({token}).catch(reason => {
        console.error("E:", reason);
    });
}

//Enable this to see cool viz
// setInterval(()=>console.log("10secs"),10000);

async function loop(args:envVars) {
    const requestURL = 'https://api.telegram.org/bot'+token;
    let name:string;
    try{
        name = await getInit(requestURL);
    }catch(e){
        throw new Error('Cannot get initial details: '+(e.msg||e.message||e.code||'General Error'));
    }
    const selfName = await getName(name);
    console.info(`NAME:${selfName}`);

    let lastUpdate = 0;

    try {
        while (true) {
            //basically, check every second at max
            let x = delay(1000);
            //while we await, we can do other stuff
            lastUpdate = await main({name:selfName,token,requestURL,lastUpdate});
            await x;
        }
    }catch(e){
        console.error("E:",e.msg||e.message||'Error');
        setTimeout(loop,5000);
    }
}

/**
 * 
 * @param args The arguments
 * @returns the last update we got
 */
async function main(args:teleargs) {
    console.debug("Logging Update for:",args.lastUpdate);
    const actions = await getMessage(args);
    const body = actions.body as unknown as getUpdateBody;
    assert(body.ok);
    assert(body.result instanceof Array);
    console.debug(body.result);
    

    //assert(actions.body.ok);
    // const update_id = actions.body.
    // return the update number
    const getMaxMsgUpdateID:number = body.result.reduce((acc,curr)=>{
        return curr.update_id>acc?curr.update_id:acc;
    },args.lastUpdate);
    return getMaxMsgUpdateID;
}

