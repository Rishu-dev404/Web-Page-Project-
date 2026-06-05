/* BG CANVAS — subtle moving dots */
(function(){
  const c=document.getElementById('bg-canvas');
  const ctx=c.getContext('2d');
  let W,H,pts=[];
  function resize(){ W=c.width=window.innerWidth; H=c.height=window.innerHeight; }
  resize(); window.addEventListener('resize',resize);
  for(let i=0;i<60;i++) pts.push({x:Math.random()*1920,y:Math.random()*1080,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3});
  function loop(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0;
      if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,1,0,Math.PI*2);
      ctx.fillStyle='rgba(192,57,43,0.5)'; ctx.fill();
    });
    pts.forEach((p,i)=>{
      for(let j=i+1;j<pts.length;j++){
        const q=pts[j], d=Math.hypot(p.x-q.x,p.y-q.y);
        if(d<140){ ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
          ctx.strokeStyle=`rgba(192,57,43,${0.08*(1-d/140)})`; ctx.lineWidth=.5; ctx.stroke(); }
      }
    });
    requestAnimationFrame(loop);
  }
  loop();
})();

/* AVATAR CANVAS — minimal face silhouette */
(function(){
  const c=document.getElementById('avatar-canvas');
  if(!c) return;
  const ctx=c.getContext('2d');
  function draw(){
    c.width=c.offsetWidth; c.height=c.offsetHeight;
    const w=c.width, h=c.height;
    ctx.clearRect(0,0,w,h);
    ctx.strokeStyle='rgba(192,57,43,0.25)';
    ctx.lineWidth=1;
    for(let i=0;i<w;i+=18){
      ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,h); ctx.stroke();
    }
    for(let i=0;i<h;i+=18){
      ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(w,i); ctx.stroke();
    }
    const cx=w/2, cy=h*0.42, r=h*0.28;
    ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
    ctx.strokeStyle='rgba(192,57,43,0.5)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx-r*0.9, h);
    ctx.quadraticCurveTo(cx-r*1.1, cy+r*0.6, cx, cy+r);
    ctx.quadraticCurveTo(cx+r*1.1, cy+r*0.6, cx+r*0.9, h);
    ctx.strokeStyle='rgba(192,57,43,0.4)'; ctx.lineWidth=1.5; ctx.stroke();
  }
  draw(); window.addEventListener('resize',draw);
})();

/* PROJECT CANVAS ART */
function drawP(id, style){
  const c=document.getElementById(id); if(!c)return;
  c.width=c.offsetWidth||400; c.height=120;
  const ctx=c.getContext('2d'), w=c.width;
  ctx.fillStyle='#0e0e0e'; ctx.fillRect(0,0,w,120);
  if(style==='wave'){
    for(let t=0;t<3;t++){
      ctx.beginPath();
      for(let x=0;x<w;x++){
        const y=60+Math.sin((x/w)*Math.PI*4+t)*(15-t*4);
        x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.strokeStyle=`rgba(192,57,43,${0.3-t*0.08})`; ctx.lineWidth=1; ctx.stroke();
    }
  } else if(style==='bar'){
    const bars=14;
    for(let i=0;i<bars;i++){
      const bh=30+Math.random()*60;
      ctx.fillStyle=`rgba(192,57,43,${0.15+Math.random()*0.25})`;
      ctx.fillRect(i*(w/bars)+2, 120-bh, (w/bars)-4, bh);
    }
  } else {
    for(let i=0;i<12;i++){
      ctx.beginPath();
      ctx.arc(Math.random()*w,Math.random()*120,Math.random()*20+5,0,Math.PI*2);
      ctx.strokeStyle=`rgba(192,57,43,${Math.random()*0.3+0.1})`; ctx.lineWidth=1; ctx.stroke();
    }
  }
  ctx.font='11px Share Tech Mono, monospace';
  ctx.fillStyle='rgba(192,57,43,0.5)';
  ctx.fillText(id==='p1'?'// anomaly_detect.py': id==='p2'?'// task_manager.py':'// gen_portfolio.py', 16, 20);
}
window.addEventListener('load',()=>{ drawP('p1','wave'); drawP('p2','bar'); drawP('p3','circle'); });

/* HAMBURGER */
document.getElementById('hamburger').addEventListener('click',()=>{
  document.getElementById('nav-links').classList.toggle('open');
});

/* SCROLL REVEAL */
const revs=document.querySelectorAll('.reveal');
const ro=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); }),{threshold:0.1});
revs.forEach(r=>ro.observe(r));

/* SKILL BARS */
const bo=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting) e.target.querySelectorAll('.skill-bar').forEach(b=>{ b.style.width=b.dataset.width+'%'; });
}),{threshold:0.2});
const sg=document.getElementById('skills'); if(sg) bo.observe(sg);

/* DRAG & DROP */
let dragSrc=null;
document.querySelectorAll('.skill-card').forEach(c=>{
  c.addEventListener('dragstart',function(){ dragSrc=this; this.classList.add('dragging'); });
  c.addEventListener('dragend',function(){ this.classList.remove('dragging'); });
  c.addEventListener('dragover',e=>e.preventDefault());
  c.addEventListener('drop',function(e){
    e.preventDefault();
    if(dragSrc!==this){
      const g=document.getElementById('skills-grid'), cs=[...g.children];
      const si=cs.indexOf(dragSrc), di=cs.indexOf(this);
      if(si<di) g.insertBefore(dragSrc,this.nextSibling); else g.insertBefore(dragSrc,this);
    }
  });
});

/* GEOLOCATION */
function locateMe(){
  const el=document.getElementById('geo-out');
  el.textContent='> running...';
  if(!navigator.geolocation){ el.textContent='> error: geolocation not supported'; return; }
  navigator.geolocation.getCurrentPosition(
    p=>{ el.textContent=`> lat: ${p.coords.latitude.toFixed(5)}\n> lng: ${p.coords.longitude.toFixed(5)}\n> acc: ±${Math.round(p.coords.accuracy)}m`; el.style.whiteSpace='pre'; },
    ()=>{ el.textContent='> permission denied.'; }
  );
}

/* STORAGE */
function saveS(){
  const v=document.getElementById('s-input').value.trim();
  if(!v){ document.getElementById('s-out').textContent='> error: empty value'; return; }
  localStorage.setItem('_dev_val',v);
  document.getElementById('s-out').textContent=`> saved: "${v}"`;
}
function loadS(){
  const v=localStorage.getItem('_dev_val');
  document.getElementById('s-out').textContent=v?`> loaded: "${v}"`:'> nothing stored.';
}
function clearS(){
  localStorage.removeItem('_dev_val');
  document.getElementById('s-out').textContent='> cleared.';
}

/* FORM */
function handleForm(e){
  e.preventDefault();
  const btn=e.target.querySelector('button[type=submit]');
  btn.textContent='sending...'; btn.disabled=true;
  setTimeout(()=>{
    document.getElementById('form-ok').style.display='block';
    btn.textContent='sent'; e.target.reset();
  },1200);
}