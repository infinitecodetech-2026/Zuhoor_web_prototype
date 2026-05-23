import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────
   CATALOG — 3 LEVELS
───────────────────────────────────────────────────────── */
const CATALOG = [
  {
    id:"men", label:"Men",
    img:"https://images.unsplash.com/photo-1667839410402-c4266dc7f1d0?q=80&w=764&auto=format&fit=crop",
    subs:[
      { id:"thobe", label:"Thobe",
        img:"https://images.unsplash.com/photo-1614438283000-4ad1b9b5c985?w=700&fit=crop&q=85",
        subsubs:[{id:"full-sleeve",label:"Full Sleeve Thobe"},{id:"half-sleeve",label:"Half Sleeve Thobe"},{id:"arabian",label:"Arabian Thobe"},{id:"saudi",label:"Saudi Thobe"}]},
      { id:"punjabi", label:"Punjabi",
        img:"https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=700&fit=crop&q=85",
        subsubs:[{id:"classic-punjabi",label:"Classic Cotton Punjabi"},{id:"silk-punjabi",label:"Premium Silk Punjabi"},{id:"embroidered-punjabi",label:"Embroidered Punjabi"}]},
      { id:"shirt", label:"Shirt",
        img:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=700&fit=crop&q=85",
        subsubs:[{id:"formal-shirt",label:"Formal Shirt"},{id:"casual-shirt",label:"Casual Shirt"}]},
      { id:"pant", label:"Pant",
        img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=700&fit=crop&q=85",
        subsubs:[{id:"trouser",label:"Trouser"},{id:"pajama",label:"Pajama"}]},
    ]
  },
  {
    id:"women", label:"Women",
    img:"https://images.unsplash.com/photo-1739829417987-28d43f9a6b49?w=600&auto=format&fit=crop&q=60",
    subs:[
      { id:"abaya", label:"Abaya",
        img:"https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=700&fit=crop&q=85",
        subsubs:[{id:"casual-abaya",label:"Casual Abaya"},{id:"designer-abaya",label:"Designer Abaya"},{id:"party-abaya",label:"Party Abaya"},{id:"embroidered-abaya",label:"Embroidered Abaya"}]},
      { id:"hijab", label:"Hijab",
        img:"https://images.unsplash.com/photo-1611601322175-ef8ec8c5e208?w=700&fit=crop&q=85",
        subsubs:[{id:"cotton-hijab",label:"Cotton Hijab"},{id:"silk-hijab",label:"Silk Hijab"}]},
    ]
  },
  {
    id:"kids", label:"Kids",
    img:"https://www.hadiyahgifting.com/cdn/shop/files/MehendiGreenRomper_Bisht.webp?v=1773397496&width=2000",
    subs:[
      { id:"kids-jubba", label:"Jubba",
        img:"https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=700&fit=crop&q=85",
        subsubs:[{id:"boys-jubba",label:"Boys Jubba"},{id:"kids-thobe",label:"Kids Thobe"}]},
      { id:"kids-punjabi", label:"Punjabi",
        img:"https://images.unsplash.com/photo-1503944168849-8bf86875bbd8?w=700&fit=crop&q=85",
        subsubs:[{id:"boys-punjabi",label:"Boys Cotton Punjabi"},{id:"eid-punjabi",label:"Eid Special Punjabi"}]},
    ]
  },
];

/* ─────────────────────────────────────────────────────────
   PRODUCTS — real Unsplash images
───────────────────────────────────────────────────────── */
const INIT_PRODUCTS = [
  { id:1, name:"Premium White Full Sleeve Thobe", cat:"men", sub:"thobe", subsub:"full-sleeve",
    price:2400, originalPrice:3000, discount:20, stock:45,
    colors:[
      {name:"White",hex:"#f5f5f0",img:"https://www.vitabaya.com/cdn/shop/files/A80I1074_b0e0243d-aff5-4f5d-9aba-4f12aa2fe05b.jpg?v=1756868145"},
      {name:"Cream",hex:"#f0e8d0",img:"https://images.unsplash.com/photo-1667839419946-f6c6c2bdf332?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
      {name:"Light Blue",hex:"#c8dff0",img:"https://images.unsplash.com/photo-1667839410402-c4266dc7f1d0?q=80&w=764&auto=format&fit=crop"},
    ],
    sizes:["S","M","L","XL","XXL"],
    desc:"Crafted from premium 100% Egyptian cotton, this full sleeve thobe combines traditional Arabian design with modern comfort. Perfect for daily prayers, Jumu'ah, and formal occasions.",
    rating:4.8, reviews:47, featured:true, newArrival:false },

  { id:2, name:"Classic Half Sleeve Thobe", cat:"men", sub:"thobe", subsub:"half-sleeve",
    price:2100, originalPrice:2600, discount:19, stock:38,
    colors:[
      {name:"White",hex:"#f5f5f0",img:"https://res.cloudinary.com/dlkfhk1nx/image/upload/q_auto/f_auto/v1779517408/haf-sleeve-white-throbe_ch4zo7.jpg"},
      {name:"Beige",hex:"#e0c88a",img:"https://i0.wp.com/www.mens-thobes.com/wp-content/uploads/2023/05/T2A0422-scaled.jpg?fit=400%2C600&ssl=1"},
    ],
    sizes:["M","L","XL","XXL"],
    desc:"Lightweight half sleeve thobe ideal for warm Bangladeshi weather. Breathable cotton blend keeps you comfortable throughout the day.",
    rating:4.5, reviews:32, featured:true, newArrival:false },

  { id:3, name:"Royal Arabian Thobe", cat:"men", sub:"thobe", subsub:"arabian",
    price:3200, originalPrice:null, discount:0, stock:20,
    colors:[
      {name:"White",hex:"#f5f5f0",img:"https://i.etsystatic.com/35486431/r/il/95f260/7737532803/il_fullxfull.7737532803_ey65.jpg"},
      {name:"Navy",hex:"#1a2a4a",img:"https://www.nabia.in/cdn/shop/files/2_2439aa65-ce60-4b0b-9f75-d5a4254b514d.jpg?v=1699523977"},
    ],
    sizes:["M","L","XL","XXL"],
    desc:"Authentic Arabian thobe with gold collar embroidery. A mark of distinguished style for weddings and Eid celebrations.",
    rating:4.9, reviews:28, featured:true, newArrival:true },

  { id:4, name:"Classic Saudi Thobe", cat:"men", sub:"thobe", subsub:"saudi",
    price:2800, originalPrice:3400, discount:18, stock:35,
    colors:[
      {name:"White",hex:"#f5f5f0",img:"https://pub-ce7da8061d0f411ba010b84ef5f6beb8.r2.dev/1750512163500-1.webp"},
      {name:"Grey",hex:"#b0b0b0",img:"https://res.cloudinary.com/dlkfhk1nx/image/upload/q_auto/f_auto/v1779519801/Grey-Saudi-Throbe_tf7evy.webp"},
    ],
    sizes:["M","L","XL","XXL"],
    desc:"Traditional Saudi-cut thobe with precision tailoring. Features a crisp collar, clean lines and premium fabric blend.",
    rating:4.6, reviews:41, featured:false, newArrival:false },

  { id:5, name:"Classic Cotton Punjabi", cat:"men", sub:"punjabi", subsub:"classic-punjabi",
    price:1800, originalPrice:null, discount:0, stock:60,
    colors:[
      {name:"White",hex:"#f5f5f0",img:"https://cdn.othoba.com/images/thumbs/1863883_classic-white-cotton-panjabi.webp"},
      {name:"Sky Blue",hex:"#a0c8e8",img:"https://fashionhq.com.bd/wp-content/uploads/2023/03/p-7.jpeg"},
      {name:"Sage",hex:"#8aab80",img:"https://cdn.kaykraft.com/wp-content/uploads/2025/03/PNJ-CT-LG-1390-2.jpg"},
    ],
    sizes:["S","M","L","XL","XXL"],
    desc:"Traditional cotton punjabi with subtle embroidery at the neckline. Suitable for daily wear, Eid celebrations and religious gatherings.",
    rating:4.6, reviews:62, featured:true, newArrival:false },

  { id:6, name:"Premium Silk Punjabi", cat:"men", sub:"punjabi", subsub:"silk-punjabi",
    price:3200, originalPrice:3800, discount:16, stock:18,
    colors:[
      {name:"Ivory",hex:"#f0e8d0",img:"https://twelvebd.com/cdn/shop/files/SB-PANK-TM24-04F-56261_3.jpg?v=1756710487&width=533"},
      {name:"Gold",hex:"#c8a040",img:"https://twelvebd.com/cdn/shop/files/PH-PANE-TM25-04EF-76810_5.jpg?v=1756707490"},
    ],
    sizes:["M","L","XL","XXL"],
    desc:"Luxurious silk-blend punjabi adorned with gold zari embroidery. The definitive choice for weddings and celebrations.",
    rating:4.9, reviews:21, featured:true, newArrival:true },

  { id:7, name:"Elegant Black Abaya", cat:"women", sub:"abaya", subsub:"casual-abaya",
    price:3200, originalPrice:null, discount:0, stock:40,
    colors:[
      {name:"Black",hex:"#111111",img:"https://tabeens.com/cdn/shop/files/Elegant_Black_Abaya_with_Golden_Embroidery_1.jpg?v=1729795445"},
      {name:"Charcoal",hex:"#3a3a3a",img:"https://veilandco.ca/cdn/shop/files/7_51a29811-2cac-4c9a-aefb-504495b12749.png?v=1756222979"},
    ],
    sizes:["S","M","L","XL","XXL"],
    desc:"Flowing black abaya in premium crepe fabric. A timeless silhouette for the modern modest woman.",
    rating:4.7, reviews:53, featured:true, newArrival:false },

  { id:8, name:"Designer Party Abaya", cat:"women", sub:"abaya", subsub:"party-abaya",
    price:4500, originalPrice:5500, discount:18, stock:15,
    colors:[
      {name:"Black",hex:"#111111",img:"https://www.palestinianelegance.com/cdn/shop/files/Elegant_woman_in_black_abaya_2.png"},
      {name:"Deep Blue",hex:"#182060",img:"https://jamilamodesty.com/cdn/shop/products/IMG-20230110-WA0108.jpg?v=1676653810"},
    ],
    sizes:["S","M","L","XL"],
    desc:"Intricately embroidered party abaya with delicate lace trim and pearl detailing for special events.",
    rating:4.8, reviews:19, featured:true, newArrival:true },

  { id:9, name:"Boys White Jubba", cat:"kids", sub:"kids-jubba", subsub:"boys-jubba",
    price:1500, originalPrice:1800, discount:17, stock:60,
    colors:[
      {name:"White",hex:"#f5f5f0",img:"https://www.nabia.in/cdn/shop/files/3-2.jpg?v=1731222053"},
      {name:"Cream",hex:"#f0e8d0",img:"https://www.junaidjamshed.com/cdn/shop/files/jc-jubba-33667_3.jpg?v=1777064006&width=436"},
    ],
    sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"],
    desc:"Soft premium cotton jubba for boys. Comfortable for madrasa every day, special enough for Eid.",
    rating:4.8, reviews:44, featured:true, newArrival:false },

  { id:10, name:"Kids Eid Punjabi Set", cat:"kids", sub:"kids-punjabi", subsub:"eid-punjabi",
    price:1200, originalPrice:1500, discount:20, stock:75,
    colors:[
      {name:"White",hex:"#f5f5f0",img:"https://mcprod.aarong.com/media/catalog/product/0/1/0190000058709.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=&width="},
      {name:"Blue",hex:"#a0b8d8",img:"https://objectstorage.ap-singapore-1.oraclecloud.com/n/aximxvolvk6d/b/sailorbucket/o/uploads/all/KcN5rhHJ6J4SN0GaBkD6PMEdxxTK3EoFX43DXWpP.jpg"},
    ],
    sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"],
    desc:"Festive punjabi set for kids with vibrant embroidery. Makes every celebration a joyful memory.",
    rating:4.6, reviews:36, featured:true, newArrival:true },

  { id:11, name:"Embroidered Navy Punjabi", cat:"men", sub:"punjabi", subsub:"embroidered-punjabi",
    price:2400, originalPrice:2900, discount:17, stock:25,
    colors:[
      {name:"Navy",hex:"#1a2a4a",img:"https://res.cloudinary.com/dlkfhk1nx/image/upload/q_auto/f_auto/v1779519494/naby-blue-embroidered-panjabi_zweth5.webp"},
      {name:"Maroon",hex:"#6b1c22",img:"https://lyonorabd.com/cdn/shop/files/5rtwq.jpg?v=1758040066"},
    ],
    sizes:["M","L","XL","XXL"],
    desc:"Rich embroidered punjabi with collar and cuff detailing. Perfect for religious gatherings and formal events.",
    rating:4.7, reviews:29, featured:false, newArrival:true },

  { id:12, name:"Embroidered Casual Abaya", cat:"women", sub:"abaya", subsub:"embroidered-abaya",
    price:3800, originalPrice:4500, discount:16, stock:22,
    colors:[
      {name:"Black",hex:"#111111",img:"https://res.cloudinary.com/dlkfhk1nx/image/upload/q_auto/f_auto/v1779520161/black-casual-abaya_rw792z.webp"},
      {name:"Olive",hex:"#5c6030",img:"https://mariam-col.com/cdn/shop/files/olive-branch-embroidered-linen-abaya-set-with-matching-belt-hijab-moa037-2799477.jpg?v=1758177148&width=1200"},
    ],
    sizes:["S","M","L","XL","XXL"],
    desc:"Subtle floral embroidery on premium fabric. Where comfort meets culture for the modern everyday woman.",
    rating:4.6, reviews:33, featured:false, newArrival:false },
];

const INIT_BANNERS = [
  { id:1, title:"Eid Collection 2026", subtitle:"Authentic Thobes, Punjabis & Abayas — Crafted for Every Occasion", cta:"Shop Now", ctaLink:"men",
    bg:"https://res.cloudinary.com/dlkfhk1nx/image/upload/q_auto/f_auto/v1779521037/eid-dress-banner_qhkv2h.jpg", active:true },
  { id:2, title:"Women's Modest Fashion", subtitle:"Elegant Abayas Curated for the Modern Modest Woman", cta:"Explore Women's", ctaLink:"women",
    bg:"https://cdn.shopify.com/s/files/1/0569/2404/5469/files/Azure-Eid-Ensemble-24-Web_Banner.jpg?v=1734681697", active:true },
  { id:3, title:"New Kids Collection", subtitle:"Beautiful Jubbas & Punjabis for Your Little Ones", cta:"Shop Kids", ctaLink:"kids",
    bg:"https://res.cloudinary.com/dlkfhk1nx/image/upload/q_auto/f_auto/v1779522062/eid-kids-collection_t79ljl.png", active:true },
];

const INIT_COUPONS = [
  { id:1, code:"ZUHOOR10", type:"percent", value:10, minOrder:0, active:true, uses:24, maxUses:100 },
  { id:2, code:"EID20", type:"percent", value:20, minOrder:2000, active:true, uses:8, maxUses:50 },
  { id:3, code:"SAVE300", type:"flat", value:300, minOrder:1500, active:true, uses:15, maxUses:200 },
];

const INIT_ORDERS = [
  { id:"ZHR-2401", customer:"Ahmed Hassan", phone:"01712-345678", address:"House 12, Mirpur, Dhaka", city:"Dhaka",
    items:[{name:"Premium White Full Sleeve Thobe",size:"L",color:"White",qty:1,price:2400}],
    subtotal:2400, discount:0, shipping:0, total:2400, status:"Pending", date:"17 May 2026", coupon:"", note:"" },
  { id:"ZHR-2400", customer:"Fatima Khatun", phone:"01813-456789", address:"Nasirabad, Chittagong", city:"Chittagong",
    items:[{name:"Elegant Black Abaya",size:"M",color:"Black",qty:1,price:3200}],
    subtotal:3200, discount:0, shipping:0, total:3200, status:"Processing", date:"16 May 2026", coupon:"", note:"" },
  { id:"ZHR-2399", customer:"Mohammed Khan", phone:"01611-234567", address:"Shahjalal, Sylhet", city:"Sylhet",
    items:[{name:"Classic Cotton Punjabi",size:"XL",color:"White",qty:2,price:3600}],
    subtotal:3600, discount:360, shipping:0, total:3240, status:"Shipped", date:"15 May 2026", coupon:"ZUHOOR10", note:"" },
  { id:"ZHR-2398", customer:"Rahima Begum", phone:"01914-567890", address:"Bogra Road, Rajshahi", city:"Rajshahi",
    items:[{name:"Boys White Jubba",size:"6-7Y",color:"White",qty:2,price:3000}],
    subtotal:3000, discount:600, shipping:0, total:2400, status:"Delivered", date:"14 May 2026", coupon:"EID20", note:"" },
];

/* ─────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────── */
function getLabel(type, id) {
  if (type==="cat") { const c=CATALOG.find(x=>x.id===id); return c?c.label:id; }
  if (type==="sub") { for(const c of CATALOG){const s=c.subs.find(x=>x.id===id);if(s)return s.label;} return id; }
  if (type==="ss") { for(const c of CATALOG)for(const s of c.subs){const ss=s.subsubs.find(x=>x.id===id);if(ss)return ss.label;} return id; }
  return id;
}

/* ─────────────────────────────────────────────────────────
   ANIMATION HOOK
───────────────────────────────────────────────────────── */
function useInView(threshold=0.15) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){setVisible(true);obs.disconnect();} }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}



/* ─────────────────────────────────────────────────────────
   CSS
───────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'DM Sans', sans-serif; background: #fff; color: #111; -webkit-font-smoothing: antialiased; overflow-x: hidden; }

:root {
  --blk: #0d0d0d;
  --dark: #1a1a1a;
  --ch: #2d2d2d;
  --mid: #666;
  --lt: #999;
  --brd: #e0e0e0;
  --bg: #f8f7f5;
  --wh: #fff;
  --gold: #b8923a;
  --gold2: #d4aa5a;
  --goldp: #fdf6ea;
  --red: #c0392b;
  --grn: #1e7e4a;
}

@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn { from{opacity:0} to{opacity:1} }
@keyframes slideLeft { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
@keyframes slideRight { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
@keyframes scaleIn { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes shimmer { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
@keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

.anim-fadeup { opacity:0; transform:translateY(32px); transition:opacity .7s cubic-bezier(.4,0,.2,1), transform .7s cubic-bezier(.4,0,.2,1); }
.anim-fadeup.visible { opacity:1; transform:translateY(0); }
.anim-left { opacity:0; transform:translateX(40px); transition:opacity .7s cubic-bezier(.4,0,.2,1), transform .7s cubic-bezier(.4,0,.2,1); }
.anim-left.visible { opacity:1; transform:translateX(0); }
.anim-right { opacity:0; transform:translateX(-40px); transition:opacity .7s cubic-bezier(.4,0,.2,1), transform .7s cubic-bezier(.4,0,.2,1); }
.anim-right.visible { opacity:1; transform:translateX(0); }
.anim-scale { opacity:0; transform:scale(0.93); transition:opacity .6s ease, transform .6s ease; }
.anim-scale.visible { opacity:1; transform:scale(1); }
.delay-1 { transition-delay:.1s; }
.delay-2 { transition-delay:.2s; }
.delay-3 { transition-delay:.3s; }
.delay-4 { transition-delay:.4s; }
.delay-5 { transition-delay:.5s; }
.delay-6 { transition-delay:.6s; }

/* ── TOPBAR ── */
.topbar { background: var(--blk); color: #fff; overflow: hidden; height: 36px; display: flex; align-items: center; }
.topbar-marquee { display: flex; width: max-content; animation: marquee 22s linear infinite; gap: 0; }
.topbar-item { white-space: nowrap; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 500; padding: 0 40px; }
.topbar-sep { color: var(--gold); font-size: 14px; }

/* ── NAV ── */
.nav { background: rgba(255,255,255,0.96); backdrop-filter: blur(12px); border-bottom: 1px solid var(--brd); position: sticky; top: 0; z-index: 800; transition: box-shadow .3s; }
.nav.scrolled { box-shadow: 0 4px 24px rgba(0,0,0,.1); }
.nav-w { max-width: 1380px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; height: 68px; gap: 0; }
.nav-logo { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; color: var(--blk); cursor: pointer; flex-shrink: 0; letter-spacing: 3px; transition: opacity .2s; }
.nav-logo:hover { opacity: .75; }
.nav-logo em { color: var(--gold); font-style: normal; }
.nav-cats { display: flex; gap: 0; flex: 1; padding-left: 32px; }
.nav-cat { position: relative; padding: 8px 16px; font-size: 13px; font-weight: 500; color: var(--ch); cursor: pointer; border: none; background: none; font-family: 'DM Sans', sans-serif; transition: color .2s; line-height: 1; white-space: nowrap; }
.nav-cat::after { content:''; position:absolute; bottom:0; left:50%; right:50%; height:2px; background:var(--gold); transition:left .3s,right .3s; }
.nav-cat:hover::after { left:16px; right:16px; }
.nav-cat:hover { color: var(--blk); }
.nav-mega { position: absolute; top: calc(100% + 1px); left: 50%; transform: translateX(-50%); background: #fff; border: 1px solid var(--brd); box-shadow: 0 16px 48px rgba(0,0,0,.12); display: none; z-index: 900; padding: 24px; gap: 20px; min-width: 520px; animation: scaleIn .2s ease; }
.nav-cat:hover .nav-mega { display: flex; }
.nmcol { min-width: 130px; }
.nmhead { font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--lt); font-weight: 600; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--brd); }
.nmitem { display: block; padding: 5px 0; font-size: 13px; color: var(--ch); cursor: pointer; background: none; border: none; font-family: 'DM Sans', sans-serif; text-align: left; transition: color .2s, padding-left .2s; width: 100%; }
.nmitem:hover { color: var(--gold); padding-left: 6px; }
.nav-r { display: flex; align-items: center; gap: 8px; margin-left: auto; flex-shrink: 0; }
.sbox { position: relative; display: flex; align-items: center; }
.sinput { border: 1.5px solid var(--brd); background: var(--bg); padding: 9px 14px 9px 38px; font-size: 13px; font-family: 'DM Sans', sans-serif; width: 210px; outline: none; transition: border-color .25s, width .35s, box-shadow .25s; border-radius: 24px; }
.sinput:focus { border-color: var(--blk); width: 260px; box-shadow: 0 0 0 3px rgba(184,146,58,.15); }
.sico { position: absolute; left: 12px; color: var(--lt); font-size: 14px; pointer-events: none; }
.sdrop { position: absolute; top: calc(100% + 6px); left: 0; right: 0; background: #fff; border: 1px solid var(--brd); box-shadow: 0 16px 40px rgba(0,0,0,.12); z-index: 901; max-height: 300px; overflow-y: auto; border-radius: 8px; animation: fadeUp .2s ease; }
.ssug { display: flex; align-items: center; gap: 12px; padding: 10px 14px; cursor: pointer; border-bottom: 1px solid var(--bg); transition: background .15s; }
.ssug:hover { background: var(--bg); }
.ssug-img { width: 38px; height: 48px; object-fit: cover; border-radius: 3px; flex-shrink: 0; }
.ssug-name { font-size: 13px; font-weight: 500; line-height: 1.3; }
.ssug-price { font-size: 12px; color: var(--mid); }
.ico-btn { background: none; border: none; cursor: pointer; padding: 9px; color: var(--ch); font-size: 20px; position: relative; display: flex; align-items: center; justify-content: center; transition: color .2s, transform .2s; border-radius: 50%; }
.ico-btn:hover { color: var(--blk); transform: scale(1.12); }
.cbadge { position: absolute; top: 2px; right: 2px; background: var(--gold); color: #fff; font-size: 9px; min-width: 16px; height: 16px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; padding: 0 3px; }
.adm-link { font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; border: 1.5px solid var(--blk); padding: 7px 16px; color: var(--blk); cursor: pointer; background: none; font-family: 'DM Sans', sans-serif; transition: all .25s; border-radius: 2px; }
.adm-link:hover { background: var(--blk); color: #fff; }
.hbg { display: none; background: none; border: none; cursor: pointer; padding: 8px; font-size: 23px; color: var(--blk); transition: transform .2s; }
.hbg:hover { transform: scale(1.1); }

/* ── DRAWER ── */
.drw-bg { position: fixed; inset: 0; background: rgba(0,0,0,.55); z-index: 1500; opacity: 0; pointer-events: none; transition: opacity .3s; }
.drw-bg.open { opacity: 1; pointer-events: all; }
.drw { position: fixed; top: 0; left: 0; width: 310px; height: 100%; background: #fff; z-index: 1501; transform: translateX(-100%); transition: transform .35s cubic-bezier(.4,0,.2,1); overflow-y: auto; }
.drw.open { transform: translateX(0); }
.drw-head { padding: 20px 22px; border-bottom: 1px solid var(--brd); display: flex; justify-content: space-between; align-items: center; }
.drw-logo { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 900; letter-spacing: 2px; }
.drw-close { background: none; border: none; font-size: 24px; cursor: pointer; color: var(--mid); transition: color .2s, transform .2s; }
.drw-close:hover { color: var(--blk); transform: rotate(90deg); }
.drw-sec { border-bottom: 1px solid var(--brd); }
.drw-sechead { padding: 14px 22px; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; display: flex; justify-content: space-between; align-items: center; cursor: pointer; background: none; border: none; width: 100%; font-family: 'DM Sans', sans-serif; transition: color .2s; }
.drw-sechead:hover { color: var(--gold); }
.drw-item { display: block; padding: 10px 30px; font-size: 14px; color: var(--ch); cursor: pointer; transition: color .2s, padding-left .2s; }
.drw-item:hover { color: var(--gold); padding-left: 36px; }
.drw-subitem { padding-left: 42px; font-size: 13px; color: var(--mid); }

/* ── HERO ── */
.hero { position: relative; overflow: hidden; background: var(--blk); }
.hero-track { display: flex; transition: transform .85s cubic-bezier(.4,0,.2,1); }
.hero-slide { flex-shrink: 0; width: 100%; position: relative; }
.hero-img { width: 100%; height: 620px; object-fit: cover; display: block; }
.hero-ov { position: absolute; inset: 0; background: linear-gradient(110deg, rgba(5,5,5,.82) 0%, rgba(5,5,5,.28) 60%, transparent 100%); }
.hero-body { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; padding: 0 90px; }
.hero-tag { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 16px; }
.hero-tag-line { width: 30px; height: 1.5px; background: var(--gold); }
.hero-title { font-family: 'Playfair Display', serif; font-size: 62px; font-weight: 900; color: #fff; line-height: 1.08; margin-bottom: 16px; max-width: 600px; }
.hero-sub { font-size: 16px; color: rgba(255,255,255,.75); font-weight: 300; line-height: 1.7; margin-bottom: 32px; max-width: 420px; }
.hero-cta { display: inline-flex; align-items: center; gap: 12px; background: var(--gold); color: #fff; font-size: 12px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; padding: 15px 36px; cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; transition: background .25s, transform .2s, box-shadow .25s; width: fit-content; }
.hero-cta:hover { background: var(--gold2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(184,146,58,.4); }
.hero-cta-arrow { transition: transform .25s; }
.hero-cta:hover .hero-cta-arrow { transform: translateX(4px); }
.hero-cta-secondary { display: inline-flex; align-items: center; gap: 8px; color: rgba(255,255,255,.8); font-size: 12px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; border: none; background: none; font-family: 'DM Sans', sans-serif; margin-left: 20px; transition: color .2s; text-decoration: underline; text-underline-offset: 3px; }
.hero-cta-secondary:hover { color: #fff; }
.hero-btns { display: flex; align-items: center; flex-wrap: wrap; gap: 0; }
.hero-dots { position: absolute; bottom: 28px; left: 90px; display: flex; gap: 8px; z-index: 10; }
.hero-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,.4); border: none; cursor: pointer; padding: 0; transition: all .3s; }
.hero-dot.on { background: var(--gold); width: 24px; border-radius: 4px; }
.harr { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,.1); border: 1.5px solid rgba(255,255,255,.3); color: #fff; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; cursor: pointer; backdrop-filter: blur(8px); font-size: 18px; transition: all .25s; z-index: 10; }
.harr:hover { background: rgba(255,255,255,.2); border-color: rgba(255,255,255,.6); transform: translateY(-50%) scale(1.05); }
.harr.l { left: 24px; }
.harr.r { right: 24px; }

/* ── SECTIONS ── */
.sec { padding: 80px 0; }
.sec.bg { background: var(--bg); }
.ctr { max-width: 1380px; margin: 0 auto; padding: 0 24px; }
.sec-hd { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 40px; gap: 16px; flex-wrap: wrap; }
.sec-eye { font-size: 10.5px; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
.sec-eye::before { content:''; width:20px; height:1.5px; background:var(--gold); }
.sec-tit { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: var(--blk); line-height: 1.15; }
.see-all { font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--blk); cursor: pointer; border: none; background: none; border-bottom: 1.5px solid var(--blk); padding-bottom: 2px; font-family: 'DM Sans', sans-serif; transition: color .2s, border-color .2s; white-space: nowrap; }
.see-all:hover { color: var(--gold); border-color: var(--gold); }

/* ── PRODUCT CARD ── */
.pgrid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
.pcard { cursor: pointer; position: relative; }
.pcard-iw { position: relative; overflow: hidden; background: var(--bg); aspect-ratio: 3/4; margin-bottom: 14px; border-radius: 2px; }
.pcard-img { width: 100%; height: 100%; object-fit: cover; transition: transform .65s cubic-bezier(.4,0,.2,1); display: block; }
.pcard:hover .pcard-img { transform: scale(1.08); }
.pcard-inner { transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s; }
.pcard:hover .pcard-inner { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,.13); }
.pbadge { position: absolute; top: 12px; left: 12px; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 4px 10px; z-index: 2; border-radius: 1px; }
.pb-sale { background: var(--red); color: #fff; }
.pb-new { background: var(--blk); color: #fff; }
.pcdots { position: absolute; bottom: 12px; left: 12px; display: flex; gap: 6px; z-index: 2; }
.pcdot { width: 14px; height: 14px; border-radius: 50%; cursor: pointer; transition: transform .25s, box-shadow .25s; border: 2px solid rgba(255,255,255,.6); }
.pcdot:hover { transform: scale(1.35); }
.pcard-acts { position: absolute; bottom: 0; left: 0; right: 0; display: flex; transform: translateY(100%); transition: transform .3s cubic-bezier(.4,0,.2,1); z-index: 3; }
.pcard:hover .pcard-acts { transform: translateY(0); }
.pcbtn { flex: 1; padding: 12px 6px; font-size: 11px; letter-spacing: 1.2px; font-weight: 600; text-transform: uppercase; color: #fff; background: var(--blk); border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background .2s; }
.pcbtn:hover { background: var(--gold); }
.pcbtn.b2 { background: #2a2a2a; }
.pcbtn.b2:hover { background: var(--gold); }
.pcard-name { font-size: 14px; font-weight: 500; color: var(--blk); margin-bottom: 4px; line-height: 1.4; }
.pcard-sub { font-size: 11px; color: var(--lt); margin-bottom: 6px; text-transform: uppercase; letter-spacing: .5px; }
.pcard-pr { display: flex; align-items: center; gap: 8px; }
.pcard-now { font-size: 15px; font-weight: 700; color: var(--blk); }
.pcard-was { font-size: 13px; color: var(--lt); text-decoration: line-through; }

/* ── SCROLL CAROUSEL ── */
.scrl-wrap { position: relative; }
.scrl { display: flex; gap: 24px; overflow-x: auto; scroll-behavior: smooth; scrollbar-width: none; padding-bottom: 4px; }
.scrl::-webkit-scrollbar { display: none; }
.scrl .pcard-inner { flex: 0 0 calc(25% - 18px); min-width: 200px; }
.sarr { position: absolute; top: 36%; transform: translateY(-50%); background: #fff; border: 1.5px solid var(--brd); width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; font-size: 16px; box-shadow: 0 4px 16px rgba(0,0,0,.1); transition: all .25s; }
.sarr:hover { background: var(--blk); color: #fff; border-color: var(--blk); transform: translateY(-50%) scale(1.08); }
.sarr.l { left: -22px; }
.sarr.r { right: -22px; }

/* ── CATEGORY CARDS ── */
.cgrid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.ccard { position: relative; overflow: hidden; cursor: pointer; }
.ccard-img { width: 100%; height: 380px; object-fit: cover; display: block; transition: transform .65s cubic-bezier(.4,0,.2,1), filter .4s; }
.ccard:hover .ccard-img { transform: scale(1.07); filter: brightness(0.9); }
.ccard-ov { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.72) 0%, rgba(0,0,0,.1) 55%); transition: opacity .3s; }
.ccard-body { position: absolute; bottom: 26px; left: 26px; transition: bottom .3s cubic-bezier(.4,0,.2,1); }
.ccard:hover .ccard-body { bottom: 34px; }
.ccard-name { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: #fff; margin-bottom: 3px; }
.ccard-subs { font-size: 12px; color: rgba(255,255,255,.75); margin-bottom: 12px; }
.ccard-btn { font-size: 10.5px; letter-spacing: 2px; text-transform: uppercase; color: #fff; border: 1.5px solid rgba(255,255,255,.65); padding: 7px 16px; background: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600; transition: all .25s; }
.ccard-btn:hover { background: #fff; color: var(--blk); }

/* ── CHIPS ── */
.chips { display: flex; gap: 7px; margin-bottom: 24px; flex-wrap: wrap; overflow-x: auto; scrollbar-width: none; }
.chips::-webkit-scrollbar { display: none; }
.chip { padding: 7px 18px; font-size: 12.5px; font-weight: 500; color: var(--mid); cursor: pointer; border: 1.5px solid var(--brd); background: #fff; font-family: 'DM Sans', sans-serif; transition: all .2s; white-space: nowrap; border-radius: 24px; }
.chip.on { border-color: var(--blk); color: var(--blk); font-weight: 600; background: var(--blk); color: #fff; }
.chip:hover:not(.on) { border-color: var(--ch); color: var(--ch); }

/* ── STATS BAND ── */
.stats-band { background: var(--blk); padding: 40px 0; }
.stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; }
.stat-item { text-align: center; padding: 16px; border-right: 1px solid rgba(255,255,255,.1); }
.stat-item:last-child { border-right: none; }
.stat-num { font-family: 'Playfair Display', serif; font-size: 38px; font-weight: 700; color: var(--gold); line-height: 1; margin-bottom: 6px; }
.stat-lbl { font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,.6); font-weight: 500; }

/* ── WHOLESALE ── */
.ws { background: var(--blk); padding: 88px 0; text-align: center; position: relative; overflow: hidden; }
.ws::before { content:''; position:absolute; inset:0; background:url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&fit=crop&q=60') center/cover; opacity:.08; }
.ws-inner { position: relative; z-index: 1; }
.ws-eye { font-size: 10.5px; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; gap: 10px; }
.ws-eye::before,.ws-eye::after { content:''; width:24px; height:1.5px; background:var(--gold); }
.ws-tit { font-family: 'Playfair Display', serif; font-size: 46px; font-weight: 700; color: #fff; margin-bottom: 14px; }
.ws-sub { font-size: 16px; color: rgba(255,255,255,.65); font-weight: 300; max-width: 480px; margin: 0 auto 32px; line-height: 1.7; }
.ws-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.btn-gold { background: var(--gold); color: #fff; border: none; padding: 14px 32px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600; transition: all .25s; }
.btn-gold:hover { background: var(--gold2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(184,146,58,.4); }
.btn-ol { background: none; color: #fff; border: 1.5px solid rgba(255,255,255,.5); padding: 14px 32px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600; transition: all .25s; }
.btn-ol:hover { border-color: #fff; background: rgba(255,255,255,.08); }

/* ── WHY ── */
.wgrid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
.wcard { padding: 32px 24px; border: 1px solid var(--brd); text-align: center; transition: border-color .3s, box-shadow .3s, transform .3s; position: relative; overflow: hidden; }
.wcard::before { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:var(--gold); transform:scaleX(0); transition:transform .3s; }
.wcard:hover { border-color: var(--gold); box-shadow: 0 8px 32px rgba(184,146,58,.12); transform: translateY(-4px); }
.wcard:hover::before { transform: scaleX(1); }
.wico { width: 52px; height: 52px; background: var(--goldp); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 22px; transition: transform .3s; }
.wcard:hover .wico { transform: scale(1.1) rotate(5deg); }
.wtit { font-size: 15px; font-weight: 600; margin-bottom: 8px; font-family: 'Playfair Display', serif; }
.wtxt { font-size: 13.5px; color: var(--mid); line-height: 1.7; }

/* ── TESTIMONIALS ── */
.tgrid { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; }
.tcard { background: #fff; padding: 28px; border: 1px solid var(--brd); transition: transform .3s, box-shadow .3s; position: relative; }
.tcard:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,.1); }
.tcard::before { content:'"'; position:absolute; top:14px; right:20px; font-family:'Playfair Display',serif; font-size:60px; color:var(--goldp); line-height:1; }
.tstars { color: var(--gold); font-size: 14px; margin-bottom: 12px; letter-spacing: 2px; }
.ttxt { font-size: 14px; color: var(--ch); line-height: 1.8; margin-bottom: 16px; font-style: italic; }
.tauth { font-size: 14px; font-weight: 600; }
.tloc { font-size: 12px; color: var(--mid); }

/* ── FAQ ── */
.faq-wrap { max-width: 760px; margin: 0 auto; }
.faq-item { border-bottom: 1px solid var(--brd); }
.faq-q { width: 100%; text-align: left; padding: 18px 0; font-size: 15.5px; font-weight: 500; color: var(--blk); background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-family: 'DM Sans', sans-serif; gap: 16px; transition: color .2s; }
.faq-q:hover { color: var(--gold); }
.faq-ico { width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid var(--brd); display: flex; align-items: center; justify-content: center; font-size: 18px; color: var(--mid); flex-shrink: 0; transition: all .3s; }
.faq-ico.open { background: var(--gold); border-color: var(--gold); color: #fff; transform: rotate(45deg); }
.faq-a { font-size: 14px; color: var(--mid); line-height: 1.8; max-height: 0; overflow: hidden; transition: max-height .4s cubic-bezier(.4,0,.2,1), padding .3s; }
.faq-a.open { max-height: 200px; padding-bottom: 18px; }

/* ── CONTACT ── */
.cg { display: grid; grid-template-columns: 1fr 1.3fr; gap: 64px; align-items: start; }
.cs-tit { font-family: 'Playfair Display', serif; font-size: 34px; font-weight: 700; margin-bottom: 14px; line-height: 1.2; }
.cs-txt { font-size: 14px; color: var(--mid); line-height: 1.8; margin-bottom: 28px; }
.crow { display: flex; gap: 14px; margin-bottom: 16px; align-items: flex-start; }
.cico { color: var(--gold); font-size: 16px; margin-top: 2px; flex-shrink: 0; }
.cval { font-size: 14px; color: var(--ch); line-height: 1.5; }

/* ── FORMS ── */
.fl { font-size: 11px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; color: var(--ch); display: block; margin-bottom: 7px; }
.fi { width: 100%; border: 1.5px solid var(--brd); padding: 12px 14px; font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; background: #fff; transition: border-color .25s, box-shadow .25s; border-radius: 2px; }
.fi:focus { border-color: var(--blk); box-shadow: 0 0 0 3px rgba(13,13,13,.06); }
.fia { resize: vertical; min-height: 100px; }
.fg { margin-bottom: 16px; }
.frow { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.fsel { width: 100%; border: 1.5px solid var(--brd); padding: 12px 14px; font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; background: #fff; -webkit-appearance: none; cursor: pointer; border-radius: 2px; transition: border-color .25s; }
.fsel:focus { border-color: var(--blk); }
.fsub { width: 100%; background: var(--blk); color: #fff; border: none; padding: 14px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600; transition: all .25s; margin-top: 6px; }
.fsub:hover { background: var(--gold); }

/* ── FOOTER ── */
.footer { background: #0a0a0a; color: #fff; padding: 64px 0 0; }
.fgrid { display: grid; grid-template-columns: 1.8fr 1fr 1fr 1.2fr; gap: 52px; margin-bottom: 52px; }
.flogo { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 900; margin-bottom: 12px; letter-spacing: 2px; }
.flogo em { color: var(--gold); font-style: normal; }
.fdesc { font-size: 13.5px; color: rgba(255,255,255,.5); line-height: 1.8; max-width: 270px; margin-bottom: 20px; }
.fsocial { display: flex; gap: 8px; }
.fsoc { width: 36px; height: 36px; border: 1.5px solid rgba(255,255,255,.2); display: flex; align-items: center; justify-content: center; cursor: pointer; background: none; color: rgba(255,255,255,.6); font-size: 13px; transition: all .25s; font-family: monospace; border-radius: 2px; }
.fsoc:hover { border-color: var(--gold); color: var(--gold); background: rgba(184,146,58,.08); }
.fhead { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,.35); margin-bottom: 16px; font-weight: 600; }
.flink { display: block; font-size: 13.5px; color: rgba(255,255,255,.65); margin-bottom: 9px; cursor: pointer; background: none; border: none; font-family: 'DM Sans', sans-serif; text-align: left; transition: color .2s, padding-left .2s; }
.flink:hover { color: var(--gold); padding-left: 5px; }
.fcon { display: flex; gap: 11px; margin-bottom: 12px; }
.fcico { color: var(--gold); font-size: 14px; margin-top: 2px; flex-shrink: 0; }
.fcval { font-size: 13.5px; color: rgba(255,255,255,.65); line-height: 1.5; }
.fbot { border-top: 1px solid rgba(255,255,255,.07); padding: 20px 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
.fcopy { font-size: 12px; color: rgba(255,255,255,.35); }
.fdev { font-size: 12px; color: rgba(255,255,255,.35); }
.fdev em { color: var(--gold); font-style: normal; }

/* ── MOBILE NAV ── */
.mobnav { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,.97); backdrop-filter: blur(12px); border-top: 1px solid var(--brd); z-index: 799; padding: 6px 0 4px; }
.mobnav-inner { display: flex; justify-content: space-around; }
.mobnav-btn { display: flex; flex-direction: column; align-items: center; gap: 3px; font-size: 10px; font-weight: 500; color: var(--mid); background: none; border: none; cursor: pointer; padding: 4px 10px; font-family: 'DM Sans', sans-serif; transition: color .2s; min-width: 60px; }
.mobnav-btn.on { color: var(--blk); }
.mobnav-ico { font-size: 21px; }

/* ── PAGE HEADER ── */
.phdr { background: var(--blk); color: #fff; padding: 48px 0 36px; }
.phdr-tit { font-family: 'Playfair Display', serif; font-size: 42px; font-weight: 700; margin-bottom: 6px; }
.phdr-sub { font-size: 13px; color: rgba(255,255,255,.5); }
.bc { display: flex; gap: 8px; align-items: center; font-size: 12.5px; margin-bottom: 12px; flex-wrap: wrap; }
.bci { color: rgba(255,255,255,.5); cursor: pointer; transition: color .2s; }
.bci:hover { color: rgba(255,255,255,.85); }
.bcsep { color: rgba(255,255,255,.25); }
.bccur { color: #fff; }

/* ── CATEGORY PAGE ── */
.catlayout { display: flex; gap: 36px; align-items: start; }
.filter-panel { width: 224px; flex-shrink: 0; position: sticky; top: 92px; }
.fsec { border-bottom: 1px solid var(--brd); padding: 16px 0; }
.fsec:first-child { padding-top: 0; }
.ftit { font-size: 11px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase; margin-bottom: 12px; color: var(--blk); }
.fopt { display: flex; align-items: center; gap: 9px; margin-bottom: 7px; cursor: pointer; user-select: none; }
.fchk { width: 16px; height: 16px; border: 1.5px solid var(--brd); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all .2s; border-radius: 2px; font-size: 10px; }
.fchk.on { background: var(--blk); border-color: var(--blk); color: #fff; }
.flbl { font-size: 13.5px; color: var(--ch); }
.ssel { width: 100%; border: 1.5px solid var(--brd); padding: 10px 12px; font-size: 13px; font-family: 'DM Sans', sans-serif; background: #fff; cursor: pointer; outline: none; border-radius: 2px; transition: border-color .2s; }
.ssel:focus { border-color: var(--blk); }
.prods-area { flex: 1; min-width: 0; }
.ftoggle { display: none; background: var(--blk); color: #fff; border: none; padding: 10px 18px; font-size: 11.5px; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600; margin-bottom: 16px; transition: background .2s; width: 100%; }
.ftoggle:hover { background: var(--gold); }
.mobfilt { display: none; background: #fff; border: 1px solid var(--brd); padding: 20px; margin-bottom: 20px; }
.mobfilt.open { display: block; }

/* ── PRODUCT DETAIL ── */
.pdgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
.pd-main-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; transition: opacity .3s; }
.pd-thumbs { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
.pd-thumb { width: 74px; height: 90px; object-fit: cover; cursor: pointer; border: 2px solid transparent; transition: border-color .2s, transform .2s; border-radius: 2px; }
.pd-thumb.on { border-color: var(--blk); }
.pd-thumb:hover { transform: scale(1.04); }
.pd-tit { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; line-height: 1.15; margin-bottom: 8px; }
.pd-rating { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; flex-wrap: wrap; }
.pd-stars { color: var(--gold); font-size: 15px; letter-spacing: 1px; }
.pd-rcnt { font-size: 13px; color: var(--mid); }
.pd-stkin { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--grn); }
.pd-stklo { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #e67e22; }
.pd-prow { display: flex; align-items: baseline; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
.pd-now { font-size: 32px; font-weight: 700; font-family: 'Playfair Display', serif; }
.pd-was { font-size: 19px; color: var(--lt); text-decoration: line-through; }
.pd-save { font-size: 12px; background: #fef0f0; color: var(--red); padding: 3px 10px; font-weight: 600; border-radius: 12px; }
.pd-lbl { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--ch); margin-bottom: 10px; }
.color-opts { display: flex; gap: 10px; margin-bottom: 22px; flex-wrap: wrap; }
.copt { display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer; }
.csw { width: 30px; height: 30px; border-radius: 50%; border: 2.5px solid transparent; transition: all .25s; }
.csw.on { box-shadow: 0 0 0 2px var(--blk); }
.cnm { font-size: 10px; color: var(--mid); }
.size-opts { display: flex; gap: 8px; margin-bottom: 22px; flex-wrap: wrap; }
.sbtn { min-width: 48px; height: 44px; border: 1.5px solid var(--brd); background: #fff; font-size: 13px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .2s; padding: 0 12px; border-radius: 2px; }
.sbtn:hover { border-color: var(--ch); background: var(--bg); }
.sbtn.on { background: var(--blk); color: #fff; border-color: var(--blk); }
.sbtn.cust { font-size: 11px; letter-spacing: 1px; text-transform: uppercase; background: var(--goldp); border-color: var(--gold); color: var(--gold); }
.sbtn.cust:hover { background: var(--gold); color: #fff; }
.qty-w { display: flex; align-items: center; border: 1.5px solid var(--brd); width: fit-content; margin-bottom: 24px; border-radius: 2px; }
.qty-btn { width: 42px; height: 42px; background: none; border: none; font-size: 20px; cursor: pointer; color: var(--ch); display: flex; align-items: center; justify-content: center; transition: background .2s; }
.qty-btn:hover { background: var(--bg); }
.qty-val { width: 44px; text-align: center; font-size: 15px; font-weight: 600; border: none; outline: none; font-family: 'DM Sans', sans-serif; }
.pd-acts { display: flex; gap: 10px; margin-bottom: 22px; }
.btn-cart { flex: 1; background: #fff; color: var(--blk); border: 2px solid var(--blk); padding: 14px 20px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .25s; }
.btn-cart:hover { background: var(--blk); color: #fff; }
.btn-buy { flex: 1; background: var(--blk); color: #fff; border: 2px solid var(--blk); padding: 14px 20px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .25s; }
.btn-buy:hover { background: var(--gold); border-color: var(--gold); }
.pd-perks { border-top: 1px solid var(--brd); padding-top: 20px; display: flex; flex-direction: column; gap: 9px; }
.pd-perk { display: flex; gap: 10px; font-size: 13.5px; color: var(--ch); align-items: center; }
.pp-ico { color: var(--gold); font-size: 14px; flex-shrink: 0; }
.pd-tabs { display: flex; border-bottom: 1.5px solid var(--brd); margin-bottom: 22px; overflow-x: auto; scrollbar-width: none; }
.pd-tabs::-webkit-scrollbar { display: none; }
.pd-tab { padding: 11px 20px; font-size: 14px; font-weight: 500; color: var(--mid); cursor: pointer; border: none; background: none; border-bottom: 2.5px solid transparent; margin-bottom: -1.5px; font-family: 'DM Sans', sans-serif; transition: all .2s; white-space: nowrap; }
.pd-tab.on { color: var(--blk); border-bottom-color: var(--gold); font-weight: 600; }
.pd-dl { list-style: none; }
.pd-dl li { font-size: 14px; color: var(--ch); padding: 6px 0; border-bottom: 1px solid var(--bg); display: flex; gap: 10px; }
.pd-dl li::before { content: "—"; color: var(--gold); flex-shrink: 0; }
.rev-item { padding: 16px 0; border-bottom: 1px solid var(--bg); }
.rev-name { font-size: 14px; font-weight: 600; margin-bottom: 3px; }
.rev-date { font-size: 12px; color: var(--mid); margin-bottom: 5px; }
.rev-txt { font-size: 14px; color: var(--ch); line-height: 1.7; }

/* ── CART ── */
.cart-grid { display: grid; grid-template-columns: 1fr 380px; gap: 40px; align-items: start; }
.cart-item { display: grid; grid-template-columns: 100px 1fr auto; gap: 18px; padding: 20px 0; border-bottom: 1px solid var(--brd); align-items: center; animation: fadeUp .3s ease; }
.cart-img { width: 100px; height: 125px; object-fit: cover; border-radius: 2px; }
.cart-name { font-size: 14.5px; font-weight: 500; margin-bottom: 4px; line-height: 1.35; }
.cart-meta { font-size: 12.5px; color: var(--mid); margin-bottom: 12px; }
.cart-rm { font-size: 12px; color: var(--red); cursor: pointer; background: none; border: none; font-family: 'DM Sans', sans-serif; text-decoration: underline; padding: 0; transition: color .2s; }
.cart-rm:hover { color: #8b0000; }
.osbox { background: var(--bg); padding: 26px; position: sticky; top: 88px; border-radius: 2px; }
.ostit { font-size: 15px; font-weight: 700; margin-bottom: 18px; font-family: 'Playfair Display', serif; font-size: 18px; }
.osrow { display: flex; justify-content: space-between; font-size: 14px; padding: 8px 0; border-bottom: 1px solid var(--brd); }
.osrow.tot { font-weight: 700; font-size: 16px; border-bottom: none; margin-top: 4px; padding-top: 13px; }
.osrow.dis { color: var(--grn); }
.cprow { display: flex; gap: 8px; margin: 14px 0; }
.cpin { flex: 1; border: 1.5px solid var(--brd); padding: 10px 12px; font-size: 13px; font-family: 'DM Sans', sans-serif; outline: none; border-radius: 2px; transition: border-color .2s; }
.cpin:focus { border-color: var(--blk); }
.cpbtn { background: var(--ch); color: #fff; border: none; padding: 10px 14px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600; border-radius: 2px; transition: background .2s; }
.cpbtn:hover { background: var(--gold); }
.cpok { font-size: 12px; color: var(--grn); margin-bottom: 8px; font-weight: 500; }
.cperr { font-size: 12px; color: var(--red); margin-bottom: 8px; }
.ckbtn { width: 100%; background: var(--blk); color: #fff; border: none; padding: 14px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 700; margin-top: 14px; transition: all .25s; }
.ckbtn:hover { background: var(--gold); transform: translateY(-1px); }

/* ── CHECKOUT ── */
.ckgrid { display: grid; grid-template-columns: 1fr 380px; gap: 40px; align-items: start; }
.cksteps { display: flex; margin-bottom: 32px; border-bottom: 1.5px solid var(--brd); overflow-x: auto; scrollbar-width: none; }
.ckstep { display: flex; align-items: center; gap: 8px; padding: 11px 18px; font-size: 13px; font-weight: 500; color: var(--lt); border-bottom: 2.5px solid transparent; margin-bottom: -1.5px; white-space: nowrap; }
.ckstep.on { color: var(--blk); border-bottom-color: var(--gold); font-weight: 600; }
.cknum { width: 22px; height: 22px; border-radius: 50%; background: var(--brd); color: var(--mid); font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ckstep.on .cknum { background: var(--gold); color: #fff; }
.payopt { border: 1.5px solid var(--brd); padding: 14px 18px; margin-bottom: 10px; cursor: pointer; display: flex; align-items: center; gap: 14px; transition: all .2s; border-radius: 2px; }
.payopt.on { border-color: var(--blk); background: var(--bg); }
.pradio { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--brd); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: border-color .2s; }
.pradio.on { border-color: var(--blk); }
.pradio-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--blk); display: none; }
.pradio.on .pradio-dot { display: block; }
.placebtn { width: 100%; background: var(--blk); color: #fff; border: none; padding: 15px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 700; transition: all .25s; margin-top: 8px; }
.placebtn:hover:not(:disabled) { background: var(--gold); transform: translateY(-1px); }
.placebtn:disabled { opacity: .5; cursor: not-allowed; }

/* ── SUCCESS ── */
.suc-ov { position: fixed; inset: 0; background: rgba(0,0,0,.65); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn .3s ease; }
.suc-box { background: #fff; padding: 52px 44px; text-align: center; max-width: 460px; width: 100%; animation: scaleIn .35s ease; }
.suc-ico { font-size: 56px; color: var(--grn); margin-bottom: 16px; animation: float 2s ease-in-out infinite; display: block; }
.suc-tit { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 700; margin-bottom: 9px; }
.suc-txt { font-size: 14px; color: var(--mid); line-height: 1.7; margin-bottom: 26px; }

/* ── ADMIN ── */
.adm-lay { display: flex; min-height: 100vh; }
.adm-side { width: 252px; background: #2c2c2c; color: #fff; flex-shrink: 0; position: fixed; top: 0; bottom: 0; left: 0; overflow-y: auto; z-index: 200; }
.adm-slogo { padding: 22px 20px 18px; border-bottom: 1px solid rgba(255,255,255,.07); font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900; line-height: 1; letter-spacing: 2px; }
.adm-slogo em { color: var(--gold); font-style: normal; }
.adm-slogo small { display: block; font-size: 9.5px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,.28); font-family: 'DM Sans', sans-serif; margin-top: 3px; font-weight: 400; }
.adm-ni { display: flex; align-items: center; gap: 11px; padding: 12px 20px; font-size: 13.5px; color: rgba(255,255,255,.6); cursor: pointer; transition: all .2s; border-left: 3px solid transparent; }
.adm-ni:hover { color: #fff; background: rgba(255,255,255,.04); }
.adm-ni.on { color: #fff; background: rgba(184,146,58,.1); border-left-color: var(--gold); }
.adm-nico { font-size: 14px; width: 18px; text-align: center; flex-shrink: 0; }
.adm-nsec { font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(255,255,255,.22); padding: 14px 20px 5px; font-weight: 600; }
.adm-con { margin-left: 252px; flex: 1; background: #f4f3f1; min-height: 100vh; }
.adm-top { background: #fff; padding: 14px 28px; border-bottom: 1px solid var(--brd); display: flex; justify-content: space-between; align-items: center; gap: 14px; flex-wrap: wrap; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
.adm-top-tit { font-size: 17px; font-weight: 700; font-family: 'Playfair Display', serif; }
.adm-usr { display: flex; align-items: center; gap: 9px; font-size: 13px; color: var(--mid); }
.adm-av { width: 32px; height: 32px; border-radius: 50%; background: var(--blk); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; }
.adm-main { padding: 24px 28px; }
.adm-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-bottom: 22px; }
.adm-stat { background: #fff; padding: 20px; border-left: 4px solid var(--gold); transition: transform .2s, box-shadow .2s; }
.adm-stat:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.08); }
.adm-sv { font-size: 26px; font-weight: 700; margin-bottom: 3px; line-height: 1; font-family: 'Playfair Display', serif; }
.adm-sl { font-size: 10.5px; color: var(--lt); text-transform: uppercase; letter-spacing: 1.2px; font-weight: 600; }
.adm-sc { font-size: 12px; color: var(--grn); margin-top: 5px; font-weight: 500; }
.adm-card { background: #fff; border: 1px solid var(--brd); margin-bottom: 20px; border-radius: 2px; }
.adm-ch { padding: 15px 22px; border-bottom: 1px solid var(--brd); display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
.adm-ctit { font-size: 14.5px; font-weight: 700; }
.adm-cb { padding: 20px 22px; }
.abtn { background: var(--blk); color: #fff; border: none; padding: 8px 16px; font-size: 11px; letter-spacing: 1.2px; text-transform: uppercase; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600; transition: all .2s; border-radius: 2px; }
.abtn:hover { background: var(--gold); }
.abtn.sm { padding: 5px 12px; font-size: 10.5px; }
.abtn.ol { background: none; color: var(--blk); border: 1.5px solid var(--blk); }
.abtn.ol:hover { background: var(--blk); color: #fff; }
.abtn.red { background: var(--red); }
.abtn.red:hover { background: #a02020; }
.abtn.grn { background: var(--grn); }
.atable { width: 100%; border-collapse: collapse; font-size: 13px; }
.atable th { text-align: left; padding: 9px 13px; font-size: 10px; letter-spacing: 1.8px; text-transform: uppercase; color: var(--lt); border-bottom: 2px solid var(--brd); font-weight: 600; white-space: nowrap; }
.atable td { padding: 13px; border-bottom: 1px solid #f0f0f0; color: var(--ch); vertical-align: middle; }
.atable tr:hover td { background: #fafafa; }
.sbdg { display: inline-block; padding: 2px 9px; font-size: 10px; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; border-radius: 10px; }
.sb-p { background: #fff8e1; color: #d97706; }
.sb-pr { background: #e0f2fe; color: #0369a1; }
.sb-sh { background: #ede9fe; color: #7c3aed; }
.sb-d { background: #dcfce7; color: #15803d; }
.sb-c { background: #fee2e2; color: #dc2626; }
.stsel { border: 1px solid var(--brd); padding: 4px 8px; font-size: 12px; font-family: 'DM Sans', sans-serif; background: #fff; cursor: pointer; outline: none; border-radius: 2px; }
.atabs { display: flex; border-bottom: 1.5px solid var(--brd); margin-bottom: 18px; overflow-x: auto; scrollbar-width: none; }
.atabs::-webkit-scrollbar { display: none; }
.atab { padding: 9px 16px; font-size: 12.5px; font-weight: 500; color: var(--mid); cursor: pointer; border: none; background: none; border-bottom: 2.5px solid transparent; margin-bottom: -1.5px; font-family: 'DM Sans', sans-serif; transition: all .2s; white-space: nowrap; }
.atab.on { color: var(--blk); border-bottom-color: var(--gold); font-weight: 600; }
.aprow { display: flex; gap: 13px; align-items: center; padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
.ap-img { width: 52px; height: 64px; object-fit: cover; flex-shrink: 0; border-radius: 2px; }
.ap-name { font-size: 13.5px; font-weight: 500; margin-bottom: 2px; }
.ap-meta { font-size: 11.5px; color: var(--mid); }
.ap-acts { margin-left: auto; display: flex; gap: 7px; flex-shrink: 0; }
.afg { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.afg-full { grid-column: 1/-1; }
.bpgrid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
.bprev { background: var(--bg); border: 1px solid var(--brd); border-radius: 2px; overflow: hidden; }
.bprev-img { width: 100%; height: 100px; object-fit: cover; display: block; }
.bprev-body { padding: 12px; }
.toggle { width: 40px; height: 22px; background: var(--brd); border-radius: 11px; position: relative; cursor: pointer; transition: background .25s; border: none; flex-shrink: 0; }
.toggle.on { background: var(--grn); }
.toggle::after { content: ''; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; border-radius: 50%; background: #fff; transition: transform .25s; box-shadow: 0 1px 3px rgba(0,0,0,.2); }
.toggle.on::after { transform: translateX(18px); }
.odgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 16px; }
.odbox { background: var(--bg); padding: 14px; border-radius: 2px; }
.od-lbl { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--mid); font-weight: 600; margin-bottom: 8px; }
.od-val { font-size: 13.5px; color: var(--ch); line-height: 1.65; }
.asrch { border: 1.5px solid var(--brd); padding: 7px 12px; font-size: 13px; font-family: 'DM Sans', sans-serif; outline: none; width: 210px; border-radius: 2px; transition: border-color .2s; }
.asrch:focus { border-color: var(--blk); }
.empty { text-align: center; padding: 60px 20px; color: var(--mid); }
.empty-ico { font-size: 44px; margin-bottom: 12px; display: block; }
.cpbdg { display: inline-block; padding: 2px 8px; font-size: 10px; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; border-radius: 10px; }
.cpbdg.act { background: #dcfce7; color: #15803d; }
.cpbdg.off { background: #f3f4f6; color: #6b7280; }

/* ── TOAST ── */
.toast-w { position: fixed; bottom: 88px; left: 50%; transform: translateX(-50%); z-index: 3000; pointer-events: none; }
.toast { background: var(--blk); color: #fff; padding: 11px 24px; font-size: 13px; border-radius: 24px; opacity: 0; transition: opacity .3s, transform .3s; transform: translateY(10px); white-space: nowrap; box-shadow: 0 8px 24px rgba(0,0,0,.25); }
.toast.show { opacity: 1; transform: translateY(0); }

/* ── MOBILE RESPONSIVENESS ── */
@media (max-width: 1200px) {
  .pgrid { grid-template-columns: repeat(3,1fr); }
  .fgrid { grid-template-columns: 1fr 1fr; gap: 32px; }
  .adm-stats { grid-template-columns: repeat(2,1fr); }
  .stats-grid { grid-template-columns: repeat(2,1fr); }
}

@media (max-width: 960px) {
  .nav-cats, .nav-r .sbox, .adm-link { display: none; }
  .hbg { display: flex; }
  .cgrid { grid-template-columns: 1fr 1fr; }
  .wgrid { grid-template-columns: 1fr 1fr; }
  .tgrid { grid-template-columns: 1fr 1fr; }
  .cg { grid-template-columns: 1fr; gap: 36px; }
  .pdgrid { grid-template-columns: 1fr; gap: 28px; }
  .cart-grid { grid-template-columns: 1fr; }
  .ckgrid { grid-template-columns: 1fr; }
  .adm-side { display: none; }
  .adm-con { margin-left: 0; }
  .hero-img { height: 400px; }
  .hero-body { padding: 0 32px; }
  .hero-title { font-size: 38px; }
  .hero-sub { font-size: 14px; max-width: 320px; }
  .hero-dots { left: 32px; }
  .sec { padding: 56px 0; }
  .catlayout { flex-direction: column; }
  .filter-panel { width: 100%; position: static; }
  .ftoggle { display: block; }
  .afg { grid-template-columns: 1fr; }
  .odgrid { grid-template-columns: 1fr; }
  .bpgrid { grid-template-columns: 1fr 1fr; }
  .adm-main { padding: 16px; }
  .ws-tit { font-size: 32px; }
}

@media (max-width: 640px) {
  .pgrid { grid-template-columns: repeat(2,1fr); gap: 12px; }
  .scrl .pcard-inner { flex: 0 0 170px; min-width: 170px; }
  .cgrid { grid-template-columns: 1fr; }
  .tgrid { grid-template-columns: 1fr; }
  .wgrid { grid-template-columns: 1fr 1fr; gap: 12px; }
  .fgrid { grid-template-columns: 1fr; gap: 24px; }
  .mobnav { display: block; }
  .zroot { padding-bottom: 60px; }
  .cart-item { grid-template-columns: 82px 1fr; gap: 12px; }
  .cart-item > div:last-child { grid-column: 2; text-align: left; }
  .cart-img { width: 82px; height: 103px; }
  .phdr { padding: 30px 0 22px; }
  .phdr-tit { font-size: 30px; }
  .harr { display: none; }
  .hero-img { height: 340px; }
  .hero-title { font-size: 28px; }
  .hero-body { padding: 0 20px; }
  .hero-dots { left: 20px; bottom: 18px; }
  .sec-tit { font-size: 28px; }
  .ccard-img { height: 300px; }
  .adm-stats { grid-template-columns: 1fr 1fr; gap: 10px; }
  .adm-sv { font-size: 22px; }
  .bpgrid { grid-template-columns: 1fr; }
  .frow { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: 1fr 1fr; }
  .stat-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,.1); }
}

@media (max-width: 400px) {
  .pgrid { grid-template-columns: repeat(2,1fr); gap: 9px; }
  .pcard-acts { display: none; }
  .ctr { padding: 0 14px; }
  .hero-title { font-size: 24px; }
}
`;

/* ─────────────────────────────────────────────────────────
   ANIMATED SECTION WRAPPER
───────────────────────────────────────────────────────── */
function AnimSection({ children, className = "", delay = 0, dir = "fadeup" }) {
  const [ref, visible] = useInView();
  const cls = { fadeup: "anim-fadeup", left: "anim-left", right: "anim-right", scale: "anim-scale" };
  return (
    <div ref={ref} className={`${cls[dir] || "anim-fadeup"}${visible ? " visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}



/* ─────────────────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────────────────── */
function ProductCard({ p, navigate, addToCart, buyNow, delay = 0 }) {
  const [ci, setCi] = useState(0);
  const [ref, visible] = useInView(0.1);
  const color = p.colors[ci] || p.colors[0];
  return (
    <div ref={ref} className={`anim-fadeup${visible ? " visible" : ""}`} style={{ transitionDelay: `${delay}s` }}>
      <div className="pcard-inner">
        <div className="pcard" onClick={() => navigate("product", { product: p })}>
          <div className="pcard-iw">
            <img src={color.img} alt={p.name} className="pcard-img" loading="lazy" />
            {p.discount > 0 && <span className="pbadge pb-sale">-{p.discount}%</span>}
            {!p.discount && p.newArrival && <span className="pbadge pb-new">New</span>}
            <div className="pcdots" onClick={e => e.stopPropagation()}>
              {p.colors.map((c, i) => (
                <div key={i} className="pcdot"
                  style={{ background: c.hex, boxShadow: i === ci ? `0 0 0 2.5px #fff, 0 0 0 4px #111` : "none" }}
                  onClick={() => setCi(i)} />
              ))}
            </div>
            <div className="pcard-acts" onClick={e => e.stopPropagation()}>
              <button className="pcbtn" onClick={() => addToCart(p)}>Add to Cart</button>
              <button className="pcbtn b2" onClick={() => buyNow(p)}>Buy Now</button>
            </div>
          </div>
          <div className="pcard-name">{p.name}</div>
          <div className="pcard-sub">{getLabel("ss", p.subsub)}</div>
          <div className="pcard-pr">
            <span className="pcard-now">{p.price.toLocaleString()} BDT</span>
            {p.originalPrice && <span className="pcard-was">{p.originalPrice.toLocaleString()}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────── */
function Navbar({ navigate, page, cart, products }) {
  const [open, setOpen] = useState(false);
  const [openCat, setOpenCat] = useState(null);
  const [q, setQ] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = cart.reduce((s, i) => s + (i.qty || 1), 0);
  const sugs = q.length > 1 ? products.filter(p => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 6) : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Topbar marquee */}
      <div className="topbar">
        <div className="topbar-marquee">
          {[...Array(3)].map((_, r) => (
            <span key={r} style={{ display: "flex", alignItems: "center" }}>
              <span className="topbar-item">Free Shipping Above 3,000 BDT</span>
              <span className="topbar-sep">✦</span>
              <span className="topbar-item">Cash on Delivery Available</span>
              <span className="topbar-sep">✦</span>
              <span className="topbar-item">Eid Collection 2026 Now Live</span>
              <span className="topbar-sep">✦</span>
              <span className="topbar-item">7-Day Easy Returns</span>
              <span className="topbar-sep">✦</span>
            </span>
          ))}
        </div>
      </div>

      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-w">
          <button className="hbg" onClick={() => setOpen(true)}>☰</button>
          <div className="nav-logo" onClick={() => navigate("home")}>ZUHOOR<em>.</em></div>
          <div className="nav-cats">
            {CATALOG.map(cat => (
              <div key={cat.id} className="nav-cat">
                <span onClick={() => navigate("category", { cat: cat.id })}>{cat.label}</span>
                <div className="nav-mega">
                  {cat.subs.map(sub => (
                    <div key={sub.id} className="nmcol">
                      <div className="nmhead">{sub.label}</div>
                      {sub.subsubs.map(ss => (
                        <button key={ss.id} className="nmitem"
                          onClick={e => { e.stopPropagation(); navigate("category", { cat: cat.id, sub: sub.id, subsub: ss.id }); }}>
                          {ss.label}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="nav-r">
            <div className="sbox">
              <span className="sico">&#128269;</span>
              <input className="sinput" placeholder="Search products..." value={q}
                onChange={e => { setQ(e.target.value); setShowDrop(true); }}
                onFocus={() => setShowDrop(true)}
                onBlur={() => setTimeout(() => setShowDrop(false), 180)}
                onKeyDown={e => { if (e.key === "Enter" && q) { navigate("category", { cat: "all" }); setShowDrop(false); } }} />
              {showDrop && sugs.length > 0 && (
                <div className="sdrop">
                  {sugs.map(p => (
                    <div key={p.id} className="ssug" onMouseDown={() => { navigate("product", { product: p }); setQ(""); setShowDrop(false); }}>
                      <img src={p.colors[0].img} alt="" className="ssug-img" />
                      <div><div className="ssug-name">{p.name}</div><div className="ssug-price">{p.price.toLocaleString()} BDT</div></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="ico-btn" onClick={() => navigate("cart")} title="Cart">
              <span>&#128722;</span>
              {cartCount > 0 && <span className="cbadge">{cartCount}</span>}
            </button>
            <button className="adm-link" onClick={() => navigate("admin")}>Admin</button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`drw-bg${open ? " open" : ""}`} onClick={() => setOpen(false)} />
      <div className={`drw${open ? " open" : ""}`}>
        <div className="drw-head">
          <div className="drw-logo">ZUHOOR<em style={{ color: "var(--gold)", fontStyle: "normal" }}>.</em></div>
          <button className="drw-close" onClick={() => setOpen(false)}>✕</button>
        </div>
        {CATALOG.map(cat => (
          <div key={cat.id} className="drw-sec">
            <button className="drw-sechead" onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)}>
              <span>{cat.label}</span><span>{openCat === cat.id ? "−" : "+"}</span>
            </button>
            {openCat === cat.id && cat.subs.map(sub => (
              <div key={sub.id}>
                <div className="drw-item" style={{ fontWeight: 600, fontSize: 12, letterSpacing: 1 }}>{sub.label}</div>
                {sub.subsubs.map(ss => (
                  <div key={ss.id} className="drw-item drw-subitem"
                    onClick={() => { navigate("category", { cat: cat.id, sub: sub.id, subsub: ss.id }); setOpen(false); }}>
                    {ss.label}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
        <div className="drw-item" style={{ borderTop: "1px solid var(--brd)", marginTop: 8 }}
          onClick={() => { navigate("cart"); setOpen(false); }}>
          Cart {cartCount > 0 ? `(${cartCount})` : ""}
        </div>
        <div className="drw-item" onClick={() => { navigate("admin"); setOpen(false); }}>Admin Panel</div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────── */
function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="ctr">
        <div className="fgrid">
          <AnimSection>
            <div className="flogo">ZUHOOR<em>.</em></div>
            <div className="fdesc">Your premium destination for authentic Islamic fashion. Thobes, Punjabis, Abayas — trusted across Bangladesh since 2018.</div>
            <div className="fsocial">
              {["f", "in", "yt", "wa"].map(s => <button key={s} className="fsoc">{s}</button>)}
            </div>
          </AnimSection>
          <AnimSection delay={0.1}>
            <div className="fhead">Collections</div>
            {CATALOG.map(c => <button key={c.id} className="flink" onClick={() => navigate("category", { cat: c.id })}>{c.label}</button>)}
          </AnimSection>
          <AnimSection delay={0.2}>
            <div className="fhead">Customer Support</div>
            {["Track Order", "Returns & Exchange", "Shipping Policy", "Size Guide", "Contact Us"].map(l => <button key={l} className="flink">{l}</button>)}
          </AnimSection>
          <AnimSection delay={0.3}>
            <div className="fhead">Contact</div>
            <div className="fcon"><span className="fcico">◎</span><span className="fcval">Kajir Dewri, Chattogram, Bangladesh</span></div>
            <div className="fcon"><span className="fcico">◎</span><span className="fcval">+880 1403-528547</span></div>
            <div className="fcon"><span className="fcico">◎</span><span className="fcval">zuhoorlifestyle@gmail.com</span></div>
            <div style={{ marginTop: 14, fontSize: 12, color: "rgba(255,255,255,.35)" }}>Sat–Thu  10:00 AM – 8:00 PM</div>
          </AnimSection>
        </div>
      </div>
      <div className="ctr">
        <div className="fbot">
          <div className="fcopy">© 2026 Zuhoor. All rights reserved.</div>
          <div className="fdev">Developed by <em>Infinite Code Tech</em></div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────────── */
function HomePage({ navigate, products, banners, addToCart, buyNow }) {
  const [slide, setSlide] = useState(0);
  const [faqOpen, setFaqOpen] = useState(null);
  const scrollRef = useRef();
  const active = banners.filter(b => b.active);

  useEffect(() => {
    if (active.length < 2) return;
    const iv = setInterval(() => setSlide(s => (s + 1) % active.length), 3000);
    return () => clearInterval(iv);
  }, [active.length]);

  const featured = products.filter(p => p.featured).slice(0, 10);
  const faqs = [
    { q: "What are your delivery charges?", a: "Free delivery for orders above 3,000 BDT. Below that: 60 BDT inside Dhaka and 120 BDT outside Dhaka." },
    { q: "Do you offer cash on delivery?", a: "Yes, we accept cash on delivery for all orders across Bangladesh." },
    { q: "What is your return policy?", a: "7-day return policy on unused items in their original packaging." },
    { q: "How long does delivery take?", a: "Inside Dhaka: 1–2 business days. Outside Dhaka: 3–5 business days." },
    { q: "Can I customize my order size?", a: "Yes — select 'Customize' on the product page and you'll be connected directly to WhatsApp for custom measurements." },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <div className="hero">
        <div className="hero-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
          {active.map((b, bi) => (
            <div key={b.id} className="hero-slide">
              <img src={b.bg} alt={b.title} className="hero-img" />
              <div className="hero-ov" />
              <div className="hero-body">
                <div className="hero-tag" style={{ animation: bi === slide ? "fadeUp .6s ease .2s both" : "none" }}>
                  <span className="hero-tag-line" />
                  New Collection 2026
                  <span className="hero-tag-line" />
                </div>
                <h1 className="hero-title" style={{ animation: bi === slide ? "fadeUp .7s ease .35s both" : "none" }}>
                  {b.title}
                </h1>
                <p className="hero-sub" style={{ animation: bi === slide ? "fadeUp .7s ease .5s both" : "none" }}>{b.subtitle}</p>
                <div className="hero-btns" style={{ animation: bi === slide ? "fadeUp .7s ease .65s both" : "none" }}>
                  <button className="hero-cta" onClick={() => navigate("category", { cat: b.ctaLink })}>
                    {b.cta} <span className="hero-cta-arrow">→</span>
                  </button>
                  <button className="hero-cta-secondary" onClick={() => navigate("category", { cat: "all" })}>View All</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {active.length > 1 && <>
          <button className="harr l" onClick={() => setSlide(s => (s - 1 + active.length) % active.length)}>&#8592;</button>
          <button className="harr r" onClick={() => setSlide(s => (s + 1) % active.length)}>&#8594;</button>
        </>}
        <div className="hero-dots">{active.map((_, i) => <button key={i} className={`hero-dot${i === slide ? " on" : ""}`} onClick={() => setSlide(i)} />)}</div>
      </div>

      {/* ── STATS BAND ── */}
      <div className="stats-band">
        <div className="ctr">
          <div className="stats-grid">
            {[["12000+", "Happy Customers"], ["500+", "Products"], ["50+", "Cities Delivered"], ["100%", "Authentic Quality"]].map(([n, l], i) => (
              <AnimSection key={i} className="stat-item" delay={i * 0.1}>
                <div className="stat-num">{n}</div>
                <div className="stat-lbl">{l}</div>
              </AnimSection>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED ── */}
      <div className="sec">
        <div className="ctr">
          <AnimSection>
            <div className="sec-hd">
              <div><div className="sec-eye">Handpicked for You</div><div className="sec-tit">Featured Products</div></div>
              <button className="see-all" onClick={() => navigate("category", { cat: "all" })}>View All</button>
            </div>
          </AnimSection>
          <div className="scrl-wrap">
            <button className="sarr l" onClick={() => scrollRef.current.scrollBy({ left: -250, behavior: "smooth" })}>&#8592;</button>
            <div className="scrl" ref={scrollRef}>
              {featured.map((p, i) => (
                <ProductCard key={p.id} p={p} navigate={navigate} addToCart={addToCart} buyNow={buyNow} delay={i * 0.06} />
              ))}
            </div>
            <button className="sarr r" onClick={() => scrollRef.current.scrollBy({ left: 250, behavior: "smooth" })}>&#8594;</button>
          </div>
        </div>
      </div>

      {/* ── SHOP BY CATEGORY ── */}
      <div className="sec bg">
        <div className="ctr">
          <AnimSection>
            <div className="sec-hd"><div><div className="sec-eye">Browse By</div><div className="sec-tit">Shop by Category</div></div></div>
          </AnimSection>
          <div className="cgrid">
            {CATALOG.map((cat, i) => (
              <AnimSection key={cat.id} delay={i * 0.12} dir="scale">
                <div className="ccard" onClick={() => navigate("category", { cat: cat.id })}>
                  <img src={cat.img} alt={cat.label} className="ccard-img" />
                  <div className="ccard-ov" />
                  <div className="ccard-body">
                    <div className="ccard-name">{cat.label}</div>
                    <div className="ccard-subs">{cat.subs.map(s => s.label).join(" · ")}</div>
                    <button className="ccard-btn">Explore</button>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </div>

      {/* ── PER-CATEGORY SECTIONS ── */}
      {CATALOG.map((cat, ci) => {
        const prods = products.filter(p => p.cat === cat.id).slice(0, 4);
        if (!prods.length) return null;
        return (
          <div key={cat.id} className={`sec${ci % 2 === 1 ? " bg" : ""}`}>
            <div className="ctr">
              <AnimSection>
                <div className="sec-hd">
                  <div><div className="sec-eye">{cat.label}</div>
                    <div className="sec-tit">
                      {cat.label}'s Collection
                    </div>
                  </div>
                  <button className="see-all" onClick={() => navigate("category", { cat: cat.id })}>See All</button>
                </div>
              </AnimSection>
              <AnimSection delay={0.1}>
                <div className="chips">
                  <button className="chip on" onClick={() => navigate("category", { cat: cat.id })}>All</button>
                  {cat.subs.map(s => (
                    <button key={s.id} className="chip" onClick={() => navigate("category", { cat: cat.id, sub: s.id })}>{s.label}</button>
                  ))}
                </div>
              </AnimSection>
              <div className="pgrid">
                {prods.map((p, i) => <ProductCard key={p.id} p={p} navigate={navigate} addToCart={addToCart} buyNow={buyNow} delay={i * 0.09} />)}
              </div>
            </div>
          </div>
        );
      })}

      {/* ── WHOLESALE ── */}
      <div className="ws">
        <div className="ws-inner">
          <div className="ctr">
            <AnimSection>
              <div className="ws-eye">Bulk Orders Welcome</div>
              <h2 className="ws-tit">Wholesale Inquiries</h2>
              <p className="ws-sub">Exclusive pricing for bulk and wholesale orders. Partner with Zuhoor for your retail business and grow together.</p>
              <div className="ws-btns">
                <button className="btn-gold" onClick={() => window.open("https://wa.me/8801403528547?text=Wholesale inquiry", "_blank")}>WhatsApp Us</button>
                <button className="btn-ol">Get a Quote</button>
              </div>
            </AnimSection>
          </div>
        </div>
      </div>

      {/* ── WHY CHOOSE ── */}
      <div className="sec">
        <div className="ctr">
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 42 }}>
              <div className="sec-eye" style={{ justifyContent: "center" }}>Our Promise</div>
              <div className="sec-tit">Why Choose Zuhoor</div>
            </div>
          </AnimSection>
          <div className="wgrid">
            {[["★", "Premium Quality", "Handpicked fabrics from trusted mills. Every piece crafted to exact standards of comfort and durability."],
              ["⚡", "Fast Delivery", "Same-day dispatch in Dhaka. 1–2 days city delivery, 3–5 days across Bangladesh."],
              ["✓", "Cash on Delivery", "Pay when your order arrives safely at your doorstep. Zero upfront risk."],
              ["↩", "Easy Returns", "7-day hassle-free returns on unused items in original packaging."]].map(([icon, tit, txt], i) => (
              <AnimSection key={i} delay={i * 0.1} dir="scale">
                <div className="wcard">
                  <div className="wico"><span style={{ fontSize: 20 }}>{icon}</span></div>
                  <div className="wtit">{tit}</div>
                  <div className="wtxt">{txt}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div className="sec bg">
        <div className="ctr">
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 42 }}>
              <div className="sec-eye" style={{ justifyContent: "center" }}>Customer Stories</div>
              <div className="sec-tit">What Our Customers Say</div>
            </div>
          </AnimSection>
          <div className="tgrid">
            {[["Ahmed Rahman", "Dhaka", "Excellent quality and very fast delivery. The thobe is perfect for Jumu'ah — the fabric is incredibly soft and breathable."],
              ["Fatima Khatun", "Chittagong", "Beautiful abayas with flawless stitching. I ordered for Eid and the delivery arrived two days early. Highly recommended!"],
              ["Nusrat Jahan", "Sylhet", "Ordered three jubbas for my sons. Each one is perfectly crafted. The kids love wearing them for daily prayers."]].map(([name, loc, text], i) => (
              <AnimSection key={i} delay={i * 0.12}>
                <div className="tcard">
                  <div className="tstars">★★★★★</div>
                  <div className="ttxt">"{text}"</div>
                  <div className="tauth">{name}</div>
                  <div className="tloc">{loc}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="sec">
        <div className="ctr">
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 42 }}>
              <div className="sec-eye" style={{ justifyContent: "center" }}>Support</div>
              <div className="sec-tit">Frequently Asked Questions</div>
            </div>
          </AnimSection>
          <div className="faq-wrap">
            {faqs.map((f, i) => (
              <AnimSection key={i} delay={i * 0.08}>
                <div className="faq-item">
                  <button className="faq-q" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                    <span>{f.q}</span>
                    <span className={`faq-ico${faqOpen === i ? " open" : ""}`}>+</span>
                  </button>
                  <div className={`faq-a${faqOpen === i ? " open" : ""}`}>{f.a}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <div className="sec bg">
        <div className="ctr">
          <div className="cg">
            <AnimSection dir="right">
              <div>
                <div className="sec-eye">Get in Touch</div>
                <div className="cs-tit">We're Here to Help</div>
                <div className="cs-txt">Have a question about an order, product, or wholesale pricing? Our team is ready to assist you through any channel below.</div>
                <div className="crow"><span className="cico">◎</span><span className="cval">Kajir Dewri, Chattogram, Bangladesh</span></div>
                <div className="crow"><span className="cico">◎</span><span className="cval">+880 1403-528547</span></div>
                <div className="crow"><span className="cico">◎</span><span className="cval">zuhoorlifestyle@gmail.com</span></div>
              </div>
            </AnimSection>
            <AnimSection dir="left">
              <ContactForm />
            </AnimSection>
          </div>
        </div>
      </div>
    </>
  );
}

function ContactForm() {
  const [f, setF] = useState({ name: "", phone: "", msg: "" });
  const [sent, setSent] = useState(false);
  if (sent) return (
    <div style={{ padding: 44, textAlign: "center", background: "#fff", border: "1px solid var(--brd)", animation: "scaleIn .4s ease" }}>
      <div style={{ fontSize: 44, color: "var(--grn)", marginBottom: 12, animation: "float 2s ease-in-out infinite", display: "block" }}>✓</div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, marginBottom: 7 }}>Message Sent!</div>
      <div style={{ fontSize: 14, color: "var(--mid)" }}>We'll reply within 24 hours.</div>
    </div>
  );
  return (
    <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ background: "#fff", border: "1px solid var(--brd)", padding: 32 }}>
      <div className="fg"><label className="fl">Full Name</label><input className="fi" required value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="Your name" /></div>
      <div className="fg"><label className="fl">Phone Number</label><input className="fi" required value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} placeholder="01XXXXXXXXX" /></div>
      <div className="fg"><label className="fl">Message</label><textarea className="fi fia" required value={f.msg} onChange={e => setF({ ...f, msg: e.target.value })} placeholder="How can we help?" /></div>
      <button type="submit" className="fsub">Send Message</button>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────
   CATEGORY PAGE — 3-LEVEL
───────────────────────────────────────────────────────── */
function CategoryPageInner({ navigate, params, products, addToCart, buyNow }) {
  const { cat, sub, subsub } = params;
  const [activeSub, setActiveSub] = useState(sub || "all");
  const [activeSS, setActiveSS] = useState(subsub || "all");
  const [sort, setSort] = useState("default");
  const [mobFilt, setMobFilt] = useState(false);
  const catObj = CATALOG.find(c => c.id === cat);
  const isAll = cat === "all";

  let prods = isAll ? [...products] : products.filter(p => p.cat === cat);
  if (activeSub !== "all") prods = prods.filter(p => p.sub === activeSub);
  if (activeSS !== "all") prods = prods.filter(p => p.subsub === activeSS);
  if (sort === "asc") prods = [...prods].sort((a, b) => a.price - b.price);
  if (sort === "desc") prods = [...prods].sort((a, b) => b.price - a.price);
  if (sort === "new") prods = [...prods].sort((a, b) => b.id - a.id);
  if (sort === "sale") prods = [...prods].sort((a, b) => b.discount - a.discount);

  const subObj = catObj?.subs.find(s => s.id === activeSub);

  return (
    <>
      <div className="phdr">
        <div className="ctr">
          <div className="bc">
            <span className="bci" onClick={() => navigate("home")}>Home</span>
            <span className="bcsep">/</span>
            {!isAll && catObj && <><span className="bci" onClick={() => navigate("category", { cat })}>{catObj.label}</span><span className="bcsep">/</span></>}
            {activeSub !== "all" && <><span className="bci" onClick={() => setActiveSS("all")}>{getLabel("sub", activeSub)}</span><span className="bcsep">/</span></>}
            <span className="bccur">{activeSS !== "all" ? getLabel("ss", activeSS) : activeSub !== "all" ? getLabel("sub", activeSub) : catObj?.label || "All Products"}</span>
          </div>
          <div className="phdr-tit">{isAll ? "All Products" : catObj?.label}</div>
          <div className="phdr-sub">{prods.length} products found</div>
        </div>
      </div>

      {!isAll && catObj && (
        <div style={{ background: "#fff", borderBottom: "1px solid var(--brd)" }}>
          <div className="ctr">
            <div className="chips" style={{ padding: "12px 0", marginBottom: 0 }}>
              <button className={`chip${activeSub === "all" ? " on" : ""}`} onClick={() => { setActiveSub("all"); setActiveSS("all"); }}>All {catObj.label}</button>
              {catObj.subs.map(s => <button key={s.id} className={`chip${activeSub === s.id ? " on" : ""}`} onClick={() => { setActiveSub(s.id); setActiveSS("all"); }}>{s.label}</button>)}
            </div>
            {activeSub !== "all" && subObj && subObj.subsubs.length > 0 && (
              <div className="chips" style={{ paddingBottom: 12, marginBottom: 0 }}>
                <button className={`chip${activeSS === "all" ? " on" : ""}`} onClick={() => setActiveSS("all")}>All {getLabel("sub", activeSub)}</button>
                {subObj.subsubs.map(ss => <button key={ss.id} className={`chip${activeSS === ss.id ? " on" : ""}`} onClick={() => setActiveSS(ss.id)}>{ss.label}</button>)}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="sec">
        <div className="ctr">
          <div className="catlayout">
            <div className="filter-panel">
              <button className="ftoggle" onClick={() => setMobFilt(o => !o)}>{mobFilt ? "Hide Filters ▲" : "Filters & Sort ▼"}</button>
              <div className={`mobfilt${mobFilt ? " open" : ""}`} style={{ display: "block" }}>
                <div className="fsec">
                  <div className="ftit">Sort By</div>
                  <select className="ssel" value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="default">Featured</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                    <option value="new">Newest First</option>
                    <option value="sale">Best Discount</option>
                  </select>
                </div>
                <div className="fsec">
                  <div className="ftit">Price Range</div>
                  {["Under 2,000 BDT", "2,000 – 3,000 BDT", "3,000 – 5,000 BDT", "Above 5,000 BDT"].map(l => (
                    <div key={l} className="fopt"><div className="fchk" /><span className="flbl">{l}</span></div>
                  ))}
                </div>
                <div className="fsec">
                  <div className="ftit">Availability</div>
                  <div className="fopt"><div className="fchk on">✓</div><span className="flbl">In Stock</span></div>
                  <div className="fopt"><div className="fchk" /><span className="flbl">Limited Stock</span></div>
                </div>
                <div className="fsec">
                  <div className="ftit">Size</div>
                  {["S", "M", "L", "XL", "XXL"].map(sz => (
                    <div key={sz} className="fopt"><div className="fchk" /><span className="flbl">{sz}</span></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="prods-area">
              {prods.length === 0
                ? <div className="empty"><span className="empty-ico">○</span>No products found.</div>
                : <div className="pgrid">{prods.map((p, i) => <ProductCard key={p.id} p={p} navigate={navigate} addToCart={addToCart} buyNow={buyNow} delay={i * 0.06} />)}</div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* Wrapper: key forces full remount when cat/sub/subsub changes,
   avoiding the setState-in-effect anti-pattern */
function CategoryPage(props) {
  const { cat, sub, subsub } = props.params;
  const key = `${cat||"all"}-${sub||"all"}-${subsub||"all"}`;
  return <CategoryPageInner key={key} {...props} />;
}

/* ─────────────────────────────────────────────────────────
   PRODUCT DETAIL
───────────────────────────────────────────────────────── */
function ProductPage({ navigate, params, products, addToCart, buyNow }) {
  const { product: p } = params;
  const [ci, setCi] = useState(0);
  const [size, setSize] = useState(p.sizes[1] || p.sizes[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("desc");
  const color = p.colors[ci];
  const related = products.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);

  return (
    <div className="sec">
      <div className="ctr">
        <div className="bc" style={{ color: "var(--mid)", marginBottom: 28 }}>
          <span className="bci" style={{ color: "var(--mid)" }} onClick={() => navigate("home")}>Home</span>
          <span className="bcsep" style={{ color: "var(--lt)" }}>/</span>
          <span className="bci" style={{ color: "var(--mid)" }} onClick={() => navigate("category", { cat: p.cat })}>{getLabel("cat", p.cat)}</span>
          <span className="bcsep" style={{ color: "var(--lt)" }}>/</span>
          <span className="bci" style={{ color: "var(--mid)" }} onClick={() => navigate("category", { cat: p.cat, sub: p.sub })}>{getLabel("sub", p.sub)}</span>
          <span className="bcsep" style={{ color: "var(--lt)" }}>/</span>
          <span className="bci" style={{ color: "var(--mid)" }} onClick={() => navigate("category", { cat: p.cat, sub: p.sub, subsub: p.subsub })}>{getLabel("ss", p.subsub)}</span>
          <span className="bcsep" style={{ color: "var(--lt)" }}>/</span>
          <span style={{ color: "var(--blk)", fontSize: 12.5 }}>{p.name}</span>
        </div>

        <div className="pdgrid">
          <AnimSection dir="right">
            <div>
              <img src={color.img} alt={p.name} className="pd-main-img" />
              <div className="pd-thumbs">
                {p.colors.map((c, i) => (
                  <img key={i} src={c.img} alt={c.name} className={`pd-thumb${i === ci ? " on" : ""}`} onClick={() => setCi(i)} />
                ))}
              </div>
            </div>
          </AnimSection>

          <AnimSection dir="left">
            <div>
              {p.discount > 0 && <div style={{ background: "var(--red)", color: "#fff", display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "3px 10px", marginBottom: 13, textTransform: "uppercase", borderRadius: 12 }}>-{p.discount}% OFF</div>}
              <h1 className="pd-tit">{p.name}</h1>
              <div className="pd-rating">
                <span className="pd-stars">{"★".repeat(Math.round(p.rating))}{"☆".repeat(5 - Math.round(p.rating))}</span>
                <span className="pd-rcnt">({p.reviews} reviews)</span>
                <span className={p.stock > 20 ? "pd-stkin" : "pd-stklo"}>{p.stock > 20 ? "In Stock" : `Only ${p.stock} left`}</span>
              </div>
              <div className="pd-prow">
                <span className="pd-now">{p.price.toLocaleString()} BDT</span>
                {p.originalPrice && <span className="pd-was">{p.originalPrice.toLocaleString()} BDT</span>}
                {p.discount > 0 && <span className="pd-save">Save {(p.originalPrice - p.price).toLocaleString()} BDT</span>}
              </div>

              <div className="pd-lbl">Color — <span style={{ fontWeight: 400, color: "var(--mid)", textTransform: "none", letterSpacing: 0 }}>{color.name}</span></div>
              <div className="color-opts">
                {p.colors.map((c, i) => (
                  <div key={i} className="copt" onClick={() => setCi(i)}>
                    <div className="csw" style={{ background: c.hex, borderColor: i === ci ? "var(--blk)" : "transparent", boxShadow: i === ci ? "0 0 0 2px var(--blk)" : "0 0 0 1px rgba(0,0,0,.15)" }} />
                    <span className="cnm">{c.name}</span>
                  </div>
                ))}
              </div>

              <div className="pd-lbl">Size</div>
              <div className="size-opts">
                {p.sizes.map(s => <button key={s} className={`sbtn${s === size ? " on" : ""}`} onClick={() => setSize(s)}>{s}</button>)}
                <button className="sbtn cust" onClick={() => window.open(`https://wa.me/8801403528547?text=Customize: ${p.name}`, "_blank")}>Customize</button>
              </div>

              <div className="pd-lbl">Quantity</div>
              <div className="qty-w">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <input className="qty-val" value={qty} readOnly />
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>

              <div className="pd-acts">
                <button className="btn-cart" onClick={() => addToCart({ ...p, size, color: color.name, selectedColor: color, qty })}>Add to Cart</button>
                <button className="btn-buy" onClick={() => buyNow({ ...p, size, color: color.name, selectedColor: color, qty })}>Buy Now</button>
              </div>

              <div className="pd-perks">
                {["Free delivery on orders above 3,000 BDT", "Cash on delivery available", "7-day hassle-free returns"].map((t, i) => (
                  <div key={i} className="pd-perk"><span className="pp-ico">✓</span>{t}</div>
                ))}
              </div>
            </div>
          </AnimSection>
        </div>

        <div style={{ marginTop: 60 }}>
          <div className="pd-tabs">
            {[["desc", "Description"], ["details", "Product Details"], ["reviews", `Reviews (${p.reviews})`]].map(([k, v]) => (
              <button key={k} className={`pd-tab${tab === k ? " on" : ""}`} onClick={() => setTab(k)}>{v}</button>
            ))}
          </div>
          {tab === "desc" && <p style={{ fontSize: 15, color: "var(--ch)", lineHeight: 1.85, maxWidth: 680 }}>{p.desc}</p>}
          {tab === "details" && <ul className="pd-dl">
            {["Premium quality handpicked fabric", "Traditional handcrafted stitching", "Comfortable all-day fit", "Machine washable at 30°C", "Available in multiple colors and sizes", "Free shipping above 3,000 BDT"].map((d, i) => <li key={i}>{d}</li>)}
          </ul>}
          {tab === "reviews" && <div>
            {[{ name: "Ahmed Hassan", date: "2 weeks ago", text: "Excellent quality. The fabric is very comfortable and the fit is perfect. Highly recommended." },
              { name: "Mohammed Khan", date: "1 month ago", text: "Great value for money. Premium material and very fast delivery. Will definitely order more." },
              { name: "Nusrat Jahan", date: "3 weeks ago", text: "Beautiful product. My husband loves it. The stitching quality is outstanding." }].map((r, i) => (
              <div key={i} className="rev-item">
                <div className="rev-name">{r.name}</div>
                <div className="rev-date">{r.date} — <span style={{ color: "var(--gold)" }}>★★★★★</span></div>
                <div className="rev-txt">{r.text}</div>
              </div>
            ))}
          </div>}
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <AnimSection>
              <div className="sec-hd" style={{ marginBottom: 28 }}>
                <div><div className="sec-eye">You May Also Like</div><div className="sec-tit">Related Products</div></div>
              </div>
            </AnimSection>
            <div className="pgrid">
              {related.map((p, i) => <ProductCard key={p.id} p={p} navigate={navigate} addToCart={addToCart} buyNow={buyNow} delay={i * 0.08} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   CART
───────────────────────────────────────────────────────── */
function CartPage({ navigate, cart, setCart, coupons }) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(null);
  const [msg, setMsg] = useState("");

  const sub = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);
  const ship = sub >= 3000 ? 0 : 60;
  const dis = applied ? (applied.type === "percent" ? Math.round(sub * applied.value / 100) : applied.value) : 0;
  const total = sub - dis + ship;

  const apply = () => {
    const cp = coupons.find(c => c.code === code.toUpperCase() && c.active);
    if (!cp) { setMsg("err"); return; }
    if (cp.minOrder && sub < cp.minOrder) { setMsg("min"); return; }
    setApplied(cp); setMsg("ok");
  };

  return (
    <div className="sec">
      <div className="ctr">
        <AnimSection>
          <div style={{ marginBottom: 28 }}>
            <div className="sec-eye">Your Selection</div>
            <div className="sec-tit">Shopping Cart ({cart.length})</div>
          </div>
        </AnimSection>
        {cart.length === 0
          ? <div className="empty"><span className="empty-ico">○</span><div style={{ marginBottom: 18, fontSize: 16 }}>Your cart is empty</div><button className="btn-gold" onClick={() => navigate("home")}>Continue Shopping</button></div>
          : (
            <div className="cart-grid">
              <div>
                {cart.map(item => {
                  const k = `${item.id}-${item.size}-${item.color}`;
                  return (
                    <div key={k} className="cart-item">
                      <img src={item.selectedColor?.img || item.colors?.[0]?.img} alt={item.name} className="cart-img" />
                      <div>
                        <div className="cart-name">{item.name}</div>
                        <div className="cart-meta">Size: {item.size || "L"} &nbsp;|&nbsp; Color: {item.color || "Default"}</div>
                        <div className="qty-w" style={{ marginBottom: 10 }}>
                          <button className="qty-btn" style={{ width: 34, height: 34 }} onClick={() => setCart(c => c.map(i => `${i.id}-${i.size}-${i.color}` === k ? { ...i, qty: Math.max(1, (i.qty || 1) - 1) } : i))}>−</button>
                          <input className="qty-val" style={{ width: 36 }} value={item.qty || 1} readOnly />
                          <button className="qty-btn" style={{ width: 34, height: 34 }} onClick={() => setCart(c => c.map(i => `${i.id}-${i.size}-${i.color}` === k ? { ...i, qty: (i.qty || 1) + 1 } : i))}>+</button>
                        </div>
                        <button className="cart-rm" onClick={() => setCart(c => c.filter(i => `${i.id}-${i.size}-${i.color}` !== k))}>Remove</button>
                      </div>
                      <div style={{ textAlign: "right", minWidth: 90 }}>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{(item.price * (item.qty || 1)).toLocaleString()} BDT</div>
                        {item.originalPrice && <div style={{ fontSize: 12, color: "var(--lt)", textDecoration: "line-through" }}>{(item.originalPrice * (item.qty || 1)).toLocaleString()}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <AnimSection dir="left">
                <div className="osbox">
                  <div className="ostit">Order Summary</div>
                  <div className="osrow"><span>Subtotal</span><span>{sub.toLocaleString()} BDT</span></div>
                  {dis > 0 && <div className="osrow dis"><span>Discount ({applied.code})</span><span>−{dis.toLocaleString()} BDT</span></div>}
                  <div className="osrow"><span>Shipping</span><span>{ship === 0 ? "Free" : `${ship} BDT`}</span></div>
                  <div className="osrow tot"><span>Total</span><span>{total.toLocaleString()} BDT</span></div>
                  <div className="cprow">
                    <input className="cpin" placeholder="Promo code" value={code} onChange={e => setCode(e.target.value)} />
                    <button className="cpbtn" onClick={apply}>Apply</button>
                  </div>
                  {msg === "ok" && <div className="cpok">Coupon applied: {dis.toLocaleString()} BDT off</div>}
                  {msg === "err" && <div className="cperr">Invalid coupon code</div>}
                  {msg === "min" && <div className="cperr">Minimum order not reached</div>}
                  <button className="ckbtn" onClick={() => navigate("checkout", { discount: dis, appliedCoupon: applied })}>Proceed to Checkout</button>
                </div>
              </AnimSection>
            </div>
          )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   CHECKOUT
───────────────────────────────────────────────────────── */
function CheckoutPage({ navigate, cart, setCart, params = {}, coupons }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", postal: "", notes: "" });
  const [pay, setPay] = useState("cod");
  const [placed, setPlaced] = useState(false);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(params.appliedCoupon || null);
  const [msg, setMsg] = useState(params.appliedCoupon ? "ok" : "");

  const sub = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);
  const ship = sub >= 3000 ? 0 : 60;
  const dis = applied ? (applied.type === "percent" ? Math.round(sub * applied.value / 100) : applied.value) : (params.discount || 0);
  const total = sub - dis + ship;
  const valid = form.name && form.phone && form.address && form.city;

  const apply = () => {
    const cp = coupons.find(c => c.code === code.toUpperCase() && c.active);
    if (!cp) { setMsg("err"); return; }
    if (cp.minOrder && sub < cp.minOrder) { setMsg("min"); return; }
    setApplied(cp); setMsg("ok");
  };

  if (placed) return (
    <div className="suc-ov" onClick={() => navigate("home")}>
      <div className="suc-box" onClick={e => e.stopPropagation()}>
        <span className="suc-ico">✓</span>
        <div className="suc-tit">Order Confirmed!</div>
        <div className="suc-txt">Thank you, {form.name}. Your order has been placed. We'll contact you on <strong>{form.phone}</strong> to confirm delivery.</div>
        <button className="btn-gold" onClick={() => navigate("home")}>Continue Shopping</button>
      </div>
    </div>
  );

  return (
    <div className="sec">
      <div className="ctr">
        <div className="cksteps">
          {[["1","Cart"],["2","Delivery"],["3","Confirm"]].map(([n,l]) => (
            <div key={n} className={`ckstep${n==="2"?" on":""}`}><span className="cknum">{n}</span>{l}</div>
          ))}
        </div>
        <div className="ckgrid">
          <AnimSection dir="right">
            <div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, marginBottom:22 }}>Delivery Information</div>
              <div className="frow">
                <div className="fg"><label className="fl">Full Name *</label><input className="fi" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your full name" /></div>
                <div className="fg"><label className="fl">Phone Number *</label><input className="fi" required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="01XXXXXXXXX" /></div>
              </div>
              <div className="fg"><label className="fl">Email Address</label><input className="fi" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Optional" /></div>
              <div className="fg"><label className="fl">Complete Address *</label><textarea className="fi fia" style={{minHeight:80}} required value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="House, Road, Area" /></div>
              <div className="frow">
                <div className="fg"><label className="fl">City *</label>
                  <select className="fsel" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} required>
                    <option value="">Select City</option>
                    {["Dhaka","Chittagong","Sylhet","Rajshahi","Khulna","Barisal","Rangpur","Mymensingh"].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="fg"><label className="fl">Postal Code</label><input className="fi" value={form.postal} onChange={e=>setForm({...form,postal:e.target.value})} placeholder="Optional" /></div>
              </div>
              <div className="fg"><label className="fl">Order Notes</label><textarea className="fi" style={{minHeight:70}} value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Special requests..." /></div>

              <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,margin:"26px 0 14px"}}>Payment Method</div>
              <div className={`payopt${pay==="cod"?" on":""}`} onClick={()=>setPay("cod")}>
                <div className={`pradio${pay==="cod"?" on":""}`}><div className="pradio-dot"/></div>
                <div><div style={{fontWeight:600,fontSize:14}}>Cash on Delivery</div><div style={{fontSize:12.5,color:"var(--mid)"}}>Pay with cash when your order arrives</div></div>
              </div>
              <div className="payopt" style={{opacity:.45,cursor:"not-allowed"}}>
                <div className="pradio"><div className="pradio-dot"/></div>
                <div><div style={{fontWeight:600,fontSize:14}}>Online Payment</div><div style={{fontSize:12.5,color:"var(--mid)"}}>bKash, Nagad, Card — Coming Soon</div></div>
              </div>
            </div>
          </AnimSection>

          <AnimSection dir="left">
            <div className="osbox">
              <div className="ostit">Order Summary</div>
              {cart.map(item=>(
                <div key={`${item.id}-${item.size}`} style={{display:"flex",gap:10,marginBottom:12,alignItems:"center"}}>
                  <img src={item.selectedColor?.img||item.colors?.[0]?.img} alt="" style={{width:50,height:62,objectFit:"cover",borderRadius:2,flexShrink:0}} />
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:500,lineHeight:1.35}}>{item.name}</div><div style={{fontSize:11.5,color:"var(--mid)"}}>Size: {item.size} | Color: {item.color} | Qty: {item.qty||1}</div></div>
                  <div style={{fontWeight:700,fontSize:13,flexShrink:0}}>{(item.price*(item.qty||1)).toLocaleString()} BDT</div>
                </div>
              ))}
              <div style={{borderTop:"1px solid var(--brd)",paddingTop:10,marginTop:6}}>
                <div className="osrow"><span>Subtotal</span><span>{sub.toLocaleString()} BDT</span></div>
                {dis>0 && <div className="osrow dis"><span>Discount</span><span>−{dis.toLocaleString()} BDT</span></div>}
                <div className="osrow"><span>Shipping</span><span>{ship===0?"Free":`${ship} BDT`}</span></div>
                <div className="osrow tot"><span>Total</span><span>{total.toLocaleString()} BDT</span></div>
              </div>
              {!applied && <>
                <div className="cprow">
                  <input className="cpin" placeholder="Promo code" value={code} onChange={e=>setCode(e.target.value)} />
                  <button className="cpbtn" onClick={apply}>Apply</button>
                </div>
                {msg==="err" && <div className="cperr">Invalid coupon code</div>}
                {msg==="min" && <div className="cperr">Minimum order not reached</div>}
              </>}
              {applied && <div className="cpok">Coupon "{applied.code}" applied</div>}
              <button className="placebtn" disabled={!valid} onClick={()=>{if(valid){setCart([]);setPlaced(true);}}}>Place Order</button>
              <div style={{fontSize:11.5,color:"var(--mid)",marginTop:9,textAlign:"center",lineHeight:1.5}}>By placing an order you agree to our Terms &amp; Privacy Policy</div>
            </div>
          </AnimSection>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   ADMIN PANEL
───────────────────────────────────────────────────────── */
function AdminPage({ navigate, products, setProducts, banners, setBanners, coupons, setCoupons, orders, setOrders }) {
  const [sec, setSec] = useState("dashboard");
  const [prodTab, setProdTab] = useState("list");
  const [orderSt, setOrderSt] = useState("all");
  const [searchP, setSearchP] = useState("");
  const [searchO, setSearchO] = useState("");
  const [viewOrder, setViewOrder] = useState(null);

  const BP = { name:"",cat:"men",sub:"thobe",subsub:"full-sleeve",price:"",originalPrice:"",discount:"",stock:"",desc:"",featured:false,newArrival:false,
    colors:[{name:"White",hex:"#f5f5f0",img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&fit=crop&q=85"}],sizes:["M","L","XL","XXL"],rating:5,reviews:0,imgs:[] };
  const [np, setNp] = useState(BP);
  const [addCol, setAddCol] = useState({ name:"", hex:"#ffffff", img:"" });
  const BC = { code:"",type:"percent",value:"",minOrder:"",active:true,uses:0,maxUses:100 };
  const [nc, setNc] = useState(BC);

  const fp = products.filter(p => p.name.toLowerCase().includes(searchP.toLowerCase()));
  const fo = orders.filter(o => o.customer.toLowerCase().includes(searchO.toLowerCase()) || o.id.toLowerCase().includes(searchO.toLowerCase()))
    .filter(o => orderSt==="all" || o.status===orderSt);
  const revenue = orders.filter(o=>o.status==="Delivered").reduce((s,o)=>s+o.total,0);

  const catSubOpts = CATALOG.find(c=>c.id===np.cat)?.subs||[];
  const subSubOpts = catSubOpts.find(s=>s.id===np.sub)?.subsubs||[];

  const saveProduct = () => {
    if (!np.name || !np.price) return;
    setProducts(ps=>[...ps,{...np,id:Date.now(),price:+np.price,originalPrice:np.originalPrice?+np.originalPrice:null,discount:+np.discount||0,stock:+np.stock||0}]);
    setNp(BP); setProdTab("list");
  };
  const saveCoupon = () => {
    if (!nc.code||!nc.value) return;
    setCoupons(cs=>[...cs,{...nc,id:Date.now(),value:+nc.value,minOrder:+nc.minOrder||0,maxUses:+nc.maxUses||100,uses:0}]);
    setNc(BC);
  };

  const SB = { Pending:"sb-p",Processing:"sb-pr",Shipped:"sb-sh",Delivered:"sb-d",Cancelled:"sb-c" };
  const nav = [
    {id:"dashboard",ico:"◉",lbl:"Dashboard"},
    {id:"orders",ico:"◎",lbl:"Orders"},
    {id:"products",ico:"◈",lbl:"Products"},
    {id:"banners",ico:"◍",lbl:"Banners & Hero",grp:"CONTENT"},
    {id:"featured",ico:"◆",lbl:"Featured Products"},
    {id:"coupons",ico:"⬡",lbl:"Promo Codes"},
    {id:"categories",ico:"◌",lbl:"Category Structure"},
    {id:"store",ico:"←",lbl:"View Store"},
  ];

  return (
    <div className="adm-lay">
      <div className="adm-side">
        <div className="adm-slogo">ZUHOOR<em>.</em><small>Admin Panel</small></div>
        {nav.map(n=>(
          <div key={n.id}>
            {n.grp && <div className="adm-nsec">{n.grp}</div>}
            <div className={`adm-ni${sec===n.id?" on":""}`} onClick={()=>n.id==="store"?navigate("home"):setSec(n.id)}>
              <span className="adm-nico">{n.ico}</span>{n.lbl}
            </div>
          </div>
        ))}
      </div>

      <div className="adm-con">
        <div className="adm-top">
          <div className="adm-top-tit">{nav.find(n=>n.id===sec)?.lbl||"Dashboard"}</div>
          <div className="adm-usr"><div className="adm-av">A</div><span>admin@zuhoor.com</span></div>
        </div>
        <div className="adm-main">

          {sec==="dashboard" && <>
            <div className="adm-stats">
              {[{v:orders.length+243,l:"Total Orders",c:"+12% this month"},
                {v:revenue.toLocaleString()+" BDT",l:"Delivered Revenue",c:"Completed orders"},
                {v:products.length,l:"Active Products",c:`${products.filter(p=>p.featured).length} featured`},
                {v:orders.filter(o=>o.status==="Pending").length,l:"Pending Orders",c:"Needs action"}].map((s,i)=>(
                <div key={i} className="adm-stat"><div className="adm-sv">{s.v}</div><div className="adm-sl">{s.l}</div><div className="adm-sc">{s.c}</div></div>
              ))}
            </div>
            <div className="adm-card">
              <div className="adm-ch"><div className="adm-ctit">Recent Orders</div><button className="abtn sm" onClick={()=>setSec("orders")}>View All</button></div>
              <div style={{overflowX:"auto"}}>
                <table className="atable">
                  <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {orders.slice(0,5).map(o=>(
                      <tr key={o.id}>
                        <td><strong>{o.id}</strong></td>
                        <td>{o.customer}<br/><span style={{fontSize:11,color:"var(--lt)"}}>{o.phone}</span></td>
                        <td style={{fontWeight:600}}>{o.total.toLocaleString()} BDT</td>
                        <td><span className={`sbdg ${SB[o.status]||"sb-p"}`}>{o.status}</span></td>
                        <td><button className="abtn sm ol" onClick={()=>{setSec("orders");setViewOrder(o);}}>View</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <div className="adm-card">
                <div className="adm-ch"><div className="adm-ctit">Low Stock Alert</div></div>
                <div className="adm-cb">
                  {products.filter(p=>p.stock<=20).slice(0,4).map(p=>(
                    <div key={p.id} className="aprow" style={{padding:"8px 0"}}>
                      <img src={p.colors[0].img} alt="" className="ap-img" style={{width:40,height:50}}/>
                      <div><div className="ap-name" style={{fontSize:13}}>{p.name}</div><div className="ap-meta">Stock: <strong style={{color:p.stock<10?"var(--red)":"var(--gold)"}}>{p.stock}</strong></div></div>
                    </div>
                  ))}
                  {!products.some(p=>p.stock<=20) && <div style={{fontSize:13,color:"var(--mid)"}}>All products have healthy stock.</div>}
                </div>
              </div>
              <div className="adm-card">
                <div className="adm-ch"><div className="adm-ctit">Active Promo Codes</div><button className="abtn sm" onClick={()=>setSec("coupons")}>Manage</button></div>
                <div className="adm-cb">
                  {coupons.filter(c=>c.active).map(c=>(
                    <div key={c.id} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid var(--bg)",fontSize:13}}>
                      <strong>{c.code}</strong>
                      <span style={{color:"var(--mid)"}}>{c.type==="percent"?`${c.value}%`:`${c.value} BDT`} off <span className="cpbdg act">{c.uses}</span></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>}

          {sec==="orders" && (
            viewOrder ? (
              <div className="adm-card">
                <div className="adm-ch">
                  <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                    <button className="abtn sm ol" onClick={()=>setViewOrder(null)}>← Back</button>
                    <div className="adm-ctit">Order {viewOrder.id}</div>
                    <span className={`sbdg ${SB[viewOrder.status]||"sb-p"}`}>{viewOrder.status}</span>
                  </div>
                  <button className="abtn sm" onClick={()=>window.open(`https://wa.me/${viewOrder.phone.replace(/[^0-9]/g,"")}`)}>WhatsApp</button>
                </div>
                <div className="adm-cb">
                  <div className="odgrid">
                    <div className="odbox"><div className="od-lbl">Customer</div><div className="od-val"><strong>{viewOrder.customer}</strong><br/>{viewOrder.phone}<br/>{viewOrder.address}<br/>{viewOrder.city}</div></div>
                    <div className="odbox"><div className="od-lbl">Order Info</div><div className="od-val">Date: {viewOrder.date}{viewOrder.coupon&&<><br/>Coupon: {viewOrder.coupon}</>}</div></div>
                  </div>
                  <div style={{marginBottom:16}}>
                    <div className="od-lbl">Items</div>
                    {viewOrder.items.map((item,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid var(--bg)",fontSize:14}}>
                        <span>{item.name} — {item.size} | {item.color} | x{item.qty}</span>
                        <strong>{item.price.toLocaleString()} BDT</strong>
                      </div>
                    ))}
                    <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0",fontSize:15,fontWeight:700,borderTop:"2px solid var(--brd)",marginTop:4}}>
                      <span>Total</span><span>{viewOrder.total.toLocaleString()} BDT</span>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                    <span style={{fontSize:13,fontWeight:600}}>Update Status:</span>
                    {["Pending","Processing","Shipped","Delivered","Cancelled"].map(s=>(
                      <button key={s} className={`abtn sm${viewOrder.status===s?" grn":""}`}
                        onClick={()=>{const u={...viewOrder,status:s};setOrders(os=>os.map(o=>o.id===viewOrder.id?u:o));setViewOrder(u);}}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="adm-card">
                <div className="adm-ch"><div className="adm-ctit">All Orders</div><input className="asrch" placeholder="Search..." value={searchO} onChange={e=>setSearchO(e.target.value)}/></div>
                <div className="atabs" style={{padding:"0 20px"}}>
                  {["all","Pending","Processing","Shipped","Delivered","Cancelled"].map(t=>(
                    <button key={t} className={`atab${orderSt===t?" on":""}`} onClick={()=>setOrderSt(t)}>
                      {t==="all"?"All":t} ({t==="all"?orders.length:orders.filter(o=>o.status===t).length})
                    </button>
                  ))}
                </div>
                <div style={{overflowX:"auto"}}>
                  <table className="atable">
                    <thead><tr><th>Order ID</th><th>Customer</th><th>City</th><th>Total</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>
                      {fo.map(o=>(
                        <tr key={o.id}>
                          <td><strong>{o.id}</strong></td>
                          <td>{o.customer}<br/><span style={{fontSize:11,color:"var(--lt)"}}>{o.phone}</span></td>
                          <td>{o.city}</td>
                          <td style={{fontWeight:600}}>{o.total.toLocaleString()} BDT</td>
                          <td style={{fontSize:12}}>{o.date}</td>
                          <td><select className="stsel" value={o.status} onChange={e=>setOrders(os=>os.map(x=>x.id===o.id?{...x,status:e.target.value}:x))}>{["Pending","Processing","Shipped","Delivered","Cancelled"].map(s=><option key={s}>{s}</option>)}</select></td>
                          <td><button className="abtn sm" onClick={()=>setViewOrder(o)}>View</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          )}

          {sec==="products" && (
            <div className="adm-card">
              <div className="adm-ch">
                <div className="adm-ctit">Products</div>
                <div style={{display:"flex",gap:9,flexWrap:"wrap"}}>
                  <input className="asrch" placeholder="Search products..." value={searchP} onChange={e=>setSearchP(e.target.value)}/>
                  <button className="abtn" onClick={()=>setProdTab("add")}>+ Add Product</button>
                </div>
              </div>
              <div className="atabs" style={{padding:"0 20px"}}>
                <button className={`atab${prodTab==="list"?" on":""}`} onClick={()=>setProdTab("list")}>List ({products.length})</button>
                <button className={`atab${prodTab==="add"?" on":""}`} onClick={()=>setProdTab("add")}>Add New</button>
              </div>
              <div className="adm-cb">
                {prodTab==="list" && (fp.length===0 ? <div className="empty"><span className="empty-ico">○</span>No products.</div> : fp.map(p=>(
                  <div key={p.id} className="aprow">
                    <img src={p.colors[0].img} alt="" className="ap-img"/>
                    <div style={{flex:1}}>
                      <div className="ap-name">{p.name}</div>
                      <div className="ap-meta">{getLabel("cat",p.cat)} / {getLabel("sub",p.sub)} / {getLabel("ss",p.subsub)} | {p.price.toLocaleString()} BDT {p.discount>0&&`(-${p.discount}%)`} | Stock: <strong style={{color:p.stock<=10?"var(--red)":"inherit"}}>{p.stock}</strong>
                        {p.featured && <span className="cpbdg act" style={{marginLeft:6}}>Featured</span>}
                        {p.newArrival && <span className="cpbdg" style={{marginLeft:4,background:"#e0f2fe",color:"#0369a1"}}>New</span>}
                      </div>
                    </div>
                    <div className="ap-acts">
                      <button className="abtn sm ol" onClick={()=>setProducts(ps=>ps.map(x=>x.id===p.id?{...x,featured:!x.featured}:x))}>{p.featured?"Unfeature":"Feature"}</button>
                      <button className="abtn sm red" onClick={()=>setProducts(ps=>ps.filter(x=>x.id!==p.id))}>Delete</button>
                    </div>
                  </div>
                )))}

                {prodTab==="add" && (
                  <div>
                    <div style={{fontWeight:700,fontSize:15,marginBottom:15}}>Add New Product</div>
                    <div className="afg">
                      <div className="fg afg-full"><label className="fl">Product Name *</label><input className="fi" value={np.name} onChange={e=>setNp({...np,name:e.target.value})} placeholder="e.g. Premium White Full Sleeve Thobe"/></div>
                      <div className="fg"><label className="fl">Category *</label>
                        <select className="fsel" value={np.cat} onChange={e=>{const cat=CATALOG.find(c=>c.id===e.target.value);setNp({...np,cat:e.target.value,sub:cat?.subs[0]?.id||"",subsub:cat?.subs[0]?.subsubs[0]?.id||""});}}>
                          {CATALOG.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
                        </select>
                      </div>
                      <div className="fg"><label className="fl">Sub Category *</label>
                        <select className="fsel" value={np.sub} onChange={e=>{const sub=catSubOpts.find(s=>s.id===e.target.value);setNp({...np,sub:e.target.value,subsub:sub?.subsubs[0]?.id||""});}}>
                          {catSubOpts.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
                        </select>
                      </div>
                      <div className="fg"><label className="fl">Sub-Sub Category *</label>
                        <select className="fsel" value={np.subsub} onChange={e=>setNp({...np,subsub:e.target.value})}>
                          {subSubOpts.map(ss=><option key={ss.id} value={ss.id}>{ss.label}</option>)}
                        </select>
                      </div>
                      <div className="fg"><label className="fl">Price (BDT) *</label><input className="fi" type="number" value={np.price} onChange={e=>setNp({...np,price:e.target.value})} placeholder="2400"/></div>
                      <div className="fg"><label className="fl">Original Price (BDT)</label><input className="fi" type="number" value={np.originalPrice} onChange={e=>setNp({...np,originalPrice:e.target.value})} placeholder="Strikethrough price"/></div>
                      <div className="fg"><label className="fl">Discount %</label><input className="fi" type="number" value={np.discount} onChange={e=>setNp({...np,discount:e.target.value})} placeholder="e.g. 20"/></div>
                      <div className="fg"><label className="fl">Stock Quantity</label><input className="fi" type="number" value={np.stock} onChange={e=>setNp({...np,stock:e.target.value})} placeholder="50"/></div>
                      <div className="fg afg-full"><label className="fl">Description</label><textarea className="fi fia" value={np.desc} onChange={e=>setNp({...np,desc:e.target.value})} placeholder="Product description..."/></div>
                      <div className="fg"><label className="fl">Sizes</label>
                        <div style={{display:"flex",gap:7,flexWrap:"wrap",marginTop:4}}>
                          {["S","M","L","XL","XXL","2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"].map(sz=>(
                            <div key={sz} className={`fchk${np.sizes.includes(sz)?" on":""}`}
                              style={{width:"auto",height:"auto",padding:"5px 12px",borderRadius:2,cursor:"pointer",fontSize:12}}
                              onClick={()=>setNp({...np,sizes:np.sizes.includes(sz)?np.sizes.filter(s=>s!==sz):[...np.sizes,sz]})}>
                              {sz}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="fg">
                        <label className="fl">Options</label>
                        <div style={{display:"flex",gap:18,marginTop:7,flexWrap:"wrap"}}>
                          <div className="fopt" onClick={()=>setNp({...np,featured:!np.featured})}><div className={`fchk${np.featured?" on":""}`}>{np.featured?"✓":""}</div><span className="flbl">Featured on Homepage</span></div>
                          <div className="fopt" onClick={()=>setNp({...np,newArrival:!np.newArrival})}><div className={`fchk${np.newArrival?" on":""}`}>{np.newArrival?"✓":""}</div><span className="flbl">New Arrival</span></div>
                        </div>
                      </div>
                    </div>

                    <div style={{margin:"18px 0 10px",fontWeight:700,fontSize:14}}>Color Variants</div>
                    {np.colors.map((c,i)=>(
                      <div key={i} style={{display:"flex",gap:10,alignItems:"center",marginBottom:7,padding:"8px 12px",background:"var(--bg)",border:"1px solid var(--brd)"}}>
                        <div style={{width:22,height:22,borderRadius:"50%",background:c.hex,border:"1.5px solid rgba(0,0,0,.15)",flexShrink:0}}/>
                        <span style={{fontSize:13,flex:1}}><strong>{c.name}</strong> — {c.img.substring(0,50)}...</span>
                        <button className="abtn sm red" onClick={()=>setNp({...np,colors:np.colors.filter((_,j)=>j!==i)})}>Remove</button>
                      </div>
                    ))}
                    <div style={{background:"var(--bg)",padding:14,border:"1px solid var(--brd)",marginBottom:14}}>
                      <div style={{fontWeight:600,fontSize:13,marginBottom:11}}>Add Color Variant</div>
                      <div className="afg">
                        <div className="fg"><label className="fl">Color Name</label><input className="fi" value={addCol.name} onChange={e=>setAddCol({...addCol,name:e.target.value})} placeholder="e.g. White"/></div>
                        <div className="fg"><label className="fl">Hex Code</label><input className="fi" value={addCol.hex} onChange={e=>setAddCol({...addCol,hex:e.target.value})} placeholder="#f5f5f0"/></div>
                        <div className="fg afg-full"><label className="fl">Image URL (Unsplash or any)</label><input className="fi" value={addCol.img} onChange={e=>setAddCol({...addCol,img:e.target.value})} placeholder="https://images.unsplash.com/..."/></div>
                      </div>
                      <button className="abtn sm" onClick={()=>{if(addCol.name&&addCol.img){setNp({...np,colors:[...np.colors,{...addCol}]});setAddCol({name:"",hex:"#ffffff",img:""});}}}>Add Color</button>
                    </div>

                    <div style={{display:"flex",gap:9}}>
                      <button className="abtn" onClick={saveProduct}>Save Product</button>
                      <button className="abtn ol" onClick={()=>setProdTab("list")}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {sec==="banners" && (
            <div className="adm-card">
              <div className="adm-ch"><div className="adm-ctit">Homepage Hero Banners</div><div style={{fontSize:12,color:"var(--mid)"}}>Active banners auto-rotate every 3 seconds</div></div>
              <div className="adm-cb">
                <div className="bpgrid">
                  {banners.map(b=>(
                    <div key={b.id} className="bprev">
                      <img src={b.bg} alt="" className="bprev-img"/>
                      <div className="bprev-body">
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
                          <strong style={{fontSize:13}}>{b.title.substring(0,20)}...</strong>
                          <button className={`toggle${b.active?" on":""}`} onClick={()=>setBanners(bs=>bs.map(x=>x.id===b.id?{...x,active:!x.active}:x))}/>
                        </div>
                        {[["Image URL","bg"],["Title","title"],["Subtitle","subtitle"],["CTA Text","cta"]].map(([l,k])=>(
                          <div key={k} style={{marginBottom:6}}>
                            <label style={{fontSize:10,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:"var(--mid)",display:"block",marginBottom:3}}>{l}</label>
                            <input className="fi" value={b[k]} onChange={e=>setBanners(bs=>bs.map(x=>x.id===b.id?{...x,[k]:e.target.value}:x))} style={{fontSize:11,padding:"5px 8px"}}/>
                          </div>
                        ))}
                        <div>
                          <label style={{fontSize:10,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:"var(--mid)",display:"block",marginBottom:3}}>CTA Link</label>
                          <select className="fsel" value={b.ctaLink} onChange={e=>setBanners(bs=>bs.map(x=>x.id===b.id?{...x,ctaLink:e.target.value}:x))} style={{fontSize:11,padding:"5px 8px"}}>
                            {CATALOG.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {sec==="featured" && (
            <div className="adm-card">
              <div className="adm-ch"><div className="adm-ctit">Featured & New Arrival Products</div></div>
              <div className="adm-cb">
                {products.map(p=>(
                  <div key={p.id} className="aprow">
                    <img src={p.colors[0].img} alt="" className="ap-img"/>
                    <div style={{flex:1}}><div className="ap-name">{p.name}</div><div className="ap-meta">{p.price.toLocaleString()} BDT | {getLabel("cat",p.cat)}</div></div>
                    <div style={{display:"flex",gap:14,alignItems:"center",flexShrink:0,flexWrap:"wrap"}}>
                      <div className="fopt" style={{gap:7}} onClick={()=>setProducts(ps=>ps.map(x=>x.id===p.id?{...x,featured:!x.featured}:x))}>
                        <span style={{fontSize:12}}>Featured</span><button className={`toggle${p.featured?" on":""}`}/>
                      </div>
                      <div className="fopt" style={{gap:7}} onClick={()=>setProducts(ps=>ps.map(x=>x.id===p.id?{...x,newArrival:!x.newArrival}:x))}>
                        <span style={{fontSize:12}}>New Arrival</span><button className={`toggle${p.newArrival?" on":""}`}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sec==="coupons" && <>
            <div className="adm-card">
              <div className="adm-ch"><div className="adm-ctit">Promo Codes</div></div>
              <div style={{overflowX:"auto"}}>
                <table className="atable">
                  <thead><tr><th>Code</th><th>Type</th><th>Discount</th><th>Min. Order</th><th>Uses</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {coupons.map(c=>(
                      <tr key={c.id}>
                        <td><strong>{c.code}</strong></td>
                        <td>{c.type==="percent"?"Percentage":"Flat"}</td>
                        <td>{c.type==="percent"?`${c.value}%`:`${c.value} BDT`}</td>
                        <td>{c.minOrder>0?`${c.minOrder.toLocaleString()} BDT`:"None"}</td>
                        <td>{c.uses}/{c.maxUses}</td>
                        <td><span className={`cpbdg ${c.active?"act":"off"}`}>{c.active?"Active":"Inactive"}</span></td>
                        <td><div style={{display:"flex",gap:6}}>
                          <button className="abtn sm ol" onClick={()=>setCoupons(cs=>cs.map(x=>x.id===c.id?{...x,active:!x.active}:x))}>{c.active?"Deactivate":"Activate"}</button>
                          <button className="abtn sm red" onClick={()=>setCoupons(cs=>cs.filter(x=>x.id!==c.id))}>Delete</button>
                        </div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="adm-card">
              <div className="adm-ch"><div className="adm-ctit">Create New Promo Code</div></div>
              <div className="adm-cb">
                <div className="afg">
                  <div className="fg"><label className="fl">Code *</label><input className="fi" value={nc.code} onChange={e=>setNc({...nc,code:e.target.value.toUpperCase()})} placeholder="e.g. EID25"/></div>
                  <div className="fg"><label className="fl">Type</label><select className="fsel" value={nc.type} onChange={e=>setNc({...nc,type:e.target.value})}><option value="percent">Percentage (%)</option><option value="flat">Flat Amount (BDT)</option></select></div>
                  <div className="fg"><label className="fl">Value *</label><input className="fi" type="number" value={nc.value} onChange={e=>setNc({...nc,value:e.target.value})} placeholder={nc.type==="percent"?"e.g. 20":"e.g. 300"}/></div>
                  <div className="fg"><label className="fl">Min. Order (BDT)</label><input className="fi" type="number" value={nc.minOrder} onChange={e=>setNc({...nc,minOrder:e.target.value})} placeholder="0 for none"/></div>
                  <div className="fg"><label className="fl">Max Uses</label><input className="fi" type="number" value={nc.maxUses} onChange={e=>setNc({...nc,maxUses:e.target.value})} placeholder="100"/></div>
                  <div className="fg"><label className="fl">Status</label>
                    <div className="fopt" style={{marginTop:8}} onClick={()=>setNc({...nc,active:!nc.active})}>
                      <button className={`toggle${nc.active?" on":""}`}/><span className="flbl">{nc.active?"Active":"Inactive"}</span>
                    </div>
                  </div>
                </div>
                <button className="abtn" onClick={saveCoupon}>Create Promo Code</button>
              </div>
            </div>
          </>}

          {sec==="categories" && (
            <div className="adm-card">
              <div className="adm-ch"><div className="adm-ctit">3-Level Category Structure</div></div>
              <div className="adm-cb">
                {CATALOG.map(cat=>(
                  <div key={cat.id} style={{marginBottom:22,background:"var(--bg)",padding:16,border:"1px solid var(--brd)"}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,marginBottom:11}}>
                      {cat.label} <span style={{fontSize:12,fontWeight:400,color:"var(--mid)",fontFamily:"'DM Sans',sans-serif"}}>({products.filter(p=>p.cat===cat.id).length} products)</span>
                    </div>
                    {cat.subs.map(sub=>(
                      <div key={sub.id} style={{marginLeft:16,marginBottom:11}}>
                        <div style={{fontWeight:600,fontSize:14,marginBottom:6,color:"var(--ch)"}}>
                          {sub.label} <span style={{fontSize:11,fontWeight:400,color:"var(--lt)"}}>({products.filter(p=>p.sub===sub.id).length})</span>
                        </div>
                        <div style={{display:"flex",gap:7,flexWrap:"wrap",marginLeft:16}}>
                          {sub.subsubs.map(ss=>(
                            <div key={ss.id} style={{background:"#fff",border:"1px solid var(--brd)",padding:"4px 12px",fontSize:12.5}}>
                              {ss.label} <span style={{color:"var(--lt)",fontSize:11}}>({products.filter(p=>p.subsub===ss.id).length})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────────────────── */
export default function ZuhoorApp() {
  const [currentPage, setPage] = useState("home");
  const page = currentPage;
  const [params, setParams] = useState({});
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(INIT_PRODUCTS);
  const [banners, setBanners] = useState(INIT_BANNERS);
  const [coupons, setCoupons] = useState(INIT_COUPONS);
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [toastMsg, setToastMsg] = useState("");
  const [toastOn, setToastOn] = useState(false);

  useEffect(() => {
    const el = document.createElement("style");
    el.innerHTML = CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const showToast = msg => {
    setToastMsg(msg); setToastOn(true);
    setTimeout(() => setToastOn(false), 2600);
  };

  const navigate = useCallback((pg, p = {}) => {
    setPage(pg); setParams(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const addToCart = useCallback(product => {
    setCart(c => {
      const key = i => `${i.id}||${i.size||"L"}||${i.color||"default"}`;
      const pk = key(product);
      const found = c.find(i => key(i) === pk);
      if (found) return c.map(i => key(i) === pk ? { ...i, qty: (i.qty||1) + (product.qty||1) } : i);
      return [...c, { ...product, qty: product.qty||1 }];
    });
    showToast("Added to cart ✓");
  }, []);

  const buyNow = useCallback(product => { addToCart(product); navigate("checkout"); }, [addToCart, navigate]);

  const isAdmin = page === "admin";
  const cartCount = cart.reduce((s, i) => s + (i.qty||1), 0);

  return (
    <div className="zroot">
      {!isAdmin && <Navbar navigate={navigate} page={page} cart={cart} products={products} />}

      {page==="home" && <HomePage navigate={navigate} products={products} banners={banners} addToCart={addToCart} buyNow={buyNow} />}
      {page==="category" && <CategoryPage navigate={navigate} params={params} products={products} addToCart={addToCart} buyNow={buyNow} />}
      {page==="product" && <ProductPage navigate={navigate} params={params} products={products} addToCart={addToCart} buyNow={buyNow} />}
      {page==="cart" && <CartPage navigate={navigate} cart={cart} setCart={setCart} coupons={coupons} />}
      {page==="checkout" && <CheckoutPage navigate={navigate} cart={cart} setCart={setCart} params={params} coupons={coupons} />}
      {page==="admin" && <AdminPage navigate={navigate} products={products} setProducts={setProducts} banners={banners} setBanners={setBanners} coupons={coupons} setCoupons={setCoupons} orders={orders} setOrders={setOrders} />}

      {!isAdmin && <Footer navigate={navigate} />}

      {!isAdmin && (
        <div className="mobnav">
          <div className="mobnav-inner">
            {[{ico:"⌂",lbl:"Home",pg:"home"},{ico:"☰",lbl:"Browse",pg:"category",p:{cat:"all"}},{ico:"⊕",lbl:cartCount>0?`Cart (${cartCount})`:"Cart",pg:"cart"}].map(n=>(
              <button key={n.pg} className={`mobnav-btn${page===n.pg?" on":""}`} onClick={()=>navigate(n.pg,n.p||{})}>
                <span className="mobnav-ico">{n.ico}</span><span>{n.lbl}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="toast-w"><div className={`toast${toastOn?" show":""}`}>{toastMsg}</div></div>
    </div>
  );
}
