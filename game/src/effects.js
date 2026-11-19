export const particles=[];export function burst(x,y,color='#ffd36b',n=8){for(let i=0;i<n;i++){let a=Math.random()*6.28,s=25+Math.random()*100;particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,t:.35+Math.random()*.5,c:color})}}
export function updateEffects(dt){for(let i=particles.length-1;i>=0;i--){let p=particles[i];p.t-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=35*dt;if(p.t<=0)particles.splice(i,1)}}
export function drawEffects(ctx,cam){for(const p of particles){ctx.globalAlpha=Math.max(0,p.t);ctx.fillStyle=p.c;ctx.fillRect(p.x-cam.x,p.y-cam.y,3,3)}ctx.globalAlpha=1}
