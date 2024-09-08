// components/Participant.tsx
import React from 'react';
import { useTelegram } from '@/app/lib/TelegramProvider';

interface ParticipantProps {
  participant: string;
}

const Participant: React.FC<ParticipantProps> = ({ participant }) => {
  const { user } = useTelegram();
  return (
    <div className="w-20 h-20 p-4 border border-red-700">
      <img src={user?.photo_url} alt="participant" className="w-full h-full rounded-md" />
      {participant}
    </div>
  );
};

export default Participant;
