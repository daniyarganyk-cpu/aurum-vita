const $=id=>document.getElementById(id);
const PROMOS={AURUM10:{t:"−10% на заказ",f:s=>s*.1},WELCOME500:{t:"−500 ₽ от 3 000 ₽",f:s=>s>=3000?500:0},VITA15:{t:"−15% от 6 000 ₽",f:s=>s>=6000?s*.15:0}};
function totals(){const sub=Cart.items().reduce((a,b)=>a+unitPrice(SKU[b.sku],b.size)*b.qty,0),pc=LS.get("av_promo",""),disc=PROMOS[pc]?Math.round(PROMOS[pc].f(sub)):0;return{sub,pc,disc,total:sub-disc}}
function draw(){const c=Cart.items();const t=totals();
 if(!c.length){$("cart").innerHTML=`<div class="card" style="text-align:center"><h2>Корзина пуста</h2><p class="mut">Загляните в каталог или подберите личный план.</p><a class="btn" href="catalog.html">В каталог</a> <a class="btn dark" href="wizard.html">Личный план</a></div>`;return}
 const left=Math.max(0,FREE_SHIP-t.total);
 $("cart").innerHTML=`<div class="two"><div><div class="tablewrap"><table class="ctable"><tr><th>Товар</th><th>Цена</th><th>Кол-во</th><th>Сумма</th><th></th></tr>${c.map((it,i)=>{const s=SKU[it.sku],p=unitPrice(s,it.size);return `<tr><td style="display:flex;gap:.7rem;align-items:center"><span style="width:56px">${bottle(s,0,56)}</span><span><a href="product.html?id=${s.sku}">${s.title}</a><br><small class="mut">${s.sizes[it.size].label}</small></span></td><td>${fmt(p)}</td><td><div class="qty"><button data-i="${i}" data-q="-1">−</button><input value="${it.qty}" data-in="${i}"><button data-i="${i}" data-q="1">+</button></div></td><td><b>${fmt(p*it.qty)}</b></td><td><button class="vbtn" data-rm="${i}" aria-label="Удалить">✕</button></td></tr>`}).join("")}</table></div>
 <p><button class="btn sm ghost" style="color:var(--em)" id="clr">Очистить корзину</button> <a class="btn sm dark" href="checker.html#${[...new Set(c.map(x=>SKU[x.sku].nid))].join(",")}">Проверить совместимость корзины</a></p></div>
 <aside class="sumbox"><h3>Ваш заказ</h3><p style="font-size:.85rem">${left?`До бесплатной доставки: <b>${fmt(left)}</b>`:"<b>Доставка бесплатна!</b>"}</p><div class="ship"><i style="width:${Math.min(100,t.total/FREE_SHIP*100)}%"></i></div>
 <form id="pf" style="display:flex;gap:.4rem;margin:1rem 0"><input id="pcode" placeholder="Промокод" value="${t.pc}"><button class="btn sm">OK</button></form><p class="mut" style="font-size:.78rem">Демо-коды: AURUM10, WELCOME500, VITA15</p>
 <div class="sumrow"><span>Товары (${Cart.count()})</span><span>${fmt(t.sub)}</span></div>${t.disc?`<div class="sumrow" style="color:#8a2e1f"><span>Промокод ${t.pc}</span><span>−${fmt(t.disc)}</span></div>`:""}
 <div class="sumrow"><span>Доставка</span><span>${left?"рассчитывается далее":"0 ₽"}</span></div><hr class="hair" style="margin:.6rem 0"><div class="sumrow"><b>Итого</b><b class="price">${fmt(t.total)}</b></div>
 <a class="btn" style="width:100%;text-align:center" href="checkout.html" id="go">Оформить заказ</a><p class="example" style="text-align:center;margin-top:.5rem">Цены — пример</p></aside></div>`}
if($("cart")){
$("cart").onclick=e=>{const t=e.target,c=Cart.items();if(t.dataset.q){const it=c[+t.dataset.i];it.qty=Math.max(1,it.qty+ +t.dataset.q);Cart.save(c);draw()}
 if(t.dataset.rm){c.splice(+t.dataset.rm,1);Cart.save(c);draw()}if(t.id==="clr"){Cart.save([]);LS.set("av_promo","");draw()}};
$("cart").onchange=e=>{if(e.target.dataset.in){const c=Cart.items();c[+e.target.dataset.in].qty=Math.max(1,parseInt(e.target.value)||1);Cart.save(c);draw()}};
$("cart").onsubmit=e=>{e.preventDefault();const v=$("pcode").value.trim().toUpperCase();if(!v||PROMOS[v]){LS.set("av_promo",v);toast(v?`Промокод применён: ${PROMOS[v].t}`:"Промокод удалён")}else toast("Промокод не найден");draw()};
draw();}
