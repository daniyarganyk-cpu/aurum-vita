const ST=["Адрес","Доставка","Оплата","Подтверждение"];let step=0;const u=Auth.user();
const O=LS.get("av_checkout",{name:u?u.name:"",email:u?u.email:"",phone:"",city:"",addr:"",zip:"",ship:"pickup",pay:"card"});
const SHIP={pickup:["Пункт выдачи","2–4 дня",190],courier:["Курьер до двери","1–3 дня",390],post:["Почта","5–10 дней",290],express:["Экспресс сегодня (в пределах МКАД)","2–4 часа",790]};
const shipCost=t=>O.ship==="express"?SHIP.express[2]:t>=FREE_SHIP?0:SHIP[O.ship][2];
function sum(){const t=totals(),sc=shipCost(t.total);return `<aside class="sumbox"><h3>Заказ</h3>${Cart.items().map(i=>`<div class="sumrow" style="font-size:.85rem"><span>${SKU[i.sku].short} × ${i.qty}</span><span>${fmt(unitPrice(SKU[i.sku],i.size)*i.qty)}</span></div>`).join("")}<hr class="hair" style="margin:.6rem 0">
 <div class="sumrow"><span>Товары</span><span>${fmt(t.sub)}</span></div>${t.disc?`<div class="sumrow"><span>Скидка ${t.pc}</span><span>−${fmt(t.disc)}</span></div>`:""}<div class="sumrow"><span>Доставка</span><span>${sc?fmt(sc):"бесплатно"}</span></div><div class="sumrow"><b>Итого</b><b class="price">${fmt(t.total+sc)}</b></div></aside>`}
const inp=(k,l,type="text",cls="")=>`<label class="${cls}">${l}<input name="${k}" type="${type}" value="${O[k]||""}" required></label>`;
function draw(){if(!Cart.items().length&&step<3){$("co").innerHTML=`<div class="card"><h2>Корзина пуста</h2><a class="btn" href="catalog.html">В каталог</a></div>`;return}
 const steps=`<div class="steps">${ST.map((s,i)=>`<span class="${i===step?"on":i<step?"done":""}">${i+1}. ${s}</span>`).join("")}</div>`;
 let body="";
 if(step===0)body=`<form class="card form" id="f">${inp("name","Имя и фамилия","text","full")}${inp("email","E-mail","email")}${inp("phone","Телефон","tel")}${inp("city","Город")}${inp("zip","Индекс")}${inp("addr","Улица, дом, квартира","text","full")}<div class="full"><button class="btn">Далее: доставка</button></div></form>`;
 if(step===1)body=`<form class="card" id="f">${Object.entries(SHIP).map(([k,[n,d,p]])=>`<label class="radio"><input type="radio" name="ship" value="${k}" ${O.ship===k?"checked":""}><span><b>${n}</b> · ${d}<br><small class="mut">${k!=="express"&&totals().total>=FREE_SHIP?"Бесплатно":fmt(p)}</small></span></label>`).join("")}<button type="button" class="btn ghost" style="color:var(--em)" data-back>Назад</button> <button class="btn">Далее: оплата</button></form>`;
 if(step===2)body=`<form class="card" id="f"><div class="disclaimer">Демо-режим: оплата не проводится, данные карты никуда не отправляются и не сохраняются.</div>
  ${[["card","Банковская карта (демо)"],["sbp","СБП (демо)"],["cod","Оплата при получении"]].map(([k,l])=>`<label class="radio"><input type="radio" name="pay" value="${k}" ${O.pay===k?"checked":""}>${l}</label>`).join("")}
  <div class="form" id="cardf" style="${O.pay==="card"?"":"display:none"}"><label class="full">Номер карты<input placeholder="0000 0000 0000 0000" autocomplete="off" maxlength="19"></label><label>Срок<input placeholder="ММ/ГГ" autocomplete="off"></label><label>CVC<input placeholder="•••" autocomplete="off" maxlength="3"></label></div>
  <p><label style="display:flex;gap:.5rem;align-items:center"><input type="checkbox" required style="width:auto"> Понимаю, что это демонстрационный магазин и заказ не будет доставлен</label></p>
  <button type="button" class="btn ghost" style="color:var(--em)" data-back>Назад</button> <button class="btn" id="place">Подтвердить заказ</button></form>`;
 if(step===3){const o=LS.get("av_last_order",{});body=`<div class="card" style="text-align:center"><div class="ico" style="margin:auto">${ICONS.shield}</div><h2>Спасибо! Заказ № ${o.id} оформлен</h2><p>Сумма: <b>${fmt(o.total)}</b> · ${SHIP[o.ship][0]} · ${o.city}</p><p class="mut">Это демо: письмо не отправляется, оплата не списывается. Заказ сохранён в истории личного кабинета на этом устройстве.</p><a class="btn" href="account.html">Мои заказы</a> <a class="btn dark" href="reminders.html#${o.nids.map(n=>n+"@"+BYID[n].time).join(",")}">Создать напоминания о приёме</a></div>`}
 $("co").innerHTML=steps+(step<3?`<div class="two"><div>${body}</div>${sum()}</div>`:body);
 const f=$("f");if(!f)return;
 f.onchange=e=>{if(e.target.name==="ship"){O.ship=e.target.value;draw()}if(e.target.name==="pay"){O.pay=e.target.value;$("cardf").style.display=O.pay==="card"?"":"none"}};
 f.querySelectorAll("[data-back]").forEach(b=>b.onclick=()=>{step--;draw()});
 f.onsubmit=e=>{e.preventDefault();new FormData(f).forEach((v,k)=>O[k]=v);LS.set("av_checkout",O);
  if(step===2){const t=totals(),sc=shipCost(t.total),o={id:"AV-"+Date.now().toString().slice(-6),date:new Date().toLocaleString("ru-RU"),items:Cart.items(),total:t.total+sc,ship:O.ship,pay:O.pay,city:O.city,nids:[...new Set(Cart.items().map(i=>SKU[i.sku].nid))],status:"Оформлен (демо)"};
   const key="av_orders_"+(LS.get("av_session",null)||"guest");LS.set(key,[o,...LS.get(key,[])]);LS.set("av_last_order",o);Cart.save([]);LS.set("av_promo","")}
  step++;draw();scrollTo(0,0)}}
draw();
