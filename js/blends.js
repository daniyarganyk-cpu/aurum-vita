document.getElementById("list").innerHTML=SKUS.filter(s=>BYID[s.nid].cat==="blend"||["mushblend"].includes(s.nid)).map(card).join("");
document.getElementById("note").innerHTML=disclaimer("Бленды с адаптогенами и грибами не рекомендуются при беременности, кормлении, аутоиммунных заболеваниях и приёме антикоагулянтов/седативных без консультации врача. Цены — пример.");
