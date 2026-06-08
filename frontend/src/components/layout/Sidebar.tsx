import { Zap, Star, Award, RefreshCcw, FlaskConical } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

export const Sidebar = () => {
  const activeTab = useGameStore(state => state.activeTab);
  const setActiveTab = useGameStore(state => state.setActiveTab);

  const navItems = [
    { icon: Zap, label: 'UPGRADES' },
    { icon: Star, label: 'PERKS' },
    { icon: FlaskConical, label: 'LABORATORY' },
    { icon: Award, label: 'MILESTONES' },
    { icon: RefreshCcw, label: 'PRESTIGE' },
  ];

  return (
    <div className="glass-panel sidebar" style={{ padding: '20px' }}>
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
  );
};
