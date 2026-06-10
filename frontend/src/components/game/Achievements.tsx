import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { achievements } from '../../data/achievements';

export const Achievements: React.FC = () => {
  const unlockedIds = useGameStore(state => state.achievements || []);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const filteredAchievements = achievements.filter(ach => {
    const isUnlocked = unlockedIds.includes(ach.id);
    if (filter === 'unlocked') return isUnlocked;
    if (filter === 'locked') return !isUnlocked;
    return true;
  });

  const progress = Math.floor((unlockedIds.length / achievements.length) * 100);

  return (
    <div className="right-panel" style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', width: '100%', overflowY: 'auto' }}>
      <h2 className="neon-text" style={{ textAlign: 'center', marginBottom: '10px' }}>Cosmic Achievements</h2>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <p style={{ color: 'var(--text-muted)' }}>Unlock cosmic milestones to gain permanent passive boosts.</p>
        <div style={{ 
          width: '100%', maxWidth: '400px', height: '10px', background: 'rgba(255,255,255,0.1)', 
          margin: '10px auto', borderRadius: '5px', overflow: 'hidden' 
        }}>
          <div style={{ 
            width: `${progress}%`, height: '100%', 
            background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))',
            transition: 'width 0.5s ease'
          }} />
        </div>
        <p style={{ color: 'var(--neon-cyan)', fontWeight: 'bold' }}>{unlockedIds.length} / {achievements.length} ({progress}%)</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
        <button 
          onClick={() => setFilter('all')} 
          style={{ padding: '8px 16px', background: filter === 'all' ? 'var(--neon-cyan)' : 'transparent', color: filter === 'all' ? '#000' : 'white', border: '1px solid var(--neon-cyan)', borderRadius: '4px', cursor: 'pointer' }}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('unlocked')} 
          style={{ padding: '8px 16px', background: filter === 'unlocked' ? 'var(--neon-purple)' : 'transparent', color: filter === 'unlocked' ? '#000' : 'white', border: '1px solid var(--neon-purple)', borderRadius: '4px', cursor: 'pointer' }}
        >
          Unlocked
        </button>
        <button 
          onClick={() => setFilter('locked')} 
          style={{ padding: '8px 16px', background: filter === 'locked' ? 'rgba(255,255,255,0.2)' : 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', cursor: 'pointer' }}
        >
          Locked
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '20px' 
      }}>
        {filteredAchievements.map(ach => {
          const isUnlocked = unlockedIds.includes(ach.id);
          
          return (
            <div 
              key={ach.id} 
              className="glass-panel" 
              style={{ 
                padding: '15px', 
                borderLeft: isUnlocked ? '4px solid var(--neon-cyan)' : '4px solid transparent',
                opacity: isUnlocked ? 1 : 0.6,
                filter: isUnlocked ? 'none' : 'grayscale(100%)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {isUnlocked && (
                <div style={{ 
                  position: 'absolute', top: -20, right: -20, 
                  width: '60px', height: '60px', 
                  background: 'var(--neon-cyan)', opacity: 0.1, 
                  borderRadius: '50%', filter: 'blur(10px)' 
                }} />
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: isUnlocked ? 'var(--neon-cyan)' : 'white' }}>
                  {ach.name}
                </h3>
                {isUnlocked && <span style={{ fontSize: '1.2rem' }}>🌟</span>}
              </div>
              
              <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {ach.description}
              </p>
              
              <div style={{ 
                padding: '8px', 
                background: isUnlocked ? 'rgba(0, 255, 255, 0.05)' : 'rgba(0,0,0,0.2)', 
                borderRadius: '4px',
                border: isUnlocked ? '1px dashed rgba(0, 255, 255, 0.3)' : '1px dashed rgba(255,255,255,0.1)'
              }}>
                <span style={{ fontSize: '0.8rem', color: isUnlocked ? 'var(--neon-purple)' : 'var(--text-muted)' }}>
                  REWARD: {ach.rewardText}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredAchievements.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          No achievements found in this category.
        </div>
      )}
    </div>
  );
};
