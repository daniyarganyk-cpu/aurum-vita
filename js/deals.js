const D=SKUS.filter(s=>s.disc).sort((a,b)=>b.disc-a.disc);
document.getElementById("codes").innerHTML=[["AURUM10","−10% на первый заказ"],["WELCOME500","−500 ₽ при заказе от 3 000 ₽"],["VITA15","−15% при заказе от 6 000 ₽"]].map(([c,t])=>`<div class="card" style="text-align:center;border-style:dashed"><div class="eyebrow">Промокод</div><div class="price">${c}</div><p class="mut">${t}</p></div>`).join("");
document.getElementById("dl").innerHTML=D.map(card).join("");document.getElementById("dc").textContent=D.length;
