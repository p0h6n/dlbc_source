import Grid from './components/Grid';
import RangeInput, { useRangeInput } from './components/RangeInput';
import Table from './components/Table';
import { useCalculator } from './hooks/useCalculator';

function App() {
  const monInput = useRangeInput(6);
  const magInput = useRangeInput(6);
  const trpInput = useRangeInput(6);
  const { totalCards, fixedCards, expectCards, probCards } = useCalculator(
    monInput.value,
    magInput.value,
    trpInput.value
  );

  return (
    <div className="bg-gray-100 h-screen md:py-4 overflow-auto">
      <div className="m-auto shadow p-2 bg-white w-full min-h-full md:max-w-screen-sm md:mx-auto rounded  box-border">
        <Table
          header={[
            <RangeInput {...monInput} />,
            <RangeInput {...magInput} />,
            <RangeInput {...trpInput} />
          ]}
          amount={[monInput.value, magInput.value, trpInput.value, totalCards]}
          fixed={[...fixedCards, fixedCards.reduce((a, b) => a + b)]}
          expect={[
            ...expectCards.map(card => card.toFixed(2)),
            expectCards.reduce((a, b) => a + b).toFixed(0)
          ]}
        />
        <Grid data={probCards} />
      </div>
    </div>
  );
}

export default App;
