import { useTelegram } from '@/app/lib/TelegramProvider';
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
   const { webApp, user } = useTelegram();
   const [translateX, setTranslateX] = useState(1401);

   const handleSpin = () => {
   animatePosition(10, (position) => {
      setTranslateX(position); // Обновляем значение translateX
      });
   };

  return (
   <div className="flex flex-col">
      <div>
         <p className="text-cyan-500">auth_date: {webApp?.initDataUnsafe.auth_date}</p>
            <p className="text-cyan-500 pl-5 pt-2">hash: {webApp?.initDataUnsafe.hash}</p>
            <p className="text-cyan-500 pl-5 pt-2">query_id: {webApp?.initDataUnsafe.query_id}</p>
            <p className="text-cyan-500 pl-5 pt-2">first_name: {webApp?.initDataUnsafe.user.first_name}</p>
            <p className="text-cyan-500 pl-5 pt-2">user_id: {webApp?.initDataUnsafe.user.id}</p>
            <p className="text-cyan-500 pl-5 pt-2">language_code: {webApp?.initDataUnsafe.user.language_code}</p>
            <p className="text-cyan-500 pl-5 pt-2">last_name: {webApp?.initDataUnsafe.user.last_name}</p>
            <p className="text-cyan-500 pl-5 pt-2">username: {webApp?.initDataUnsafe.user.username}</p>
            <p className="text-cyan-500 pl-5 pt-2">user:first_name: {user?.first_name}</p>
            <p className="text-cyan-500 pl-5 pt-2">user:id: {user?.id}</p>
            <p className="text-cyan-500 pl-5 pt-2">user:language_code: {user?.language_code}</p>
            <p className="text-cyan-500 pl-5 pt-2">user:last_name: {user?.last_name}</p>
            <p className="text-cyan-500 pl-5 pt-2">user:username: {user?.username}</p>
         </div>
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
