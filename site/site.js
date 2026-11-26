/* ---------- Contato da empresa: trocar aqui quando o número e o e-mail existirem ----------
   whatsapp: só dígitos com DDI e DDD, ex.: '5515999999999'. Vazio = o WhatsApp abre para a pessoa escolher o contato.
   email: ex.: 'contato@cosmogonic.space'. Vazio = aparece "a definir". */
const CONFIG={whatsapp:'5515997229580',email:'contato@cosmogonic.space'};

{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const still=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- textos em inglês (o português está no HTML) ---------- */
const EN={
 skip:'Skip to content',navAria:'Sections',nav1:'Services',nav2:'How we work',nav3:'Work',nav4:'About us',nav5:'Contact',navCta:'Contact',
 h1:'For small businesses held together by WhatsApp and spreadsheets.',
 lead:'We build <strong>websites, internal systems, AI automation and marketing</strong> that move your business off personal chats, loose spreadsheets and a website nobody updates.',
 pedidoLeg:'What does your business need?',sv1:'a website',sv2:'a system',sv3:'automation',sv4:'AI for customer service',sv5:'marketing',sv6:'consulting',sv7:'not sure yet',
 verServ:'See what each service includes',onde:'Kesley Doles and Pedro Maciel · Sorocaba, Brazil · We work in English and Portuguese',
 h2antes:'Most small businesses start out like this.',
 f1:'orders come in on a personal WhatsApp',f2:'only one person knows how to use the spreadsheet',f3:'the website still has the old phone number',f4:'every quote is put together by hand',
 f5:'appointments live in a paper notebook',f6:'customer messages wait until the next day',f7:'the monthly report takes a whole day',f8:'stock is checked by eye',
 fecho1:'Each piece works on its own, and someone has to remember all of it.',fecho2:'Our job is to bring those pieces into one system that runs without depending on anyone’s memory.',
 h2serv:'What we do',servLead:'Six services, on their own or together. Most projects start with one, and the rest comes in when it makes sense.',
 s1n:'Websites',s1t:'A site that explains what you do on one screen and sends visitors straight to your WhatsApp or inbox. Fast on phones, found on Google, and easy for you to update yourself.',
 s1e:'<b>For example:</b> a clinic’s page with its treatments, address and a book-now button.',
 s2n:'Systems',s2t:'Customers, scheduling, orders and stock in one place, built around the way your team already works. No bending the business to fit off-the-shelf software.',
 s2e:'<b>For example:</b> online booking that shows open slots and tells the front desk when someone books.',
 s3n:'Automation',s3t:'The things someone does by hand every day start happening on their own: reminders, invoices, reports, copying data from one place to another.',
 s3e:'<b>For example:</b> an appointment reminder that reaches the customer a day before, without anyone sending it.',
 s4n:'AI for customer service',s4t:'An assistant that answers the questions you hear every day, sorts incoming messages and hands your team whatever needs a person.',
 s4e:'<b>For example:</b> answering opening hours and payment options at 11 p.m., and leaving the rest noted for the morning.',
 s5n:'Marketing',s5t:'Ads and content measured end to end, so you know where every lead came from and what it cost.',
 s5e:'<b>For example:</b> a Google campaign for people searching for your service in your city.',
 s6n:'Consulting',s6t:'We look at your operation from the outside and tell you what to build first, and what isn’t worth building.',
 s6e:'<b>For example:</b> one conversation about how orders arrive today and where they get lost.',
 pedir:'I want this',
 h2jeito:'How we work',
 j1n:'You talk to the people who build it.',j1t:'No account manager in between. Whoever answers your message is the one who will design and code the project.',
 j2n:'We understand before we propose.',j2t:'First we ask how the work happens today: who answers, where things get written down, what falls through the cracks. The proposal comes after that.',
 j3n:'We deliver in parts.',j3t:'You see each part working as soon as it is ready and tell us what to adjust, instead of waiting for everything at the end.',
 h2trab:'Work',trabLead:'Our first two projects are being delivered right now. They will show up here, with a link and what changed for each client, as soon as they go live.',
 quadro:'The site screenshot goes here on delivery.',status:'Being delivered',
 o1:'Website with a simple internal system. Client name, link and results go up once the project is published.',
 o2:'Website with a simple internal system. Client name, link and results go up once the project is published.',
 h2nos:'About us',
 n1:'Cosmogonic is a two-partner studio. We both build: we talk to clients, design and code every project from start to finish.',
 n2:'We are based in Sorocaba, Brazil, and work with businesses anywhere, in English or Portuguese.',
 n3:'<i>Cosmogony</i> is the story of how a universe takes shape. That is what we do with a business: take what is scattered and organize it until it runs on its own.',
 h2cont:'Tell us what needs fixing.',contLead:'A few lines are enough. The message comes out ready for Cosmogonic’s WhatsApp, and one of the two of us will reply.',
 lNome:'Your name',eNome:'Add your name so we know who we are talking to.',lEmp:'Company',opc:'(optional)',lServ:'What you need',lServOp:'(pick as many as you like)',
 m1:'Website',m2:'System',m3:'Automation',m4:'AI for customer service',m5:'Marketing',m6:'Consulting',m7:'Not sure yet',
 lCtx:'How it works today and what you want to change',phCtx:'E.g.: orders come in over WhatsApp and we copy them into a spreadsheet. I want one place to see everything.',
 eCtx:'Tell us in one sentence how things work today, even a short one.',enviar:'Prepare message',
 hPronto:'Your message is ready.',pPronto:'Check the text. The button opens Cosmogonic’s WhatsApp with it filled in; just hit send.',
 abrirZap:'Open in WhatsApp',copiar:'Copy text',editar:'Edit the message',direto:'Or write to us directly:',rodape:'Sorocaba, SP, Brazil',replay:'Replay intro'
};
/* mensagens montadas pelo script, nos dois idiomas */
const M={
 pt:{prep:'Preparando a mensagem…',falta1:'Falta um campo: ',falta2:'Faltam 2 campos: ',e:' e ',fNome:'seu nome',fCtx:'como é hoje',
  pronto:'Mensagem pronta. Confira o texto abaixo.',copiado:'Texto copiado. Cole no WhatsApp ou no e-mail.',
  semCopia:'Não deu para copiar automaticamente. Selecione o texto da mensagem e copie à mão.',
  oi:'Olá, Cosmogonic! Meu nome é',de:'da',preciso:'Preciso de:',hoje:'Como é hoje:',
  chegada:n=>`Você veio do site <b>${n}</b>. Ele foi feito por nós.`,
  tbd:'a definir',zapTbd:'WhatsApp da empresa',emailTbd:'e-mail da empresa',
  serv:{site:'site',sistema:'sistema',automacao:'automação',ia:'IA no atendimento',marketing:'marketing',consultoria:'consultoria','nao-sei':'ainda não sei'},
  title:'Cosmogonic AI · sites, sistemas e automação para empresas',
  desc:'Estúdio de Sorocaba (SP) que faz site, sistema, automação com IA, marketing e consultoria para pequenas e médias empresas. Atendemos em português e inglês.',
  p1:'Projeto 01',p2:'Projeto 02'},
 en:{prep:'Preparing your message…',falta1:'One field is missing: ',falta2:'Two fields are missing: ',e:' and ',fNome:'your name',fCtx:'how it works today',
  pronto:'Message ready. Check the text below.',copiado:'Text copied. Paste it into WhatsApp or an email.',
  semCopia:'Couldn’t copy automatically. Select the message text and copy it by hand.',
  oi:'Hi, Cosmogonic! My name is',de:'from',preciso:'I need:',hoje:'How it works today:',
  chegada:n=>`You came from <b>${n}</b>. We built that site.`,
  tbd:'coming soon',zapTbd:'Company WhatsApp',emailTbd:'Company email',
  serv:{site:'website',sistema:'system',automacao:'automation',ia:'AI for customer service',marketing:'marketing',consultoria:'consulting','nao-sei':'not sure yet'},
  title:'Cosmogonic AI · websites, systems and automation for businesses',
  desc:'Sorocaba (Brazil) studio building websites, systems, AI automation, marketing and consulting for small and mid-sized businesses. We work in Portuguese and English.',
  p1:'Project 01',p2:'Project 02'}
};

/* ---------- idioma ---------- */
let lang='pt';const PT={},PTH={},PTA={},PTP={};
$$('[data-i]').forEach(e=>PT[e.dataset.i]=e.textContent);
$$('[data-i-html]').forEach(e=>PTH[e.dataset.iHtml]=e.innerHTML);
$$('[data-i-aria]').forEach(e=>PTA[e.dataset.iAria]=e.getAttribute('aria-label'));
$$('[data-i-ph]').forEach(e=>PTP[e.dataset.iPh]=e.getAttribute('placeholder'));
function setLang(l,save){
 lang=l;const en=l==='en';
 $$('[data-i]').forEach(e=>{const k=e.dataset.i,v=en?EN[k]:PT[k];if(v!=null)e.textContent=v});
 $$('[data-i-html]').forEach(e=>{const k=e.dataset.iHtml,v=en?EN[k]:PTH[k];if(v!=null)e.innerHTML=v});
 $$('[data-i-aria]').forEach(e=>{const k=e.dataset.iAria,v=en?EN[k]:PTA[k];if(v!=null)e.setAttribute('aria-label',v)});
 $$('[data-i-ph]').forEach(e=>{const k=e.dataset.iPh,v=en?EN[k]:PTP[k];if(v!=null)e.setAttribute('placeholder',v)});
 document.documentElement.lang=en?'en':'pt-BR';document.title=M[l].title;
 const md=document.querySelector('meta[name="description"]');if(md)md.content=M[l].desc;
 const h3=$$('.obra h3');if(h3[0])h3[0].textContent=M[l].p1;if(h3[1])h3[1].textContent=M[l].p2;
 $$('.idioma button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.l===l)));
 contatos();chegada();if(montada)montar();$('#aviso').textContent='';$('#aviso2').textContent='';
 if(save)try{localStorage.setItem('cg-lang',l)}catch(e){}
}
$$('.idioma button').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.l,true)));

/* ---------- header que compacta ---------- */
{const b=$('.brand'),t=$('.topo'),f=()=>{b.classList.toggle('compact',scrollY>80);t.classList.toggle('rolou',scrollY>24)};addEventListener('scroll',f,{passive:true});f()}

/* ---------- seção atual no menu ---------- */
{const links=$$('.menu a'),secs=links.map(a=>$(a.getAttribute('href')));let raf=0;
 const f=()=>{raf=0;const mid=innerHeight*.5;let k=-1;secs.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<=mid)k=i});
  links.forEach((a,i)=>i===k?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current'))};
 addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(f)},{passive:true});f()}

/* ---------- contato da empresa ---------- */
function zapUrl(txt){return 'https://wa.me/'+(CONFIG.whatsapp||'')+(txt?'?text='+encodeURIComponent(txt):'')}
function contatos(){
 const c=$('#contatos'),m=M[lang];c.textContent='';
 const item=(ok,href,txt,tbd)=>{if(ok){const a=document.createElement('a');a.href=href;a.textContent=txt;if(href.startsWith('http')){a.target='_blank';a.rel='noopener'}return a}
  const s=document.createElement('span');s.className='reservado';s.textContent=tbd+' · '+m.tbd;return s};
 const n=CONFIG.whatsapp,fmt=n?'+'+n.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/,'$1 ($2) $3-$4'):'';
 c.append(item(!!n,zapUrl(),fmt,m.zapTbd),document.createTextNode('  ·  '),item(!!CONFIG.email,'mailto:'+CONFIG.email,CONFIG.email,m.emailTbd));
}

/* ---------- chegada pelo rodapé de um cliente (?de=slug) ---------- */
let origem=null;
try{const de=new URLSearchParams(location.search).get('de');if(de){const o=$$('.obra').find(o=>o.dataset.slug===de);if(o){origem=o;o.classList.add('destaque')}}}catch(e){}
function chegada(){const el=$('#chegada');if(!origem){el.classList.remove('on');return}el.innerHTML=M[lang].chegada(origem.dataset.nome.replace(/[<>&]/g,''));el.classList.add('on')}

/* ---------- escolher serviço leva ao formulário já marcado ---------- */
function pedir(s){
 const box=$(`.marca input[value="${s}"]`);if(box)box.checked=true;
 const f=$('#form');if(f.hidden){$('#pronto').classList.remove('on');f.hidden=false}
 $('#contato').scrollIntoView({behavior:still?'auto':'smooth'});
 setTimeout(()=>$('#nome').focus({preventScroll:true}),still?0:650);
}
$$('[data-s]').forEach(b=>b.addEventListener('click',()=>pedir(b.dataset.s)));

/* ---------- colapso: as frases soltas caem na estrela ---------- */
if(!document.documentElement.classList.contains('estatico')){
 const sec=$('#antes'),frags=$$('.frag'),fecho=$('#fecho'),h=$('#h-antes');let base=[],W=0,H=0,raf=0;
 const cl=x=>Math.max(0,Math.min(1,x)),ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
 function medir(){W=innerWidth;H=innerHeight;frags.forEach(f=>f.style.transform='none');
  base=frags.map(f=>{const r=f.getBoundingClientRect(),pr=f.offsetParent.getBoundingClientRect();return{x:r.left-pr.left+r.width/2,y:r.top-pr.top+r.height/2}});draw()}
 function draw(){raf=0;
  const r=sec.getBoundingClientRect(),run=r.height-H,p=run>0?cl(-r.top/run):0;
  const mobile=W<760,sx=mobile?W*.5:W*.68,sy=mobile?H*.27:H*.5;
  frags.forEach((f,i)=>{const t=ease(cl((p-.12-i*.035)/.5)),b=base[i];if(!b)return;
   const dx=(sx-b.x)*t,dy=(sy-b.y)*t,s=1-.85*t;
   f.style.transform=`translate(${dx.toFixed(1)}px,${dy.toFixed(1)}px) scale(${s.toFixed(3)})`;
   f.style.opacity=(1-Math.pow(t,2.2)).toFixed(3);f.style.filter=t>.02?`blur(${(t*5).toFixed(1)}px)`:'none'});
  const o=cl((p-.62)/.18);fecho.style.opacity=o.toFixed(3);fecho.style.transform=`translateY(${((1-o)*24).toFixed(1)}px)`;
  h.style.opacity=(1-cl((p-.55)/.2)*.75).toFixed(3);
 }
 const ask=()=>{if(!raf)raf=requestAnimationFrame(draw)};
 addEventListener('scroll',ask,{passive:true});addEventListener('resize',()=>requestAnimationFrame(medir));
 (document.fonts&&document.fonts.ready||Promise.resolve()).then(medir);medir();
}

/* ---------- formulário ---------- */
/* rola até o campo deixando o rótulo visível abaixo do menu fixo, depois foca */
function irPara(el){
 const alvo=el.closest('.campo')||el,topo=$('.topo').getBoundingClientRect().bottom;
 const y=alvo.getBoundingClientRect().top+scrollY-topo-24;
 scrollTo({top:Math.max(0,y),behavior:still?'auto':'smooth'});el.focus({preventScroll:true});
}
const form=$('#form'),aviso=$('#aviso'),pronto=$('#pronto'),btn=$('#enviar');let montada=false,texto='';
const campos={nome:$('#nome'),contexto:$('#contexto')},erros={nome:$('#e-nome'),contexto:$('#e-ctx')};
function marcar(k,bad){campos[k].setAttribute('aria-invalid',String(bad));erros[k].classList.toggle('on',bad)}
Object.keys(campos).forEach(k=>campos[k].addEventListener('input',()=>{if(campos[k].value.trim())marcar(k,false)}));
function montar(){
 const m=M[lang],nome=campos.nome.value.trim(),emp=$('#empresa').value.trim(),ctx=campos.contexto.value.trim();
 const sv=$$('.marca input:checked').map(i=>m.serv[i.value]);
 texto=`${m.oi} ${nome}${emp?` ${m.de} ${emp}`:''}.`+(sv.length?`\n\n${m.preciso} ${sv.join(', ')}.`:'')+`\n\n${m.hoje}\n${ctx}`;
 $('#previa').textContent=texto;$('#zap').href=zapUrl(texto);montada=true;
}
form.addEventListener('submit',e=>{
 e.preventDefault();const m=M[lang],falta=[];
 [['nome',m.fNome],['contexto',m.fCtx]].forEach(([k,n])=>{const bad=!campos[k].value.trim();marcar(k,bad);if(bad)falta.push(n)});
 if(falta.length){aviso.className='aviso erro';aviso.textContent=(falta.length>1?m.falta2:m.falta1)+falta.join(m.e)+'.';irPara(campos[!campos.nome.value.trim()?'nome':'contexto']);return}
 aviso.className='aviso';aviso.textContent=m.prep;btn.disabled=true;btn.setAttribute('aria-busy','true');
 setTimeout(()=>{
  montar();btn.disabled=false;btn.removeAttribute('aria-busy');aviso.textContent='';
  form.hidden=true;pronto.classList.add('on');$('#aviso2').className='aviso';$('#aviso2').textContent=m.pronto;
  irPara(pronto);
 },still?0:450);
});
$('#copiar').addEventListener('click',async()=>{
 const a=$('#aviso2'),m=M[lang];
 try{await navigator.clipboard.writeText(texto);a.className='aviso';a.textContent=m.copiado}
 catch(err){a.className='aviso erro';a.textContent=m.semCopia;const r=document.createRange();r.selectNodeContents($('#previa'));const s=getSelection();s.removeAllRanges();s.addRange(r)}
});
$('#editar').addEventListener('click',()=>{pronto.classList.remove('on');form.hidden=false;montada=false;irPara(campos.contexto)});

/* ---------- idioma inicial: ?lang=en, escolha salva, ou o do navegador ---------- */
let inicial='pt';
try{const q=new URLSearchParams(location.search).get('lang'),s=localStorage.getItem('cg-lang');inicial=q==='en'||q==='pt'?q:s||(/^pt/i.test(navigator.language)?'pt':'en')}catch(e){}
if(inicial==='en')setLang('en');else{contatos();chegada()}
}
