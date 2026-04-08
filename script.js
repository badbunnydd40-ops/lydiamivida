const music = document.getElementById("music")
document.addEventListener("click",()=>{
  if(music && music.paused){
    music.play()
  }
})

function playKiss(){
  const kiss=document.getElementById("kiss")
  if(kiss){
    kiss.play()
  }
}

setTimeout(()=>{
  let intro=document.getElementById("intro")
  if(intro) intro.style.display="none"
},5000)

const startDate = new Date("2026-03-08T00:00:00")
function updateTimer(){
  const timer=document.getElementById("timer")
  if(!timer) return
  const now=new Date()
  const diff=now-startDate
  const days=Math.floor(diff/(1000*60*60*24))
  const hours=Math.floor((diff/(1000*60*60))%24)
  const minutes=Math.floor((diff/(1000*60))%60)
  const seconds=Math.floor((diff/1000)%60)
  timer.innerHTML = days+" días "+hours+" horas "+minutes+" minutos "+seconds+" segundos"
}
setInterval(updateTimer,1000)


const canvas=document.getElementById("stars");
const ctx=canvas.getContext("2d");
let w=canvas.width=window.innerWidth;
let h=canvas.height=window.innerHeight;

const stars=[],hearts=[],numStars=150,numHearts=30;


for(let i=0;i<numStars;i++){
  stars.push({x:Math.random()*w,y:Math.random()*h,radius:Math.random()*1.5,alpha:Math.random(),dx:(Math.random()-0.5)*0.2,dy:(Math.random()-0.5)*0.2});
}


function drawHeart(ctx,x,y,size,color,alpha){
  ctx.save();
  ctx.translate(x,y);
  ctx.scale(size/20,size/20);
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.bezierCurveTo(0,-3, -5,-3, -5,0);
  ctx.bezierCurveTo(-5,3, 0,6, 0,10);
  ctx.bezierCurveTo(0,6,5,3,5,0);
  ctx.bezierCurveTo(5,-3,0,-3,0,0);
  ctx.closePath();
  ctx.fillStyle=`rgba(${color.r},${color.g},${color.b},${alpha})`;
  ctx.fill();
  ctx.restore();
}

for(let i=0;i<numHearts;i++){
  hearts.push({
    x:Math.random()*w,
    y:Math.random()*h,
    size:Math.random()*15+8,
    dy:Math.random()*0.3+0.1,
    alpha:Math.random(),
    color:{r:160,g:82,b:45}
  });
}

function drawStars(){
  for(let s of stars){
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.radius,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,255,200,${s.alpha})`;
    ctx.fill();
    s.x+=s.dx;s.y+=s.dy;
    if(s.x<0||s.x>w)s.dx*=-1;
    if(s.y<0||s.y>h)s.dy*=-1;
  }
}

function drawHearts(){
  for(let h of hearts){
    drawHeart(ctx,h.x,h.y,h.size,h.color,h.alpha);
    h.y-=h.dy;
    h.alpha-=0.002;
    if(h.y<0||h.alpha<=0){
      h.y=window.innerHeight;
      h.alpha=Math.random();
      h.x=Math.random()*w;
    }
  }
}

function animate(){
  ctx.clearRect(0,0,w,h);
  drawStars();
  drawHearts();
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize",()=>{
  w=canvas.width=window.innerWidth;
  h=canvas.height=window.innerHeight;
});


function typeWriter(element,text,speed=40){
  element.innerHTML='';
  element.style.opacity=1;
  let i=0;
  function type(){
    if(i<text.length){
      element.innerHTML+=text.charAt(i);
      i++;
      setTimeout(type,speed);
    }
  }
  type();
}

const cartaElement=document.querySelector('.carta p');
if(cartaElement){
  const fullText=cartaElement.textContent;
  typeWriter(cartaElement,fullText,40);

  
  const canvasCarta=document.createElement('canvas');
  canvasCarta.width=cartaElement.offsetWidth;
  canvasCarta.height=cartaElement.offsetHeight;
  canvasCarta.style.position='absolute';
  canvasCarta.style.top=0;
  canvasCarta.style.left=0;
  canvasCarta.style.pointerEvents='none';
  canvasCarta.style.zIndex=1;
  cartaElement.parentElement.appendChild(canvasCarta);
  const ctxC=canvasCarta.getContext('2d');

  const sparkles=[];
  for(let i=0;i<20;i++){
    sparkles.push({x:Math.random()*canvasCarta.width,y:Math.random()*canvasCarta.height,size:Math.random()*4+2,dy:Math.random()*0.2+0.1,alpha:Math.random()});
  }
  function drawSparkles(){
    ctxC.clearRect(0,0,canvasCarta.width,canvasCarta.height);
    for(let s of sparkles){
      ctxC.beginPath();
      ctxC.arc(s.x,s.y,s.size,0,Math.PI*2);
      ctxC.fillStyle=`rgba(255,200,200,${s.alpha})`;
      ctxC.fill();
      s.y-=s.dy;
      s.alpha-=0.005;
      if(s.y<0||s.alpha<=0){s.y=canvasCarta.height;s.alpha=Math.random();s.x=Math.random()*canvasCarta.width;}
    }
    requestAnimationFrame(drawSparkles);
  }
  drawSparkles();
}