const ICONS={
leaf:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15"/><path d="M5 19 13 11"/></svg>',
shield:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
flask:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 3h6M10 3v6L5 19a1.5 1.5 0 0 0 1.3 2h11.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7.5 15h9"/></svg>',
clock:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
star:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>',
heart:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>',
moon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 14A8 8 0 1 1 10 4a6.5 6.5 0 0 0 10 10z"/></svg>',
bolt:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M13 3 5 14h6l-1 7 8-11h-6z"/></svg>',
brain:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/></svg>',
sun:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/></svg>',
bell:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/></svg>',
search:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
user:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>',
cart:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 4h2l2.5 11h11L21 8H6.5"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/></svg>',
truck:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 6h12v10H2zM14 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
};
const GOAL_ICON={hair:"leaf",skin:"sun",nails:"star",heart:"heart",immunity:"shield",energy:"bolt",sleep:"moon",stress:"leaf",brain:"brain",detox:"flask",gut:"leaf",sport:"bolt",women:"heart",men:"shield",age50:"star",pregnancy:"heart",vegan:"leaf"};
const TIME={m:"Утро",d:"День",e:"Вечер"};
(function(){
 const cur=location.pathname.split("/").pop()||"index.html";
 document.body.insertAdjacentHTML("afterbegin",`<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="half"><stop offset=".5" stop-color="#C9A24B"/><stop offset=".5" stop-color="#e2d9c3"/></linearGradient></defs></svg>`);
 const NV=[["supp","БАДы и витамины"],["sport","Спорт"],["beauty","Красота"],["food","Здоровое питание"],["kids","Детям"],["adapt","Адаптогены и грибы"]];
 const mega=sec=>{const ns=[...new Set(SKUS.filter(s=>s.sec===sec).map(s=>s.nid))].map(id=>BYID[id]);const cats=[...new Set(ns.map(n=>n.cat))];
  return `<div class="mega"><div class="wrap megagrid">${cats.map(c=>`<div><h5>${CATS[c]}</h5>${ns.filter(n=>n.cat===c).slice(0,10).map(n=>`<a href="catalog.html?n=${n.id}">${n.name.replace(/\s*\(.+\)/,"")}</a>`).join("")}</div>`).join("")}
  <div><h5>Бренды</h5>${SEC_BRANDS[sec].map(b=>`<a href="catalog.html?sec=${sec}&brand=${encodeURIComponent(b)}">${b}</a>`).join("")}<a class="gold" href="catalog.html?sec=${sec}">Все товары раздела →</a></div></div></div>`};
 const megaGoals=`<div class="mega"><div class="wrap megagrid">${[0,1,2].map(k=>`<div>${Object.entries(GOALS).slice(k*6,k*6+6).map(([g,v])=>`<a href="catalog.html?goal=${g}">${v}</a>`).join("")}</div>`).join("")}<div><h5>Инструменты</h5><a href="goals.html">Гид по целям</a><a href="wizard.html">Личный план</a><a href="checker.html">Совместимость</a><a href="nutrition.html">Питание</a><a href="reminders.html">Напоминания</a></div></div></div>`;
 const h=document.createElement("header");h.className="site";
 h.innerHTML=`<div class="promo">Бесплатная доставка от ${fmt(FREE_SHIP)} · Промокод <b>AURUM10</b> — −10% на первый заказ · <a href="deals.html">Все акции</a></div>
 <div class="wrap hrow"><a class="logo" href="index.html"><svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="#C9A24B" stroke-width="1.4"><circle cx="16" cy="16" r="14"/><path d="M9 21c0-7 5-11 14-11 0 8-5 12-12 12M9 21l8-7"/></svg>Aurum<b>·</b>Vita</a>
 <form class="search" action="catalog.html" autocomplete="off"><input name="q" id="sq" placeholder="Поиск по 130+ товарам, брендам и целям"><button aria-label="Искать">${ICONS.search}</button><div class="sugg" id="sugg"></div></form>
 <div class="hacts"><label class="loc"><select aria-label="Язык и валюта"><option>RU · ₽ RUB</option><option disabled>EN · $ USD (скоро)</option></select></label>
 <a href="account.html" class="hact">${ICONS.user}<span>${Auth.user()?Auth.user().name.split(" ")[0]:"Войти"}</span></a>
 <a href="wishlist.html" class="hact">${ICONS.heart}<i id="wishCount">0</i><span>Избранное</span></a>
 <a href="cart.html" class="hact">${ICONS.cart}<i id="cartCount">0</i><span>Корзина</span></a></div></div>
 <nav class="cnav"><div class="wrap"><button class="burger" aria-label="Меню">☰ Каталог</button><ul>${NV.map(([k,t])=>`<li><a href="catalog.html?sec=${k}">${t}</a>${mega(k)}</li>`).join("")}<li><a href="goals.html">Цели</a>${megaGoals}</li><li><a href="brands.html">Бренды</a></li><li><a class="hot" href="deals.html">Акции</a></li></ul></div></nav>`;
 document.body.prepend(h);
 h.querySelector(".burger").onclick=()=>h.querySelector(".cnav ul").classList.toggle("open");
 const sq=h.querySelector("#sq"),sg=h.querySelector("#sugg");sq.value=new URLSearchParams(location.search).get("q")||"";
 sq.oninput=()=>{const q=sq.value.trim().toLowerCase();if(q.length<2){sg.innerHTML="";return}
  const ps=SKUS.filter(s=>(s.title+s.short).toLowerCase().includes(q)).slice(0,6),bs=Object.keys(BRANDS).filter(b=>b.toLowerCase().includes(q)),gs=Object.entries(GOALS).filter(([k,v])=>v.toLowerCase().includes(q));
  sg.innerHTML=[...gs.map(([k,v])=>`<a href="catalog.html?goal=${k}"><em>Цель</em>${v}</a>`),...bs.map(b=>`<a href="catalog.html?brand=${encodeURIComponent(b)}"><em>Бренд</em>${b}</a>`),...ps.map(s=>`<a href="product.html?id=${s.sku}"><span class="mini">${bottle(s,0,28)}</span>${s.title}<b>${fmt(unitPrice(s))}</b></a>`)].join("")||`<p class="mut" style="padding:.6rem 1rem">Ничего не найдено</p>`};
 document.addEventListener("click",e=>{if(!e.target.closest(".search"))sg.innerHTML=""});
 const col=(t,l)=>`<div><h5>${t}</h5>${l.map(([u,x])=>`<a href="${u}">${x}</a>`).join("")}</div>`;
 const f=document.createElement("footer");
 f.innerHTML=`<div class="wrap"><div class="trust">${[["shield","Сторонний контроль качества"],["clock","Доставка 1–5 дней"],["star","Отзывы покупателей"],["leaf","Честный состав"]].map(([i,t])=>`<div>${ICONS[i]}<span>${t}</span></div>`).join("")}</div>
 <div class="fcols">${col("Каталог",NV.map(([k,t])=>["catalog.html?sec="+k,t]))}${col("Покупателям",[["delivery.html","Доставка и возврат"],["faq.html","Вопросы и ответы"],["account.html","Личный кабинет"],["wishlist.html","Избранное"],["deals.html","Акции"]])}${col("Инструменты",[["wizard.html","Личный план"],["checker.html","Совместимость"],["goals.html","Цели"],["nutrition.html","Питание"],["reminders.html","Напоминания"],["blends.html","Бленды"]])}${col("Компания",[["about.html","О нас"],["brands.html","Бренды"],["contacts.html","Контакты"]])}
 <div><h5>Рассылка</h5><p style="font-size:.85rem">Подборки и акции раз в неделю (демо).</p><form onsubmit="event.preventDefault();toast('Спасибо! Это демо — письма не отправляются.');this.reset()"><input type="email" required placeholder="E-mail"><button class="btn sm" style="margin-top:.5rem">Подписаться</button></form></div></div>
 <div class="disclaimer" style="background:transparent;color:#e9e3d2"><b style="color:#E3C987">Медицинский дисклеймер.</b> Информация носит образовательный характер и не является медицинской рекомендацией. Перед приёмом добавок, особенно при беременности, кормлении грудью, хронических заболеваниях или приёме лекарств, проконсультируйтесь с врачом. БАД не являются лекарственным средством.</div>
 <p style="font-size:.8rem">© ${new Date().getFullYear()} Aurum·Vita — демонстрационный магазин. Бренды, товары, цены и отзывы вымышлены; реальные заказы и оплата не принимаются.</p></div>`;
 document.body.append(f);updateBadges();
})();
function disclaimer(extra=""){return `<div class="disclaimer"><b>Важно:</b> проконсультируйтесь с врачом перед приёмом добавок. ${extra}</div>`}
function productCard(p){
 const nm=id=>BYID[id]?BYID[id].name:null;
 const good=p.good.map(nm).filter(Boolean),bad=p.bad.map(nm).filter(Boolean);
 return `<article class="card"><div class="eyebrow">${CATS[p.cat]}</div><h3>${p.name}</h3><p>${p.desc}</p>
 <div>${p.goals.map(g=>`<span class="tag">${GOALS[g]}</span>`).join("")}</div>
 <p style="font-size:.88rem;margin:.7rem 0 0"><span class="tag gold">${TIME[p.time]}</span><span class="tag">${p.food?"С едой":"Можно без еды"}</span></p>
 <details><summary>Подробнее</summary><dl><dt>Польза</dt><dd>${p.benefits}</dd><dt>Дозировка (общие диапазоны)</dt><dd>${p.dose}</dd>
 <dt>Лучшее время</dt><dd>${TIME[p.time]}, ${p.food?"во время еды":"натощак или вне зависимости от еды"}</dd>
 <dt>Хорошо сочетается</dt><dd>${good.length?good.map(x=>`<span class="tag good">${x}</span>`).join(""):"—"}</dd>
 <dt>Разносить по времени / не сочетать</dt><dd>${bad.length?bad.map(x=>`<span class="tag bad">${x}</span>`).join(""):"—"}</dd>
 <dt>Предостережения</dt><dd>${p.caution}</dd></dl></details></article>`;
}
