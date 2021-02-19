import { useMemo } from 'react';
import MonCard from '../assets/card_frame00.png';
import MagCard from '../assets/card_frame07.png';
import TrpCard from '../assets/card_frame08.png';

interface Props {
  cards: number[];
}
export default function CardGroup({ cards }: Props) {
  const images = useMemo(() => {
    const result: string[] = [];
    for (let i = 0; i < cards[0]; i++) {
      result.push(MonCard);
    }
    for (let i = 0; i < cards[1]; i++) {
      result.push(MagCard);
    }
    for (let i = 0; i < cards[2]; i++) {
      result.push(TrpCard);
    }
    return result;
  }, [cards]);

  return (
    <div className="flex">
      {images.map((image, i) => (
        <img className="h-8" key={i} src={image} alt="card" />
      ))}
    </div>
  );
}
