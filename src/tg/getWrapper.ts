import assert from 'assert';
import got from 'got';
import {teleargs,initBody} from '../misc/defs';

export async function getMessage(args:teleargs){
    return got(args.requestURL+'/getUpdates',{responseType:'json'});
}

export async function getInit(requestURL:string):Promise<string>{
    const response = await got(requestURL+"/getMe",{responseType:'json'});
    const body = response.body as unknown as initBody;

    //This assertion makes sure we dont get undefined values into the rest of the program
    assert(body.ok); 
    assert(body.result.is_bot);
    return body.result.first_name as string;
}