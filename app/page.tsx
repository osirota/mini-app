'use client'
import Roulette from './components/Roulette';
import { TelegramProvider } from './lib/TelegramProvider';

const participants = [
  'windner 1',
  'windner 2',
  'windner 3',
  'windner 4',
  'windner 5',
  'windner 6',
  'windner 71',
  'windner 72',
  'windner 73',
  'windner 74',
  'windner 75',
  'windner 76',
  'windner 77',
  'windner 78',
  'windner 711',
  'windner 722',
  'windner 733',
  'windner 744',
  'windner 732',
  'windner 7123',
  'windner 7123a',
  'windner 71233',
  'windner 7123',
  'windner 71223',
  'windner 7asd',
  'windner 7we',
  'windner 7q',
  'windner 7332',
  'windner 722112',
  'windner 7qqwe',
  'windner 7sda',
  'windner 7sda',
  'windner 7sda',
  'windner 7sda',
  'windner 73554',
  'windner 7123',
  'windner 7123',
  'WINNER',
  'windner 7666',
  'windner 71235567',
]

export default function Home() {
  return (
    <TelegramProvider>
      <div className="flex justify-center items-center h-screen bg-black-600">
          <Roulette participants={participants} />
      </div>
    </TelegramProvider>

  );
}
