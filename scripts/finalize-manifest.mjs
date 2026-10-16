import { readFile,writeFile } from "node:fs/promises";
const path=new URL("../openclaw.plugin.json",import.meta.url);const manifest=JSON.parse(await readFile(path,"utf8"));
for(const name of ["idea_add","idea_update","idea_transition","idea_note_add","idea_note_update","idea_note_delete","idea_link_add","idea_link_remove"]){manifest.toolMetadata??={};manifest.toolMetadata[name]={...(manifest.toolMetadata[name]??{}),sideEffecting:true};}
await writeFile(path,`${JSON.stringify(manifest,null,2)}\n`);
