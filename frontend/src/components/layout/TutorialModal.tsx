import { X } from 'lucide-react';

export const TutorialModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ width: '600px', maxWidth: '90%', maxHeight: '80vh', overflowY: 'auto', padding: '30px', position: 'relative' }}>
        <button className="btn-neon" style={{ position: 'absolute', top: '15px', right: '15px', padding: '5px' }} onClick={onClose}>
          <X size={20} />
        </button>
        
        <h2 style={{ color: 'var(--neon-cyan)', marginBottom: '20px', textTransform: 'uppercase' }}>How to Play</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: 'var(--text-main)', lineHeight: '1.6' }}>
          <p><strong>Welcome Commander</strong>. Your goal is to gather infinite Energy and explore the Cosmos.</p>
          
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', borderLeft: '4px solid var(--neon-cyan)' }}>
            <h4 style={{ color: 'var(--neon-cyan)', marginBottom: '5px' }}>⚡ Energy Points</h4>
            <p style={{ fontSize: '0.9rem' }}>The primary currency. Generated passively by your <strong>Generators</strong>. Use it to buy more Generator levels and permanent <strong>Upgrades</strong>.</p>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', borderLeft: '4px solid var(--neon-purple)' }}>
            <h4 style={{ color: 'var(--neon-purple)', marginBottom: '5px' }}>⚛️ Quantum Credits</h4>
            <p style={{ fontSize: '0.9rem' }}>A premium resource generated very slowly over time based on your total generator levels. Use it to purchase powerful global <strong>Perks</strong>.</p>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', borderLeft: '4px solid var(--neon-pink)' }}>
            <h4 style={{ color: 'var(--neon-pink)', marginBottom: '5px' }}>💎 Prestige</h4>
            <p style={{ fontSize: '0.9rem' }}>When progress slows down, perform a <strong>Prestige Reset</strong>. You will lose all Energy and Generators, but gain a permanent multiplier to all future production!</p>
          </div>
          
          <h3 style={{ marginTop: '10px', color: 'var(--text-main)' }}>Key Mechanics</h3>
          <ul style={{ paddingLeft: '20px', fontSize: '0.9rem' }}>
            <li style={{ marginBottom: '8px' }}><strong>Milestones:</strong> Reaching levels 10, 25, 50, and 100 on any generator grants massive permanent multipliers (x2, x4, x10, x50) for that specific generator.</li>
            <li style={{ marginBottom: '8px' }}><strong>Active Abilities:</strong> Some upgrades in the Upgrades tab are temporary (like Galaxy Boost). You must click to activate them and they have a cooldown.</li>
            <li><strong>Offline Progress:</strong> Your generators keep working even when you close the game!</li>
          </ul>
        </div>
        
        <button className="btn-neon" style={{ width: '100%', marginTop: '30px', padding: '12px' }} onClick={onClose}>
          ACKNOWLEDGE
        </button>
      </div>
    </div>
  );
};
