// Консультант Aurum·Vita: работает прямо в браузере по данным каталога, без сервера и ИИ-ключей.
(function(){
const ALIAS={vitA:["витамин а","витамин a","ретинол"],b1:["b1","в1","тиамин"],b2:["b2","в2","рибофлавин"],b3:["b3","в3","ниацин"],b5:["b5","в5","пантотен"],b6:["b6","в6","пиридоксин","p-5-p"],b7:["биотин","b7","в7"],b9:["фолат","фолиев","b9","в9","метилфолат"],b12:["b12","в12","кобаламин"],bcomplex:["b-комплекс","в-комплекс","b комплекс","группы b","группы в"],vitC:["витамин c","витамин с","аскорбин"],vitD3:["d3","д3","витамин d","витамин д"],vitE:["витамин e","витамин е","токоферол"],k2:["k2","к2","mk-7"],magCit:["магний цитрат","цитрат магния"],magGly:["магний","магния","глицинат"],magTh:["треонат"],zinc:["цинк"],iron:["желез"],calcium:["кальци"],selenium:["селен"],iodine:["йод"],omega3:["омега","рыбий жир","epa","dha"],algae:["водоросл"],collagen:["коллаген"],probio:["пробиотик"],inulin:["пребиотик","инулин"],coq10:["q10","коэнзим","убихинол"],nac:["nac","ацетилцистеин"],glut:["глутатион"],milkth:["расторопш","силимарин"],chlorella:["хлорелл"],spirulina:["спирулин"],ashwa:["ашваганд","ашваганд"],rhodiola:["родиол"],lthean:["теанин"],greentea:["зелёного чая","зеленого чая","egcg"],lionsmane:["ежовик","lion"],reishi:["рейши"],chaga:["чага","чаги"],cordyceps:["кордицепс"],mushblend:["грибной комплекс","грибы","грибов"],whey:["сывороточн","протеин"],casein:["казеин"],plantprot:["растительный протеин"],creatine:["креатин"],bcaa:["bcaa","eaa","аминокислот"],glycine:["глицин "],prenatal:["пренатал"],multi:["мультивитамин"],chia:["чиа"],flaxoil:["льнян"],almond:["миндал"],matcha:["матча","матчу"],protbar:["батончик"],granola:["гранол"]};
const GOALW={hair:["волос"],skin:["кож"],nails:["ногт"],heart:["сердц","сосуд","давлен"],immunity:["иммун","простуд","болею"],energy:["энерги","устал","бодрост","сил нет"],sleep:["сон","сна","сплю","бессон","уснуть"],stress:["стресс","тревог","нервы","нервн"],brain:["мозг","памят","концентрац","фокус"],detox:["печен","детокс"],gut:["кишеч","живот","пищевар","микрофлор"],sport:["спорт","трениров","мышц","восстановлен"],women:["женщин","для девушек"],men:["мужчин"],age50:["50+","пожил","возраст"],pregnancy:["беремен"],vegan:["веган"]};
const LIMIT=["ашвага","грибы","грибов"];
const low=s=>" "+s.toLowerCase().replace(/ё/g,"е")+" ";
function findProducts(t){const hits=[];for(const [id,ws] of Object.entries(ALIAS)){if(!BYID[id])continue;for(const w of ws){const i=t.indexOf(w.replace(/ё/g,"е"));if(i>=0){hits.push([i,id]);break}}}
 hits.sort((a,b)=>a[0]-b[0]);const ids=[...new Set(hits.map(h=>h[1]))];
 if(ids.includes("magCit")||ids.includes("magTh"))return ids.filter(x=>x!=="magGly");if(ids.includes("plantprot"))return ids.filter(x=>x!=="whey");if(ids.includes("algae")&&!/рыб/.test(t))return ids.filter(x=>x!=="omega3");return ids}
function findGoals(t){return Object.entries(GOALW).filter(([g,ws])=>ws.some(w=>t.includes(w))).map(([g])=>g)}
const link=id=>{const s=cheapest(id);return s?`<a href="product.html?id=${s.sku}">${BYID[id].name}</a> <span class="cmut">от ${fmt(unitPrice(s))}</span>`:BYID[id].name};
const timeTxt=p=>`${TIME[p.time].toLowerCase()}, ${p.food?"во время еды":"можно натощак"}`;
function aboutOne(id,t){const p=BYID[id];const wantTime=/когда|время|утр|вечер|натощак|до еды|после еды/.test(t),wantDose=/доз|сколько|мг|мкг/.test(t);
 let h=`<b>${p.name}</b><br>${p.desc}`;
 if(!wantTime&&!wantDose)h+=`<br><i>Зачем:</i> ${p.benefits}`;
 h+=`<br><i>Когда:</i> ${timeTxt(p)}.<br><i>Дозировка:</i> ${p.dose}`;
 if(p.good.length)h+=`<br><i>Хорошо сочетается с:</i> ${p.good.filter(x=>BYID[x]).map(x=>BYID[x].name).join(", ")}.`;
 if(p.bad.length)h+=`<br><i>Разносите по времени с:</i> ${p.bad.filter(x=>BYID[x]).map(x=>BYID[x].name).join(", ")}.`;
 if(p.caution)h+=`<br><span class="cwarn">Важно: ${p.caution}</span>`;
 return h+`<br>${link(id)}`}
function pair(ids){const out=[];for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){const a=BYID[ids[i]],b=BYID[ids[j]];
 const bad=a.bad.includes(b.id)||b.bad.includes(a.id),good=a.good.includes(b.id)||b.good.includes(a.id);
 out.push(bad?`<b>${a.name} + ${b.name}:</b> лучше разнести по времени минимум на 2 часа (мешают усвоению друг друга). ${a.name}: ${timeTxt(a)}; ${b.name}: ${timeTxt(b)}.`
  :good?`<b>${a.name} + ${b.name}:</b> хорошее сочетание, можно принимать вместе.`
  :`<b>${a.name} + ${b.name}:</b> известных конфликтов в нашем справочнике нет. ${a.name}: ${timeTxt(a)}; ${b.name}: ${timeTxt(b)}.`)}
 return out.join("<br><br>")+`<br><br><a href="checker.html#${ids.join(",")}">Открыть полный расчёт совместимости и расписание →</a>`}
function byGoal(gs){return gs.map(g=>{const top=PRODUCTS.filter(p=>p.goals.includes(g)&&p.cat!=="kids").sort((a,b)=>(POPULAR.includes(b.id)-POPULAR.includes(a.id))).slice(0,4);
 return `<b>${GOALS[g]}</b>: обычно смотрят на ${top.map(p=>link(p.id)).join(", ")}.<br><a href="catalog.html?goal=${g}">Все товары для цели «${GOALS[g]}» →</a>`}).join("<br><br>")+`<br><br>Хотите расписание приёма под себя? <a href="wizard.html">Соберите личный план →</a>`}
function answer(q){const t=low(q);
 if(/^\s*(привет|здравств|добрый|hi|hello)/.test(t))return "Здравствуйте! Спросите меня о любой добавке из каталога, о совместимости двух добавок или о том, что подобрать под цель (сон, энергия, иммунитет и т. д.).";
 if(/доставк|оплат|заказ|возврат/.test(t))return `Условия доставки и оплаты собраны на странице <a href="delivery.html">Доставка и оплата</a>. Бесплатная доставка от ${fmt(FREE_SHIP)}, промокод AURUM10 даёт −10% на первый заказ.`;
 if(/напомин/.test(t))return `Напоминания о приёме можно настроить на странице <a href="reminders.html">Напоминания</a>.`;
 if(/питани|диет|рацион|еда/.test(t)&&!findProducts(t).length)return `Советы по питанию и продуктам собраны в разделе <a href="nutrition.html">Питание</a>.`;
 const ids=findProducts(t),gs=findGoals(t);
 if(ids.length>=2)return pair(ids.slice(0,4));
 if(ids.length===1){let h=aboutOne(ids[0],t);if(gs.length&&!BYID[ids[0]].goals.some(g=>gs.includes(g)))h+=`<br><br>Для цели «${GOALS[gs[0]]}» в каталоге есть варианты получше: <a href="catalog.html?goal=${gs[0]}">посмотреть →</a>`;return h}
 if(gs.length)return byGoal(gs.slice(0,2));
 return `Пока не понял вопрос. Я умею: рассказать о добавке («как принимать магний?»), проверить совместимость («цинк и железо вместе можно?») и подобрать по цели («что для сна?»). Ещё можно <a href="wizard.html">собрать личный план</a> или <a href="checker.html">проверить совместимость списка</a>.`}
const CHIPS=["Что выпить для сна?","Цинк и железо вместе можно?","Как принимать магний?","Ашваганда: когда принимать?","Что для энергии?"];
const css=`#avc-btn{position:fixed;right:20px;bottom:20px;z-index:98;display:flex;gap:.5rem;align-items:center;background:var(--em);color:var(--iv);border:1px solid var(--gold);border-radius:999px;padding:.75rem 1.1rem;font:700 .95rem Manrope,sans-serif;box-shadow:var(--sh);cursor:pointer}
#avc-btn b{color:var(--gold2)}#avc{position:fixed;right:20px;bottom:84px;z-index:98;width:min(380px,calc(100vw - 24px));height:min(560px,calc(100vh - 120px));background:var(--iv);border:1px solid var(--gold);border-radius:var(--r);box-shadow:var(--sh);display:none;flex-direction:column;overflow:hidden;font-size:.92rem}
#avc.open{display:flex}@media(max-width:600px){#avc{right:12px;left:12px;width:auto;bottom:76px;height:calc(100vh - 100px)}#avc-btn{right:12px;bottom:12px}}#avc .hd{background:var(--em);color:var(--iv);padding:.8rem 1rem;display:flex;justify-content:space-between;align-items:center}#avc .hd b{font-family:"Cormorant Garamond",serif;font-size:1.25rem}#avc .hd button{background:none;border:0;color:var(--gold2);font-size:1.4rem;cursor:pointer}
#avc .log{flex:1 1 auto;min-height:0;overflow:auto;padding:1rem;display:flex;flex-direction:column;gap:.6rem}#avc .m{max-width:88%;padding:.6rem .8rem;border-radius:14px;line-height:1.45}#avc .bot{background:#fff;border:1px solid var(--iv2);align-self:flex-start}#avc .me{background:var(--em2);color:var(--iv);align-self:flex-end}
#avc .chips{display:flex;flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;flex:none;gap:.4rem;padding:0 1rem .6rem}#avc .chips button{flex:none;white-space:nowrap;background:#fff;border:1px solid var(--gold);color:var(--em);border-radius:999px;padding:.3rem .7rem;font:600 .78rem Manrope,sans-serif;cursor:pointer}
#avc form{display:flex;margin:0;flex:none;gap:.4rem;padding:.7rem;border-top:1px solid var(--iv2);background:#fff}#avc input{flex:1;min-width:0;margin:0;outline:none;border:1px solid var(--iv2);border-radius:10px;padding:.6rem .7rem;font:inherit}#avc form button{background:var(--gold);color:var(--em);border:0;border-radius:10px;padding:0 .9rem;font-weight:800;cursor:pointer}
#avc .cmut{color:var(--mut);font-size:.82rem}#avc .cwarn{color:#7a1f1f}#avc .disc{flex:none;font-size:.72rem;color:var(--mut);padding:.4rem 1rem;background:var(--iv2)}`;
document.head.insertAdjacentHTML("beforeend",`<style>${css}</style>`);
document.body.insertAdjacentHTML("beforeend",`<button id="avc-btn" aria-label="Консультант">${ICONS.leaf}<span>Консультант <b>·</b></span></button>
<div id="avc" role="dialog" aria-label="Консультант Aurum·Vita"><div class="hd"><b>Консультант Aurum·Vita</b><button aria-label="Закрыть">×</button></div>
<div class="log"></div><div class="chips">${CHIPS.map(c=>`<button>${c}</button>`).join("")}</div>
<form><input placeholder="Спросите о добавке или цели…" aria-label="Вопрос"><button>→</button></form>
<div class="disc">Справочная информация, не медицинская рекомендация. При заболеваниях, беременности и приёме лекарств посоветуйтесь с врачом.</div></div>`);
const box=document.getElementById("avc"),log=box.querySelector(".log"),inp=box.querySelector("input");
const say=(h,who)=>{const d=document.createElement("div");d.className="m "+who;d.innerHTML=h;log.append(d);log.scrollTop=log.scrollHeight;LS.set("av_consult",[...LS.get("av_consult",[]).slice(-30),[who,h]])};
const ask=q=>{if(!q.trim())return;say(q.replace(/[<>&]/g,""),"me");setTimeout(()=>say(answer(q),"bot"),250)};
const hist=LS.get("av_consult",[]);if(hist.length)hist.forEach(([w,h])=>{const d=document.createElement("div");d.className="m "+w;d.innerHTML=h;log.append(d)});
else{const d=document.createElement("div");d.className="m bot";d.innerHTML="Здравствуйте! Я помогу разобраться с добавками из каталога: как принимать, что с чем сочетается и что подобрать под вашу цель.";log.append(d)}
document.getElementById("avc-btn").onclick=()=>{box.classList.toggle("open");if(box.classList.contains("open")){inp.focus();log.scrollTop=log.scrollHeight}};
box.querySelector(".hd button").onclick=()=>box.classList.remove("open");
box.querySelector(".chips").onclick=e=>{if(e.target.tagName==="BUTTON")ask(e.target.textContent)};
box.querySelector("form").onsubmit=e=>{e.preventDefault();ask(inp.value);inp.value=""};
window.AVConsult={answer};
})();
