// Three original, independently composed storybook scenes. Shared brush helpers,
// distinct architecture, silhouettes, props and precisely registered differences.
const ink='#37515a';
const p=(d,c,s=ink,w=2)=>`<path d="${d}" fill="${c}" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const e=(x,y,rx,ry,c,s='none',w=2)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c}" stroke="${s}" stroke-width="${w}"/>`;
const r=(x,y,w,h,c,rad=3,s=ink)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rad}" fill="${c}" stroke="${s}" stroke-width="2"/>`;
const l=(x,y,a,b,c=ink,w=2)=>p(`M${x} ${y}L${a} ${b}`,'none',c,w);
const g=(x,y,s,b,angle=0)=>`<g transform="translate(${x} ${y}) rotate(${angle}) scale(${s})">${b}</g>`;
const circle=(x,y,n,c,s='none')=>e(x,y,n,n,c,s);
function star(x,y,n,c){let d='';for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,v=i%2?n*.45:n;d+=`${i?'L':'M'}${x+Math.cos(a)*v} ${y+Math.sin(a)*v}`;}return p(d+'Z',c,ink,1.5);}
function leaf(x,y,s,c,angle=0){return g(x,y,s,p('M0 0Q-35 -24 0 -63Q28 -30 0 0Z',c,ink,1)+l(0,0,0,-50,'#d9e2b477',1.5),angle);}
function plant(x,y,s=1,c='#659778'){let b=l(0,0,0,-92,'#4b725f',3);for(let i=0;i<5;i++)b+=leaf(0,-i*16,.55,c,i%2?-53:53);return g(x,y,s,b);}
function shrub(x,y,s=1){let b='';for(let i=0;i<13;i++)b+=e(Math.sin(i*2.4)*(15+i),-15+Math.cos(i*2.4)*20,18,12,i%3?'#628e76':'#9bb88a','#466f5a55',1);return g(x,y,s,b);}
function flower(x,y,s=1,c='#ecb99d'){let b='';for(let i=0;i<7;i++){const a=i*Math.PI*2/7;b+=e(Math.cos(a)*12,Math.sin(a)*12,9,7,c,'#916b58',1);}return g(x,y,s,b+circle(0,0,7,'#d8a96b',ink));}
function pot(x,y,s=1){return g(x,y,s,plant(0,-25,.75)+p('M-24 -31L-19 0Q0 9 19 0L24 -31Z','#cc9475')+e(0,-30,24,6,'#e6bb93',ink));}
function cat(x,y,scarf='#cf7762',rabbit=false){return g(x,y,1,p('M-24 18Q-63 24 -47 -9','none','#c4a47f',12)+e(0,8,28,27,'#d7b98e',ink)+p(rabbit?'M-23 -22Q-43 -94 -24 -95Q-10 -92 -9 -40Q1 -46 12 -39Q15 -93 31 -91Q45 -85 26 -24Q27 1 2 2Q-23 1 -23 -22Z':'M-26 -23L-24 -52L-8 -40Q5 -45 15 -39L30 -49L29 -23Q25 4 0 3Q-24 2 -26 -23Z','#e8cda4')+circle(-10,-21,2.5,ink)+circle(13,-21,2.5,ink)+p('M-3 -14L5 -14L1 -9Z','#a5786a','none')+p('M-26 -6Q0 8 29 -7L26 7Q0 17 -24 6Z',scarf)+p('M12 6L28 28L11 29L4 8Z',scarf));}
function cloud(x,y,s){return g(x,y,s,p('M-80 10Q-104 -17 -70 -23Q-65 -63 -32 -55Q-9 -70 12 -34Q48 -44 52 -16Q91 -12 77 13Z','#fff1d88c','none'));}
function stonePath(){let b=p('M300 480Q391 465 478 510L585 655H347Q411 563 300 480Z','#dfcfaa','#8f9b7c',1.5);for(let i=0;i<14;i++)b+=e(350+(i*29)%155,501+i*10,20+i%9,5,'#cab995','#a8aa83',1);return b;}
function ground(){let b=p('M0 491Q126 461 251 486Q460 456 635 489Q817 454 900 490V680H0Z','url(#__ground)','none');for(let i=0;i<85;i++){const x=20+(i*83)%860,y=495+(i*31)%166;b+=p(`M${x} ${y}q-2 -10 -7 -13m7 13q4 -13 9 -16`,'none',i%2?'#7b9b76':'#b6ba89',1.5);}return b;}
function drawBrambleglassGarden(c){let b=cloud(140,100,1.2)+cloud(760,230,1.3)+circle(180,124,45,'#f9dda0');b+=p('M0 386Q174 260 342 368Q553 263 900 351V610H0Z','#a9c2a2','none')+ground()+stonePath();
 b+=e(452,492,233,35,'#3f66562b')+p('M247 459V307Q246 164 450 146Q654 164 654 307V459Z','url(#__glass)')+p('M263 453V308Q263 184 450 164Q637 184 637 308V453','none','#e0dbb0',8)+p('M450 150V456M253 302H649M279 229Q451 269 621 229M335 189V464M562 187V464','none','#5e8e78',6)+p('M274 312Q271 231 354 204','none','#f4f2cd77',8);
 b+=g(450,167,1,c?star(0,0,22,'#d18b62'):circle(0,0,21,'#e6bd74',ink));
 b+=p('M404 464V350Q404 304 450 304Q497 304 497 350V464Z',c?'#b56954':'#548e80')+p('M417 347Q450 313 484 347V391H417Z','#d9e5b4')+l(450,330,450,390,'#668671',3)+circle(480,418,5,'#e8c985',ink)+r(392,466,120,17,'#c7b68e')+r(381,485,143,16,'#e1c99c');
 b+=plant(315,440,1.2)+flower(320,328,1.6,c?'#e3a1aa':'#efcf77')+pot(559,451,1.2)+pot(359,463,.8)+shrub(273,470,1.3);
 b+=g(686,130,1,p('M0 0Q-55 -65 -55 -17Q-62 27 -4 12Q-41 72 2 36Q33 75 19 12Q75 24 56 -19Q49 -64 7 -2Z',c?'#df986e':'#93adca')+l(5,-7,4,32,'#486462',6)+p('M4 -7L-5 -24M5 -7L15 -23','none',ink,2));
 b+=g(178,420,1,p('M-33 -27H23L28 25H-27Z',c?'#c37562':'#628c97')+p('M22 -18Q69 -44 43 12L27 15','none','#9db3a0',10)+p('M-31 -14L-67 -43L-66 -17L-29 7Z','#9db3a0')+r(-23,-31,38,7,'#e1cf9b'));
 b+=g(611,492,1,r(-38,-26,77,48,'#bd966e')+l(-35,-10,36,-10,'#e6c694',4)+[0,1,...(c?[]:[2])].map(i=>r(-27+i*23,-44,18,36,i%2?'#d9b36e':'#70968a')).join(''));
 b+=cat(735,490,c?'#6b9baa':'#d8956e',true)+shrub(804,520,1.6)+plant(807,485,1.5)+shrub(100,490,1.2)+pot(98,482,1.2);
 b+=p('M399 570Q410 524 488 530Q560 535 568 574Q531 610 459 600Q413 600 399 570Z','#c9c39b')+e(485,570,68,25,'#86b8a5',ink)+p('M440 571Q483 555 522 571','none','#d8e9bd',2)+(c?'':flower(485,568,1.25,'#edc0a7'));
 b+=g(145,555,1,p('M-35 17Q0 -5 38 7L47 -12M40 8L57 3','none','#a4ad87',8)+circle(-1,-4,25,c?'#a3b890':'#d3aa81',ink)+p('M6 -19Q-24 -12 -13 7Q0 19 10 3Q15 -10 0 -8','none','#7f8d6b',3));for(let i=0;i<10;i++)b+=flower(75+i*80,535+(i%3)*31,.55,i%2?'#e7b39d':'#edcf8e');return b;}
function drawApricotHarbour(c){let b=circle(198,106,46,'#f5d590')+cloud(89,145,1)+cloud(730,60,1.1)+p('M0 345Q150 257 291 338Q440 279 602 334Q760 270 900 333V680H0Z','#9ebcb3','none')+p('M0 370H900V680H0Z','url(#__sea)','none');for(let i=0;i<60;i++){const x=(i*77)%890,y=388+(i*19)%236;b+=p(`M${x} ${y}q20 -5 41 0`,'none',i%3?'#c9ded0':'#689f9a',1.5);}b+=p('M0 538L252 491L900 518V680H0Z','#c7b38b')+p('M0 579L254 529L900 558','none','#9d8d71',3);
 b+=p('M116 476L137 300H192L215 476Z','#f0dbaf')+p('M125 402H207L202 371H130Z','#bf7766')+p('M133 336H197V308H137Z','#cb8e72')+r(136,251,58,51,'#667e77')+r(146,259,39,31,c?'#da9874':'#f4d77d')+p('M124 252L165 222L207 252Z','#ac7560')+r(149,433,28,43,'#688e85');
 b+=p('M341 318L448 254L553 318V478H341Z','#dfc399')+p('M321 321L447 237L578 321L565 338L449 270L335 337Z',c?'#548c8c':'#d78d70')+p('M370 471V376Q370 342 406 342Q441 342 441 376V471Z','#6e9685')+r(466,362,59,64,'#f1d9a4')+r(473,369,45,48,'#b7cdc0')+l(495,369,495,418,'#657e6c',4)+l(473,393,518,393,'#657e6c',4)+pot(550,482,1);
 b+=g(686,133,1,p('M-50 6Q-20 -26 0 -6Q16 -49 58 -34Q42 -7 6 13Q-24 34 -50 6Z',c?'#cf937b':'#fbebc7')+circle(35,-23,3,ink)+p('M54 -29L72 -22L53 -17Z','#d2a267'));
 b+=g(627,406,1,l(0,43,0,-67,'#6e7c6c',5)+p('M-3 -59L-3 28L-63 28Z',c?'#c47e69':'#eee1b7')+p('M6 -52L47 25H6Z','#e7c790')+p('M-76 36H64L40 64H-50Z','#6a8e89')+p('M-59 49H46','none','#cfb684',3));
 b+=p('M241 495L805 480L832 562L242 581Z','#b49271')+p('M241 526L821 514M244 553L826 540','none','#e0c69b',3);for(let i=0;i<10;i++)b+=l(260+i*56,499,279+i*56,565,'#8c7f65',2);for(const x of [253,575,807])b+=p(`M${x} 506V616`,'none','#8e7c60',13)+e(x,506,14,6,'#dbbe8e',ink);
 b+=g(735,511,1,circle(0,0,34,'#f3dec1',ink)+circle(0,0,18,'#b59170',ink)+p('M-29 -18L-16 -10M20 -29L10 -16M29 18L16 10M-20 29L-10 16','none',c?'#578f8b':'#d47763',12));
 b+=g(280,538,1,r(-31,-30,62,60,'#c5a170')+p('M-29 -28L29 28M29 -28L-29 28','none','#987f5e',3)+(c?star(0,0,17,'#7b9d84'):circle(0,0,15,'#e1c68e',ink)));
 b+=g(400,438,1,l(0,50,0,-39,'#6e7d6b',5)+p('M0 -38L42 -25L0 -11Z',c?'#67968c':'#d78d70'))+cat(505,552,c?'#e2b76e':'#749c91');
 b+=g(818,397,1,e(0,22,31,8,'#b7d7c7')+p('M-17 15L-9 -21H9L17 15Z',c?'#e7c78c':'#d68e76')+circle(0,-24,7,'#e8d8ad',ink));b+=plant(79,622,1.3)+shrub(122,620,1.3)+e(422,627,71,15,'#a8ab84')+p('M339 641Q393 603 471 636','none','#ead3a3',3);return b;}
function drawAmberleafLibrary(c){let b=r(0,0,900,680,'url(#__wall)',0,'none');for(let i=0;i<12;i++)b+=l(i*80,0,i*80,570,'#b99d7f',2);b+=p('M0 563H900V680H0Z','#b49b7b','none');for(let i=0;i<11;i++)b+=l(i*90,565,i*70-15,680,'#8f8069',2);b+=e(494,590,275,61,'#bb7e67',ink)+e(494,590,246,45,'#d1b18a',ink)+e(494,590,220,32,'#a9b199',ink);
 b+=r(251,128,166,374,'#866c59',7)+r(263,140,142,350,'#5c6f63',3);for(let row=0;row<4;row++){const y=226+row*76;b+=r(254,y,161,11,'#b99a73');for(let j=0;j<7;j++){let x=267+j*19,h=35+(j*11+row*7)%31;b+=r(x,y-h,15,h,['#d1a078','#9ab092','#719494','#cfb678'][j%4],1)+l(x+4,y-h+5,x+4,y-4,'#e8d4a4',1);}}
 b+=r(293,286,53,69,c?'#cb8c77':'#7c9a86',3)+p('M307 340V303M307 326Q332 305 335 319Q325 338 307 326','none','#edcf98',3);
 b+=p('M482 319V177Q482 108 579 108Q678 108 678 177V319Z','#dbc39b')+p('M495 307V182Q495 123 579 123Q665 123 665 182V307Z','url(#__night)')+l(579,128,579,307,'#b99c76',8)+l(497,231,664,231,'#b99c76',6)+p('M486 113Q462 198 479 328L512 320Q499 236 518 133Z','#9ba88b')+p('M673 113Q696 210 680 328L648 320Q660 226 641 133Z','#9ba88b');b+=circle(580,202,39,'#f2d48c')+(c?'':circle(597,186,35,'#4e7077'));for(let i=0;i<9;i++)b+=l(520+i*16,155+(i%3)*18,514+i*16,172+(i%3)*18,'#b3cfbf77',1.5);
 b+=r(87,348,154,175,'#c7ad89',7)+p('M105 507V422Q105 390 166 390Q223 390 223 422V507Z','#6e6d59')+p('M119 506Q112 466 143 443Q146 475 165 441Q195 477 201 506Z','#dc9c64','none')+p('M141 508Q144 481 163 478Q178 492 179 508Z','#f0cb7c','none')+r(72,342,183,19,'#dfc49b')+r(94,517,145,18,'#aa8d6b');
 b+=circle(166,199,37,'#b48e66',ink)+circle(166,199,29,'#f0d7a3',ink)+p(c?'M166 199L183 185M166 199L163 177':'M166 199V177M166 199L183 208','none',ink,3)+g(167,407,1,c?star(0,0,23,'#bd896b'):flower(0,0,1,'#d6b880'));
 b+=p('M491 502V400Q492 366 524 365H582Q613 368 614 400V502Z',c?'#6e9690':'#c28e77')+r(479,441,23,68,c?'#6e9690':'#c28e77',10)+r(601,441,23,68,c?'#6e9690':'#c28e77',10)+r(503,468,98,36,'#dfbd91',10)+l(509,505,503,538,'#7e745d',9)+l(598,505,604,538,'#7e745d',9)+p('M511 417Q553 388 593 418','none','#e6c9a1',3);
 b+=g(714,394,1,l(0,35,0,112,'#7d8770',7)+e(0,115,34,9,'#b39e78',ink)+p('M-42 -33H32L52 23H-58Z',c?'#a1b5a6':'#efc886')+p('M-49 17H45','none','#efdcb1',3));b+=e(738,546,69,17,'#d6b78d',ink)+l(694,549,690,614,'#937d61',6)+l(780,549,785,614,'#937d61',6)+g(720,533,1,p('M-17 -21H17L12 -2Q0 6 -12 -2Z','#e5d7b3')+p('M17 -18Q36 -18 26 -4H14','none','#b49d7a',4))+circle(755,546,11,'#d6ac78',ink)+(c?'':circle(779,542,11,'#d6ac78',ink));b+=cat(340,552,c?'#b7846d':'#d5b96e')+g(470,591,1,p('M-19 -23H19V28L0 15L-19 28Z',c?'#ce8d76':'#71988b'))+pot(805,575,1.3)+r(40,560,123,19,'#709486')+r(48,545,113,16,'#d1b282');return b;}
export function renderNewWorld(index,changed,prefix){
 const body=[drawBrambleglassGarden,drawApricotHarbour,drawAmberleafLibrary][index-3](changed)+paintWorldDetails(index);
 const defs=`<defs><linearGradient id="__sky" x2="0" y2="1"><stop stop-color="#b9d9d6"/><stop offset="1" stop-color="#f4e3b6"/></linearGradient><linearGradient id="__ground" x2="0" y2="1"><stop stop-color="#acc198"/><stop offset="1" stop-color="#799a7d"/></linearGradient><linearGradient id="__glass" x2="1" y2="1"><stop stop-color="#dce6bf"/><stop offset=".5" stop-color="#9dc3aa"/><stop offset="1" stop-color="#b9cdad"/></linearGradient><linearGradient id="__sea" x2="0" y2="1"><stop stop-color="#91bdb3"/><stop offset="1" stop-color="#558e8b"/></linearGradient><linearGradient id="__wall" x2="0" y2="1"><stop stop-color="#d7bd99"/><stop offset="1" stop-color="#bda585"/></linearGradient><linearGradient id="__night" x2="0" y2="1"><stop stop-color="#476e7a"/><stop offset="1" stop-color="#a2bcab"/></linearGradient></defs>`;
 return `<svg viewBox="0 0 900 680" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${defs}${r(0,0,900,680,'url(#__sky)',0,'none')}${body}</svg>`.replaceAll('__',prefix+'-');
}
function paintWorldDetails(index){
 let b='';
 if(index===3){
  // Delicate copper ribs, garden tools and terracotta make the greenhouse feel tended.
  b+=p('M255 457Q242 298 324 216M640 455Q656 298 577 215','none','#dfd8a2',3);
  for(let i=0;i<7;i++)b+=p(`M${278+i*49} 306v145`,'none','#487a6530',1.5);
  b+=g(91,304,1,l(0,-90,0,0,'#779678',2)+p('M-31 0H31L22 30Q0 41 -22 30Z','#bd8a6b')+plant(0,1,.8)+plant(-11,1,.5)+plant(11,1,.6));
  b+=g(772,356,1,l(0,-141,0,-24,'#597b68',2)+p('M-30 -24H30L20 0Q0 13 -20 0Z','#c59977')+plant(-9,-23,.7)+plant(8,-23,.5));
  b+=r(550,553,134,8,'#bf9a72')+l(567,561,564,599,'#7b8064',5)+l(671,561,674,599,'#7b8064',5)+pot(631,550,.62)+g(565,546,.6,p('M-8 -38H8V12H-8Z','#c9b78f')+p('M-18 -39Q0 -62 18 -39L12 -27H-12Z','#79998a'));
  for(let i=0;i<6;i++)b+=leaf(241+i*6,473-i*12,.4,'#679477',i%2?-45:55);
  b+=p('M206 537Q232 515 254 536','none','#8d9b77',3)+flower(252,536,.65)+flower(232,544,.5,'#e4c882');
 }else if(index===4){
  // Roof scallops, weatherboards, hand-laid stone and a rope coil add seaside wear.
  for(let i=0;i<10;i++){const x=349+i*20,y=311-Math.sin(i/9*Math.PI)*48;b+=p(`M${x} ${y}q6 6 14 0`,'none','#f1c4a480',1.5);}
  for(let i=0;i<6;i++)b+=l(451,344+i*19,547,344+i*19,'#c2a37b',1);
  b+=g(697,570,1,e(0,0,29,10,'none','#d6c69b',3)+e(0,-1,20,6,'none','#d6c69b',3)+e(0,-1,10,3,'none','#d6c69b',3));
  b+=g(352,542,1,r(-19,-25,38,48,'#a7815c',7)+e(0,-25,19,6,'#c8b184',ink)+l(-18,-11,18,-11,'#71816c',3)+l(-18,10,18,10,'#71816c',3));
  b+=p('M60 587Q125 555 179 575','none','#e1c99a',5)+p('M61 589Q124 558 178 577','none','#9e9f78',1.5);
  b+=p('M734 238q14 -18 30 -2q13 -16 29 -4','none','#577c78',3)+p('M266 181q12 -16 24 -1q13 -14 26 0','none','#6a8b7f',2);
  b+=g(165,140,.65,p('M-48 6Q0 -25 48 6','none','#c5d3b8',3));
  for(let i=0;i<16;i++)b+=circle(280+i*31,584+(i%3)*5,2,'#7b896f');
 }else{
  // Cornice, carved hearth, botanical prints, books and plants give the room a lived-in scale.
  b+=p('M22 65H876M22 76H876','none','#937b60',7)+p('M22 66H876','none','#e3c69b',3);
  b+=r(70,114,127,19,'#987e60')+g(95,113,.65,r(-10,-40,20,40,'#73958b')+l(-5,-35,-5,-4,'#e2c99b',2))+g(126,113,.7,r(-13,-47,25,47,'#c4966d')+l(-7,-41,-7,-4,'#f0d2a2',2))+pot(171,113,.55);
  b+=r(735,165,91,132,'#a48a67',4)+r(744,174,73,114,'#e4cfac',1)+g(781,272,.7,plant(0,0,.85)+flower(0,-93,.6,'#c68f79'));
  b+=p('M100 365H229M105 375H224','none','#a98b68',2)+p('M100 518H228','none','#ead0a2',3);
  b+=g(427,514,1,r(-22,-10,44,31,'#b9926f',6)+p('M-22 -9L22 20M22 -9L-22 20','none','#dcc69d',2)+l(-8,-30,-8,-8,'#b49f7c',8)+l(7,-28,7,-6,'#967b61',8));
  for(let i=0;i<50;i++){const a=i*Math.PI*2/50;b+=e(494+Math.cos(a)*233,590+Math.sin(a)*39,3,1.5,'#edcf9c');}
  b+=p('M43 333Q27 243 40 166','none','#6e9177',3);for(let i=0;i<7;i++)b+=leaf(39,201+i*16,.35,'#8fa681',i%2?-50:50);
  b+=g(847,517,.8,r(-22,-42,44,44,'#cab693')+p('M-22 -31H22M-22 -15H22','none','#a49170',2));
 }
 return b;
}
