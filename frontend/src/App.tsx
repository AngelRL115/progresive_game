import { useEffect, useRef, useState } from 'react';
import { TopBar } from './components/layout/TopBar';
import { Sidebar } from './components/layout/Sidebar';
import { GeneratorList } from './components/game/GeneratorList';
import { UpgradePanel } from './components/game/UpgradePanel';
import { PerkPanel } from './components/game/PerkPanel';
import { LaboratoryPanel } from './components/game/LaboratoryPanel';
import { MilestonePanel } from './components/game/MilestonePanel';
import { PrestigePanel } from './components/game/PrestigePanel';
import { Achievements } from './components/game/Achievements';
import { TutorialModal } from './components/layout/TutorialModal';
import { useGameLoop } from './hooks/useGameLoop';
import { useGameStore } from './store/gameStore';
import { loadGameState, saveGameState } from './services/api';
import { HelpCircle } from 'lucide-react';
import './index.css';

function App() {
  useGameLoop();
  const store = useGameStore();
  const loadState = useGameStore(state => state.loadState);
  const calcOffline = useGameStore(state => state.calculateOfflineProgress);
  const initialized = useRef(false);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    loadGameState().then(state => {
      if (state) {
        loadState(state);
        if (state.lastSaved) calcOffline(state.lastSaved);
      } else {
        setShowTutorial(true);
      }
    });
  }, [loadState, calcOffline]);

  useEffect(() => {
    const interval = setInterval(() => {
      saveGameState(useGameStore.getState());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleManualClick = () => {
    store.addPoints(Math.max(1, store.generators[0].level));
  };

  const renderRightPanel = () => {
    switch (store.activeTab) {
      case 'UPGRADES': return <UpgradePanel />;
      case 'PERKS': return <PerkPanel />;
      case 'LABORATORY': return <LaboratoryPanel />;
      case 'MILESTONES': return <MilestonePanel />;
      case 'PRESTIGE': return <PrestigePanel />;
      case 'ACHIEVEMENTS': return <Achievements />;
      default: return <UpgradePanel />;
    }
  };

  return (
    <div className="layout-grid">
      <div style={{ position: 'absolute', top: '25px', right: '30px', zIndex: 50 }}>
        <button className="btn-neon" style={{ padding: '8px', borderRadius: '50%' }} onClick={() => setShowTutorial(true)}>
          <HelpCircle size={24} />
        </button>
      </div>

      <TopBar />
      <Sidebar />
      <GeneratorList />
      {renderRightPanel()}
      
      {store.generators[0].level === 0 && store.points < store.generators[0].baseCost && (
        <div style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 100 }}>
          <button className="btn-neon clicker-pulse" onClick={handleManualClick} style={{ padding: '16px 32px', fontSize: '1.2rem', background: 'rgba(255, 42, 133, 0.2)', borderColor: 'var(--neon-pink)' }}>
            GATHER ENERGY (CLICK)
          </button>
        </div>
      )}

      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
    </div>
  );
}

export default App;
