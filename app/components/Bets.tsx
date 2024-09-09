import React from 'react';

interface Bet {
  amount: string;
  id: string;
  percentage: string;
}

interface BetsProps {
  bets: Bet[];
}

const Bets: React.FC<BetsProps> = ({ bets }) => {
  return (
    <div className="p-6 bg-gray-900 text-white">
      <div className="font-bold text-lg mb-4">Ставки игроков</div>
      <ul className="space-y-4">
        {bets.length === 0 ? (
          <li className="text-center text-gray-400">Ставок пока нет</li>
        ) : (
          bets.map((bet, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-700 p-2 rounded"
            >
              <div>{bet.amount}$</div>
              <div className="text-gray-400">{bet.id}</div>
              <div>{bet.percentage}%</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Bets;
