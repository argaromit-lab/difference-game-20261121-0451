const KEY='little-elsewhere-progress-v1';
export function readProgress(){try{return JSON.parse(localStorage.getItem(KEY)||'null');}catch{return null;}}
export function writeProgress(value){try{localStorage.setItem(KEY,JSON.stringify(value));return true;}catch{return false;}}
export function cleanChapter(saved,count,duration){
 const found=Array.isArray(saved?.found)?[...new Set(saved.found.filter(n=>Number.isInteger(n)&&n>=0&&n<count))]:[];
 return {found,remaining:Math.max(0,Math.min(duration,Number.isFinite(saved?.remaining)?saved.remaining:duration)),hints:Math.max(0,Math.min(3,Number.isInteger(saved?.hints)?saved.hints:3)),mistakes:Math.max(0,Math.min(999,Number.isInteger(saved?.mistakes)?saved.mistakes:0)),points:Math.max(0,Math.min(100000,Number.isFinite(saved?.points)?saved.points:0)),completed:found.length===count};
}
