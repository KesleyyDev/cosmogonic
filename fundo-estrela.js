/* ---------- céu: nascimento de uma estrela guiado pelo scroll ---------- */
const cv=document.getElementById('sky'),ctx=cv.getContext('2d');
const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
const TAU=Math.PI*2;
let W=0,H=0,DPR=1,stars=[],parts=[],target=0,prog=0,lite=false;
let seed=7;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;
const sm=(a,b,x)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
const mix=(a,b,t)=>a+(b-a)*t;
const mk=(w,h=w)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};

/* sprites pré-renderizados: desenhar imagem é muito mais barato que gradiente por partícula */
function dot(rgb){const c=mk(32),g=c.getContext('2d'),gr=g.createRadialGradient(16,16,0,16,16,16);
 gr.addColorStop(0,`rgba(${rgb},1)`);gr.addColorStop(.16,`rgba(${rgb},.9)`);gr.addColorStop(.42,`rgba(${rgb},.2)`);gr.addColorStop(1,`rgba(${rgb},0)`);
 g.fillStyle=gr;g.fillRect(0,0,32,32);return c}
const DOT={cool:dot('242,237,227'),blue:dot('160,180,225'),warm:dot('236,160,70'),hot:dot('255,232,190')};

function nebula(sz,pal,n,sd,dust){seed=sd;const c=mk(sz),g=c.getContext('2d'),h=sz/2,cl=[];
 for(let i=0;i<8;i++){const a=rnd()*TAU,r=rnd()*.28*sz;cl.push([h+Math.cos(a)*r,h+Math.sin(a)*r*.8])}
 for(let i=0;i<n;i++){const k=cl[i%cl.length],a=rnd()*TAU,r=Math.pow(rnd(),1.5)*sz*.2,x=k[0]+Math.cos(a)*r,y=k[1]+Math.sin(a)*r;
  const rad=sz*(.025+rnd()*.12),p=pal[Math.floor(rnd()*pal.length)],al=.02+rnd()*.055;
  const gr=g.createRadialGradient(x,y,0,x,y,rad);gr.addColorStop(0,`rgba(${p},${al})`);gr.addColorStop(1,`rgba(${p},0)`);g.fillStyle=gr;g.fillRect(x-rad,y-rad,rad*2,rad*2)}
 /* faixas de poeira escura, como nas fotos do Hubble */
 g.globalCompositeOperation='destination-out';
 for(let i=0;i<dust;i++){const a=rnd()*TAU,r=rnd()*sz*.3,x=h+Math.cos(a)*r,y=h+Math.sin(a)*r,rad=sz*(.02+rnd()*.06);
  g.save();g.translate(x,y);g.rotate(rnd()*TAU);g.scale(2.8,.6);const gr=g.createRadialGradient(0,0,0,0,0,rad);
  gr.addColorStop(0,`rgba(0,0,0,${.3+rnd()*.4})`);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(-rad,-rad,rad*2,rad*2);g.restore()}
 g.globalCompositeOperation='destination-in';const m=g.createRadialGradient(h,h,sz*.1,h,h,h);m.addColorStop(0,'#000');m.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=m;g.fillRect(0,0,sz,sz);
 return c}
const NEB_A=nebula(1024,['58,76,124','36,48,82','92,74,118','140,160,210','70,96,150'],520,31,46);
const NEB_B=nebula(768,['232,163,61','196,112,58','140,84,112','242,200,140'],300,57,28);

/* superfície da estrela: granulação (as "bolhas" de plasma) */
const SURF=(()=>{seed=99;const sz=512,c=mk(sz),g=c.getContext('2d'),h=sz/2;
 let gr=g.createRadialGradient(h*.86,h*.82,0,h,h,h);gr.addColorStop(0,'#FFE3AA');gr.addColorStop(.45,'#F6BE62');gr.addColorStop(.8,'#E8A33D');gr.addColorStop(1,'#B8661C');g.fillStyle=gr;g.fillRect(0,0,sz,sz);
 for(let i=0;i<2600;i++){const x=rnd()*sz,y=rnd()*sz,r=sz*(.006+rnd()*.017),l=rnd()<.5,q=g.createRadialGradient(x,y,0,x,y,r);
  q.addColorStop(0,l?'rgba(255,250,232,.11)':'rgba(170,70,18,.075)');q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(x-r,y-r,r*2,r*2)}
 for(let i=0;i<16;i++){const x=rnd()*sz,y=rnd()*sz,r=sz*(.035+rnd()*.06),q=g.createRadialGradient(x,y,0,x,y,r);
  q.addColorStop(0,'rgba(255,252,240,.16)');q.addColorStop(1,'rgba(255,252,240,0)');g.fillStyle=q;g.fillRect(x-r,y-r,r*2,r*2)}
 return c})();
/* raio da coroa e pico de difração */
const strip=(w,h,stops,sym)=>{const c=mk(w,h),g=c.getContext('2d'),gr=g.createLinearGradient(0,0,w,0);for(const [o,col] of stops)gr.addColorStop(o,col);g.fillStyle=gr;g.fillRect(0,0,w,h);
 g.globalCompositeOperation='destination-in';const v=g.createLinearGradient(0,0,0,h);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(.5,'#000');v.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=v;g.fillRect(0,0,w,h);return c};
const RAY=strip(256,16,[[0,'rgba(246,194,115,.9)'],[.35,'rgba(232,163,61,.35)'],[1,'rgba(232,163,61,0)']]);
const SPIKE=strip(512,8,[[0,'rgba(255,240,215,0)'],[.5,'rgba(250,212,150,1)'],[1,'rgba(255,240,215,0)']]);

/* textura do planeta recalculada por quadro (≈90×90 px): luz difusa + faixas + borda de atmosfera */
const PC=mk(8),pcx=PC.getContext('2d');
function shade(pr,L){const s=Math.max(8,Math.ceil(pr*2*DPR));if(PC.width!==s){PC.width=s;PC.height=s}
 const img=pcx.createImageData(s,s),d=img.data,h=s/2;
 for(let j=0;j<s;j++){const ny=(j+.5-h)/h;for(let i=0;i<s;i++){const nx=(i+.5-h)/h,q=nx*nx+ny*ny,o=(j*s+i)*4;if(q>=1)continue;
  const nz=Math.sqrt(1-q),li=nx*L[0]+ny*L[1]+nz*L[2],soft=sm(-.08,.22,li),dif=soft*(.3+.7*Math.max(0,li));
  const band=.5+.5*Math.sin(ny*8.5+Math.sin(nx*2.6+ny*1.3)*.7),rim=Math.pow(1-nz,2.4)*soft;
  d[o]=Math.min(255,20+mix(232,244,band*.55)*dif+230*rim);d[o+1]=Math.min(255,26+mix(163,222,band*.55)*dif+170*rim);d[o+2]=Math.min(255,40+mix(61,190,band*.55)*dif+90*rim);
  d[o+3]=255*Math.min(1,(1-Math.sqrt(q))*h)}}
 pcx.putImageData(img,0,0);return PC}
function radial(x,y,r,st){const g=ctx.createRadialGradient(x,y,0,x,y,r);for(const [o,c] of st)g.addColorStop(o,c);ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2)}

function build(){
 const mobile=W<760,f=lite?.5:1;seed=7;
 stars=[];for(let i=0;i<Math.round((mobile?170:340)*f);i++){const k=rnd();stars.push({x:rnd(),y:rnd(),r:Math.pow(rnd(),3)*1.9+.3,a:rnd()*.55+.25,tw:rnd()*TAU,c:k<.12?'warm':k<.32?'blue':'cool'})}
 parts=[];const N=Math.round((mobile?750:1700)*f);
 for(let i=0;i<N;i++){const ca=rnd()*TAU,cd=Math.pow(rnd(),.55),dr=.45+Math.pow(rnd(),1.5)*3;
  parts.push({cx:Math.cos(ca)*cd*4.4+(rnd()-.5)*.9,cy:Math.sin(ca)*cd*2.9+(rnd()-.5)*.9,ph:rnd()*TAU,dr,dz:(rnd()-.5)*.2*dr,
   s:rnd()*1.4+.6,deb:rnd()<.22,er:2.4+rnd()*.7,blue:rnd()<.35,lag:rnd()})}
}
function size(){DPR=Math.min(lite?1:2,window.devicePixelRatio||1);W=innerWidth;H=innerHeight;cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);ctx.setTransform(DPR,0,0,DPR,0,0);build()}
function onScroll(){const m=document.documentElement.scrollHeight-innerHeight;target=m>0?scrollY/m:0;document.getElementById('bar').style.width=(target*100)+'%';if(still)kick()}

function frame(ms){
 const t=still?40:ms/1000;prog=mix(prog,target,still?.14:.07);perf(ms);const p=prog;
 const mobile=W<760,R=mobile?Math.min(W,H)*.2:Math.min(W,H)*.17;
 const X=mobile?W*.5:W*.68,Y=mobile?H*.27:H*.5;
 /* linha do tempo: nebulosa → colapso → protoestrela com disco e jatos → ignição → estrela */
 const col=sm(.04,.4,p),disk=sm(.26,.52,p),proto=sm(.2,.56,p),jet=sm(.4,.52,p)*(1-sm(.63,.71,p)),
  flash=sm(.62,.69,p)*(1-sm(.69,.84,p)),star=sm(.63,.75,p),blow=sm(.66,.86,p),wave=sm(.65,.85,p),orb=sm(.78,.9,p),gat=sm(.8,.95,p),body=sm(.89,.98,p);
 const TILT=.26,DRT=-.18,cr=Math.cos(DRT),sr=Math.sin(DRT);
 /* órbita do planeta que nasce da poeira que sobrou */
 const OR=mobile?2.25:2.65,PA=2.55+t*.55/Math.pow(OR,1.5),pox=Math.cos(PA)*OR,poy=Math.sin(PA)*OR*TILT;
 const PX=X+(pox*cr-poy*sr)*R,PY=Y+(pox*sr+poy*cr)*R,PR=R*(mobile?.17:.15),pBehind=Math.sin(PA)<0;
 ctx.setTransform(DPR,0,0,DPR,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.clearRect(0,0,W,H);

 /* campo de estrelas com paralaxe */
 const par=p*70;ctx.fillStyle='#F2EDE3';
 for(const s of stars){if(s.r>1.25)continue;ctx.globalAlpha=s.a*(still?1:.7+.3*Math.sin(t*1.1+s.tw*3));ctx.fillRect(s.x*W,((s.y*H-par*(.4+s.r*.3))%H+H)%H,s.r,s.r)}
 ctx.globalCompositeOperation='lighter';
 for(const s of stars){if(s.r<=1.25)continue;ctx.globalAlpha=s.a*(still?1:.65+.35*Math.sin(t*.9+s.tw*3));const z=s.r*5.5,y=((s.y*H-par*(.4+s.r*.3))%H+H)%H;ctx.drawImage(DOT[s.c],s.x*W-z/2,y-z/2,z,z)}

 /* nebulosa: encolhe e gira enquanto colapsa; depois vira resto iluminado */
 const NS=R*mix(11.5,4.4,col)*(1+blow*.3),na=mix(.95,.4,col)*(1-star*.3)*(mobile?.7:1);
 ctx.save();ctx.translate(X,Y);ctx.rotate(t*.012+col*1.1);ctx.globalAlpha=na;ctx.drawImage(NEB_A,-NS/2,-NS*.4,NS,NS*.8);ctx.restore();
 const NB=NS*mix(.8,.62,col);
 ctx.save();ctx.translate(X,Y);ctx.rotate(-t*.017-col*.7);ctx.globalAlpha=na*mix(.35,.9,Math.max(proto,star));ctx.drawImage(NEB_B,-NB/2,-NB*.36,NB,NB*.72);ctx.restore();

 /* núcleo da protoestrela */
 if(proto>0&&star<1){const pr=R*mix(.5,1.5,proto),a=proto*(1-star)*(.75+(still?0:.08*Math.sin(t*2.2)));
  radial(X,Y,R*.62,[[0,`rgba(255,250,236,${a})`],[.25,`rgba(255,226,170,${a*.75})`],[.6,`rgba(240,160,80,${a*.25})`],[1,'rgba(255,200,120,0)']]);
  radial(X,Y,pr*2.4,[[0,`rgba(255,222,165,${a})`],[.12,`rgba(240,150,64,${a*.6})`],[.45,`rgba(150,60,42,${a*.18})`],[1,'rgba(150,60,42,0)']])}

 /* jatos bipolares, perpendiculares ao disco: 3 camadas pra ficarem difusos */
 if(jet>0&&!lite){ctx.save();ctx.translate(X,Y);ctx.rotate(DRT);
  for(const sg of[-1,1])for(const [wd,al] of [[.025,.32],[.07,.12],[.16,.05]]){const L=R*mix(.3,2.3,jet)*(1+(still?0:.05*Math.sin(t*6+sg))),g=ctx.createLinearGradient(0,0,0,sg*L);
   g.addColorStop(0,`rgba(255,232,195,${al*jet})`);g.addColorStop(.35,`rgba(160,180,225,${al*.4*jet})`);g.addColorStop(1,'rgba(160,180,225,0)');
   ctx.globalAlpha=1;ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-R*wd*.3,0);ctx.lineTo(R*wd*.3,0);ctx.lineTo(R*wd,sg*L);ctx.lineTo(-R*wd,sg*L);ctx.closePath();ctx.fill()}
  ctx.restore()}

 /* partículas: nuvem → disco de acreção (órbita kepleriana) → sopradas pela ignição */
 const back=[],front=[],cw0=t*.015;
 for(const q of parts){
  const cw=cw0/(.5+Math.hypot(q.cx,q.cy)*.25),sc=mix(1,.5,col);
  const cx=(q.cx*Math.cos(cw)-q.cy*Math.sin(cw))*sc,cy=(q.cx*Math.sin(cw)+q.cy*Math.cos(cw))*sc;
  let r,keep=1,th,gi=0;
  if(q.deb){r=mix(q.dr,q.er*OR/2.75,blow);th=q.ph+t*.55/Math.pow(r,1.5);
   if(gat>0){gi=sm(0,1,gat*1.4-q.lag*.4);th+=Math.atan2(Math.sin(PA-th),Math.cos(PA-th))*gi+(q.lag-.5)*.35*gi*(1-gi);r=mix(r,OR,gi)+(q.lag-.5)*.3*(1-gi)}}
  else{r=q.dr*(1+blow*blow*3.4);keep=1-blow;th=q.ph+t*.55/Math.pow(r,1.5)}
  const dx=Math.cos(th)*r,dy=Math.sin(th)*r*TILT+q.dz*TILT*(1-blow)*(1-gi);
  const kk=sm(0,1,disk*1.3-q.lag*.3),x=mix(cx,dx,kk),y=mix(cy,dy,kk);
  const heat=kk*Math.max(0,1-(r-1)/2.2)*(1-star*.5);
  const al=(.32+.48*kk)*keep*(q.deb?mix(1,.6,blow)*(1+gi*.6)*(1-body*.95):1);if(al<.02)continue;
  const d={x:X+(x*cr-y*sr)*R,y:Y+(x*sr+y*cr)*R,z:q.s*(1+heat*.7)*4.6,al,spr:heat>.55?DOT.hot:heat>.18||gi>.35?DOT.warm:q.blue?DOT.blue:DOT.cool};
  (kk>.5&&Math.sin(th)<0?back:front).push(d);
 }
 const drawP=l=>{for(const d of l){ctx.globalAlpha=d.al;ctx.drawImage(d.spr,d.x-d.z/2,d.y-d.z/2,d.z,d.z)}};
 /* linha da órbita: a onda de choque se acomoda nela */
 if(orb>0){ctx.globalAlpha=.16*orb;ctx.strokeStyle='#E8C48A';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(X,Y,OR*R,OR*R*TILT,DRT,0,TAU);ctx.stroke()}
 drawP(back);
 if(body>0&&pBehind)planet();

 function planet(){
  /* sombreamento físico: cada pixel da esfera recebe luz conforme o ângulo com a estrela (Lambert).
     atrás da estrela vemos o lado iluminado (cheio); na frente, o lado da noite (novo); nos lados, meio a meio */
  const k=Math.sqrt(1-TILT*TILT),cs=Math.cos(PA),sn=Math.sin(PA),lx=-cs,ly=-sn*TILT,lz=-sn*k;
  const L=[lx*cr-ly*sr,lx*sr+ly*cr,lz],phase=(1+lz)/2,rot=-.55,rw=Math.max(1,PR*.09);
  const ring=(a0,a1)=>{ctx.globalCompositeOperation='source-over';ctx.globalAlpha=body*mix(.35,.9,phase);ctx.strokeStyle='#E8A33D';ctx.lineWidth=rw;ctx.beginPath();ctx.ellipse(PX,PY,PR*1.9,PR*.5,rot,a0,a1);ctx.stroke()};
  ctx.globalCompositeOperation='lighter';radial(PX,PY,PR*2.6,[[0,`rgba(240,176,90,${.28*body*phase})`],[.4,`rgba(232,163,61,${.1*body*phase})`],[1,'rgba(232,163,61,0)']]);
  ring(Math.PI,TAU);
  ctx.globalCompositeOperation='source-over';ctx.globalAlpha=body;ctx.drawImage(shade(PR,L),PX-PR,PY-PR,PR*2,PR*2);
  ring(0,Math.PI);
 }
 /* aglomerado brilhando enquanto a poeira se junta */
 if(gat>0&&body<1){ctx.globalCompositeOperation='lighter';radial(PX,PY,PR*3.2,[[0,`rgba(255,214,150,${.4*gat*(1-body)})`],[.35,`rgba(232,163,61,${.14*gat*(1-body)})`],[1,'rgba(232,163,61,0)']])}
 /* a estrela */
 if(star>0){
  const Rs=R*mix(.3,.6,star)*(1+(still?0:.012*Math.sin(t*1.3)));
  radial(X,Y,Rs*7.5,[[0,`rgba(240,170,78,${.42*star})`],[.12,`rgba(236,163,61,${.22*star})`],[.4,`rgba(200,110,50,${.07*star})`],[1,'rgba(200,110,50,0)']]);
  if(!lite){ctx.save();ctx.translate(X,Y);const n=60;
   for(let i=0;i<n;i++){const a=i/n*TAU+Math.sin(i*12.9)*.05+t*.008,L=Rs*(1.2+.6*(.5+.5*Math.sin(t*.6+i*2.3))*(.55+.45*Math.sin(i*7.1)));
    ctx.rotate(a);ctx.globalAlpha=.16*star;ctx.drawImage(RAY,Rs*.82,-Rs*.045,L,Rs*.09);ctx.rotate(-a)}
   ctx.restore()}
  ctx.globalCompositeOperation='source-over';ctx.globalAlpha=star;
  ctx.save();ctx.beginPath();ctx.arc(X,Y,Rs,0,TAU);ctx.clip();ctx.translate(X,Y);
  ctx.rotate(t*.03);ctx.drawImage(SURF,-Rs*1.1,-Rs*1.1,Rs*2.2,Rs*2.2);ctx.rotate(-t*.03);
  const ld=ctx.createRadialGradient(0,0,Rs*.3,0,0,Rs);ld.addColorStop(0,'rgba(120,40,10,0)');ld.addColorStop(.8,'rgba(170,70,20,.1)');ld.addColorStop(1,'rgba(140,45,10,.32)');ctx.fillStyle=ld;ctx.fillRect(-Rs,-Rs,Rs*2,Rs*2);
  ctx.restore();
  ctx.globalCompositeOperation='lighter';
  radial(X,Y,Rs*1.02,[[0,`rgba(255,226,165,${.4*star})`],[.55,`rgba(242,186,100,${.14*star})`],[1,'rgba(255,220,160,0)']]);
  radial(X,Y,Rs*1.4,[[0,'rgba(255,225,170,0)'],[.66,'rgba(255,225,170,0)'],[.72,`rgba(245,188,100,${.45*star})`],[1,'rgba(232,163,61,0)']]);
  const sp=star*(.24+(still?0:.06*Math.sin(t*.9)));ctx.save();ctx.translate(X,Y);
  for(const [a,l,w] of [[0,4.2,1],[Math.PI/2,4.2,1],[Math.PI/4,2.2,.45],[-Math.PI/4,2.2,.45]]){ctx.rotate(a);ctx.globalAlpha=sp*w;ctx.drawImage(SPIKE,-Rs*l,-Rs*.035,Rs*l*2,Rs*.07);ctx.rotate(-a)}
  ctx.restore();
 }
 /* clarão e onda de choque da ignição */
 if(flash>0)radial(X,Y,R*mix(1,6,flash),[[0,`rgba(255,250,235,${.85*flash})`],[.2,`rgba(255,215,150,${.4*flash})`],[1,'rgba(255,190,110,0)']]);
 if(wave>0&&wave<1){ctx.globalAlpha=(1-wave)*.5;ctx.strokeStyle='#FFE1B4';ctx.lineWidth=1.4;ctx.beginPath();const wr=R*mix(.6,OR,wave);ctx.ellipse(X,Y,wr,wr*TILT,DRT,0,TAU);ctx.stroke()}
 drawP(front);
 if(body>0&&!pBehind)planet();
 ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
 if(!still||Math.abs(prog-target)>.0004)requestAnimationFrame(frame);else running=false;
}
let running=false;const kick=()=>{if(!running){running=true;requestAnimationFrame(frame)}};
let last=0,slow=0;
function perf(ms){if(still)return;if(last&&!lite){const dt=ms-last;slow=dt>27?slow+1:Math.max(0,slow-1);if(slow>24){lite=true;size()}}last=ms}
addEventListener('resize',size);addEventListener('scroll',onScroll,{passive:true});
size();onScroll();running=true;requestAnimationFrame(frame);cv.classList.add('on');
if(still)addEventListener('resize',kick);

