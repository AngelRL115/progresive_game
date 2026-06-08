export interface Challenge {
  id: string;
  name: string;
  description: string;
  restrictionText: string;
  baseGoal: number; // Base energy required for tier 1
  goalMultiplier: number; // Multiplier per tier (e.g., 1e3 means 1e10 -> 1e13 -> 1e16)
}

export const challenges: Challenge[] = [
  {
    id: 'ch_void',
    name: 'The Void',
    description: 'A dark dimension where automation ceases to exist. You must rely on manual labor.',
    restrictionText: 'Auto-buyers are completely disabled.',
    baseGoal: 1e10,
    goalMultiplier: 1e3,
  },
  {
    id: 'ch_poverty',
    name: 'Poverty',
    description: 'The universe has stripped you of your accumulated cosmic power. You are just a mortal again.',
    restrictionText: 'Prestige Global Multiplier is forced to x1.0.',
    baseGoal: 1e12,
    goalMultiplier: 1e3,
  },
  {
    id: 'ch_lockdown',
    name: 'Laboratory Lockdown',
    description: 'The cosmic laboratory has been sealed. No new research can be conducted.',
    restrictionText: 'Knowledge Fragments (KF) generation is blocked. Research Mode cannot be activated.',
    baseGoal: 1e14,
    goalMultiplier: 1e4,
  },
  {
    id: 'ch_entanglement',
    name: 'Quantum Entanglement',
    description: 'The threads of reality are tangled. Permanent enhancements have lost their connection to your generators.',
    restrictionText: 'Standard Upgrades (Energy Upgrades) provide no multipliers. Active skills still function.',
    baseGoal: 1e12,
    goalMultiplier: 1e3,
  },
  {
    id: 'ch_dilation',
    name: 'Time Dilation',
    description: 'Time moves like molasses, drastically increasing the physical effort required to build machinery.',
    restrictionText: 'The cost multiplier of all generators is increased by +0.10 (e.g., 1.35 becomes 1.45).',
    baseGoal: 1e13,
    goalMultiplier: 1e3,
  }
];
