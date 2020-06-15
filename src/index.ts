import delay from './misc/delay'
import {teleargs,envVars,getUpdateBody} from './misc/defs'
import getName from './misc/getName'
import {getMessage,getInit} from './tg/getWrapper';
import { replyStrategy} from './tg/replyStrategy';
import {sendWrapper} from './tg/sendWrapper'
import { assert } from 'console';

const token = process.env['JACK_TOKEN'] as string;
if(token===undefined){
    throw new Error('No token');
}

if (require.main === module) {
    loop({token}).catch(reason => {
        console.error('E:', reason);
    });
}

/**
 * Main bot loop
 * @param args Environment variables
 */
async function loop(args:envVars) {
    const requestURL = 'https://api.telegram.org/bot'+token;
    let name:string;
    try{
        name = await getInit(requestURL);
    }catch(e){
        throw new Error('Cannot get initial details: '+(e.msg||e.message||e.code||'General Error'));
    }
    const selfName = await getName(name);
    console.info(`Name: ${selfName}`);

    let lastUpdate = 0;

    //configurable parameters
    const pollingInterval = 100;
    const maxArraySize = 64;
    const intervalTimerVal = 1000;

    const sender = new sendWrapper(requestURL,intervalTimerVal/10,maxArraySize);
    const requestArrays:Promise<boolean>[] = []; 
    try {
        while (true) {
            //basically, check every second at max
            let x = delay(intervalTimerVal);
            
            //while we await, we can do other stuff
            const responses= await main({name:selfName,token,requestURL,lastUpdate,timeout: pollingInterval});
            //update the last response number
            lastUpdate = responses.maxMsgUpdateID;
            //push it all in
            await sender.pushAll(responses.sendables);
            
            requestArrays.push(sender.popMost());


            //~~ makes it an integer
            if(requestArrays.length>~~(maxArraySize/10)){
                //ensure the request some time ago has completed.
                //If it hasnt, it should stall everything
                await requestArrays.shift();
            }

            await x;
        }
    }catch(e){
        console.error('E:',e.msg||e.message||'Error');
        setTimeout(loop,pollingInterval*101);
    }
}

/**
 * 
 * @param args The arguments
 * @returns the last update we got
 */
async function main(args:teleargs) {
    // console.debug("Logging Update for:",args.lastUpdate);
    const actions = await getMessage(args);
    const body = actions.body as unknown as getUpdateBody;
    assert(body.ok);
    assert(body.result instanceof Array);

    //Do something
    
    // console.debug(body.result);
    
    const sendables = await replyStrategy(body.result);

    
    // return the update number
    const maxMsgUpdateID:number = body.result.reduce((acc,curr)=>{
        return curr.update_id>acc?curr.update_id:acc;
    },args.lastUpdate);
    return {maxMsgUpdateID,sendables};
}

