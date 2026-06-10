import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { challenges } from '../../data/challenges';
import { Play, Square, Check } from 'lucide-react';
import { ChallengeShopPanel } from './ChallengeShopPanel';

export const Challenges: React.FC = () => {
  const points = useGameStore(state => state.points);
  const activeChallengeId = useGameStore(state => state.activeChallengeId);
  const challengeCompletions = useGameStore(state => state.challengeCompletions);
  const challengePoints = useGameStore(state => state.challengePoints);
  const startChallenge = useGameStore(state => state.startChallenge);
  const exitChallenge = useGameStore(state => state.exitChallenge);
  const completeChallenge = useGameStore(state => state.completeChallenge);
  const [activeTab, setActiveTab] = useState<'challenges' | 'shop'>('challenges');

  return (
    <div className="right-panel" style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <h2 
            onClick={() => setActiveTab('challenges')}
            style={{ 
              margin: 0, 
              color: activeTab === 'challenges' ? 'var(--neon-cyan)' : 'var(--text-muted)', 
              textTransform: 'uppercase', 
              letterSpacing: '2px',
              cursor: 'pointer',
              borderBottom: activeTab === 'challenges' ? '2px solid var(--neon-cyan)' : '2px solid transparent',
              paddingBottom: '5px',
              transition: 'all 0.3s ease'
            }}
          >
            Dimensions
          </h2>
          <h2 
            onClick={() => setActiveTab('shop')}
            style={{ 
              margin: 0, 
              color: activeTab === 'shop' ? 'var(--neon-purple)' : 'var(--text-muted)', 
              textTransform: 'uppercase', 
              letterSpacing: '2px',
              cursor: 'pointer',
              borderBottom: activeTab === 'shop' ? '2px solid var(--neon-purple)' : '2px solid transparent',
              paddingBottom: '5px',
              transition: 'all 0.3s ease'
            }}
          >
            Shop
          </h2>
        </div>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--neon-yellow)' }}>
          Challenge Points: {challengePoints}
        </div>
      </div>

      {activeTab === 'shop' ? (
        <ChallengeShopPanel />
      ) : (
        <>

      {activeChallengeId && (
        <div style={{ padding: '15px', background: 'rgba(255, 0, 85, 0.1)', border: '1px solid var(--neon-pink)', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: 'var(--neon-pink)' }}>⚠️ CHALLENGE ACTIVE</h3>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>You are currently inside a challenge. Regular progression is altered. Complete the goal or abandon to return to normal space.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {challenges.map(ch => {
          const completions = challengeCompletions[ch.id] || 0;
          const currentGoal = ch.baseGoal * Math.pow(ch.goalMultiplier, completions);
          const isActive = activeChallengeId === ch.id;
          const canComplete = isActive && points >= currentGoal;

          return (
            <div key={ch.id} className="glass-panel" style={{ padding: '20px', border: isActive ? '1px solid var(--neon-cyan)' : undefined }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <h3 style={{ margin: 0, color: isActive ? 'var(--neon-cyan)' : 'var(--text-main)' }}>{ch.name} (Tier {completions + 1})</h3>
                  <p style={{ margin: '5px 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{ch.description}</p>
                  <p style={{ margin: '5px 0', fontSize: '0.85rem', color: 'var(--neon-pink)', fontWeight: 'bold' }}>Restriction: {ch.restrictionText}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Goal: {currentGoal.toExponential(2)} EP</div>
                  {isActive && (
                    <div style={{ fontSize: '0.9rem', color: canComplete ? 'var(--neon-green)' : 'var(--text-muted)' }}>
                      Current: {points.toExponential(2)} EP
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                {!isActive && !activeChallengeId && (
                  <button className="btn-neon" onClick={() => startChallenge(ch.id)} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Play size={16} /> START CHALLENGE (RESTARTS RUN)
                  </button>
                )}
                {isActive && (
                  <>
                    <button 
                      className="btn-neon" 
                      disabled={!canComplete} 
                      onClick={() => completeChallenge(currentGoal, ch.id)}
                      style={{ borderColor: canComplete ? 'var(--neon-green)' : 'var(--text-muted)', color: canComplete ? 'var(--neon-green)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      <Check size={16} /> COMPLETE TIER
                    </button>
                    <button className="btn-neon" onClick={exitChallenge} style={{ borderColor: 'var(--neon-pink)', color: 'var(--neon-pink)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Square size={16} /> ABANDON
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
        </>
      )}
    </div>
  );
};
