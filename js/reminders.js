const KEY="av_reminders",DT={m:"08:00",d:"13:00",e:"21:00"};
let R=JSON.parse(localStorage.getItem(KEY)||"[]");const save=()=>localStorage.setItem(KEY,JSON.stringify(R));
const sup=document.getElementById("sup");sup.innerHTML=PRODUCTS.map(p=>`<option value="${p.id}">${p.name}</option>`).join("");
location.hash.slice(1).split(",").forEach(x=>{const [id,s]=x.split("@");if(BYID[id]&&!R.some(r=>r.id===id))R.push({id,time:DT[s]||"09:00",on:true,last:""})});save();if(location.hash)history.replaceState(0,"",location.pathname);
const pst=document.getElementById("pst");const ps=()=>pst.textContent="Статус уведомлений: "+(!("Notification"in window)?"не поддерживаются":{granted:"разрешены",denied:"запрещены",default:"не запрошены"}[Notification.permission]);ps();
document.getElementById("perm").onclick=async()=>{if("Notification"in window)await Notification.requestPermission();ps()};
function notify(t){if("Notification"in window&&Notification.permission==="granted")new Notification("Aurum·Vita",{body:t});else alert(t)}
document.getElementById("test").onclick=()=>notify("Тестовое напоминание: время принять добавки");
document.getElementById("add").onclick=()=>{R.push({id:sup.value,time:document.getElementById("tm").value||"09:00",on:true,last:""});save();draw()};
function draw(){R.sort((a,b)=>a.time.localeCompare(b.time));document.getElementById("rl").innerHTML=R.length?R.map((r,i)=>`<div class="card" style="display:flex;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:.8rem;padding:1rem 1.3rem"><div><span class="price" style="font-size:1.5rem">${r.time}</span> &nbsp; ${BYID[r.id].name} <span class="mut" style="font-size:.85rem">(${BYID[r.id].food?"с едой":"без еды"})</span></div>
<div><label class="mut"><input type="checkbox" style="width:auto" data-t="${i}" ${r.on?"checked":""}> вкл</label> <button class="btn sm dark" data-d="${i}">Удалить</button></div></div>`).join(""):'<p class="mut">Напоминаний пока нет.</p>'}
document.getElementById("rl").onclick=e=>{if(e.target.dataset.d){R.splice(+e.target.dataset.d,1);save();draw()}};
document.getElementById("rl").onchange=e=>{if(e.target.dataset.t){R[+e.target.dataset.t].on=e.target.checked;save()}};
setInterval(()=>{const n=new Date(),hm=n.toTimeString().slice(0,5),day=n.toDateString();R.forEach(r=>{if(r.on&&r.time===hm&&r.last!==day){r.last=day;save();notify(`Время принять: ${BYID[r.id].name}`)}})},20000);
draw();
