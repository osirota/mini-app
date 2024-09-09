// import { useTelegram } from '@/app/lib/TelegramProvider';
import React, { useState } from 'react';
import Participant from '../Participant';

interface ParticipantAnimationProps {
  participants: string[];
}

function easeOutCubic(t: number) {
   return 1 - Math.pow(1 - t, 3);
 }

 function animatePosition(durationInSeconds: number, callback: (position: number) => void) {
   const startPosition = 1401;
   const totalDistance = startPosition * 2;
   const durationInMs = durationInSeconds * 1000;
   const startTime = performance.now();
 
   function update() {
     const currentTime = performance.now();
     const elapsedTime = currentTime - startTime;
     const progress = Math.min(elapsedTime / durationInMs, 1); // Нормализуем время от 0 до 1
 
     const easedProgress = easeOutCubic(progress); // Используем функцию ease-out
     const currentPosition = startPosition - easedProgress * totalDistance;
 
     // Вызываем callback с текущей позицией
     callback(currentPosition);
 
     if (progress < 1) {
       requestAnimationFrame(update); // Повторяем, пока не завершится
     }
   }
 
   requestAnimationFrame(update);
 }

const ParticipantAnimation: React.FC<ParticipantAnimationProps> = ({ participants }) => {
   // const { webApp, user } = useTelegram();
   const [translateX, setTranslateX] = useState(1401);

   // const stringWebApp = JSON.stringify(webApp)

   const handleSpin = () => {
   animatePosition(10, (position) => {
      setTranslateX(position); // Обновляем значение translateX
      });
   };

  return (
   <div className="flex flex-col">
      <div className="flex flex-col">
      <div className="relative w-96 h-24 overflow-hidden flex justify-center items-center">
      <div className="flex" style={{ 
         transform: `translateX(${translateX}px)`,
      }}>
         {participants.map((participant, index) => (
            <Participant key={index} participant={participant} />
         ))}
      </div>
      <div className="absolute border-4 border-blue-700 w-20 h-20">

      </div>
      </div>
      <button onClick={handleSpin}>spin</button>
    </div>
   </div>
  );
};

export default ParticipantAnimation;
