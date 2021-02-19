import { useMemo } from 'react';

export function useCalculator(monCards: number, magCards: number, trpCards: number) {
  const cards = [monCards, magCards, trpCards];
  const totalCards = monCards + magCards + trpCards;
  const fixedCards = cards.map(card => getFixedAmount(card, totalCards));
  const remainSub = totalCards * 0.2;
  const remainCards = cards.map((card, i) => card - fixedCards[i] * remainSub);
  const drawAmount = 4 - fixedCards.reduce((a, b) => a + b);
  const remainSum = remainCards.reduce((a, b) => a + b);
  const expectCards = remainCards.map((card, i) => fixedCards[i] + (card / remainSum) * drawAmount);

  const probCards = useMemo(() => {
    const comb: Probability[] = [];
    combination(drawAmount, remainCards, remainSub, comb);
    const result = comb.map(item => {
      const picked = item?.name.split(',') ?? [];
      return {
        cards: fixedCards.map(
          (card, i) => card + picked.filter(_item => Number(_item) === i).length
        ),
        prob: item?.value ?? 0
      };
    });
    const record: string[] = [];
    for (let i = 0; i < 3; i++) {
      let r = 0;
      for (let j = 0; j < result.length; j++) {
        r += result[j].cards[i] * result[j].prob;
      }
      record.push(r.toFixed(2));
    }
    console.log(record);
    return result;
  }, [drawAmount, fixedCards, remainCards, remainSub]);

  return { totalCards, fixedCards, remainCards, drawAmount, expectCards, probCards };
}

function getFixedAmount(value: number, total: number): number {
  if (value / total > 0.5) {
    return 2;
  } else if (value / total >= 0.3) {
    return 1;
  } else {
    return 0;
  }
}

interface Probability {
  name: string;
  value: number;
}

function combination(
  drawAmount: number,
  remainCards: number[],
  remainSub: number,
  result: Probability[],
  picked: number[] = []
) {
  drawAmount--;
  for (let i = 0; i < 3; i++) {
    const temp = [...picked];
    temp.push(i);
    if (drawAmount <= 0) {
      const prob = calcProbability(temp, remainCards, remainSub);
      if (!prob) continue;
      const prev = result.find(item => item.name === prob.name);
      if (prev) {
        prev.value += prob.value;
      } else {
        result.push(prob);
      }
    } else {
      combination(drawAmount, remainCards, remainSub, result, temp);
    }
  }
}

function calcProbability(
  picked: number[],
  remainCards: number[],
  remainSub: number
): Probability | null {
  const base = [...remainCards];
  let result = 1;
  for (let i = 0; i < picked.length; i++) {
    const index = picked[i];
    if (base[index] <= 0) return null;
    const sum = base.reduce((a, b) => a + b);
    result *= base[index] / sum;
    base[index] = Math.max(base[index] - remainSub, 0);
  }
  return { name: picked.sort().join(','), value: result };
}
