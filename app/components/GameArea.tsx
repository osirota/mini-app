import React, { useState } from 'react';

interface GameAreaProps {
  onPlaceBet: (amount: number) => void;
}

const GameArea: React.FC<GameAreaProps> = ({ onPlaceBet }) => {
  const [betAmount, setBetAmount] = useState<number>(0);

  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBetAmount(Number(e.target.value));
  };

  const handlePlaceBet = () => {
    if (betAmount > 0) {
      onPlaceBet(betAmount);  // Передаем ставку родительскому компоненту
      setBetAmount(0);        // Сбрасываем поле после ставки
    }
  };

  return (
    <div className="p-6 bg-gray-800 text-white">
      <div className="text-center text-xl font-bold mb-4">Крутится</div>
      <div className="flex justify-center items-center space-x-4 mb-6">
        <div className="w-20 h-20 bg-gray-700"></div>
        <div className="w-20 h-20 bg-gray-700"></div>
        <div className="w-20 h-20 bg-gray-700"></div>
      </div>
      <div className="mb-4">
        <input
          type="number"
          value={betAmount}
          onChange={handleBetChange}
          className="w-full p-2 bg-gray-900 text-white rounded"
          placeholder="Введите сумму ставки"
        />
      </div>
      <button
        onClick={handlePlaceBet}
        className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600"
      >
        Сделать ставку
      </button>
    </div>
  );
};

export default GameArea;
