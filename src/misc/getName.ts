import { assert } from "console";

export default async function getName(name:string){
    const nameSplit = name.split(/\s+/);
    console.debug(nameSplit);
    assert(nameSplit.length>0);
    if(nameSplit.length===1){
        return name;
    }else{
        return nameSplit[0];
    }
}