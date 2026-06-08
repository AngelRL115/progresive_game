import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

export const useGameLoop = () => {
  const tick = useGameStore(state => state.tick);
  const checkAchievements = useGameStore(state => state.checkAchievements);
  const lastTimeRef = useRef<number>(performance.now());
  const lastAchCheckRef = useRef<number>(performance.now());
  const requestRef = useRef<number>(0);

  const loop = (time: number) => {
    const deltaTime = time - lastTimeRef.current;
    
    // limit max delta time in loop to prevent huge jumps from tab switching 
    // (offline progress handles the actual long absences)
    if (deltaTime > 0 && deltaTime < 1000) {
      tick(deltaTime);
    }
    
    // Check achievements every ~1 second to save performance
    if (time - lastAchCheckRef.current > 1000) {
      checkAchievements();
      lastAchCheckRef.current = time;
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
