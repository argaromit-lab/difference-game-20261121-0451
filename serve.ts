import {createServer} from 'node:http';
import {readFileSync,statSync} from 'node:fs';
import {resolve,extname,sep} from 'node:path';
const root=resolve(import.meta.dirname,'game');
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg'};
const port=Number(process.env.PORT||8085);
createServer((req,res)=>{
 try{const pathname=decodeURIComponent(new URL(req.url||'/','http://localhost').pathname),file=resolve(root,'.'+pathname+(pathname.endsWith('/')?'index.html':''));if(!file.startsWith(root+sep)||!statSync(file).isFile())throw Error('Not found');res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(readFileSync(file));}catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Little Elsewhere: http://127.0.0.1:${port}`));
