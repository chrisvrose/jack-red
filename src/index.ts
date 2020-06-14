import delay from './misc/delay'
import {teleargs,envVars} from './misc/defs'
import {getMessage,getInit} from './tg/getWrapper';
import { assert } from 'console';

const token = process.env["JACK_TOKEN"] as string;
if(token===undefined){
    throw new Error("No token");
}

if (require.main === module) {
    
    loop({token}).catch(reason => {
        console.error("E:", reason);
    });
}

async function loop(args:envVars) {
    const requestURL = 'https://api.telegram.org/bot'+token;
    const name = await getInit(requestURL);
    console.info(`NAME:${name}`);
    const selfName = await getName(name);

    let lastUpdate = 0;

    try {
        while (true) {
            //basically, check every second at max
            let x = delay(1000);
            //while we await, we can do other stuff
            lastUpdate = await main({name,token,requestURL,lastUpdate});
            await x;
        }
    }catch(e){
        throw e;
    }
}

/**
 * 
 * @param args The arguments
 * @returns the last update we got
 */
async function main(args:teleargs) {
    const actions = await getMessage(args,);
    // console.debug(actions);

    //assert(actions.body.ok);
    // const update_id = actions.body.
    // return the update number
    return 0;
}

