import { ReactNode } from 'react';

interface Props {
  header: ReactNode[];
  amount: ReactNode[];
  fixed: ReactNode[];
  expect: ReactNode[];
}
export default function Table(props: Props) {
  const { header, amount, fixed, expect } = props;

  return (
    <table className="table w-full divide-y">
      <thead>
        <tr>
          <th></th>
          <th>
            怪獸卡<div>{header[0]}</div>
          </th>
          <th>
            魔法卡<div>{header[1]}</div>
          </th>
          <th>
            陷阱卡<div>{header[2]}</div>
          </th>
          <th>
            合計<div>{header[4]}</div>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y">
        <tr>
          <td>卡片數</td>
          {amount.map((item, i) => (
            <td key={i}>{item}</td>
          ))}
        </tr>
        <tr>
          <td>最低起手數</td>
          {fixed.map((item, i) => (
            <td key={i}>{item}</td>
          ))}
        </tr>
        <tr>
          <td>期望值</td>
          {expect.map((item, i) => (
            <td key={i}>{item}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
