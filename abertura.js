{
const D=__DATA__;
const box=document.getElementById('intro'),cv=box.querySelector('canvas'),ctx=cv.getContext('2d');
const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
const N='#0B0D12',C='#F2EDE3',A='#E8A33D';
const G=D.g.map(g=>({...g,p:new Path2D(g.d)})),M=new Path2D(D.mark);
let W,H,u,sw,t0=0,raf=0;
const ease=x=>x<=0?0:x>=1?1:x<.5?4*x*x*x:1-((-2*x+2)**3)/2;
const cl=(a,b,x)=>Math.min(1,Math.max(0,(x-a)/(b-a)));
const mix=(a,b,t)=>a+(b-a)*t;
/* elipse da órbita, parametrizada por comprimento de arco */
const RX=460,RY=120,ROT=-28*Math.PI/180,TAB=[];let LEN=0;
{let px=RX,py=0;for(let i=0;i<=720;i++){const th=i/720*Math.PI*2,x=RX*Math.cos(th),y=RY*Math.sin(th);LEN+=Math.hypot(x-px,y-py);TAB.push([LEN,th]);px=x;py=y}}
const thAt=s=>{s=((s%LEN)+LEN)%LEN;let lo=0,hi=TAB.length-1;while(lo<hi){const m=(lo+hi)>>1;if(TAB[m][0]<s)lo=m+1;else hi=m}return TAB[lo][1]};
let seed=11;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;
const scatter=G.map(()=>({a:rnd()*Math.PI*2,r:.55+rnd()*.35,tilt:(rnd()-.5)*90}));
const dust=Array.from({length:150},()=>({a:rnd()*Math.PI*2,r:.3+rnd()*.7,k:rnd(),s:rnd()*1.6+.6}));
function size(){const dpr=Math.min(2,devicePixelRatio||1);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);u=Math.min(W,H)/1000*(W<700?1.05:.82);sw=Math.min(W*.84,1040)/1116}
function glyph(g,x,y,s,rot,al,col){ctx.save();ctx.globalAlpha=al;ctx.translate(x,y);ctx.rotate(rot*Math.PI/180);ctx.scale(s,s);ctx.translate(-g.cx,-145);ctx.fillStyle=col;ctx.fill(g.p,'evenodd');ctx.restore()}
function draw(t){
 const mk=ease(cl(.05,1.0,t)),p1=ease(cl(.7,1.9,t)),p3=ease(cl(2.9,3.9,t)),dot=cl(3.75,4.15,t),ai=cl(3.9,4.3,t);
 const cx=W/2,cy=H/2,big=Math.max(W,H);
 ctx.globalAlpha=1;ctx.fillStyle=N;ctx.fillRect(0,0,W,H);
 /* poeira: espalhada, depois no anel, depois some */
 for(const d of dust){const th=d.a+t*.25*(1-p3);const sx=cx+Math.cos(d.a)*d.r*big*.6,sy=cy+Math.sin(d.a)*d.r*big*.6;
  const x=RX*Math.cos(th)*(1+d.k*.08),y=RY*Math.sin(th)*(1+d.k*.3);const ox=cx+(x*Math.cos(ROT)-y*Math.sin(ROT))*u,oy=cy+(x*Math.sin(ROT)+y*Math.cos(ROT))*u;
  ctx.globalAlpha=(.25+.45*d.k)*Math.min(1,t*2)*(1-p3);ctx.fillStyle=d.k>.7?A:C;ctx.fillRect(mix(sx,ox,p1),mix(sy,oy,p1),d.s,d.s)}
 ctx.globalAlpha=1;
 const spin=t*LEN*.11,items=[];
 G.forEach((g,i)=>{const fx=cx+(g.cx-578)*sw,fy=cy;
  if(i===0){items.push({g,x:fx,y:fy,s:sw,r:0,al:p3,front:true});return}
  const k=i-1,th=thAt(LEN*.27-k*LEN/9-spin),x=RX*Math.cos(th),y=RY*Math.sin(th),depth=(Math.sin(th)+1)/2;
  const ox=cx+(x*Math.cos(ROT)-y*Math.sin(ROT))*u,oy=cy+(x*Math.sin(ROT)+y*Math.cos(ROT))*u,os=.6*u*(.75+.35*depth),oal=.4+.6*depth;
  const sc=scatter[i],sx=cx+Math.cos(sc.a)*sc.r*big*.7,sy=cy+Math.sin(sc.a)*sc.r*big*.7;
  items.push({g,x:mix(mix(sx,ox,p1),fx,p3),y:mix(mix(sy,oy,p1),fy,p3),s:mix(mix(.3*u,os,p1),sw,p3),r:mix(mix(sc.tilt,-16,p1),0,p3),al:mix(mix(0,oal,p1),1,p3),front:p3>.5||Math.sin(th)>0})});
 const ring=front=>{const ra=mk*(1-p3);if(ra<=0)return;ctx.save();ctx.translate(cx,cy);ctx.rotate(ROT);ctx.beginPath();ctx.ellipse(0,0,RX*u,RY*u,0,front?0:Math.PI,front?Math.PI:2*Math.PI);
  if(front){ctx.strokeStyle=N;ctx.lineWidth=26*u;ctx.globalAlpha=ra;ctx.stroke()}ctx.strokeStyle=A;ctx.lineWidth=9*u;ctx.globalAlpha=ra*(front?1:.5);ctx.stroke();ctx.restore()};
 const col=g=>g.ch==='i'&&p3<.5?A:C;
 for(const it of items)if(!it.front&&it.al>0)glyph(it.g,it.x,it.y,it.s,it.r,it.al,col(it.g));
 ring(false);
 /* o C grande entra no centro e depois encolhe até virar o primeiro c */
 const c0=items[0],ms0=.82*u,msF=sw*115/560;
 const mcx=mix(cx,c0.x,p3),mcy=mix(cy,c0.y-6*sw,p3),msc=mix(ms0*mix(.15,1,mk),msF,p3);
 ctx.save();ctx.globalAlpha=Math.min(1,mk*1.6)*(1-p3);ctx.translate(mcx,mcy);ctx.scale(msc,msc);ctx.translate(-530,-545);ctx.fillStyle=C;ctx.fill(M);ctx.restore();
 ring(true);
 for(const it of items)if(it.front&&it.al>0)glyph(it.g,it.x,it.y,it.s,it.r,it.al,col(it.g));
 /* pingo âmbar do i e o AI */
 if(dot>0){const r=17*sw*(dot<.7?dot/.7*1.25:mix(1.25,1,(dot-.7)/.3));ctx.globalAlpha=1;ctx.fillStyle=A;ctx.beginPath();ctx.arc(cx+(1009.4-578)*sw,cy+(58-145)*sw,r,0,7);ctx.fill()}
 if(ai>0){ctx.globalAlpha=ai;ctx.fillStyle=A;ctx.font=`600 ${Math.max(10,Math.round(44*sw))}px Sora, Inter, sans-serif`;ctx.textBaseline='alphabetic';const bx=cx+(1136-578)*sw+22*sw,by=cy+(202-145)*sw;ctx.fillText('A',bx,by);ctx.fillText('I',bx+ctx.measureText('A').width+12*sw,by)}
 /* barra de carregamento: 2 s enquanto as letras orbitam */
 const bin=cl(.7,.9,t),bout=cl(2.9,3.2,t),ba=bin*(1-bout);
 if(ba>0){const bw=Math.min(260,W*.5),bh=3,bx=cx-bw/2,by=Math.min(H-48,cy+420*u);
  ctx.globalAlpha=ba;ctx.fillStyle='rgba(242,237,227,.14)';ctx.beginPath();ctx.roundRect(bx,by,bw,bh,bh/2);ctx.fill();
  const f=ease(cl(.9,2.9,t));if(f>0){ctx.fillStyle='rgba(242,237,227,.7)';ctx.beginPath();ctx.roundRect(bx,by,Math.max(bh,bw*f),bh,bh/2);ctx.fill()}}
 ctx.globalAlpha=1;
}
function frame(ms){
 if(!t0)t0=ms;const t=(ms-t0)/1000;draw(t);
 const out=cl(4.7,5.3,t);box.style.opacity=1-out;
 if(out>=1){finish();return}
 raf=requestAnimationFrame(frame);
}
function finish(){cancelAnimationFrame(raf);box.style.opacity=0;document.documentElement.style.overflow='';setTimeout(()=>{box.hidden=true},620);try{sessionStorage.setItem('cg-intro','1')}catch(e){}}
function skip(){if(!box.hidden)t0=performance.now()-4700}
function play(){if(still)return;t0=0;box.hidden=false;box.style.opacity=1;document.documentElement.style.overflow='hidden';size();raf=requestAnimationFrame(frame)}
window.__introDraw=(t)=>{size();draw(t)};
addEventListener('keydown',e=>{if(!box.hidden&&(e.key==='Escape'||e.key===' '||e.key==='Enter'))skip()});
addEventListener('resize',()=>{if(!box.hidden)size()});
let seen=false;try{seen=sessionStorage.getItem('cg-intro')==='1'}catch(e){}
if(!seen)play();
const rp=document.getElementById('replay');if(rp)rp.addEventListener('click',()=>{scrollTo(0,0);play()});
}
