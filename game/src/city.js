export const W=3200,H=2400, ROAD=112, BLOCK=288, STEP=ROAD+BLOCK, OX=70, OY=65;
export const roads=[]; export const buildings=[]; export const parks=[];
// A fixed street grid leaves broad blocks for alleys, courtyards and storefronts.
for(let x=OX;x<W;x+=STEP) roads.push({x:x-OX/2,y:0,w:ROAD,h:H});
for(let y=OY;y<H;y+=STEP) roads.push({x:0,y:y-OY/2,w:W,h:ROAD});
for(let x=OX+ROAD;x<W-120;x+=STEP) for(let y=OY+ROAD;y<H-150;y+=STEP){
 const seed=Math.abs(Math.sin(x*12.3+y*4.7));
 if(seed>.83){parks.push({x:x+12,y:y+14,w:BLOCK-24,h:BLOCK-28});continue}
 const inset=18+seed*16; buildings.push({x:x+inset,y:y+inset,w:BLOCK-inset*2,h:BLOCK-inset*2,color:['#28394b','#354354','#453b50','#3b4d4c'][Math.floor(seed*4)],height:24+seed*50, accent:['#ff557a','#44d8d2','#ffd166'][Math.floor(seed*3)]});
}
// Coastline occupies the eastern edge of the playable map.
export const beach={x:W-410,y:0,w:410,h:H}; export const water={x:W-145,y:0,w:145,h:H};
export function rectHit(x,y,r=12){if(x<8||y<8||x>W-8||y>H-8)return true;if(x>water.x-r)return true;for(const b of buildings)if(x+r>b.x&&x-r<b.x+b.w&&y+r>b.y&&y-r<b.y+b.h)return true;return false}
export function drawCity(c,cx,cy,sw,sh,time){c.fillStyle='#10202b';c.fillRect(0,0,W,H);c.fillStyle='#26323a';for(const r of roads)c.fillRect(r.x,r.y,r.w,r.h);
 // lane dashes
 c.strokeStyle='#d0b77a';c.lineWidth=2;c.setLineDash([18,20]);for(const r of roads){c.beginPath();if(r.w>r.h){c.moveTo(r.x,r.y+r.h/2);c.lineTo(r.x+r.w,r.y+r.h/2)}else{c.moveTo(r.x+r.w/2,r.y);c.lineTo(r.x+r.w/2,r.y+r.h)}c.stroke()}c.setLineDash([]);
 for(const p of parks){c.fillStyle='#224b42';c.fillRect(p.x,p.y,p.w,p.h);c.fillStyle='#31705a';for(let i=0;i<8;i++){let tx=p.x+22+(i*37)% (p.w-44),ty=p.y+25+(i*53)%(p.h-50);c.beginPath();c.arc(tx,ty,10,0,7);c.fill()}}
 for(const b of buildings){c.fillStyle='#0c1721';c.fillRect(b.x+7,b.y+10,b.w,b.h);c.fillStyle=b.color;c.fillRect(b.x,b.y,b.w,b.h);c.fillStyle=b.accent;c.fillRect(b.x+8,b.y+7,b.w-16,3);c.fillStyle='#182b38';for(let xx=b.x+14;xx<b.x+b.w-10;xx+=24)for(let yy=b.y+22;yy<b.y+b.h-8;yy+=28){c.fillRect(xx,yy,8,12);if(Math.sin(xx*yy)>-.15){c.fillStyle='#ffd47a';c.fillRect(xx+2,yy+2,4,7);c.fillStyle='#182b38'}}}
 c.fillStyle='#c9a875';c.fillRect(beach.x,0,beach.w,beach.h);c.fillStyle='#0c5267';c.fillRect(water.x,0,water.w,water.h);c.strokeStyle='rgba(100,222,224,.32)';for(let y=(time*18)%64;y<H;y+=64){c.beginPath();c.moveTo(water.x+10,y);c.lineTo(W-8,y+10);c.stroke()}
 // sidewalks as subtle borders around streets and sparse palms / lights
 c.fillStyle='#66706c';for(const r of roads){if(r.w>r.h){c.fillRect(r.x,r.y,r.w,6);c.fillRect(r.x,r.y+r.h-6,r.w,6)}else{c.fillRect(r.x,r.y,6,r.h);c.fillRect(r.x+r.w-6,r.y,6,r.h)}}
}
