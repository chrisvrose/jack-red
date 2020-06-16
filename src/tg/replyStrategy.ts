
import { getUpdateResultBody, sendMessage } from '../misc/defs';
import twss from 'twss';


/**
 * Filter the non-text out
 * @param updates set of updates
 */
export async function replyStrategy(updates: getUpdateResultBody[]) {
    const nonTextMessages = updates.filter(e => e.message && !e.message.text);



    const textMessages = updates.filter(e => e.message && e.message.text);

    //Log stats
    if (textMessages.length > 0 || nonTextMessages.length > 0) {
        console.log(`Got: ${textMessages.length} text messages,${nonTextMessages.length} weird stuff`);
    }

    const textReplies = await replyText(textMessages);
    const nonTextReplies = await replyNonText(nonTextMessages);

    return [...textReplies, ...nonTextReplies];
}


export async function replyText(updates: getUpdateResultBody[]): Promise<sendMessage[]> {
    return updates.map(e => {
        const { text, reply_to_message_id } = getReplyTextSingle(e)
        return {
            chat_id: e.message?.from?.id as number,
            reply_to_message_id,
            text
        };
    })

}

export function getReplyTextSingle(update: getUpdateResultBody): { text: string, reply_to_message_id?: number } {
    //get commands first
    if ((update.message?.text ?? '').toLowerCase().startsWith('/get')) {
        const text = update.message?.text ?? '';
        const caseval = text.split(' ');
        if (caseval.length > 1) {
            switch (caseval[1]) {
                case 'prob':
                    return { text: twss.threshold.toString(), reply_to_message_id: update.message?.message_id }
                case 'algo':
                    return { text: twss.algo, reply_to_message_id: update.message?.message_id }
                default:
                    return {text: 'No.', reply_to_message_id: update.message?.message_id }
            }
        } else {
            return { text: 'No.', reply_to_message_id: update.message?.message_id }
        }
    }

    //then a twss :P
    if (twss.is(update.message?.text ?? '')) {
        return { text: "That's what she said ( ͡° ͜ʖ ͡°)", reply_to_message_id: update.message?.message_id };
    }

    return { text: ':D' };
}

export async function replyNonText(updates: getUpdateResultBody[]): Promise<sendMessage[]> {
    return updates.map(e => {
        return {
            chat_id: e.message?.from?.id as number,
            text: 'This is useless to me :(',
            reply_to_message_id: e.message?.message_id
        };
    })
}