import React, { useEffect, useMemo, useState } from 'react';
import ParticipantAnimation from './Roulette';
import { Bet } from '../types/Bet';
import { DEFAULT_TIMER_START } from './../constants/timer';

interface GameAreaProps {
  onPlaceBet: (amount: number) => void;
  totalAmount: number;
  bets: Bet[]
  setBets: (bets: Bet[]) => void
}

const shuffleArray = (array: Bet[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const createBetArray = (bets: Bet[], totalElements: number): Bet[] => {
  let newArray: Bet[] = [];

  // Пробегаемся по каждому элементу и добавляем его несколько раз в новый массив
  bets.forEach(bet => {
    const count = Math.round((bet.percentage / 100) * totalElements); // Количество копий элемента
    newArray = [...newArray, ...Array(count).fill(bet)];
  });

  // Если массив не содержит ровно 40 элементов, корректируем его длину
  if (newArray.length > totalElements) {
    newArray = newArray.slice(0, totalElements); // Обрезаем до нужного размера
  } else if (newArray.length < totalElements) {
    // Если меньше 40, добавляем недостающие элементы (например, первые)
    const additionalElementsNeeded = totalElements - newArray.length;
    newArray = [...newArray, ...newArray.slice(0, additionalElementsNeeded)];
  }

  return shuffleArray(newArray);
};

let timerId: NodeJS.Timeout;
const GameArea: React.FC<GameAreaProps> = ({ onPlaceBet, bets, setBets }) => {
  const [betAmount, setBetAmount] = useState<number | string>('');
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_TIMER_START);
  const [winnersArray, setWinnersArray] = useState<Bet[]>([]);
  const totalBets = useMemo(() => bets.length, [bets]);
  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBetAmount(Number(e.target.value));
  };

  const handlePlaceBet = () => {
    const toNumber = Number(betAmount);
    if (toNumber > 0) {
      onPlaceBet(toNumber);
    }
    setBetAmount('');
  };

  useEffect(() => {
    if (totalBets >= 2) {
      timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 10);
      
      return () => clearInterval(timerId);
    }

  }, [totalBets]);

  useEffect(() => {
    if(timeLeft === 0) {
      clearInterval(timerId);
      const resultArray = createBetArray(bets, 40);
      resultArray[resultArray.length - 3] = {
        id: '123',
        amount: 123123123,
        percentage: 123123123,
      };
      setWinnersArray(resultArray);
    }
  }, [timeLeft])

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 100);
    const hundredths = time % 100;
    return `${seconds < 10 ? '0' : ''}${seconds}:${hundredths < 10 ? '0' : ''}${hundredths}`;
  };

  return (
    <div className="p-6 bg-gray-800 text-white">
      {totalBets >= 2 && <div>{formatTime(timeLeft)}</div>}
      {timeLeft === 0 && (
        <ParticipantAnimation participants={winnersArray} />
      )}
      {totalBets < 2 && <div>Ожидаем игроков</div>}
      {/* <div className="text-center text-xl font-bold mb-4">Крутится</div>
      <div className="flex justify-center items-center space-x-4 mb-6">
        <div className="w-20 h-20 bg-gray-700"></div>
        <div className="w-20 h-20 bg-gray-700"></div>
        <div className="w-20 h-20 bg-gray-700"></div>
      </div> */}
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
