// Генерация витрины: ~130 товаров (бренды и цены вымышлены, цены — пример)
const SECTIONS={supp:"БАДы и витамины",sport:"Спортивное питание",beauty:"Красота",food:"Здоровое питание",kids:"Детям",adapt:"Адаптогены и грибы"};
const BRANDS={"Verdant Labs":"#1F6B4F","Nordic Aurum":"#24466B","Pure Meridian":"#6B2D3C","Lumen Health":"#B5772A","Terra Vita":"#5B4A2E","Iron Peak":"#2B2B2B","Kinetic Forge":"#7A1F1F","Velvet Bloom":"#8C4A6B","Harvest Table":"#6E7B2C","Little Sprout":"#2E8A8A","Altai Origins":"#3C5A3A","Solace Botanica":"#4B3B6B","Forest Myco":"#6B4A2B"};
const BRAND_DESC={"Verdant Labs":"Чистые формулы с минимумом добавок","Nordic Aurum":"Северная школа: витамины D, омега, минералы","Pure Meridian":"Биодоступные формы и сторонний контроль","Lumen Health":"Ежедневные базовые нутриенты","Terra Vita":"Растительные ингредиенты и простые составы","Iron Peak":"Спортивное питание для силы и выносливости","Kinetic Forge":"Протеины и аминокислоты","Velvet Bloom":"Нутрикосметика: кожа, волосы, ногти","Harvest Table":"Суперфуды и полезные продукты","Little Sprout":"Детские формулы","Altai Origins":"Адаптогены и травы","Solace Botanica":"Вечерние ритуалы и бленды","Forest Myco":"Функциональные грибы"};
const SEC_BRANDS={supp:["Verdant Labs","Nordic Aurum","Pure Meridian","Lumen Health","Terra Vita"],sport:["Iron Peak","Kinetic Forge","Pure Meridian"],beauty:["Velvet Bloom","Lumen Health","Verdant Labs"],food:["Harvest Table","Terra Vita"],kids:["Little Sprout","Nordic Aurum"],adapt:["Altai Origins","Solace Botanica","Forest Myco","Terra Vita"]};
const FORMS={capsules:"Капсулы",tablets:"Таблетки",softgels:"Мягкие капсулы",powder:"Порошок",gummies:"Жевательные",liquid:"Жидкость/капли",food:"Продукт"};
const CAT_FORMS={vit:["capsules","tablets","gummies","liquid"],min:["capsules","tablets","powder"],fat:["softgels","liquid","gummies"],sup:["capsules","powder"],herb:["capsules","powder"],mush:["capsules","powder"],prot:["powder"],blend:["powder","capsules"],food:["food"],kids:["gummies","liquid"]};
const POPULAR=["vitD3","magGly","omega3","vitC","collagen","whey","creatine","ashwa","multi","zinc","probio","lionsmane"];
const BEAUTY=["collagen","b7","glut","b5"];
const BASEP={vit:690,min:790,fat:1290,sup:1490,herb:1190,mush:1690,prot:2990,blend:2490,food:690,kids:890};
function hsh(s){let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0}
const secOf=n=>n.cat==="food"?"food":n.cat==="kids"?"kids":n.cat==="prot"?"sport":["herb","mush","blend"].includes(n.cat)?"adapt":BEAUTY.includes(n.id)?"beauty":"supp";
const NONVEGAN=["vitD3","kd3","collagen","whey","casein","omega3","komega","protbar"];
const SKUS=[];
PRODUCTS.forEach(n=>{const sec=secOf(n),br=SEC_BRANDS[sec],h=hsh(n.id);
 const cnt=POPULAR.includes(n.id)?3:["food","blend"].includes(n.cat)?1:2;
 for(let i=0;i<cnt;i++){const brand=br[(h+i)%br.length],r=hsh(n.id+brand+i),forms=CAT_FORMS[n.cat],form=forms[(r>>>3)%forms.length];
  const base=Math.round(BASEP[n.cat]*(0.8+(r%60)/100)/10)*10-10;
  const unit=form==="powder"?["250 г","500 г","1 кг"]:form==="liquid"?["30 мл","60 мл"]:form==="food"?["1 шт.","3 шт."]:["60 шт.","120 шт.","180 шт."];
  const sizes=unit.map((u,k)=>({label:u,price:Math.round(base*[1,1.8,2.5][k]/10)*10-10}));
  const disc=r%10<3?[10,15,20,25,30][r%5]:0;
  const vegan=!NONVEGAN.includes(n.id)&&!(["softgels","gummies"].includes(form)&&r%2);
  SKUS.push({sku:n.id+"-"+(i+1),nid:n.id,brand,sec,form,title:`${brand} — ${n.name.replace(/^Бленд /,"")}, ${FORMS[form].toLowerCase()}`,short:n.name,sizes,price:sizes[0].price,disc,
   old:disc?Math.round(sizes[0].price/(1-disc/100)/10)*10:0,rating:+(4+(r%10)/10).toFixed(1),reviews:12+(r%2900),vegan,gf:n.id!=="granola"&&r%7!==0,
   isNew:r%9===0,best:POPULAR.includes(n.id)&&i===0||r%13===0,color:BRANDS[brand],goals:n.goals})}});
const SKU=Object.fromEntries(SKUS.map(s=>[s.sku,s]));
const fmt=n=>Math.round(n).toLocaleString("ru-RU")+" ₽";
const stars=r=>`<span class="stars" title="${r}">${[1,2,3,4,5].map(i=>`<svg width="14" height="14" viewBox="0 0 24 24"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="${r>=i-.25?"#C9A24B":r>=i-.75?"url(#half)":"#e2d9c3"}"/></svg>`).join("")}</span>`;
function bottle(s,view=0,w=200){const c=s.color,lbl=s.short.replace(/\s*\(.+\)/,"").replace(/^Бленд /,"").slice(0,22),f=s.form;
 const label=`<rect x="58" y="120" width="104" height="92" rx="6" fill="#F7F3EA"/><text x="110" y="142" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9" letter-spacing="1.5" fill="${c}">${s.brand.toUpperCase()}</text><line x1="72" y1="150" x2="148" y2="150" stroke="#C9A24B"/>
 <foreignObject x="60" y="154" width="100" height="40"><div xmlns="http://www.w3.org/1999/xhtml" style="font:600 12px/1.1 'Cormorant Garamond',serif;color:#0F3D2E;text-align:center">${lbl}</div></foreignObject><text x="110" y="205" text-anchor="middle" font-family="Manrope" font-size="7" fill="#6B6A64">${FORMS[f].toUpperCase()} · ${s.sizes[0].label}</text>`;
 const back=`<rect x="58" y="110" width="104" height="110" rx="6" fill="#F7F3EA"/><text x="110" y="128" text-anchor="middle" font-family="Manrope" font-size="9" font-weight="700" fill="#0F3D2E">Пищевая ценность</text>${[0,1,2,3,4,5,6].map(i=>`<rect x="68" y="${138+i*11}" width="${50+((i*37)%35)}" height="4" fill="#d9cfb6"/><rect x="138" y="${138+i*11}" width="14" height="4" fill="#d9cfb6"/>`).join("")}`;
 let body;
 if(f==="powder"||f==="food")body=`<rect x="40" y="62" width="140" height="26" rx="6" fill="#C9A24B"/><rect x="34" y="86" width="152" height="160" rx="18" fill="${c}"/>`;
 else if(f==="liquid")body=`<rect x="96" y="30" width="28" height="40" rx="10" fill="#2a2a2a"/><rect x="88" y="66" width="44" height="22" rx="4" fill="#C9A24B"/><rect x="56" y="86" width="108" height="160" rx="24" fill="${c}" opacity=".95"/>`;
 else body=`<rect x="76" y="50" width="68" height="34" rx="6" fill="#C9A24B"/><rect x="52" y="82" width="116" height="164" rx="22" fill="${c}"/>`;
 return `<svg viewBox="0 0 220 270" width="${w}" style="max-width:100%;height:auto" ${view===2?'transform="rotate(-8)"':""}><defs><linearGradient id="sh${s.sku}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".25" stop-color="#fff" stop-opacity=".18"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><ellipse cx="110" cy="252" rx="70" ry="8" fill="#000" opacity=".12"/>${body}${view===1?back:label}<rect x="34" y="82" width="152" height="164" fill="url(#sh${s.sku})"/></svg>`}
// ---- state
const LS={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};
const Cart={items:()=>LS.get("av_cart",[]),save(v){LS.set("av_cart",v);updateBadges()},
 add(sku,size=0,qty=1){const c=this.items(),e=c.find(x=>x.sku===sku&&x.size===size);e?e.qty+=qty:c.push({sku,size,qty});this.save(c);toast(`Добавлено в корзину: ${SKU[sku].short}`)},
 count(){return this.items().reduce((a,b)=>a+b.qty,0)},sub(){return this.items().reduce((a,b)=>a+SKU[b.sku].sizes[b.size].price*(1-SKU[b.sku].disc/100)*b.qty,0)}};
const unitPrice=(s,size=0)=>Math.round(s.sizes[size].price*(1-s.disc/100)/10)*10;
const Wish={items:()=>LS.get("av_wish",[]),toggle(sku){let w=this.items();w=w.includes(sku)?w.filter(x=>x!==sku):[...w,sku];LS.set("av_wish",w);updateBadges();return w.includes(sku)},has(s){return this.items().includes(s)}};
const Auth={user:()=>{const e=LS.get("av_session",null);return e?LS.get("av_users",{})[e]:null}};
const FREE_SHIP=4000;
function cheapest(nid){return SKUS.filter(s=>s.nid===nid).sort((a,b)=>unitPrice(a)-unitPrice(b))[0]}
function card(s){const p=unitPrice(s);return `<article class="pcard"><button class="wish ${Wish.has(s.sku)?"on":""}" data-wish="${s.sku}" aria-label="В избранное">♥</button>
 ${s.disc?`<span class="badge sale">−${s.disc}%</span>`:s.isNew?`<span class="badge new">Новинка</span>`:s.best?`<span class="badge best">Хит</span>`:""}
 <a href="product.html?id=${s.sku}" class="pimg">${bottle(s,0,150)}</a><div class="pbody"><a class="pbrand" href="catalog.html?brand=${encodeURIComponent(s.brand)}">${s.brand}</a>
 <a href="product.html?id=${s.sku}" class="ptitle">${s.title}</a><div class="prate">${stars(s.rating)} <span>${s.reviews.toLocaleString("ru-RU")}</span></div>
 <div class="pprice"><b>${fmt(p)}</b>${s.disc?`<s>${fmt(s.sizes[0].price)}</s>`:""}<small class="example">пример цены</small></div>
 <div class="pmeta">${FORMS[s.form]} · ${s.sizes[0].label}${s.vegan?' · <span class="tag good">веган</span>':""}</div>
 <button class="btn sm add" data-add="${s.sku}">В корзину</button></div></article>`}
document.addEventListener("click",e=>{const a=e.target.closest("[data-add]");if(a){e.preventDefault();Cart.add(a.dataset.add,+(a.dataset.size||0),+(a.dataset.qty||1))}
 const w=e.target.closest("[data-wish]");if(w){e.preventDefault();const on=Wish.toggle(w.dataset.wish);w.classList.toggle("on",on);toast(on?"Добавлено в избранное":"Удалено из избранного")}});
function toast(t){let el=document.getElementById("toast");if(!el){el=document.createElement("div");el.id="toast";document.body.append(el)}el.textContent=t;el.className="show";clearTimeout(el._t);el._t=setTimeout(()=>el.className="",2200)}
function updateBadges(){const c=document.getElementById("cartCount"),w=document.getElementById("wishCount");if(c)c.textContent=Cart.count();if(w)w.textContent=Wish.items().length}
