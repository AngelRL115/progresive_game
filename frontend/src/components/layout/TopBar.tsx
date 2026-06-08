import { useGameStore } from '../../store/gameStore';

export const TopBar = () => {
  const points = useGameStore(state => state.points);
  const pointsRate = useGameStore(state => state.pointsRate);
  const credits = useGameStore(state => state.credits);
  const qcRate = useGameStore(state => state.qcRate);
  const knowledgeFragments = useGameStore(state => state.knowledgeFragments);
  const kfRate = useGameStore(state => state.kfRate);
  const prestigeLevel = useGameStore(state => state.prestigeLevel);

  // Helper to format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return Math.floor(num).toString();
  };

  return (
    <div className="glass-panel header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 20px' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>ENERGY POINTS</div>
        <div style={{ color: 'var(--neon-cyan)', fontSize: '2rem', fontWeight: 800 }}>
          {formatNumber(points)}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          +{formatNumber(pointsRate)}/s
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>QUANTUM CREDITS</div>
        <div style={{ color: 'var(--neon-purple)', fontSize: '2rem', fontWeight: 800 }}>
          {credits < 1000 ? credits.toFixed(3) : formatNumber(credits)}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          +{qcRate.toFixed(4)}/s
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>KNOWLEDGE FRAGMENTS</div>
        <div style={{ color: 'var(--neon-green)', fontSize: '2rem', fontWeight: 800 }}>
          {knowledgeFragments < 1000 ? knowledgeFragments.toFixed(2) : formatNumber(knowledgeFragments)}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          +{kfRate.toFixed(3)}/s
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>PRESTIGE MULTIPLIER</div>
        <div style={{ color: 'var(--neon-pink)', fontSize: '2rem', fontWeight: 800 }}>
          x{(1 + prestigeLevel * 0.1).toFixed(2)}
        </div>
      </div>
    </div>
  );
};
