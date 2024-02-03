export type Actions = 
{type: "add", payload: string} 
| {type: "remove", payload: number } 
| {type:"done", payload: number}
| {type:"edit", payload: {id:number, text:string}}