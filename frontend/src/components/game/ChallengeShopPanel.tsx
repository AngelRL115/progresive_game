import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { challengeShop, getChallengeUpgradeCost } from '../../data/challengeShop';
import { Info } from 'lucide-react';

const UPGRADE_ORDER = [
  'cosmic_resonance',
  'knowledge_leak',
  'autobuyer_network',
  'prestige_power',
  'skill_empowerment',
  'milestone_resonance',
  'research_overclock'
];

export const ChallengeShopPanel: React.FC = () => {
  const challengePoints = useGameStore(state => state.challengePoints);
  const purchases = useGameStore(state => state.challengeShopPurchases);
  const buyUpgrade = useGameStore(state => state.buyChallengeUpgrade);

  const [floats, setFloats] = useState<{id: number, x: number, y: number, text: string}[]>([]);
  const [particles, setParticles] = useState<{id: number, x: number, y: number, tx: string, ty: string, color: string}[]>([]);
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);

  const handleBuy = (e: React.MouseEvent, id: string, cost: number) => {
    e.stopPropagation();
    if (challengePoints < cost) return;

    buyUpgrade(id, cost);

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const idBase = Date.now();
    setFloats(prev => [...prev, { id: idBase, x, y, text: '+1 Lvl' }]);
    
    setTimeout(() => {
      setFloats(prev => prev.filter(f => f.id !== idBase));
    }, 1000);

    // Particles only on desktop
    if (window.innerWidth > 768) {
      const newParticles = Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const dist = 30 + Math.random() * 20;
        return {
          id: idBase + i + 1,
          x, y,
          tx: `${Math.cos(angle) * dist}px`,
          ty: `${Math.sin(angle) * dist}px`,
          color: 'var(--neon-cyan)'
        };
      });
      
      setParticles(prev => [...prev, ...newParticles]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      }, 600);
    }
  };

  const orderedUpgrades = UPGRADE_ORDER.map(id => challengeShop.find(u => u.id === id)).filter(Boolean) as typeof challengeShop;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', paddingBottom: '20px' }}>
      {orderedUpgrades.map(upgrade => {
        const currentLevel = purchases[upgrade.id] || 0;
        const isMaxed = upgrade.maxLevel !== null && currentLevel >= upgrade.maxLevel;
        const cost = getChallengeUpgradeCost(upgrade, currentLevel);
        const canAfford = challengePoints >= cost && !isMaxed;
        
        const currentEffectStr = upgrade.getEffectString(currentLevel);
        const nextEffectStr = upgrade.getEffectString(currentLevel + 1);

        let cardBorder = '1px solid rgba(255, 255, 255, 0.1)';
        if (isMaxed) cardBorder = '1px solid var(--neon-purple)';
        else if (canAfford) cardBorder = '1px solid var(--neon-cyan)';

        return (
          <div 
            key={upgrade.id} 
            className="glass-panel" 
            style={{ 
              padding: '20px', 
              display: 'flex', 
              flexDirection: 'column', 
              border: cardBorder,
              opacity: (canAfford || isMaxed) ? 1 : 0.6,
              transition: 'all 0.3s ease',
              minHeight: '260px',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, color: isMaxed ? 'var(--neon-purple)' : 'var(--text-main)', textTransform: 'uppercase', fontSize: '1.1rem' }}>
                  {upgrade.name}
                </h3>
                <div 
                  style={{ cursor: 'help', position: 'relative' }}
                  onMouseEnter={() => setHoveredTooltip(upgrade.id)}
                  onMouseLeave={() => setHoveredTooltip(null)}
                >
                  <Info size={16} color="var(--text-muted)" />
                  {hoveredTooltip === upgrade.id && (
                    <div style={{
                      position: 'absolute',
                      top: '25px',
                      left: '0',
                      background: 'rgba(10, 15, 30, 0.95)',
                      border: '1px solid var(--neon-cyan)',
                      padding: '12px',
                      borderRadius: '8px',
                      width: '240px',
                      zIndex: 100,
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)'
                    }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        <strong>Base Cost:</strong> {upgrade.baseCost} CP
                        <br/>
                        <strong>Scaling:</strong> {upgrade.scalingType === 'exponential' ? `x${upgrade.costScaling}` : `+${upgrade.costScaling}`}
                        <br/>
                        <strong>Type:</strong> {upgrade.scalingType}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--neon-pink)' }}>
                        Formulas are asymptotically shielded to prevent infinite inflation.
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                Lvl {currentLevel} {upgrade.maxLevel ? `/ ${upgrade.maxLevel}` : ''}
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', flex: 1, marginBottom: '15px' }}>
              {upgrade.description}
            </p>

            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '10px', borderRadius: '6px', marginBottom: '15px', minHeight: '60px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Current Effect:</div>
              <div style={{ fontSize: '1rem', color: 'var(--neon-cyan)', fontWeight: 'bold', marginBottom: isMaxed ? '0' : '8px' }}>
                {currentEffectStr}
              </div>
              {!isMaxed && (
                <>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Next Level:</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    {nextEffectStr}
                  </div>
                </>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: isMaxed ? 'var(--neon-purple)' : (canAfford ? 'var(--neon-green)' : 'var(--text-muted)') }}>
                Cost: {isMaxed ? 'MAX' : cost}
              </div>
              
              <div style={{ position: 'relative' }}>
                <button 
                  className="btn-neon" 
                  disabled={!canAfford || isMaxed}
                  onClick={(e) => !isMaxed && handleBuy(e, upgrade.id, cost)}
                  style={{ 
                    borderColor: isMaxed ? 'var(--neon-purple)' : (canAfford ? 'var(--neon-cyan)' : 'var(--text-muted)'), 
                    color: isMaxed ? 'var(--neon-purple)' : (canAfford ? 'var(--neon-cyan)' : 'var(--text-muted)'),
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '5px'
                  }}
                >
                  {isMaxed ? 'MAXED' : 'BUY LEVEL'}
                </button>
                
                {floats.map(f => (
                  <div key={f.id} className="float-text" style={{ left: f.x, top: f.y }}>
                    {f.text}
                  </div>
                ))}
                
                {particles.map(p => (
                  <div 
                    key={p.id} 
                    className="particle" 
                    style={{ 
                      left: p.x, 
                      top: p.y, 
                      '--tx': p.tx, 
                      '--ty': p.ty, 
                      backgroundColor: p.color 
                    } as React.CSSProperties} 
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
