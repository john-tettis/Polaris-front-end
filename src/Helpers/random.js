export default function weightedRandom(prob) {
    let i, sum=0, r=Math.random();
    for (i in prob) {
      sum += prob[i];
      if (r <= sum) return Number(i);
    }
  }