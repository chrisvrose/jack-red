declare module 'twss'{
    export let threshold:number;
    export let algo:string;
    export function is(arg:string):boolean;
    export function probability(arg:string):number;
    export function prob(arg:string):number;
}