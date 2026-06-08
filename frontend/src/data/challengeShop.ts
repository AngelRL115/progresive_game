export interface ChallengeUpgrade {
  id: string;
  name: string;
  description: string;
  category: 'Production' | 'Laboratory' | 'Economy' | 'Utility';
  baseCost: number;
  costMultiplier: number;
  maxLevel: number; // 0 for infinite
}

export const challengeUpgrades: ChallengeUpgrade[] = [
  {
    id: 'cs_resonance',
    name: 'Cosmic Resonance',
    description: '+10% Base global multiplier per level (Additive to milestones).',
    category: 'Production',
    baseCost: 1,
    costMultiplier: 1.5,
    maxLevel: 0,
  },
  {
    id: 'cs_milestone',
    name: 'Milestone Reduction',
    description: 'Milestones occur 1 level earlier per upgrade level.',
    category: 'Production',
    baseCost: 5,
    costMultiplier: 3.0,
    maxLevel: 5,
  },
  {
    id: 'cs_expansion',
    name: 'Quantum Expansion',
    description: '+10% Quantum Credits generation per level.',
    category: 'Economy',
    baseCost: 2,
    costMultiplier: 1.5,
    maxLevel: 0,
  },
  {
    id: 'cs_leak',
    name: 'Knowledge Leak',
    description: '+5% Knowledge Fragments generation per level.',
    category: 'Laboratory',
    baseCost: 2,
    costMultiplier: 1.5,
    maxLevel: 0,
  },
  {
    id: 'cs_overdrive',
    name: 'Autobuyer Overdrive',
    description: 'Auto-buyers execute 1 extra purchase cycle per tick per level.',
    category: 'Utility',
    baseCost: 3,
    costMultiplier: 2.0,
    maxLevel: 0,
  },
  {
    id: 'cs_chrono',
    name: 'Chronosphere',
    description: '+5% Offline progress efficiency per level.',
    category: 'Utility',
    baseCost: 1,
    costMultiplier: 1.25,
    maxLevel: 10,
  },
  {
    id: 'cs_empowerment',
    name: 'Skill Empowerment',
    description: 'Active skills duration increased by 10% per level.',
    category: 'Utility',
    baseCost: 2,
    costMultiplier: 1.75,
    maxLevel: 10,
  }
];
