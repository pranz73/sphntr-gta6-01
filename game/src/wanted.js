export function makeWanted(){return{stars:0,quiet:0};}
export function addCrime(w,amount=1){w.stars=Math.min(5,w.stars+amount);w.quiet=0}
export function updateWanted(w,dt,visible){if(!visible)w.quiet+=dt;else w.quiet=0;if(w.quiet>18)w.stars=Math.max(0,w.stars-dt/30)}
