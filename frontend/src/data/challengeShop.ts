export interface ChallengeShopUpgrade {
  id: string;
  name: string;
  description: string;
  getEffectString: (level: number) => string;
  baseCost: number;
  costScaling: number;
  scalingType: 'linear' | 'exponential';
  maxLevel: number | null;
}

export const challengeShop: ChallengeShopUpgrade[] = [
  {
    id: 'cosmic_resonance',
    name: 'Cosmic Resonance',
    description: 'Boosts global production based on unspent Challenge Points.',
    getEffectString: (level) => `+${((Math.log10(2) * level * 0.5) * 100).toFixed(1)}% per Log10(CP)`,
    baseCost: 1,
    costScaling: 1,
    scalingType: 'linear',
    maxLevel: null
  },
  {
    id: 'knowledge_leak',
    name: 'Knowledge Leak',
    description: 'Passively generates a percentage of your base KF/sec without Research Mode.',
    getEffectString: (level) => `${level * 1}% of base KF/sec`,
    baseCost: 5,
    costScaling: 1.5,
    scalingType: 'exponential',
    maxLevel: 50
  },
  {
    id: 'prestige_power',
    name: 'Prestige Power',
    description: 'Increases the base production multiplier awarded per Prestige Level.',
    getEffectString: (level) => `+${(level * 0.02 * 100).toFixed(1)}% per Prestige Level`,
    baseCost: 15,
    costScaling: 2.5,
    scalingType: 'exponential',
    maxLevel: null
  },
  {
    id: 'autobuyer_network',
    name: 'Autobuyer Network',
    description: 'Compresses the cost scaling multiplier of all generators.',
    getEffectString: (level) => `Cost Multipliers compressed by ${((1 - Math.pow(0.95, Math.min(25, level))) * 100).toFixed(1)}%`,
    baseCost: 10,
    costScaling: 2.0,
    scalingType: 'exponential',
    maxLevel: 25
  },
  {
    id: 'milestone_resonance',
    name: 'Milestone Resonance',
    description: 'Raises Milestone multipliers to a fractional exponent.',
    getEffectString: (level) => `Milestones ^${(1 + 0.25 * (1 - Math.pow(0.85, level))).toFixed(3)}`,
    baseCost: 30,
    costScaling: 3.0,
    scalingType: 'exponential',
    maxLevel: null
  },
  {
    id: 'research_overclock',
    name: 'Research Overclock',
    description: 'Your Total Research levels act as a massive global multiplier.',
    getEffectString: (level) => `Base ^Total Researches (Base: ${(1.01 + level * 0.001).toFixed(3)})`,
    baseCost: 50,
    costScaling: 4.0,
    scalingType: 'exponential',
    maxLevel: null
  },
  {
    id: 'skill_empowerment',
    name: 'Skill Empowerment',
    description: 'Extends Active Skill duration and increases their multiplier exponent.',
    getEffectString: (level) => `+${(Math.min(20, level) * 10).toFixed(0)}% Duration, Exponent ^${(1 + Math.min(20, level) * 0.05).toFixed(2)}`,
    baseCost: 20,
    costScaling: 2.0,
    scalingType: 'exponential',
    maxLevel: 20
  }
];

export const getChallengeUpgradeCost = (upgrade: ChallengeShopUpgrade, currentLevel: number): number => {
  if (currentLevel >= (upgrade.maxLevel || Infinity)) {
    return Infinity;
  }
  if (upgrade.scalingType === 'linear') {
    return upgrade.baseCost + (currentLevel * upgrade.costScaling);
  } else {
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costScaling, currentLevel));
  }
};

export const getCosmicResonanceMult = (unspentCP: number, lvl: number): number => {
  return 1 + (Math.log10(Math.max(0, unspentCP) + 1) * lvl * 0.5);
};

export const getCompressedCostMultiplier = (baseMult: number, lvl: number): number => {
  if (lvl <= 0) return baseMult;
  const compressed = 1 + ((baseMult - 1) * Math.pow(0.95, Math.min(25, lvl)));
  return Math.max(1.05, compressed);
};

export const getMilestoneResonanceExponent = (lvl: number): number => {
  return 1 + 0.25 * (1 - Math.pow(0.85, lvl));
};

export const getSkillEmpowermentMultiplierExponent = (lvl: number): number => {
  return 1 + (Math.min(20, lvl) * 0.05);
};

export const getSkillEmpowermentDurationMultiplier = (lvl: number): number => {
  return 1 + (Math.min(20, lvl) * 0.1);
};

export const getResearchOverclockMultiplier = (totalResearches: number, lvl: number): number => {
  return Math.pow(1.01 + (lvl * 0.001), totalResearches);
};
