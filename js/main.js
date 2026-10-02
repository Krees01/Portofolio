(function(){
var $=function(s){return document.querySelector(s)},all=function(s){return [].slice.call(document.querySelectorAll(s))};
var RM=matchMedia("(prefers-reduced-motion:reduce)").matches;

var pc=$("#pc"),n=0,iv=setInterval(function(){n+=RM?100:Math.ceil(Math.random()*9);if(n>=100){n=100;clearInterval(iv);setTimeout(function(){$("#load").classList.add("off")},250)}pc.textContent=n},60);

var tp=["K","R","I","S","T","A","M","A"],bt=["K","R","E","E","S","0","1"];
tp.forEach(function(c,i){
var a=document.createElement("span");a.textContent=c;a.style.setProperty("--i",i);if(c==="-")a.className="gap";$("#top").appendChild(a);
var d=document.createElement("span");if(c===bt[i]&&c!=="-"){d.className="m";d.style.setProperty("--i",i)}$("#bars").appendChild(d);
var u=document.createElement("span");u.textContent=bt[i];u.style.setProperty("--i",i);if(c==="-")u.className="gap";$("#bot").appendChild(u);
});

var roles=["Computer Science Undergraduate","Full-Stack & Mobile Developer","AIoT Enthusiast"],ri=0,ci=0,del=false,ty=$("#ty");
function type(){var w=roles[ri];if(RM){ty.textContent=roles.join(" · ");return}
ci+=del?-1:1;ty.textContent=w.slice(0,ci);var t=del?35:70;
if(!del&&ci===w.length){del=true;t=1400}else if(del&&ci===0){del=false;ri=(ri+1)%roles.length;t=300}
setTimeout(type,t)}
setTimeout(type,2600);

var G=[
    ["Programming Languages",["JavaScript","TypeScript","Python","PHP","Java","C","C++","SQL"]],
    ["Mobile",["React Native","Flutter","Android Development"]],
    ["Backend",["Laravel","Node.js","NestJS","Express.js"]],
    ["Frontend",["Vue.js","React","Tailwind CSS"]],
    ["Database",["MySQL","PostgreSQL","SQLite"]]
];
var mq=[];G.forEach(function(g,gi){
var d=document.createElement("div");d.className="sk rv";d.style.setProperty("--d",gi*.08+"s");
d.innerHTML="<b></b><div class='chips'></div>";d.firstChild.textContent=g[0];
g[1].forEach(function(s){var c=document.createElement("span");c.className="chip";c.textContent=s;d.lastChild.appendChild(c);mq.push(s)});
$("#sk").appendChild(d)});
$("#mq").innerHTML=mq.concat(mq).map(function(s){return "<span>"+s.replace(/&/g,"&amp;")+"</span>"}).join("");

function count(el){var t=+el.dataset.n,s=0;var f=function(){s++;el.textContent=Math.round(t*s/30);if(s<30)requestAnimationFrame(f)};f()}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.15});
all(".rv").forEach(function(e){io.observe(e)});
var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){all("[data-n]").forEach(function(b){RM?b.textContent=b.dataset.n:count(b)});so.disconnect()}})});
so.observe($(".stats"));

var secs=all("section"),links=all("nav a");
function sc(){var h=document.documentElement,mx=h.scrollHeight-innerHeight;$("#prog").style.width=(scrollY/mx*100)+"%";
var tl=$("#tl"),r=tl.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.6-r.top)/r.height));tl.style.setProperty("--h",p*100+"%");
var cur="";secs.forEach(function(s){if(s.getBoundingClientRect().top<innerHeight*.4)cur=s.id});
links.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+cur)})}
addEventListener("scroll",sc,{passive:true});sc();

var cur=$("#cur");
addEventListener("pointermove",function(e){cur.style.transform="translate("+e.clientX+"px,"+e.clientY+"px)";mx=e.clientX;my=e.clientY},{passive:true});
if(!RM){
all(".tilt").forEach(function(c){
c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
c.style.setProperty("--mx",x*100+"%");c.style.setProperty("--my",y*100+"%");
c.style.transform="perspective(700px) rotateX("+(.5-y)*8+"deg) rotateY("+(x-.5)*10+"deg) translateY(-3px)"});
c.addEventListener("pointerleave",function(){c.style.transform=""})});
all(".mg").forEach(function(b){
b.addEventListener("pointermove",function(e){var r=b.getBoundingClientRect();b.style.transform="translate("+(e.clientX-r.left-r.width/2)*.25+"px,"+(e.clientY-r.top-r.height/2)*.35+"px)"});
b.addEventListener("pointerleave",function(){b.style.transform=""})})}

$("#th").onclick=function(){var d=document.documentElement,dark=d.dataset.theme?d.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;d.dataset.theme=dark?"light":"dark";col()};

var cv=$("#bg"),cx=cv.getContext("2d"),W,H,P=[],mx=-999,my=-999,rgb="76,195,205";
function col(){var c=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();var h=c.replace("#","");rgb=parseInt(h.slice(0,2),16)+","+parseInt(h.slice(2,4),16)+","+parseInt(h.slice(4,6),16)}
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;var k=Math.min(70,Math.floor(W*H/18000));P=[];for(var i=0;i<k;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4})}
function dr(){cx.clearRect(0,0,W,H);
for(var i=0;i<P.length;i++){var a=P[i];a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;
var dx=a.x-mx,dy=a.y-my,dm=Math.sqrt(dx*dx+dy*dy);if(dm<130){a.x+=dx/dm*1.2;a.y+=dy/dm*1.2}
cx.fillStyle="rgba("+rgb+",.55)";cx.beginPath();cx.arc(a.x,a.y,2,0,6.3);cx.fill();
for(var j=i+1;j<P.length;j++){var b=P[j],ex=a.x-b.x,ey=a.y-b.y,d=Math.sqrt(ex*ex+ey*ey);
if(d<130){cx.strokeStyle="rgba("+rgb+","+(.22*(1-d/130))+")";cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke()}}}
requestAnimationFrame(dr)}
col();rs();addEventListener("resize",rs);if(!RM)dr();
})();