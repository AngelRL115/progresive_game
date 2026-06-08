import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

export const useGameLoop = () => {
  const tick = useGameStore(state => state.tick);
  const lastTimeRef = useRef<number>(performance.now());
  const requestRef = useRef<number>();

  const loop = (time: number) => {
    const deltaTime = time - lastTimeRef.current;
    
    // limit max delta time in loop to prevent huge jumps from tab switching 
    // (offline progress handles the actual long absences)
    if (deltaTime > 0 && deltaTime < 1000) {
      tick(deltaTime);
    }
    
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(loop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [tick]);
};
