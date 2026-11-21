import {cpSync,mkdirSync,writeFileSync,chmodSync,readdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {buildDossier} from './vendor/makefun-game.ts';

const source=import.meta.dirname;
const output=resolve(process.env.MAKEFUN_OUTPUT_DIR||'/output');
mkdirSync(output,{recursive:true});
for(const directory of ['game','screenshots']){
 cpSync(join(source,directory),join(output,directory),{recursive:true});
}
const dossier=buildDossier(output,{
 text_max_bytes:163840,
 screenshots:{max:4,max_bytes:262144},
 game_max_files:993,
 game_max_bytes:50331648,
 game_path_max_bytes:1000
});
if(dossier.length>1572864)throw Error('Dossier exceeds the competition limit.');
writeFileSync(join(output,'dossier.json'),dossier,{mode:0o644});
function readable(directory:string){chmodSync(directory,0o755);for(const entry of readdirSync(directory,{withFileTypes:true})){const path=join(directory,entry.name);if(entry.isDirectory())readable(path);else chmodSync(path,0o644);}}
readable(output);
console.log(`Little Elsewhere: game, screenshots and deterministic dossier (${dossier.length} bytes) ready.`);
