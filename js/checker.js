const sel=new Set(location.hash.slice(1).split(",").filter(x=>BYID[x]));
const picks=document.getElementById("picks"),q=document.getElementById("q");
function drawPicks(){const s=q.value.toLowerCase();picks.innerHTML=PRODUCTS.filter(p=>p.name.toLowerCase().includes(s)).map(p=>`<label class="pick"><input type="checkbox" value="${p.id}" ${sel.has(p.id)?"checked":""}>${p.name}</label>`).join("")}
const conflict=(a,b)=>BYID[a].bad.includes(b)||BYID[b].bad.includes(a);
const syn=(a,b)=>BYID[a].good.includes(b)||BYID[b].good.includes(a);
function schedule(ids){const S={m:[],d:[],e:[]},order={m:["m","d","e"],d:["d","m","e"],e:["e","d","m"]};const moved=[];
 ids.forEach(id=>{const p=BYID[id];const slot=order[p.time].find(s=>!S[s].some(x=>conflict(x,id)))||p.time;if(slot!==p.time)moved.push([id,slot]);S[slot].push(id)});return [S,moved]}
function res(){const ids=[...sel];const out=document.getElementById("res");if(ids.length<1){out.innerHTML='<p class="mut">Выберите хотя бы одну добавку.</p>';return}
 const C=[],G=[];for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){if(conflict(ids[i],ids[j]))C.push([ids[i],ids[j]]);if(syn(ids[i],ids[j]))G.push([ids[i],ids[j]])}
 const [S,moved]=schedule(ids);const n=id=>BYID[id].name;
 out.innerHTML=`<div class="grid3"><div class="card"><h3>Синергии (${G.length})</h3>${G.map(([a,b])=>`<p><span class="tag good">✓</span> ${n(a)} + ${n(b)}</p>`).join("")||'<p class="mut">Не найдено</p>'}</div>
 <div class="card"><h3>Конфликты / разнести (${C.length})</h3>${C.map(([a,b])=>`<p><span class="tag bad">!</span> ${n(a)} и ${n(b)} — принимать с интервалом не менее 2 часов</p>`).join("")||'<p class="mut">Явных конфликтов не найдено</p>'}</div>
 <div class="card"><h3>Предостережения</h3>${ids.map(id=>`<p style="font-size:.88rem"><b>${n(id)}:</b> ${BYID[id].caution}</p>`).join("")}</div></div>
 <h2 style="margin-top:2.5rem">Предлагаемое расписание</h2>${moved.length?`<p class="mut">Перенесено для разнесения: ${moved.map(([i,s])=>n(i)+" → "+TIME[s]).join(", ")}</p>`:""}
 <div class="sched">${["m","d","e"].map(s=>`<div class="slot"><h4>${TIME[s]}</h4>${S[s].map(id=>`<p>• ${n(id)} <span class="mut" style="font-size:.8rem">(${BYID[id].food?"с едой":"без еды"})</span></p>`).join("")||'<p class="mut">—</p>'}</div>`).join("")}</div>
 <p style="margin-top:1rem"><button class="btn sm dark" id="tocart">Добавить набор в корзину</button> <a class="btn sm" href="reminders.html#${ids.map(id=>id+"@"+(Object.keys(S).find(s=>S[s].includes(id)))).join(",")}">Создать напоминания</a></p>
 ${disclaimer("Проверка основана на общих правилах и не учитывает лекарства и индивидуальные состояния.")}`}
picks.onchange=e=>{e.target.checked?sel.add(e.target.value):sel.delete(e.target.value);res()};
q.oninput=drawPicks;document.getElementById("res").addEventListener("click",e=>{if(e.target.id==="tocart"){[...sel].forEach(id=>{const s=cheapest(id);if(s)Cart.add(s.sku)});toast("Набор добавлен в корзину")}});document.getElementById("clear").onclick=()=>{sel.clear();drawPicks();res()};drawPicks();res();
