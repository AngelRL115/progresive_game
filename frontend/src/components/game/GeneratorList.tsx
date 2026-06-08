import { useState } from 'react';
import { useGameStore, getMilestoneMultiplier } from '../../store/gameStore';
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

  const [floats, setFloats] = useState<{id: number, x: number, y: number, text: string}[]>([]);
  const [particles, setParticles] = useState<{id: number, x: number, y: number, tx: string, ty: string, color: string}[]>([]);
  
  const discountPerk = perks.find(p => p.effectType === 'discount' && p.purchased);
  const discount = discountPerk ? discountPerk.effectValue : 1;

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
      
      {generators.map(gen => {
        const cost = Math.floor(gen.baseCost * discount * Math.pow(gen.costMultiplier, gen.level));
        const canAfford = points >= cost;
        const IconComponent = GenIcons[gen.id] || Zap;
        const milestoneMultiplier = getMilestoneMultiplier(gen.level);
        
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
            
            <div style={{ marginLeft: '20px' }}>
              <button 
                className="btn-neon" 
                disabled={!canAfford}
                onClick={(e) => handleBuy(e, gen.id)}
                style={{ padding: '12px 24px', fontSize: '1.1rem' }}
              >
                LEVEL UP
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
