const KEY='neon-harbor-save';
export function loadSave(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch{return null}}
export function saveGame(p,m){try{localStorage.setItem(KEY,JSON.stringify({cash:p.cash,x:p.x,y:p.y,index:m.index,complete:m.complete}))}catch{}}
export function wipeSave(){localStorage.removeItem(KEY)}
