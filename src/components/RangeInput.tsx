import { useState } from 'react';
import { ReactInputEvent } from '../utils/types';

interface Props {
  value: string | number;
  onChange: ReactInputEvent;
}
export default function RangeInput(props: Props) {
  const { value, onChange } = props;

  return (
    <input
      className="w-14 md:w-24"
      type="range"
      value={value}
      min={6}
      max={18}
      onChange={onChange}
    />
  );
}

export function useRangeInput(initState: number) {
  const [cards, setCards] = useState(initState);

  const onChange: ReactInputEvent = e => {
    const { value } = e.target;
    setCards(Number(value));
  };

  return { value: cards, onChange };
}
