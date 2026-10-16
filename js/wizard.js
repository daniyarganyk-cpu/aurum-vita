const Q=[["gender","Ваш пол",[["f","Женский"],["m","Мужской"]]],["age","Возраст",[["18","18–29"],["30","30–49"],["50","50+"]]],
["goal","Главная цель",[["energy","Энергия"],["sleep","Сон"],["stress","Стресс"],["immunity","Иммунитет"],["beauty","Кожа, волосы, ногти"],["brain","Мозг и память"],["heart","Сердце"],["gut","Микрофлора"],["sport","Спорт"],["pregnancy","Планирование/беременность"]]],
["diet","Тип питания",[["omni","Всеядный"],["veg","Вегетарианский"],["vegan","Веганский"],["keto","Кето / низкоуглеводный"]]],
["act","Активность",[["low","Низкая"],["mid","Умеренная"],["high","Высокая / тренировки 3+ раза"]]]];
const A={};let i=0;const w=document.getElementById("wiz");
function draw(){document.getElementById("bar").style.width=(i/Q.length*100)+"%";if(i>=Q.length)return result();const [k,t,o]=Q[i];
 w.innerHTML=`<div class="card"><div class="eyebrow">Шаг ${i+1} из ${Q.length}</div><h2>${t}</h2><div class="opts">${o.filter(([v])=>!(k==="goal"&&v==="pregnancy"&&A.gender==="m")).map(([v,l])=>`<button class="opt ${A[k]===v?"on":""}" data-v="${v}">${l}</button>`).join("")}</div>${i?'<button class="btn sm ghost" style="color:var(--em)" id="back">Назад</button>':""}</div>`;
 w.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{A[k]=b.dataset.v;i++;draw()});const bk=document.getElementById("back");if(bk)bk.onclick=()=>{i--;draw()}}
function result(){const s=new Set();
 const G={energy:["bcomplex","coq10","rhodiola"],sleep:["magGly","glycine","lthean"],stress:["magGly","ashwa","bcomplex"],immunity:["vitC","zinc","vitD3"],beauty:["collagen","vitC","b7"],brain:["omega3","lionsmane","creatine"],heart:["omega3","coq10","k2"],gut:["probio","inulin"],sport:["creatine","whey","magCit"],pregnancy:["prenatal","omega3"]};
 if(A.goal==="pregnancy"){G.pregnancy.forEach(x=>s.add(x));}else{s.add("vitD3");if(A.goal!=="heart")s.add("omega3");G[A.goal].forEach(x=>s.add(x));}
 if(A.diet==="vegan"){s.add("b12");s.delete("omega3");s.add("algae");if(s.has("whey"))s.delete("whey"),s.add("plantprot");s.delete("collagen")}
 if(A.diet==="veg")s.add("b12");if(A.diet==="keto")s.add("magCit");
 if(A.age==="50"){s.add("b12");s.add("k2");if(A.goal!=="pregnancy")s.add("creatine")}
 if(A.act==="high"){s.add("creatine");s.add("magCit")}
 if(s.has("magCit")&&s.has("magGly"))s.delete("magCit");
 if(A.goal==="pregnancy")["ashwa","rhodiola","creatine","lionsmane"].forEach(x=>s.delete(x));
 const ids=[...s];const S={m:[],d:[],e:[]};const ord={m:["m","d","e"],d:["d","m","e"],e:["e","d","m"]};
 const cf=(a,b)=>BYID[a].bad.includes(b)||BYID[b].bad.includes(a);
 ids.forEach(id=>{const sl=ord[BYID[id].time].find(x=>!S[x].some(y=>cf(y,id)))||BYID[id].time;S[sl].push(id)});
 w.innerHTML=`<div class="card"><div class="eyebrow">Ваш результат</div><h2>Рекомендованный комплекс</h2>
 ${A.goal==="pregnancy"?disclaimer("При беременности и её планировании все добавки подбирает только врач. Адаптогены и грибные экстракты исключены."):""}
 <div class="grid3">${ids.map(id=>`<div class="card" style="box-shadow:none"><h4 style="font-size:1.25rem">${BYID[id].name}</h4><p class="mut" style="font-size:.88rem">${BYID[id].dose}</p></div>`).join("")}</div>
 <h3 style="margin-top:2rem">Расписание</h3><div class="sched">${["m","d","e"].map(x=>`<div class="slot"><h4>${TIME[x]}</h4>${S[x].map(id=>`<p>• ${BYID[id].name}</p>`).join("")||"—"}</div>`).join("")}</div>
 <p style="margin-top:1.5rem"><a class="btn" href="checker.html#${ids.join(",")}">Подробная проверка</a> <a class="btn dark" href="reminders.html#${ids.map(id=>id+"@"+Object.keys(S).find(k=>S[k].includes(id))).join(",")}">Создать напоминания</a> <button class="btn" id="wcart">Весь комплекс в корзину</button> <button class="btn dark" id="wsave">Сохранить план</button> <button class="btn ghost" style="color:var(--em)" id="re">Пройти заново</button></p>
 ${disclaimer("Это общий ориентир, а не назначение. Сдайте базовые анализы (например, витамин D, ферритин, B12) и обсудите план с врачом.")}</div>`;
 const tot=ids.reduce((a,id)=>a+(cheapest(id)?unitPrice(cheapest(id)):0),0);w.querySelector(".sched").insertAdjacentHTML("afterend",`<p class="mut" style="margin-top:1rem">Ориентировочная стоимость набора: <b>${fmt(tot)}</b> (цены — пример)</p>`);
 document.getElementById("wcart").onclick=()=>{ids.forEach(id=>{const s=cheapest(id);if(s)Cart.add(s.sku)});toast("Комплекс добавлен в корзину")};
 document.getElementById("wsave").onclick=()=>{const p=LS.get("av_plans",[]);p.unshift({title:"План: "+Q[2][2].find(o=>o[0]===A.goal)[1],ids,date:new Date().toLocaleDateString("ru-RU")});LS.set("av_plans",p);toast("План сохранён в личном кабинете")};
 document.getElementById("re").onclick=()=>{i=0;for(const k in A)delete A[k];draw()}}
draw();
