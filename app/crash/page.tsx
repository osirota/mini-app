'use client'
import { useState, useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Application, Sprite, Texture, Container, TilingSprite } from "pixi.js";
import CrashGameApp from "./game";

// Mock data for players and recent multipliers
const mockPlayers = [
  { name: "Илья Запошвили", bet: 225 },
  { name: "Руслан Тагилов", bet: 96 },
  { name: "Олександр Анд...", bet: 74 },
  { name: "Vlad Panetenko", bet: 36 },
  { name: "Александр Суво...", bet: 1 },
];

const recentMultipliers = [3.11, 1.08, 99.58, 5.95, 2.44, 16.82, 11.34];

const CrashGame = () => {
  const [multiplier, setMultiplier] = useState<number>(1.0);
  const [isFlying, setIsFlying] = useState<boolean>(false);
  const [crashed, setCrashed] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(10);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [bet, setBet] = useState<number>(10);
  const [autoCashout, setAutoCashout] = useState<number>(2);

  const pixiContainer = useRef<HTMLDivElement>(null);
  const pixiApp = useRef<PIXI.Application>();

  // Initialize PIXI App
  useEffect(() => {
    if (!pixiApp.current && pixiContainer.current) {
      const app = new PIXI.Application({
        width: 820,
        height: 410,
        transparent: true,
      });

      // Add PixiJS app to the DOM
      pixiContainer.current.appendChild(app.view);
      pixiApp.current = app;

      // Create background and stars
      const spaceTexture = Texture.from("/background.jpg"); // Add your background image here
      const background = new TilingSprite(spaceTexture, app.screen.width, app.screen.height);
      background.tileScale.set(0.6); // Scale the background appropriately
      app.stage.addChild(background);

      // Rocket sprite setup
      const rocketTexture = Texture.from("/rocket.png");
      const rocket = new Sprite(rocketTexture);
      rocket.anchor.set(0.5);
      rocket.x = app.screen.width / 2;
      rocket.y = app.screen.height * 0.75;
      app.stage.addChild(rocket);

      // Star animation logic
      const starsContainer = new Container();
      app.stage.addChild(starsContainer);

      function createStar() {
        const starTexture = Texture.from("/star.png"); // Add your star image
        const star = new Sprite(starTexture);
        star.anchor.set(0.5);
        star.x = Math.random() * app.screen.width;
        star.y = Math.random() * app.screen.height;
        star.scale.set(0.2 + Math.random() * 0.3);
        starsContainer.addChild(star);

        return star;
      }

      const stars = Array.from({ length: 100 }, createStar);

      app.ticker.add(() => {
        stars.forEach((star) => {
          star.y += 1.5; // Move stars downwards
          if (star.y > app.screen.height) star.y = -star.height; // Reset star position
        });

        if (isFlying && !crashed) {
          rocket.y -= 1.5; // Move rocket upwards
          background.tilePosition.y += 1; // Move the background
        }
      });
    }
  }, [isFlying, crashed]);

  // Countdown effect before takeoff
  useEffect(() => {
    if (countdown > 0) {
      const countdownTimer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(countdownTimer);
    } else {
      setIsFlying(true); // Start flying after countdown
    }
  }, [countdown]);

  // Flying logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isFlying && !crashed) {
      timer = setInterval(() => {
        setMultiplier((prev) => +(prev + 0.01).toFixed(2));
        setTimeElapsed((prev) => prev + 1);
      }, 100);
    }

    return () => clearInterval(timer);
  }, [isFlying, crashed]);

  // Simulate crashing
  useEffect(() => {
    if (multiplier >= 4.62) { // Simulate crash at 4.62x
      setCrashed(true);
      setIsFlying(false);
    }
  }, [multiplier]);

  const handleStart = () => {
    setMultiplier(1.0);
    setTimeElapsed(0);
    setCrashed(false);
    setCountdown(10); // Reset countdown
  };

  return (
    <div className="relative flex flex-row h-screen bg-gray-900 text-white">
      {/* PIXI Container for animation */}
      <div ref={pixiContainer} className="w-2/3 p-6">
        {/* Multiplier History */}
        <div className="flex space-x-2 mb-4">
          {recentMultipliers.map((mult, idx) => (
            <div key={idx} className={`text-lg px-2 py-1 rounded ${mult > 10 ? 'bg-green-500' : 'bg-blue-500'}`}>
              x{mult.toFixed(2)}
            </div>
          ))}
        </div>

        {/* Countdown */}
        <div className="flex justify-center">
          {countdown > 0 ? (
            <div className="text-4xl mb-4">
              00:{countdown < 10 ? `0${countdown}` : countdown} <br/>Обратный отсчет
            </div>
          ) : (
            <CrashGameApp />
          )}
        </div>
      </div>

      {/* Right Section - Players and Game Info */}
      <div className="w-1/3 p-6 bg-gray-800">
        {/* Game Info */}
        <div className="flex justify-between mb-4">
          <div>Игроки: {mockPlayers.length}</div>
          <div>Ставки: {mockPlayers.reduce((acc, player) => acc + player.bet, 0)} Р</div>
        </div>

        {/* Players List */}
        <div className="space-y-4">
          {mockPlayers.map((player, idx) => (
            <div key={idx} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
              <div>{player.name}</div>
              <div>{player.bet} Р</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrashGame;
