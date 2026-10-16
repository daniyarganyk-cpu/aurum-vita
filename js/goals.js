const NOTES={pregnancy:"<b>Беременность и кормление:</b> любые добавки — только по согласованию с акушером-гинекологом. Избегайте высоких доз ретинола, большинства трав и адаптогенов. Обычно обсуждают фолат, йод, D3, железо по анализам, омега-3 (DHA).",
vegan:"Веганам особенно важно следить за B12 (обязателен), D3, омега-3 (из водорослей), йодом, железом, цинком и кальцием.",age50:"После 50 чаще обсуждают D3, B12, кальций с K2, омега-3, белок и креатин.",
detox:"Печень сама выполняет детоксикацию; добавки лишь поддерживают её. При заболеваниях печени — только с гепатологом.",heart:"При приёме антикоагулянтов, гипотензивных и статинов обсудите добавки (омега-3, K2, E, CoQ10) с кардиологом."};
const ch=document.getElementById("chips");let cur=location.hash.slice(1)||"immunity";
ch.innerHTML=Object.entries(GOALS).map(([k,v])=>`<button class="chip" data-k="${k}">${v}</button>`).join("");
function r(){ch.querySelectorAll(".chip").forEach(b=>b.classList.toggle("on",b.dataset.k===cur));const ns=PRODUCTS.filter(p=>p.goals.includes(cur));
 document.getElementById("note").innerHTML=disclaimer(NOTES[cur]||"")+`<h2>${GOALS[cur]}: ключевые нутриенты</h2><div class="grid3">${ns.map(productCard).join("")}</div><div class="sec-head" style="margin-top:2.5rem"><h2>Товары для цели</h2><a href="catalog.html?goal=${cur}">Все в каталоге →</a></div>`;
 document.getElementById("list").innerHTML=SKUS.filter(s=>s.goals.includes(cur)).sort((a,b)=>b.reviews-a.reviews).slice(0,12).map(card).join("");}
ch.onclick=e=>{if(e.target.dataset.k){cur=e.target.dataset.k;history.replaceState(0,"","#"+cur);r()}};r();
