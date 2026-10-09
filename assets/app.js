(function(){var d=document,de=d.documentElement,$=function(i){return d.getElementById(i)},q=function(s,r){return[].slice.call((r||d).querySelectorAll(s))};
de.classList.add('js');
if(window.IM)q('img[data-i]').forEach(function(i){i.src=IM[i.dataset.i]});
var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -6% 0px'}):null;
function reveal(r){q('.rv:not(.in)',r).forEach(function(e){io?io.observe(e):e.classList.add('in')})}
function route(){var h=(location.hash||'').replace('#/','')||'index',p=$('pg-'+h)||$('pg-index');
q('.page').forEach(function(x){x.hidden=x!==p});d.title=p.dataset.title;var m=d.querySelector('meta[name=description]');if(m)m.content=p.dataset.desc;
q('.top nav a').forEach(function(a){a.getAttribute('href')==='#/'+p.id.slice(3)?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')});
scrollTo(0,0);reveal(p);init(p)}
var done={};
function init(r){if(r.id&&done[r.id])return;if(r.id)done[r.id]=1;seasons(r);gal(r);form(r)}
// header
var hd=q('.top')[0],pb=$('pgb'),t=0,mb=$('mb'),nav=$('nav');
function sc(){t=0;var y=scrollY,h=de.scrollHeight-innerHeight;hd.classList.toggle('s',y>8);pb.style.transform='scaleX('+(h>0?Math.min(1,y/h):0)+')'}
addEventListener('scroll',function(){t||(t=requestAnimationFrame(sc))},{passive:true});sc();
function cl(){nav.classList.remove('open');mb.setAttribute('aria-expanded','false');mb.textContent='Menu'}
mb.onclick=function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o);mb.textContent=o?'Close':'Menu'};
nav.addEventListener('click',function(e){if(e.target.tagName==='A')cl()});
d.addEventListener('keydown',function(e){if(e.key==='Escape')cl()});
$('yr').textContent=new Date().getFullYear();
try{var h=parseInt(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kathmandu',hour:'numeric',hour12:false}).format(new Date()),10)%24,o=$('open');
if(h>=9&&h<21){o.textContent='Open now \u00b7 until 9:00pm';o.classList.add('on')}else o.textContent='Closed \u00b7 opens 9:00am'}catch(e){}
// seasons
var S=[['Basanta','Spring','mid-Mar \u2013 mid-May','Blossom and fresh green. A gentle season for slow walks around the sunken garden.','#d1627f'],['Grishma','Summer','mid-May \u2013 mid-Jul','Long, warm days. Find shade under the pergolas and linger by the pond as the evening light softens.','#d98a1f'],['Barsha','Monsoon','mid-Jul \u2013 mid-Sep','Rain-washed leaves and a deep green hush. The garden at its lushest.','#3f8f7a'],['Sharad','Autumn','mid-Sep \u2013 mid-Nov','Clear skies and warm golden light. Festival season in Kathmandu, and a lovely time to visit.','#c96a2b'],['Hemanta','Early winter','mid-Nov \u2013 mid-Jan','Crisp mornings and soft sun. Bring a shawl, and warm up at Kaiser Cafe.','#a0793a'],['Shishir','Winter','mid-Jan \u2013 mid-Mar','Quiet, cool and still. The pavilions stand out against pale skies.','#5f7fa6']];
var dt=new Date(),k=(dt.getMonth()+1)*100+dt.getDate(),cur=k>=1115||k<115?4:k<315?5:k<515?0:k<715?1:k<915?2:3,B=[];
function sel(i){B.forEach(function(b,j){b.setAttribute('aria-pressed',j===i)});var s=S[i];de.style.setProperty('--accent',s[4]);$('sr').textContent=s[1]+' \u00b7 '+s[2];$('sn').textContent=s[0];$('st2').textContent=s[3]}
function seasons(r){var tb=q('#tabs',r)[0];if(!tb)return;q('#cs',r).forEach(function(c){c.textContent=S[cur][0]});
S.forEach(function(s,i){var b=d.createElement('button');b.type='button';b.textContent=s[0]+(i===cur?' \u00b7 now':'');b.onclick=function(){sel(i)};tb.appendChild(b);B.push(b)});sel(cur)}
// gallery + lightbox
var lb=$('lb'),li=0,last,G=[],xs=0;
function vis(){return G.filter(function(b){return!b.hidden})}
function show(i){var l=vis();li=(i+l.length)%l.length;var im=l[li].firstChild;$('lbi').src=im.currentSrc||im.src;$('lbi').alt=im.alt;$('lbc').textContent=im.alt+' \u00b7 '+(li+1)+' / '+l.length}
function shut(){lb.classList.remove('on');de.style.overflow='';last&&last.focus()}
function gal(r){var m=q('.mas',r)[0];if(!m)return;G=q('button',m);
G.forEach(function(b){b.onclick=function(){last=b;show(vis().indexOf(b));lb.classList.add('on');de.style.overflow='hidden';$('lbx').focus()}});
q('#flt button',r).forEach(function(b){b.onclick=function(){q('#flt button',r).forEach(function(x){x.setAttribute('aria-pressed',x===b)});G.forEach(function(g){g.hidden=b.dataset.f!=='all'&&g.dataset.t!==b.dataset.f})}})}
$('lbx').onclick=shut;$('lbp').onclick=function(){show(li-1)};$('lbn').onclick=function(){show(li+1)};
lb.addEventListener('click',function(e){if(e.target===lb)shut()});
lb.addEventListener('touchstart',function(e){xs=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-xs;if(Math.abs(dx)>50)show(li+(dx<0?1:-1))});
d.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')shut();if(e.key==='ArrowLeft')show(li-1);if(e.key==='ArrowRight')show(li+1)});
// form -> email app
function form(r){var f=q('#f',r)[0];if(!f)return;f.addEventListener('submit',function(e){e.preventDefault();var st=$('st');
if(!f.n.value.trim()||!f.e.value||!f.e.validity.valid){st.textContent='Please enter your name and a valid email address.';return}
var a=d.createElement('a');a.href='mailto:info@gardenofdreams.org.np?subject='+encodeURIComponent('Website inquiry from '+f.n.value)+'&body='+encodeURIComponent('Name: '+f.n.value+'\nEmail: '+f.e.value+'\nPhone: '+f.p.value+'\n\n'+f.m.value);
d.body.appendChild(a);a.click();a.remove();st.textContent='Opening your email app. If nothing opens, write to info@gardenofdreams.org.np.'})}
if($('pg-index')){addEventListener('hashchange',route);route()}else{reveal();init(d)}
})();
