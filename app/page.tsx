'use client';
import { useState } from 'react';
import Header from './components/Header';
import GameArea from './components/GameArea';
import Bets from './components/Bets';
import Footer from './components/Footer';
import { Bet } from './types/Bet';

export default function Home() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handlePlaceBet = (amount: number) => {
    const betAmount = Number(amount.toFixed(2))
    const newTotalAmount = totalAmount + betAmount;

    const newBet: Bet = {
      amount: betAmount,
      id: `#${bets.length + 1}-${bets.length + Math.floor(Math.random() * 1000)}`,
      percentage: Number(((betAmount / newTotalAmount) * 100).toFixed(2)),
    };
    const newBets = bets.map((prevBet) => ({...prevBet, percentage: Number(((prevBet.amount / newTotalAmount) * 100).toFixed(2)) }));
    
    setBets([...newBets, newBet]);
    setTotalAmount(newTotalAmount);
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <GameArea onPlaceBet={handlePlaceBet} setBets={setBets} totalAmount={totalAmount} bets={bets} />
        <Bets bets={bets} />
      </main>
      <Footer />
    </div>
  );
}
