import {useMemo,useState} from 'react';
import {CheckCircle2,FileCode2,GitPullRequest,SearchCheck,Stethoscope} from 'lucide-react';
import {reviewCases} from './reviews';
import {reviewMetrics} from '../engine/scoring';
export default function App(){
  const [active,setActive]=useState(reviewCases[0]);
  const [selected,setSelected]=useState<string[]>([]);
  const [submitted,setSubmitted]=useState(false);
  const metrics=useMemo(()=>reviewMetrics(active.issues.map(i=>i.id),selected),[active,selected]);
  const change=(id:string)=>setSelected(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  return <main className="page">
    <nav><b><Stethoscope/>RepoDoctor</b><a href="https://github.com/yeabsira-mesfin/React_TypeScript" target="_blank" rel="noreferrer">GitHub</a></nav>
    <section className="hero"><div><span>AI CODE REVIEW BENCHMARK</span><h1>Test whether a reviewer catches what matters.</h1><p>RepoDoctor scores code review quality using gold findings, false-positive penalties, recall, precision, and F1 instead of rewarding long lists of speculative comments.</p></div><div className="formula"><SearchCheck/><strong>Precision + Recall</strong><span>Measure useful findings, not comment volume.</span><code>F1 = 2PR / (P + R)</code></div></section>
    <section className="workspace"><aside><h2>Pull requests</h2>{reviewCases.map(r=><button key={r.id} className={active.id===r.id?'selected':''} onClick={()=>{setActive(r);setSelected([]);setSubmitted(false)}}><span><GitPullRequest size={15}/>{r.id}</span><b>{r.title}</b><small>{r.file}</small></button>)}</aside>
    <article><div className="file"><FileCode2 size={17}/>{active.file}</div><h2>{active.title}</h2><pre>{active.diff}</pre><h3>Mark issues you would raise</h3><div className="issueGrid">{active.issues.map(i=><label key={i.id} className={selected.includes(i.id)?'on':''}><input type="checkbox" checked={selected.includes(i.id)} onChange={()=>change(i.id)}/><span><b>{i.severity}</b>{i.label}</span></label>)}<label className={selected.includes('false-positive')?'on':''}><input type="checkbox" checked={selected.includes('false-positive')} onChange={()=>change('false-positive')}/><span><b>Possible</b>Rewrite everything using a different state library</span></label></div><button className="submit" onClick={()=>setSubmitted(true)}>Score review</button>{submitted&&<div className="metrics"><div><span>Precision</span><b>{metrics.precision}</b></div><div><span>Recall</span><b>{metrics.recall}</b></div><div><span>F1</span><b>{metrics.f1}</b></div><div><span>True positives</span><b>{metrics.truePositives}</b></div></div>}{submitted&&metrics.f1===1&&<p className="perfect"><CheckCircle2/>Gold-standard review matched.</p>}</article></section>
    <section className="why"><h2>Why this benchmark is different</h2><p>Code review quality is not the number of comments. A useful reviewer must find real defects, prioritize severity, avoid noisy false positives, and recommend changes that can be tested. RepoDoctor makes those tradeoffs measurable.</p></section>
    <footer>Built to demonstrate code review, evaluation metrics, TypeScript, testing, and software quality judgment.</footer>
  </main>;
}
