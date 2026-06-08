import { useGameStore } from '../../store/gameStore';
import { AlertTriangle } from 'lucide-react';

export const PrestigePanel = () => {
  const lifetimePoints = useGameStore(state => state.lifetimePoints);
  const prestigeLevel = useGameStore(state => state.prestigeLevel);
  const prestigeReset = useGameStore(state => state.prestigeReset);

  // Formula matches store: Math.floor(Math.sqrt(lifetimePoints / 1000000))
  const prestigeGain = Math.floor(Math.sqrt(lifetimePoints / 1000000));
  const newPrestigeLevel = prestigeLevel + prestigeGain;

  return (
    <div className="right-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3 style={{ textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', color: 'var(--neon-pink)' }}>PRESTIGE RESET</h3>
      
      <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', borderColor: 'var(--neon-pink)' }}>
        <AlertTriangle size={48} color="var(--neon-pink)" style={{ margin: '0 auto 15px' }} />
        
        <h4 style={{ marginBottom: '15px' }}>Warning: Cosmic Collapse</h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          Resetting will destroy all your Generators, Upgrades, and Energy Points. In exchange, you will earn Prestige Levels which permanently increase global production!
        </p>

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Current Multiplier:</span>
            <span style={{ color: 'var(--neon-pink)' }}>+{(prestigeLevel * 10)}%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <span>Multiplier After Reset:</span>
            <span style={{ color: 'var(--neon-pink)' }}>+{((newPrestigeLevel) * 10)}%</span>
          </div>
        </div>

        <button 
          className="btn-neon" 
          disabled={prestigeGain <= 0}
          onClick={() => {
            if (window.confirm("Are you sure you want to Prestige? You will lose all current progress!")) {
              prestigeReset();
            }
          }}
          style={{ width: '100%', padding: '12px', borderColor: 'var(--neon-pink)', color: 'var(--neon-pink)', background: prestigeGain > 0 ? 'rgba(255, 42, 133, 0.1)' : 'transparent' }}
        >
          {prestigeGain > 0 ? `PRESTIGE FOR +${prestigeGain} LEVELS` : 'NEED MORE ENERGY'}
        </button>
      </div>
    </div>
  );
};
