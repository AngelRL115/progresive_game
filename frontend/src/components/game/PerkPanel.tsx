import { useGameStore } from '../../store/gameStore';

export const PerkPanel = () => {
  const perks = useGameStore(state => state.perks);
  const credits = useGameStore(state => state.credits);
  const buyPerk = useGameStore(state => state.buyPerk);

  return (
    <div className="right-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3 style={{ textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', color: 'var(--neon-purple)' }}>QUANTUM PERKS</h3>
      
      {perks.map(perk => {
        const canAfford = credits >= perk.cost;
        
        return (
          <div key={perk.id} className="glass-panel" style={{ padding: '15px', position: 'relative', overflow: 'hidden', borderColor: perk.purchased ? 'var(--neon-purple)' : 'var(--border-neon)' }}>
            {perk.purchased && (
              <div style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(176, 38, 255, 0.2)', padding: '2px 8px', fontSize: '0.7rem', borderBottomLeftRadius: '8px', color: 'var(--neon-purple)' }}>
                OWNED
              </div>
            )}
            
            <h4 style={{ marginBottom: '4px' }}>{perk.name}</h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              {perk.description}
            </div>
            
            {!perk.purchased ? (
              <button 
                className="btn-neon"
                disabled={!canAfford}
                onClick={() => buyPerk(perk.id)}
                style={{ width: '100%', padding: '8px', borderColor: 'var(--neon-purple)', color: 'var(--neon-purple)' }}
              >
                BUY ({perk.cost} QC)
              </button>
            ) : (
              <div style={{ color: 'var(--neon-purple)', fontWeight: 600, textAlign: 'center', padding: '8px' }}>
                ACTIVE
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
