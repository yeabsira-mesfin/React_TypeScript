export function reviewMetrics(gold:string[],found:string[]){
  const g=new Set(gold);
  const f=new Set(found);
  const tp=[...f].filter(x=>g.has(x)).length;
  const precision=f.size?tp/f.size:0;
  const recall=g.size?tp/g.size:0;
  const f1=precision+recall?2*precision*recall/(precision+recall):0;
  return {truePositives:tp,precision:Number(precision.toFixed(2)),recall:Number(recall.toFixed(2)),f1:Number(f1.toFixed(2))};
}
