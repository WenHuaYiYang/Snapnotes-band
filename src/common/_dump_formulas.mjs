import { writeFileSync } from 'fs'
import builtin from './knowledgeData.js'
import sample from './extras/sample.js'
const all=[['b',builtin],['e',sample]]
const rows=[]
for(const [src,obj] of all)for(const name of Object.keys(obj))for(const it of obj[name]||[]){
  const fs=Array.isArray(it.formulas)?it.formulas.filter(f=>typeof f==='string'&&f):[]
  fs.forEach((f,i)=>rows.push({src,subj:name,id:it.id,idx:i,raw:f}))
}
console.log('TOTAL='+rows.length)
const set=new Set(rows.map(r=>r.raw)); console.log('UNIQ='+set.size)
writeFileSync('_formulas_dump.json', JSON.stringify(rows))
const bySubj={}
rows.forEach(r=>{(bySubj[r.subj]||(bySubj[r.subj]=[])).push(r)})
for(const s of Object.keys(bySubj)){
  console.log('\n=== '+s+'  ('+bySubj[s].length+') ===')
  bySubj[s].forEach(r=>console.log(r.src+'|'+r.id+'|'+r.idx+'  '+r.raw))
}
