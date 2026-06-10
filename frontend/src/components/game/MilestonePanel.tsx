import { useGameStore, getMilestoneMultiplier } from '../../store/gameStore';
import { getMilestoneResonanceExponent } from '../../data/challengeShop';

export const MilestonePanel = () => {
  const generators = useGameStore(state => state.generators);
  const challengeShopPurchases = useGameStore(state => state.challengeShopPurchases);

  return (
    <div className="right-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '80vh', overflowY: 'auto' }}>
      <h3 style={{ textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', color: 'var(--text-main)' }}>MILESTONES</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '-15px' }}>
        Reach levels 10, 25, 50, 100, 200, 300, 400, 500, and then every 100 levels to earn massive multipliers!
      </p>
      
      {generators.map(gen => {
        let nextMilestone;
        if (gen.level < 10) nextMilestone = 10;
        else if (gen.level < 25) nextMilestone = 25;
        else if (gen.level < 50) nextMilestone = 50;
        else if (gen.level < 100) nextMilestone = 100;
        else if (gen.level < 200) nextMilestone = 200;
        else if (gen.level < 300) nextMilestone = 300;
        else if (gen.level < 400) nextMilestone = 400;
        else if (gen.level < 500) nextMilestone = 500;
        else nextMilestone = (Math.floor(gen.level / 100) + 1) * 100;

        let prevMilestone = 0;
        if (nextMilestone === 10) prevMilestone = 0;
        else if (nextMilestone === 25) prevMilestone = 10;
        else if (nextMilestone === 50) prevMilestone = 25;
        else if (nextMilestone === 100) prevMilestone = 50;
        else if (nextMilestone === 200) prevMilestone = 100;
        else if (nextMilestone === 300) prevMilestone = 200;
        else if (nextMilestone === 400) prevMilestone = 300;
        else if (nextMilestone === 500) prevMilestone = 400;
        else prevMilestone = nextMilestone - 100;

        const progress = ((gen.level - prevMilestone) / (nextMilestone - prevMilestone)) * 100;

        const lvlMilestone = challengeShopPurchases['milestone_resonance'] || 0;
        let currentMultiplier = getMilestoneMultiplier(gen.level);
        if (lvlMilestone > 0) {
          const exponent = getMilestoneResonanceExponent(lvlMilestone);
          const newMult = Math.pow(currentMultiplier, exponent);
          currentMultiplier = Number.isFinite(newMult) ? newMult : Number.MAX_VALUE;
        }

        return (
          <div key={gen.id} className="glass-panel" style={{ padding: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h4 style={{ margin: 0 }}>{gen.name}</h4>
              <span style={{ color: 'var(--neon-cyan)', fontWeight: 'bold' }}>x{currentMultiplier.toLocaleString()}</span>
            </div>
            
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Level: {gen.level} / {nextMilestone}
            </div>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${Math.max(0, Math.min(100, progress))}%`, background: 'var(--neon-cyan)', boxShadow: 'none' }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
