function draw(){const w=Wish.items().filter(x=>SKU[x]);document.getElementById("wl").innerHTML=w.length?`<p><button class="btn sm" id="all">Все в корзину</button></p><div class="pgrid">${w.map(x=>card(SKU[x])).join("")}</div>`:`<div class="card" style="text-align:center"><h2>В избранном пока пусто</h2><p class="mut">Нажмите ♥ на карточке товара.</p><a class="btn" href="catalog.html">В каталог</a></div>`;
 const a=document.getElementById("all");if(a)a.onclick=()=>w.forEach(x=>Cart.add(x))}
document.getElementById("wl").addEventListener("click",e=>{if(e.target.closest("[data-wish]"))setTimeout(draw,0)});draw();
const rc=LS.get("av_recent",[]).filter(x=>SKU[x]);document.getElementById("recent").innerHTML=rc.map(x=>card(SKU[x])).join("")||'<p class="mut">Пока нет просмотренных товаров.</p>';
