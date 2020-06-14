import { string, boolean } from "yargs"

export interface teleargs{
    name:string,
    token:string,
    requestURL:string,
    lastUpdate:number
}
export interface envVars{
    token:string,

}

export interface initBody{
    ok:boolean,
    result:{
        id:number,
        is_bot:boolean,
        first_name:string,
        username:string,
        can_join_groups:boolean,
        can_read_all_group_messages:boolean,
        supports_inline_queries: boolean
    }
}