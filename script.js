const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const customBtn = document.getElementById('customBtn');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMsg = document.getElementById('modalMsg');
    const closeModal = document.getElementById('closeModal');
    const giftImg = document.getElementById('giftImg');

    yesBtn.addEventListener('click', ()=>{
      modal.classList.add('open');
      modalTitle.textContent = 'Aap ne kaha: Ji Haan! ❤';
      modalMsg.innerHTML = 'Meri khushiyon ka aaghaz aap ke sath — main hamesha aap ka saath dunga.<br><br><em>Ye rahi aap ke liye ek chhoti si tasveer...</em>';
      giftImg.src = 'us1.jpg';
      giftImg.style.display = 'block';
      startConfetti();
    });

    noBtn.addEventListener('click', ()=>{
      yesBtn.click();
    });

    customBtn.addEventListener('click', ()=>{
      const newText = prompt('Naya paighaam likhein (Roman Urdu misal):\nMere liye aap khaas hain. Kya aap meri shareek-e-hayat banengi?');
      if(newText!==null && newText.trim()!==''){
        document.getElementById('proposal').innerHTML = newText.replace(/\n/g,'<br>');
      }
    });

    closeModal.addEventListener('click', ()=>{modal.classList.remove('open'); stopConfetti(); giftImg.style.display='none';});

    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    window.addEventListener('resize', ()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight});

    let confettiActive = false;
    const particles = [];

    function random(min,max){return Math.random()*(max-min)+min}
    function startConfetti(){confettiActive=true; for(let i=0;i<120;i++){particles.push({x:random(0,W),y:random(-H,0),r:random(4,8),d:random(1,3),vx:random(-2,2),vy:random(2,6),color:['#ff7ba9','#ffd06b','#9be7ff','#b8ffa6'][Math.floor(Math.random()*4)]})} animate();}
    function stopConfetti(){confettiActive=false}

    function animate(){if(!ctx) return;ctx.clearRect(0,0,W,H);for(let i=0;i<particles.length;i++){const p=particles[i];p.x+=p.vx; p.y+=p.vy + Math.sin(p.d + Date.now()/500)/5; ctx.beginPath(); ctx.fillStyle=p.color; ctx.fillRect(p.x,p.y,p.r*1.6,p.r); if(p.y>H+20){if(confettiActive){p.x=random(0,W);p.y=random(-20,0)}else{particles.splice(i,1);i--}}} if(confettiActive || particles.length>0) requestAnimationFrame(animate);}

    (function makeHearts(){const container=document.createElement('div');container.className='hearts';document.body.appendChild(container);
      function createHeart(){const el=document.createElement('div');el.className='heart';const size=12+Math.random()*26;el.style.width=size+'px';el.style.height=size+'px';el.style.left=Math.random()*80+'%';el.style.bottom='-40px';el.style.opacity=0.6+Math.random()*0.4;el.style.transform='rotate('+ (Math.random()*60-30) +'deg)';container.appendChild(el);
        const rise = 6+Math.random()*18; el.animate([{transform:'translateY(0) scale(1)',opacity:el.style.opacity},{transform:'translateY(-'+ (200+rise*20) +'px) scale(1.1)',opacity:0}],{duration:4000+Math.random()*3000,iterations:1,easing:'ease-out'}).onfinish = ()=>el.remove();}
      setInterval(createHeart,700);
    })();

    (function personalizeFromURL(){const params = new URLSearchParams(location.search); const name = params.get('name'); const photo = params.get('photo'); if(name){document.getElementById('title').textContent = name + ', kya aap mujh se shaadi karein gi?'} if(photo){document.getElementById('photoImg').src = photo}})();

    window.addEventListener('keydown', (e)=>{
      if(e.key.toLowerCase()==='y') yesBtn.click();
      if(e.key.toLowerCase()==='n') noBtn.click();
    });