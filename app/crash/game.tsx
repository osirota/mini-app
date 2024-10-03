import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';

const CrashGame = () => {
  const pixiContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Создаем приложение PixiJS
    const app = new PIXI.Application({
      width: 820,
      height: 410,
      backgroundColor: 0x000033, // Тёмный фон
    });

    // Добавляем canvas в DOM
    if (pixiContainer.current) {
      pixiContainer.current.appendChild(app.view);
    }

    // Функция для создания звезды
    function createStar(x: number, y: number, size: number, color: number) {
      const star = new PIXI.Graphics();
      star.beginFill(color);
      star.drawCircle(0, 0, size);
      star.endFill();
      star.x = x;
      star.y = y;
      app.stage.addChild(star);
    }

    // Создаем множество звёзд
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * app.screen.width;
      const y = Math.random() * app.screen.height;
      const size = 1 + Math.random() * 2; // Размер звезды
      createStar(x, y, size, 0xffffff); // Белые звезды
    }

    // Создаем ракету
    const rocket = new PIXI.Graphics();
    rocket.beginFill(0xFFFFFF); // Белая основная часть ракеты
    rocket.drawRect(-20, -50, 40, 100); // Тело ракеты
    rocket.endFill();

    rocket.beginFill(0x0000FF); // Синяя кабина ракеты
    rocket.drawCircle(0, -30, 15);
    rocket.endFill();

    // Крылья ракеты
    rocket.beginFill(0xFF0000); // Красные крылья
    rocket.moveTo(-20, 20);
    rocket.lineTo(-40, 50);
    rocket.lineTo(-20, 50);
    rocket.closePath();
    rocket.moveTo(20, 20);
    rocket.lineTo(40, 50);
    rocket.lineTo(20, 50);
    rocket.closePath();
    rocket.endFill();

    // Устанавливаем позицию ракеты
    rocket.x = app.screen.width / 2;
    rocket.y = app.screen.height - 100;
    app.stage.addChild(rocket);

    // Анимация полета ракеты
    app.ticker.add(() => {
      rocket.y -= 2;
      if (rocket.y < -50) {
        rocket.y = app.screen.height + 50;
      }
    });

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return (
    <div className="w-full h-full bg-black relative">
      <div ref={pixiContainer} className="w-full h-full"></div>
    </div>
  );
};

export default CrashGame;
