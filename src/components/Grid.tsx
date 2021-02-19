import CardGroup from './CardGroup';

interface Props {
  data: {
    cards: number[];
    prob: number;
  }[];
}
export default function Grid({ data }: Props) {
  const textClass = (cards: number[]) => {
    let classes = 'w-14 text-right';
    if (cards.join(',') === '2,1,1') {
      classes += ' text-yellow-400 font-bold';
    } else if (!cards.includes(0)) {
      classes += ' text-blue-400';
    } else if (cards.includes(3)) {
      classes += ' text-gray-300';
    } else {
      classes += ' text-gray-500';
    }
    return classes;
  };

  return (
    <div className="mt-2">
      <div className="text-xl my-1 text-center">起手機率一覽</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {data.map((item, i) => (
          <div className="flex items-center justify-center" key={i}>
            <CardGroup cards={item.cards} />
            <div className={textClass(item.cards)}>{(item.prob * 100).toFixed(1) + '%'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
