import { Zap, Star, Award, RefreshCcw, FlaskConical, Swords } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

export const Sidebar = () => {
  const activeTab = useGameStore(state => state.activeTab);
  const setActiveTab = useGameStore(state => state.setActiveTab);
  const prestigeLevel = useGameStore(state => state.prestigeLevel);
  const lifetimePoints = useGameStore(state => state.lifetimePoints);
  const generators = useGameStore(state => state.generators);

  const hasMilestoneUnlocked = generators.some(g => g.level >= 10);
  const hasPrestigeUnlocked = lifetimePoints >= 1000000 || prestigeLevel > 0;
  const hasAdvancedUnlocked = prestigeLevel > 0;

  const navItems = [
    { icon: Zap, label: 'UPGRADES', visible: true },
    { icon: Star, label: 'PERKS', visible: hasAdvancedUnlocked },
    { icon: FlaskConical, label: 'LABORATORY', visible: hasAdvancedUnlocked },
    { icon: Award, label: 'MILESTONES', visible: hasMilestoneUnlocked },
    { icon: RefreshCcw, label: 'PRESTIGE', visible: hasPrestigeUnlocked },
    { icon: Award, label: 'ACHIEVEMENTS', visible: true },
    { icon: Swords, label: 'CHALLENGES', visible: hasAdvancedUnlocked },
  ].filter(item => item.visible);

  return (
    <div className="glass-panel sidebar" style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '15px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: 'var(--neon-cyan)', margin: 0, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1.2rem' }}>
          Cosmic Idle
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {navItems.map(item => {
        const isActive = activeTab === item.label;
        return (
          <button
            key={item.label}
            className="btn-neon"
            onClick={() => setActiveTab(item.label)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              padding: '16px',
              background: isActive ? 'rgba(0, 255, 255, 0.1)' : 'transparent',
              borderColor: isActive ? 'var(--neon-cyan)' : 'var(--border-neon)'
            }}
          >
            <item.icon size={24} />
            <span>{item.label}</span>
          </button>
        );
      })}
      </div>
    </div>
  );
};
