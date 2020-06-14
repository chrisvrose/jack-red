import assert from 'assert';
import got from 'got';
import { teleargs, initBody } from '../misc/defs';

/**
 * Use the lastUpdate to fetch updates, based on the timeout
 * @param args Config arguments
 */
export async function getMessage(args: teleargs) {
    const {timeout} = args;
    return got(args.requestURL + '/getUpdates', { 
        responseType: 'json' ,
        searchParams: {
            offset: args.lastUpdate+1,
            timeout
        }
    });
}

/**
 * Get the about page for the bot and run some assertions, returning the name
 * @param requestURL request URL for the bot
 */
export async function getInit(requestURL: string): Promise<string> {
    const response = await got(requestURL + "/getMe", { responseType: 'json' });
    const body = response.body as unknown as initBody;

    //This assertion makes sure we dont get undefined values into the rest of the program
    assert(body.ok);
    assert(body.result.is_bot);
    return body.result.first_name as string;
}