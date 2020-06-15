
import { getUpdateResultBody, sendMessage } from '../misc/defs';



/**
 * Filter the non-text out
 * @param updates set of updates
 */
export async function replyStrategy(updates: getUpdateResultBody[]) {
    const nonTextMessages = updates.filter(e => e.message && !e.message.text);



    const textMessages = updates.filter(e => e.message && e.message.text);
    
    //Log stats
    if (textMessages.length > 0||nonTextMessages.length > 0) {
        console.log(`Got: ${textMessages.length} text messages,${nonTextMessages.length} weird stuff`);
    }

    const textReplies = await replyText(textMessages);
    const nonTextReplies = await replyNonText(nonTextMessages);

    return [...textReplies,...nonTextReplies];
}


export async function replyText(updates: getUpdateResultBody[]): Promise<sendMessage[]> {
    return updates.map(e => {
        return {
            chat_id: e.message?.from?.id as number,
            reply_to_message_id: e.message?.message_id,
            text: 'Hello World!' 
        };
    })

}

export async function replyNonText(updates: getUpdateResultBody[]):Promise<sendMessage[]> {
    return updates.map(e => {
        return { 
            chat_id: e.message?.from?.id as number,
            text: 'This is useless to me :(',
            reply_to_message_id: e.message?.message_id
        };
    })
}