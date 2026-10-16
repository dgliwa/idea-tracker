import type { CreateIdeaRecord,ListIdeaOptions,UpdateIdeaRecord } from "./persistence/db.js";
import { IdeaDatabase } from "./persistence/db.js";
import type { IdeaPriority,IdeaStatus,LinkKind } from "./types.js";
export class IdeaValidationError extends Error{}
const required=(v:string,label:string,max=20_000)=>{const x=v.trim();if(!x)throw new IdeaValidationError(`${label} cannot be blank.`);if(x.length>max)throw new IdeaValidationError(`${label} cannot exceed ${max} characters.`);return x;};
const optional=(v:string|undefined,label:string,max=20_000)=>v===undefined?undefined:required(v,label,max);
const tags=(values:string[]|undefined)=>[...new Set((values??[]).map(v=>required(v,"tag",100).toLowerCase()))].sort();
function sourceChannel(value:string|undefined|null){if(value==null)return value;const x=value.trim();if(!/^channel:\d{10,25}$/.test(x))throw new IdeaValidationError("sourceChannel must use Discord channel:<id> format.");return x;}
function safeUrl(value:string){const raw=required(value,"url",4_000);let url:URL;try{url=new URL(raw);}catch{throw new IdeaValidationError("url must be an absolute HTTP(S) URL.");}if(!["http:","https:"].includes(url.protocol)||url.username||url.password)throw new IdeaValidationError("url must be a credential-free HTTP(S) URL.");return url.toString();}
export interface AddIdeaInput {title:string;description?:string;category?:string;priority?:IdeaPriority;status?:IdeaStatus;tags?:string[];sourceChannel?:string;}
export class IdeaService{
 constructor(private readonly database:IdeaDatabase,private readonly clock:()=>Date=()=>new Date()){}
 private now(){return this.clock().toISOString();}
 add(input:AddIdeaInput){const record:CreateIdeaRecord={title:required(input.title,"title",500),description:optional(input.description,"description"),category:optional(input.category,"category",200),priority:input.priority??"normal",status:input.status??"inbox",tags:tags(input.tags),sourceChannel:sourceChannel(input.sourceChannel)??undefined};return this.database.create(record,this.now());}
 update(id:string,input:UpdateIdeaRecord){const normalized:UpdateIdeaRecord={...input};if(input.title!==undefined)normalized.title=required(input.title,"title",500);if(typeof input.description==="string")normalized.description=required(input.description,"description");if(typeof input.category==="string")normalized.category=required(input.category,"category",200);if(input.tags!==undefined)normalized.tags=tags(input.tags);normalized.sourceChannel=sourceChannel(input.sourceChannel);const result=this.database.update(id,normalized,this.now());if(!result)throw new IdeaValidationError(`Unknown idea ${id}.`);return result;}
 transition(id:string,status:IdeaStatus,reason?:string){const result=this.database.transition(id,status,optional(reason,"reason",2_000),this.now());if(!result)throw new IdeaValidationError(`Unknown idea ${id}.`);return result;}
 status(id:string){const result=this.database.get(id);if(!result)throw new IdeaValidationError(`Unknown idea ${id}.`);return result;}
 list(options:ListIdeaOptions={}){return this.database.list({...options,category:options.category?.trim(),tag:options.tag?.trim().toLowerCase(),query:options.query?.trim()});}
 addNote(ideaId:string,content:string){const result=this.database.addNote(ideaId,required(content,"content"),this.now());if(!result)throw new IdeaValidationError(`Unknown idea ${ideaId}.`);return result;}
 updateNote(noteId:string,content:string){const result=this.database.updateNote(noteId,required(content,"content"),this.now());if(!result)throw new IdeaValidationError(`Unknown note ${noteId}.`);return result;}
 deleteNote(noteId:string){if(!this.database.deleteNote(noteId,this.now()))throw new IdeaValidationError(`Unknown note ${noteId}.`);return{deleted:true,noteId};}
 addLink(ideaId:string,url:string,label:string|undefined,kind:LinkKind="reference"){try{const result=this.database.addLink(ideaId,safeUrl(url),optional(label,"label",500),kind,this.now());if(!result)throw new IdeaValidationError(`Unknown idea ${ideaId}.`);return result;}catch(error){if(error instanceof Error&&error.message.includes("UNIQUE constraint failed"))throw new IdeaValidationError("That link is already saved on this idea.");throw error;}}
 removeLink(linkId:string){if(!this.database.removeLink(linkId,this.now()))throw new IdeaValidationError(`Unknown link ${linkId}.`);return{deleted:true,linkId};}
 summary(){return this.database.summary();}
}
