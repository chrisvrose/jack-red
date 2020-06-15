import { string, boolean } from "yargs"

export interface teleargs{
    name:string,
    token:string,
    requestURL:string,
    lastUpdate:number,
    timeout:number
}
export interface envVars{
    token:string,

}

export interface userObj{
    id:number,
    is_bot:boolean,
    first_name:string,
    last_name?:string,
    username?:string
}
export interface messageObj{
    message_id:number,
    from?:userObj,//TODOF add user
    date:number,
    chat:any,//TODOF add Chat
    audio?:any,
    document?:any,
    photo?:any,
    sticker?:any,
    caption?:string,
    text?:string
}

export interface getUpdateResultBody{
    update_id:number,
    message?:messageObj
}
export interface getUpdateBody{
    ok:boolean,
    result:getUpdateResultBody[]
}

export interface sendMessage{
    chat_id:number,
    text:string,
    disable_notification?:boolean,
    reply_to_message_id?: number
}

export interface initBody{
    ok:boolean,
    result:userObj
}