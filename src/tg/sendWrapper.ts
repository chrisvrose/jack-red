import { sendMessage } from '../misc/defs'
import got from 'got';
import assert from 'assert';
import delay from '../misc/delay'


/**
 * Buffers the output
 */
export class sendWrapper {
    queue: sendMessage[];
    maxLength: number;
    sendURL: string;
    minDelay: number;
    /**
     * 
     * @param requestURL request URL to send via
     * @param minDelay Minimum delay between
     * @param maxLength Max length of allowed array
     */
    constructor(requestURL: string, minDelay: number = 500, maxLength: number = 100) {
        this.queue = [];
        this.minDelay = minDelay;
        this.sendURL = requestURL + '/sendMessage';
        this.maxLength = maxLength;
    }

    /**
     * 
     * @param message Message to send
     * @returns Whether push was successful
     */
    public async push(message: sendMessage) {
        if (this.queue.length < this.maxLength) {
            this.queue.push(message);
            return true;
        } else {
            console.warn("Too many responses");
            return false;
        }
    }


    public async pushAll(messages:sendMessage[]){
        if (this.queue.length+messages.length < this.maxLength) {
            this.queue.push(...messages);
        } else {
            //best fit
            this.queue.push(...messages.slice(0,this.maxLength-messages.length));
            console.warn("Too many responses");
        }
        return this;
    }

    /**
     * Send all required
     */
    public async popMost(): Promise<boolean> {
        while (this.queue.length > 0) {
            //Removing this
            const element = this.queue.shift()
            if (element) {
                const mintimer = delay(this.minDelay);
                try {
                    const answ = await got.post(this.sendURL, { json: element });
                }catch(e){
                    console.error("Failed to send:",element.text);
                    return false;
                }finally{
                    await mintimer;
                }
            }
        }
        return true;
    }
}