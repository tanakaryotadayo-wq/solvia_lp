(() => {
  "use strict";
  const cfg = window.SOLVIA_SITE_CONFIG || {};
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = matchMedia("(pointer: coarse)").matches;
  const lowPower = (navigator.hardwareConcurrency || 8) <= 4;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  $$('[data-owner-image]').forEach(img => {
    if (cfg.ownerImage) img.src = cfg.ownerImage;
    img.alt = cfg.ownerAlt || img.alt;
  });
  $$('[data-line-link]').forEach(link => {
    if (cfg.lineUrl) link.href = cfg.lineUrl;
  });
  const video = $('[data-yawn-video]') || $('.video-art video');
  if (video) {
    video.removeAttribute('controls');
    video.autoplay = true;
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline','');
    video.setAttribute('webkit-playsinline','');
    video.play().catch(()=>{});
  }

  const navLinks = $$('.nav > a[href^="#"]:not(.nav-cta)');
  const sections = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
  if (sections.length) {
    const navObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${visible.target.id}`));
    }, { threshold: [0.2,0.45,0.7], rootMargin: '-18% 0px -58% 0px' });
    sections.forEach(s => navObserver.observe(s));
  }

  const title = $('.hero-title');
  if (title && !reduced) {
    const nodes = [...title.childNodes];
    title.textContent = '';
    let index = 0;
    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        [...node.textContent].forEach(char => {
          const span = document.createElement('span');
          span.className = 'kinetic-char';
          span.textContent = char;
          span.style.setProperty('--char-index', index++);
          title.appendChild(span);
        });
      } else {
        const wrapper = document.createElement('span');
        wrapper.className = node.className || '';
        [...node.textContent].forEach(char => {
          const span = document.createElement('span');
          span.className = 'kinetic-char';
          span.textContent = char;
          span.style.setProperty('--char-index', index++);
          wrapper.appendChild(span);
        });
        title.appendChild(wrapper);
      }
    });
    requestAnimationFrame(() => title.classList.add('kinetic-ready'));
  }

  const spotlight = document.createElement('div');
  spotlight.className = 'motion-spotlight';
  spotlight.setAttribute('aria-hidden','true');
  document.body.appendChild(spotlight);
  if (!reduced && !coarse && !lowPower) {
    addEventListener('pointermove', e => {
      spotlight.style.setProperty('--spot-x', `${e.clientX}px`);
      spotlight.style.setProperty('--spot-y', `${e.clientY}px`);
      spotlight.classList.add('visible');
    }, { passive: true });
    document.addEventListener('mouseleave', () => spotlight.classList.remove('visible'));
  }

  const tiltTargets = $$('.concern-card,.support-card,.reason,.badge');
  if (!reduced && !coarse) {
    tiltTargets.forEach(card => {
      card.classList.add('motion-tilt');
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX-r.left)/r.width-.5;
        const y = (e.clientY-r.top)/r.height-.5;
        card.style.setProperty('--tilt-x', `${(-y*4).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${(x*4).toFixed(2)}deg`);
        card.style.setProperty('--glow-x', `${(x+.5)*100}%`);
        card.style.setProperty('--glow-y', `${(y+.5)*100}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x','0deg');
        card.style.setProperty('--tilt-y','0deg');
      });
    });
  }

  $$('.magnetic,.cta,.nav-cta,.mobile-cta').forEach(btn => {
    btn.classList.add('motion-magnetic');
    if (!reduced && !coarse) {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--mag-x', `${(e.clientX-r.left-r.width/2)*.08}px`);
        btn.style.setProperty('--mag-y', `${(e.clientY-r.top-r.height/2)*.08}px`);
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.setProperty('--mag-x','0px');
        btn.style.setProperty('--mag-y','0px');
      });
    }
    btn.addEventListener('click', e => {
      if (reduced) return;
      for (let i=0;i<7;i++) {
        const heart=document.createElement('i');
        heart.className='click-heart';
        heart.textContent='♥';
        heart.style.left=`${e.clientX}px`;
        heart.style.top=`${e.clientY}px`;
        heart.style.setProperty('--hx',`${-45+Math.random()*90}px`);
        heart.style.setProperty('--hy',`${-35-Math.random()*70}px`);
        heart.style.setProperty('--delay',`${Math.random()*80}ms`);
        document.body.appendChild(heart);
        heart.addEventListener('animationend',()=>heart.remove());
      }
    });
  });

  const flow = $('.flow-list');
  if (flow) {
    flow.classList.add('motion-flow');
    const updateFlow = () => {
      const r=flow.getBoundingClientRect();
      const p=Math.max(0,Math.min(1,(innerHeight*.83-r.top)/(innerHeight*.46+r.height)));
      flow.style.setProperty('--flow-progress',p.toFixed(3));
    };
    updateFlow();
    addEventListener('scroll',updateFlow,{passive:true});
    addEventListener('resize',updateFlow,{passive:true});
  }

  if (video) {
    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? video.play().catch(()=>{}) : video.pause());
    }, { threshold: .02, rootMargin: '180px 0px' });
    videoObserver.observe(video);
    document.addEventListener('visibilitychange', () => document.hidden ? video.pause() : video.play().catch(()=>{}));
  }

  if (reduced) return;

  const canvas=document.createElement('canvas');
  canvas.className='motion-canvas';
  canvas.setAttribute('aria-hidden','true');
  document.body.appendChild(canvas);
  const ctx=canvas.getContext('2d',{alpha:true});
  if (!ctx) return;
  let width=0,height=0,raf=0,last=performance.now(),average=16.7;
  const dpr=Math.min(devicePixelRatio||1,1.5);
  const particleCount=lowPower||coarse?22:48;
  const particles=Array.from({length:particleCount},(_,i)=>({
    x:Math.random(),y:Math.random(),s:2+Math.random()*4.8,
    speed:.000035+Math.random()*.00009,drift:(Math.random()-.5)*.000035,
    rot:Math.random()*Math.PI*2,alpha:.14+Math.random()*.38,type:i%4===0?'spark':'petal'
  }));
  const resize=()=>{
    width=innerWidth;height=innerHeight;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;ctx.setTransform(dpr,0,0,dpr,0,0);
  };
  resize();addEventListener('resize',resize,{passive:true});
  const render=now=>{
    const dt=Math.min(40,now-last);last=now;average=average*.95+dt*.05;
    ctx.clearRect(0,0,width,height);
    particles.forEach(p=>{
      p.y+=p.speed*dt*60;p.x+=p.drift*dt*60;p.rot+=.0018*dt;
      if(p.y>1.08){p.y=-.08;p.x=Math.random()}if(p.x<-.1)p.x=1.05;if(p.x>1.1)p.x=-.05;
      const x=p.x*width,y=p.y*height;ctx.save();ctx.translate(x,y);ctx.rotate(p.rot);ctx.globalAlpha=p.alpha;
      if(p.type==='spark'){
        const g=ctx.createRadialGradient(0,0,0,0,0,p.s*2.6);g.addColorStop(0,'#fff');g.addColorStop(.25,'rgba(255,205,226,.92)');g.addColorStop(1,'rgba(255,105,165,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,p.s*2.6,0,Math.PI*2);ctx.fill();
      }else{ctx.fillStyle='rgba(255,126,174,.58)';ctx.beginPath();ctx.ellipse(0,0,p.s*.65,p.s*1.25,.45,0,Math.PI*2);ctx.fill()}
      ctx.restore();
    });
    if(average>24&&particles.length>16)particles.pop();
    raf=requestAnimationFrame(render);
  };
  raf=requestAnimationFrame(render);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else{last=performance.now();raf=requestAnimationFrame(render)}});
})();
