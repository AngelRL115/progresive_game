import { useState } from 'react';
import { useGameStore, getMilestoneMultiplier, checkGeneratorVisibility } from '../../store/gameStore';
import { getCompressedCostMultiplier, getMilestoneResonanceExponent } from '../../data/challengeShop';
import { Cpu, Zap, Activity, HardDrive, Server, Shield, Hexagon, Infinity, Target, Sparkles } from 'lucide-react';

const GenIcons: Record<string, any> = {
  gen1: Zap,
  gen2: Activity,
  gen3: Cpu,
  gen4: HardDrive,
  gen5: Server,
  gen6: Shield,
  gen7: Target,
  gen8: Infinity,
  gen9: Sparkles,
  gen10: Hexagon,
  gen11: Cpu,
  gen12: Server,
};

export const GeneratorList = () => {
  const generators = useGameStore(state => state.generators);
  const points = useGameStore(state => state.points);
  const buyLevel = useGameStore(state => state.buyGeneratorLevel);
  const perks = useGameStore(state => state.perks);
  const autoBuyers = useGameStore(state => state.autoBuyers || {});
  const credits = useGameStore(state => state.credits);
  const unlockAutoBuyer = useGameStore(state => state.unlockAutoBuyer);
  const toggleAutoBuyer = useGameStore(state => state.toggleAutoBuyer);
  const prestigeLevel = useGameStore(state => state.prestigeLevel);
  const challengeShopPurchases = useGameStore(state => state.challengeShopPurchases);
  const activeChallengeId = useGameStore(state => state.activeChallengeId);
  const isDilation = activeChallengeId === 'ch_dilation';

  const [floats, setFloats] = useState<{id: number, x: number, y: number, text: string}[]>([]);
  const [particles, setParticles] = useState<{id: number, x: number, y: number, tx: string, ty: string, color: string}[]>([]);
  
  const handleBuy = (e: React.MouseEvent, id: string) => {
    buyLevel(id);
    
    // Create floating text
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const newFloat = { id: Date.now(), x: rect.left + 20, y: rect.top - 10, text: '+1 Lvl' };
    setFloats(prev => [...prev, newFloat]);
    
    // Create particles
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      tx: `${(Math.random() - 0.5) * 150}px`,
      ty: `${(Math.random() - 0.5) * 150}px`,
      color: i % 2 === 0 ? 'var(--neon-cyan)' : 'var(--neon-purple)'
    }));
    setParticles(prev => [...prev, ...newParticles]);

    // Cleanup float after animation
    setTimeout(() => {
      setFloats(prev => prev.filter(f => f.id !== newFloat.id));
    }, 1000);
    
    // Cleanup particles
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 600);
  };

  return (
    <div className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>GALAXY GENERATOR</h2>
      
      {floats.map(f => (
        <div key={f.id} className="floating-text" style={{ left: f.x, top: f.y }}>
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
            background: p.color, 
            boxShadow: `0 0 8px ${p.color}`,
            '--tx': p.tx, 
            '--ty': p.ty 
          } as React.CSSProperties} 
        />
      ))}
      
      {generators.map((gen, index) => {
        const isVisible = checkGeneratorVisibility(gen.id, generators, points);
        if (!isVisible) return null;

        const discountPerk = perks.find(p => p.effectType === 'discount' && p.purchased);
        let discount = discountPerk ? discountPerk.effectValue : 1;
        
        const earlyDiscount = perks.find(p => p.effectType === 'early_discount' && p.purchased);
        if (earlyDiscount && gen.level < 10) {
          discount *= earlyDiscount.effectValue;
        }

        const lvlAuto = challengeShopPurchases['autobuyer_network'] || 0;
        const lvlMilestone = challengeShopPurchases['milestone_resonance'] || 0;

        let dynamicCostMult = gen.costMultiplier + (isDilation ? 0.10 : 0);
        if (lvlAuto > 0) {
          dynamicCostMult = getCompressedCostMultiplier(dynamicCostMult, lvlAuto);
        }

        const cost = Math.floor(gen.baseCost * discount * Math.pow(dynamicCostMult, gen.level));
        const canAfford = points >= cost;
        const IconComponent = GenIcons[gen.id] || Zap;
        
        let milestoneMultiplier = getMilestoneMultiplier(gen.level);
        if (lvlMilestone > 0) {
          const exponent = getMilestoneResonanceExponent(lvlMilestone);
          const newMult = Math.pow(milestoneMultiplier, exponent);
          milestoneMultiplier = Number.isFinite(newMult) ? newMult : Number.MAX_VALUE;
        }
        
        return (
          <div key={gen.id} className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
              
              <div className={`generator-icon ${gen.level > 0 ? 'active' : ''}`}>
                <IconComponent size={24} color={gen.level > 0 ? 'var(--neon-cyan)' : 'var(--text-muted)'} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <h3 style={{ textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>{gen.name}</h3>
                  <span style={{ color: 'var(--neon-cyan)', fontWeight: 600 }}>
                    +{gen.baseOutput * gen.level * milestoneMultiplier} E/s
                  </span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span>Level {gen.level} {milestoneMultiplier > 1 && <span style={{color: 'var(--neon-purple)'}}>(x{milestoneMultiplier})</span>}</span>
                  <span>Cost: {cost.toLocaleString()}</span>
                </div>
                
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${Math.min(100, (points / cost) * 100)}%` }}></div>
                </div>
              </div>
            </div>
            
            <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                className="btn-neon" 
                disabled={!canAfford}
                onClick={(e) => handleBuy(e, gen.id)}
                style={{ padding: '12px 24px', fontSize: '1.1rem' }}
              >
                LEVEL UP
              </button>
              
              {(() => {
                const ab = autoBuyers[gen.id];
                const abCost = 25 * Math.pow(2, index);
                
                if (ab?.unlocked) {
                  return (
                    <button 
                      onClick={() => toggleAutoBuyer(gen.id)}
                      style={{
                        padding: '6px 12px',
                        background: ab.active ? 'rgba(0, 255, 255, 0.2)' : 'transparent',
                        border: `1px solid ${ab.active ? 'var(--neon-cyan)' : 'var(--text-muted)'}`,
                        color: ab.active ? 'var(--neon-cyan)' : 'var(--text-muted)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        textTransform: 'uppercase'
                      }}
                    >
                      {ab.active ? 'AUTO: ON' : 'AUTO: OFF'}
                    </button>
                  );
                } else if (prestigeLevel > 0) {
                  const canAffordAb = credits >= abCost;
                  return (
                    <button 
                      onClick={() => unlockAutoBuyer(gen.id)}
                      disabled={!canAffordAb}
                      style={{
                        padding: '6px 12px',
                        background: 'transparent',
                        border: `1px solid ${canAffordAb ? 'var(--neon-purple)' : 'rgba(255,255,255,0.1)'}`,
                        color: canAffordAb ? 'var(--neon-purple)' : 'var(--text-muted)',
                        borderRadius: '4px',
                        cursor: canAffordAb ? 'pointer' : 'not-allowed',
                        fontSize: '0.8rem',
                        textTransform: 'uppercase'
                      }}
                    >
                      Unlock Auto: {abCost} QC
                    </button>
                  );
                }
                return null;
              })()}
            </div>
          </div>
        );
      })}
    </div>
  );
};
