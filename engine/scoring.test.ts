import {describe,expect,it} from 'vitest';
import {reviewMetrics} from './scoring';
describe('review metrics',()=>{
  it('computes perfect review',()=>expect(reviewMetrics(['a','b'],['a','b']).f1).toBe(1));
  it('penalizes false positives and misses',()=>{
    const r=reviewMetrics(['a','b'],['a','c']);
    expect(r.precision).toBe(.5);
    expect(r.recall).toBe(.5);
  });
});
