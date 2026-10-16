const U=new URLSearchParams(location.search),st={sec:U.get("sec")?[U.get("sec")]:[],brand:U.get("brand")?[U.get("brand")]:[],form:[],diet:[],goal:U.get("goal")?[U.get("goal")]:[],min:"",max:"",rating:0,q:U.get("q")||"",n:U.get("n")||"",deals:U.get("deals")==="1",sort:"pop",view:localStorage.getItem("av_view")||"grid",page:1};
const PER=24,$=id=>document.getElementById(id);
const grp=(t,k,opts)=>`<h5>${t}</h5>${opts.map(([v,l,c])=>`<label><input type="checkbox" data-k="${k}" value="${v}" ${st[k].includes(v)?"checked":""}>${l} <span class="mut">(${c})</span></label>`).join("")}`;
const cnt=(f)=>SKUS.filter(f).length;
$("filters").innerHTML=grp("Категория","sec",Object.entries(SECTIONS).map(([k,v])=>[k,v,cnt(s=>s.sec===k)]))+grp("Бренд","brand",Object.keys(BRANDS).map(b=>[b,b,cnt(s=>s.brand===b)]))+
`<h5>Цена, ₽</h5><div class="range"><input type="number" id="pmin" placeholder="от"><input type="number" id="pmax" placeholder="до"></div>
<h5>Рейтинг</h5>${[[0,"Любой"],[4.5,"4,5 и выше"],[4,"4 и выше"]].map(([v,l])=>`<label><input type="radio" name="rt" value="${v}" ${v==0?"checked":""}>${l}</label>`).join("")}`+
grp("Форма","form",Object.entries(FORMS).map(([k,v])=>[k,v,cnt(s=>s.form===k)]))+grp("Особенности","diet",[["vegan","Веганское",cnt(s=>s.vegan)],["gf","Без глютена",cnt(s=>s.gf)],["sale","Со скидкой",cnt(s=>s.disc)]])+grp("Цель","goal",Object.entries(GOALS).map(([k,v])=>[k,v,cnt(s=>s.goals.includes(k))]))+
`<p><button class="btn sm dark" id="reset" style="margin-top:1rem">Сбросить фильтры</button></p>`;
if(st.deals)st.diet.push("sale"),document.querySelector('[data-k=diet][value=sale]').checked=true;
$("filters").onchange=e=>{const t=e.target;if(t.dataset.k){st[t.dataset.k]=t.checked?[...st[t.dataset.k],t.value]:st[t.dataset.k].filter(x=>x!==t.value)}if(t.name==="rt")st.rating=+t.value;st.page=1;draw()};
$("pmin").oninput=e=>{st.min=e.target.value;st.page=1;draw()};$("pmax").oninput=e=>{st.max=e.target.value;st.page=1;draw()};
$("reset").onclick=()=>location.href="catalog.html";
$("sort").onchange=e=>{st.sort=e.target.value;draw()};
document.querySelectorAll(".vbtn").forEach(b=>b.onclick=()=>{st.view=b.dataset.v;localStorage.setItem("av_view",st.view);draw()});
$("ffbtn").onclick=()=>$("filters").classList.toggle("open");
function draw(){const q=st.q.toLowerCase();let L=SKUS.filter(s=>(!st.sec.length||st.sec.includes(s.sec))&&(!st.brand.length||st.brand.includes(s.brand))&&(!st.form.length||st.form.includes(s.form))&&
 (!st.goal.length||st.goal.some(g=>s.goals.includes(g)))&&(!st.diet.includes("vegan")||s.vegan)&&(!st.diet.includes("gf")||s.gf)&&(!st.diet.includes("sale")||s.disc)&&s.rating>=st.rating&&
 (!st.min||unitPrice(s)>=+st.min)&&(!st.max||unitPrice(s)<=+st.max)&&(!st.n||s.nid===st.n)&&(!q||(s.title+s.short+BYID[s.nid].desc).toLowerCase().includes(q)));
 const S={pop:(a,b)=>b.reviews-a.reviews,pa:(a,b)=>unitPrice(a)-unitPrice(b),pd:(a,b)=>unitPrice(b)-unitPrice(a),rt:(a,b)=>b.rating-a.rating,nw:(a,b)=>b.isNew-a.isNew,ds:(a,b)=>b.disc-a.disc};L.sort(S[st.sort]);
 const pages=Math.max(1,Math.ceil(L.length/PER));st.page=Math.min(st.page,pages);
 const title=st.n?BYID[st.n].name:st.q?`Поиск: «${st.q}»`:st.sec.length===1?SECTIONS[st.sec[0]]:st.brand.length===1?st.brand[0]:st.goal.length===1?"Цель: "+GOALS[st.goal[0]]:"Все товары";
 $("ttl").textContent=title;$("crumb").textContent=title;$("found").textContent=`${L.length} товаров`;
 document.querySelectorAll(".vbtn").forEach(b=>b.classList.toggle("on",b.dataset.v===st.view));
 $("grid").className="pgrid "+(st.view==="list"?"list":"");$("grid").innerHTML=L.slice((st.page-1)*PER,st.page*PER).map(card).join("")||'<p>Ничего не найдено. Попробуйте изменить фильтры.</p>';
 $("pager").innerHTML=pages>1?`<button data-p="${st.page-1}" ${st.page===1?"disabled":""}>‹</button>${Array.from({length:pages},(_,i)=>`<button data-p="${i+1}" class="${i+1===st.page?"on":""}">${i+1}</button>`).join("")}<button data-p="${st.page+1}" ${st.page===pages?"disabled":""}>›</button>`:"";}
$("pager").onclick=e=>{if(e.target.dataset.p){st.page=+e.target.dataset.p;draw();scrollTo({top:0,behavior:"smooth"})}};draw();
