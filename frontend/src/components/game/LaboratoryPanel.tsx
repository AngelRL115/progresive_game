import { useGameStore } from '../../store/gameStore';
import { FlaskConical, ZapOff } from 'lucide-react';

export const LaboratoryPanel = () => {
  const researches = useGameStore(state => state.researches);
  const knowledgeFragments = useGameStore(state => state.knowledgeFragments);
  const isResearchMode = useGameStore(state => state.isResearchMode);
  const toggleResearchMode = useGameStore(state => state.toggleResearchMode);
  const buyResearchLevel = useGameStore(state => state.buyResearchLevel);
  const perks = useGameStore(state => state.perks);

  const labDiscount = perks.find(p => p.effectType === 'lab_discount' && p.purchased);
  const discount = labDiscount ? labDiscount.effectValue : 1;

  return (
    <div className="right-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3 style={{ textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', color: 'var(--neon-green)' }}>COSMIC LABORATORY</h3>
      
      <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', borderColor: isResearchMode ? 'var(--neon-green)' : 'var(--border-neon)' }}>
        <h4 style={{ marginBottom: '15px', color: isResearchMode ? 'var(--neon-green)' : 'var(--text-main)' }}>Research Mode</h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          When active, 50% of your Energy generation is sacrificed and converted directly into Knowledge Fragments over time.
        </p>

        <button 
          className="btn-neon" 
          onClick={toggleResearchMode}
          style={{ 
            width: '100%', padding: '12px', 
            borderColor: isResearchMode ? 'var(--neon-pink)' : 'var(--neon-green)', 
            color: isResearchMode ? 'var(--neon-pink)' : 'var(--neon-green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
          }}
        >
          {isResearchMode ? <><ZapOff size={20} /> DEACTIVATE RESEARCH MODE</> : <><FlaskConical size={20} /> ACTIVATE RESEARCH MODE</>}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto', maxHeight: '50vh' }}>
        {researches.map(res => {
          const cost = Math.floor(res.baseCost * discount * Math.pow(res.costMultiplier, res.level));
          const canAfford = knowledgeFragments >= cost;
          
          return (
            <div key={res.id} className="glass-panel" style={{ padding: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <h4 style={{ margin: 0, color: 'var(--neon-green)' }}>{res.name}</h4>
                <span style={{ color: 'var(--text-muted)' }}>Lvl {res.level}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {res.description}
              </div>
              
              <button 
                className="btn-neon"
                disabled={!canAfford}
                onClick={() => buyResearchLevel(res.id)}
                style={{ width: '100%', padding: '8px', borderColor: 'var(--neon-green)', color: 'var(--neon-green)' }}
              >
                RESEARCH ({cost.toLocaleString()} KF)
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
