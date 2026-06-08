import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { challenges } from '../../data/challenges';
import { challengeUpgrades } from '../../data/challengeShop';
import { Play, Square, ShoppingCart, Check } from 'lucide-react';

export const Challenges: React.FC = () => {
  const [view, setView] = useState<'LIST' | 'SHOP'>('LIST');
  const points = useGameStore(state => state.points);
  const activeChallengeId = useGameStore(state => state.activeChallengeId);
  const challengeCompletions = useGameStore(state => state.challengeCompletions);
  const challengePoints = useGameStore(state => state.challengePoints);
  const challengeShopPurchases = useGameStore(state => state.challengeShopPurchases);
  const startChallenge = useGameStore(state => state.startChallenge);
  const exitChallenge = useGameStore(state => state.exitChallenge);
  const completeChallenge = useGameStore(state => state.completeChallenge);
  const buyChallengeUpgrade = useGameStore(state => state.buyChallengeUpgrade);

  const renderChallenges = () => (
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
  );

  const renderShop = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
      {challengeUpgrades.map(up => {
        const level = challengeShopPurchases[up.id] || 0;
        const cost = Math.floor(up.baseCost * Math.pow(up.costMultiplier, level));
        const isMaxed = up.maxLevel > 0 && level >= up.maxLevel;
        const canAfford = !isMaxed && challengePoints >= cost;

        return (
          <div key={up.id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, color: 'var(--neon-cyan)' }}>{up.name}</h4>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', padding: '2px 8px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)' }}>{up.category}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '15px' }}>{up.description}</p>
              <div style={{ marginBottom: '15px', fontSize: '0.9rem' }}>
                Level: <span style={{ color: 'white' }}>{level}{up.maxLevel > 0 ? ` / ${up.maxLevel}` : ''}</span>
              </div>
            </div>
            
            <button 
              className="btn-neon" 
              disabled={!canAfford || isMaxed} 
              onClick={() => buyChallengeUpgrade(up.id, cost)}
              style={{ width: '100%', borderColor: isMaxed ? 'var(--text-muted)' : canAfford ? 'var(--neon-green)' : 'var(--border-neon)' }}
            >
              {isMaxed ? 'MAX LEVEL' : `BUY UPGRADE (${cost} CP)`}
            </button>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="challenges-container" style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: 'var(--neon-cyan)', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Dimensions & Challenges
        </h2>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--neon-yellow)' }}>
          Challenge Points: {challengePoints}
        </div>
      </div>

      {activeChallengeId && (
        <div style={{ padding: '15px', background: 'rgba(255, 0, 85, 0.1)', border: '1px solid var(--neon-pink)', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: 'var(--neon-pink)' }}>⚠️ CHALLENGE ACTIVE</h3>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>You are currently inside a challenge. Regular progression is altered. Complete the goal or abandon to return to normal space.</p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          className="btn-neon" 
          onClick={() => setView('LIST')}
          style={{ flex: 1, borderColor: view === 'LIST' ? 'var(--neon-cyan)' : 'var(--border-neon)' }}
        >
          <Square size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> ACTIVE CHALLENGES
        </button>
        <button 
          className="btn-neon" 
          onClick={() => setView('SHOP')}
          style={{ flex: 1, borderColor: view === 'SHOP' ? 'var(--neon-cyan)' : 'var(--border-neon)' }}
        >
          <ShoppingCart size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> CHALLENGE SHOP
        </button>
      </div>

      {view === 'LIST' ? renderChallenges() : renderShop()}
    </div>
  );
};
