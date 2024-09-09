'use client';
import { useState } from 'react';
import Header from './components/Header';
import GameArea from './components/GameArea';
import Bets from './components/Bets';
import Footer from './components/Footer';

interface Bet {
  amount: string;
  id: string;
  percentage: string;
}

export default function Home() {
  const [bets, setBets] = useState<Bet[]>([]); // Состояние для хранения ставок

  const handlePlaceBet = (amount: number) => {
    // Генерация ID и процента для каждой новой ставки
    const newBet: Bet = {
      amount: amount.toFixed(2),
      id: `#${bets.length + 1}-${bets.length + Math.floor(Math.random() * 1000)}`,
      percentage: (Math.random() * (50 - 1) + 1).toFixed(2),
    };

    // Обновление состояния ставок
    setBets([...bets, newBet]);
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <GameArea onPlaceBet={handlePlaceBet} />
        <Bets bets={bets} />
      </main>
      <Footer />
    </div>
  );
}
