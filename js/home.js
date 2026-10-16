const $=id=>document.getElementById(id);
const SL=[["Премиальные нутриенты","Чистые формулы для <em>долгой</em> и яркой жизни","130+ товаров от 13 брендов с понятными инструкциями: когда принимать и с чем сочетать.","catalog.html","В каталог",SKU["magGly-1"]],
["Акции недели","До <em>−30%</em> на избранные позиции","Промокод AURUM10 — ещё −10% на первый заказ.","deals.html","Смотреть акции",SKUS.find(s=>s.disc>=20)],
["Личный план","Комплекс под <em>вашу</em> цель за 2 минуты","Ответьте на 5 вопросов — получите набор и расписание, добавьте всё в корзину одним кликом.","wizard.html","Подобрать план",SKU["ashwa-1"]]];
$("car").innerHTML=`<div class="slides">${SL.map(([e,t,p,u,b,s])=>`<div class="slide hero" style="padding:4rem 0 4.5rem"><div class="wrap grid"><div><div class="eyebrow">${e}</div><h1>${t}</h1><p>${p}</p><p style="margin-top:1.6rem"><a class="btn" href="${u}">${b}</a> <a class="btn ghost" href="checker.html">Проверить совместимость</a></p></div><div style="text-align:center">${bottle(s,0,300)}</div></div></div>`).join("")}</div>
<button class="arr" style="left:1rem" data-d="-1">‹</button><button class="arr" style="right:1rem" data-d="1">›</button><div class="dots">${SL.map((_,i)=>`<button data-i="${i}" aria-label="Слайд ${i+1}"></button>`).join("")}</div>`;
let ci=0;const go=i=>{ci=(i+SL.length)%SL.length;$("car").querySelector(".slides").style.transform=`translateX(-${ci*100}%)`;$("car").querySelectorAll(".dots button").forEach((b,k)=>b.classList.toggle("on",k===ci))};
$("car").onclick=e=>{if(e.target.dataset.d)go(ci+ +e.target.dataset.d);if(e.target.dataset.i)go(+e.target.dataset.i)};go(0);let tm=setInterval(()=>go(ci+1),6000);
const SI={supp:"flask",sport:"bolt",beauty:"sun",food:"leaf",kids:"star",adapt:"moon"};
$("cats").innerHTML=Object.entries(SECTIONS).map(([k,v])=>`<a class="tile" href="catalog.html?sec=${k}"><div class="ico">${ICONS[SI[k]]}</div>${v}<small class="mut" style="font-weight:400">${SKUS.filter(s=>s.sec===k).length} товаров</small></a>`).join("");
$("deals").innerHTML=SKUS.filter(s=>s.disc).sort((a,b)=>b.disc-a.disc).slice(0,10).map(card).join("");
$("best").innerHTML=SKUS.filter(s=>s.best).sort((a,b)=>b.reviews-a.reviews).slice(0,10).map(card).join("");
$("new").innerHTML=SKUS.filter(s=>s.isNew).slice(0,10).map(card).join("");
$("brands").innerHTML=Object.entries(BRANDS).slice(0,8).map(([b,c])=>`<a class="brandtile" style="background:linear-gradient(150deg,${c},#0b2f23)" href="catalog.html?brand=${encodeURIComponent(b)}"><span>${b}<small>${BRAND_DESC[b]}</small></span></a>`).join("");
$("goals").innerHTML=Object.entries(GOALS).map(([k,v])=>`<a class="card goal" href="catalog.html?goal=${k}"><div class="ico">${ICONS[GOAL_ICON[k]]}</div>${v}</a>`).join("");
