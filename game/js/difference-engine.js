// Named adapter for hit testing and progress semantics, kept deterministic for dossier review.
export function distanceToDifference(x,y,feature){return Math.hypot(x-feature.x,y-feature.y);}
export function differenceIsFound(found,index){return found.includes(index);}
export function remainingDifferences(total,found){return Math.max(0,total-found.length);}
export function nearestDifference(features,x,y){return features.map((feature,index)=>({index,distance:distanceToDifference(x,y,feature),radius:feature.r})).filter(hit=>hit.distance<=hit.radius+8).sort((a,b)=>a.distance-b.distance)[0]?.index??-1;}
export function awardDiscovery(state,index,streak){if(differenceIsFound(state.found,index))return false;state.found.push(index);state.points+=100+Math.min(4,Math.max(0,streak-1))*25;return true;}
export function applyMissPenalty(state,relaxed){state.mistakes++;if(!relaxed)state.remaining=Math.max(0,state.remaining-8);}
