import { assert } from "console";

export default async function getName(name:string){
    const nameSplit = name.split(/\s+/);
    assert(nameSplit.length>0);
    if(nameSplit.length===1){
        return name;
    }else{
        return name[0];
    }
}