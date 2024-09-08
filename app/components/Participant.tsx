// components/Participant.tsx
import React from 'react';

interface ParticipantProps {
  participant: string;
}

const Participant: React.FC<ParticipantProps> = ({ participant }) => {
  return (
    <div className="w-20 h-20 p-4 border border-red-700">
      {/* <img src={avatar} alt="participant" className="w-full h-full rounded-md" /> */}
      {participant}
    </div>
  );
};

export default Participant;
