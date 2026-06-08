import { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';

export const UpgradePanel = () => {
  const upgrades = useGameStore(state => state.upgrades);
  const points = useGameStore(state => state.points);
  const buyUpgrade = useGameStore(state => state.buyUpgrade);
  const activateAbility = useGameStore(state => state.activateAbility);

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="right-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3 style={{ textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>ACTIVE MULTIPLIERS</h3>
      
      {upgrades.map(up => {
        const canAfford = points >= up.cost;
        const isActive = up.isTemporary && up.activeUntil && up.activeUntil > now;
        const isOnCooldown = up.isTemporary && up.cooldownUntil && up.cooldownUntil > now && !isActive;
        const isPermanentActive = !up.isTemporary && up.purchased;
        
        return (
          <div key={up.id} className="glass-panel" style={{ padding: '15px', position: 'relative', overflow: 'hidden' }}>
            {(isActive || isPermanentActive) && (
              <div style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(0, 255, 255, 0.2)', padding: '2px 8px', fontSize: '0.7rem', borderBottomLeftRadius: '8px' }}>
                ACTIVE
              </div>
            )}
            
            <h4 style={{ marginBottom: '4px' }}>{up.name}</h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              {up.description} {up.isTemporary && `(Base: ${(up.baseDurationMs || 0) / 1000}s)`}
            </div>
            
            {up.isTemporary ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {isActive ? (
                  <div style={{ color: 'var(--neon-cyan)', fontWeight: 600, textAlign: 'center', padding: '8px', border: '1px solid var(--neon-cyan)', borderRadius: '8px' }}>
                    ACTIVE ({( (up.activeUntil! - now) / 1000 ).toFixed(1)}s)
                  </div>
                ) : isOnCooldown ? (
                  <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '8px', border: '1px solid var(--text-muted)', borderRadius: '8px' }}>
                    COOLDOWN ({( (up.cooldownUntil! - now) / 1000 ).toFixed(1)}s)
                  </div>
                ) : (
                  <button 
                    className="btn-neon"
                    onClick={() => activateAbility(up.id)}
                    style={{ width: '100%', padding: '8px' }}
                  >
                    ACTIVATE (x{up.multiplier})
                  </button>
                )}
                
                <button 
                  className="btn-neon"
                  disabled={!canAfford}
                  onClick={() => buyUpgrade(up.id)}
                  style={{ width: '100%', padding: '8px', fontSize: '0.85rem', borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)' }}
                >
                  UPGRADE DURATION (+1s) <br/> {up.cost.toLocaleString()} ENERGY
                </button>
              </div>
            ) : !up.purchased ? (
              <button 
                className="btn-neon"
                disabled={!canAfford}
                onClick={() => buyUpgrade(up.id)}
                style={{ width: '100%', padding: '8px' }}
              >
                BUY ({up.cost.toLocaleString()})
              </button>
            ) : (
              <div style={{ color: 'var(--neon-cyan)', fontWeight: 600, textAlign: 'center', padding: '8px' }}>
                x{up.multiplier} BOOST
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
