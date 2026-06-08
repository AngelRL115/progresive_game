import { create } from 'zustand';

export interface Generator {
  id: string;
  name: string;
  baseCost: number;
  baseOutput: number;
  level: number;
  costMultiplier: number;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  costMultiplier?: number;
  multiplier: number;
  purchased: boolean;
  targetGeneratorId?: string;
  
  isTemporary?: boolean;
  activeUntil?: number | null;
  baseDurationMs?: number;
  durationLevel?: number;
  cooldownMs?: number;
  cooldownUntil?: number | null;
}

export interface Perk {
  id: string;
  name: string;
  description: string;
  cost: number;
  purchased: boolean;
  effectType: 'discount' | 'offline_boost' | 'qc_rate' | 'lab_discount' | 'kf_boost' | 'cooldown_reduction' | 'research_efficiency' | 'early_discount' | 'global_boost';
  effectValue: number;
}

export interface Research {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  level: number;
}

export interface GameState {
  points: number;
  pointsRate: number;
  credits: number;
  qcRate: number;
  knowledgeFragments: number;
  kfRate: number;
  isResearchMode: boolean;
  lastSaved: number;
  generators: Generator[];
  upgrades: Upgrade[];
  perks: Perk[];
  researches: Research[];
  prestigeLevel: number;
  lifetimePoints: number;
  
  autoBuyers: Record<string, { unlocked: boolean; active: boolean }>;
  
  achievements: string[];
  statistics: {
    totalClicks: number;
    skillsActivated: number;
    timePlayed: number;
    prestigesDone: number;
  };
  
  activeTab: string;
  setActiveTab: (tab: string) => void;
  toggleResearchMode: () => void;
  checkAchievements: () => void;

  unlockAutoBuyer: (genId: string) => void;
  toggleAutoBuyer: (genId: string) => void;

  addPoints: (amount: number) => void;
  buyGeneratorLevel: (id: string) => void;
  buyUpgrade: (id: string) => void;
  buyPerk: (id: string) => void;
  buyResearchLevel: (id: string) => void;
  activateAbility: (id: string) => void;
  prestigeReset: () => void;
  loadState: (state: Partial<GameState>) => void;
  tick: (deltaTimeMs: number) => void;
  calculateOfflineProgress: (lastTime: number) => void;
}

const initialGenerators: Generator[] = [
  { id: 'gen1', name: 'Hyperion Core', baseCost: 50, baseOutput: 1, level: 0, costMultiplier: 1.35 },
  { id: 'gen2', name: 'Nebula Condenser', baseCost: 500, baseOutput: 5, level: 0, costMultiplier: 1.45 },
  { id: 'gen3', name: 'Quantum Reactor', baseCost: 5000, baseOutput: 50, level: 0, costMultiplier: 1.55 },
  { id: 'gen4', name: 'Void Extractors', baseCost: 75000, baseOutput: 500, level: 0, costMultiplier: 1.60 },
  { id: 'gen5', name: 'Stellar Forge', baseCost: 1000000, baseOutput: 5000, level: 0, costMultiplier: 1.65 },
  { id: 'gen6', name: 'Galactic Core', baseCost: 25000000, baseOutput: 75000, level: 0, costMultiplier: 1.70 },
  { id: 'gen7', name: 'Dark Matter Loom', baseCost: 800000000, baseOutput: 1000000, level: 0, costMultiplier: 1.75 },
  { id: 'gen8', name: 'Singularity Engine', baseCost: 50000000000, baseOutput: 25000000, level: 0, costMultiplier: 1.80 },
  { id: 'gen9', name: 'Cosmic Web Weaver', baseCost: 5e12, baseOutput: 1.5e9, level: 0, costMultiplier: 1.85 },
  { id: 'gen10', name: 'Multiverse Siphon', baseCost: 1e15, baseOutput: 1e11, level: 0, costMultiplier: 1.90 },
  { id: 'gen11', name: 'Dimensional Rift', baseCost: 5e17, baseOutput: 1.5e13, level: 0, costMultiplier: 1.95 },
  { id: 'gen12', name: 'Omniverse Nexus', baseCost: 1e20, baseOutput: 1e15, level: 0, costMultiplier: 2.00 },
];

const initialUpgrades: Upgrade[] = [
  { 
    id: 'up1', name: 'Galaxy Boost', description: 'x2 Hyperion Core production', 
    cost: 500, costMultiplier: 2.5, multiplier: 2, purchased: false, targetGeneratorId: 'gen1',
    isTemporary: true, activeUntil: null, baseDurationMs: 5000, durationLevel: 0, cooldownMs: 15000, cooldownUntil: null
  },
  { 
    id: 'up_temp2', name: 'Nebula Overclock', description: 'x3 Nebula Condenser production', 
    cost: 5000, costMultiplier: 3.0, multiplier: 3, purchased: false, targetGeneratorId: 'gen2',
    isTemporary: true, activeUntil: null, baseDurationMs: 4000, durationLevel: 0, cooldownMs: 30000, cooldownUntil: null
  },
  { id: 'up2', name: 'Core Optimization', description: 'x2 Global production', cost: 10000, multiplier: 2, purchased: false },
  { id: 'up3', name: 'Nebula Synergy', description: 'x3 Nebula Condenser production', cost: 75000, multiplier: 3, purchased: false, targetGeneratorId: 'gen2' },
  { id: 'up4', name: 'Quantum Tunneling', description: 'x5 Quantum Reactor production', cost: 500000, multiplier: 5, purchased: false, targetGeneratorId: 'gen3' },
  { id: 'up5', name: 'Void Resonance', description: 'x10 Void Extractor production', cost: 5000000, multiplier: 10, purchased: false, targetGeneratorId: 'gen4' },
];

const initialPerks: Perk[] = [
  { id: 'p1', name: 'Efficient Construction', description: 'Reduces generator base costs by 15%', cost: 15, purchased: false, effectType: 'discount', effectValue: 0.85 },
  { id: 'p2', name: 'Quantum Processor', description: 'Doubles Quantum Credit generation', cost: 50, purchased: false, effectType: 'qc_rate', effectValue: 2 },
  { id: 'p3', name: 'Chronos Capacitor', description: 'Offline progress is 50% more effective', cost: 150, purchased: false, effectType: 'offline_boost', effectValue: 1.5 },
  { id: 'p4', name: 'Deep Space Scanners', description: 'Generators cost 25% less', cost: 300, purchased: false, effectType: 'discount', effectValue: 0.75 },
  { id: 'p5', name: 'Academic Grant', description: 'Laboratory costs reduced by 25%', cost: 600, purchased: false, effectType: 'lab_discount', effectValue: 0.75 },
  { id: 'p6', name: 'Neural Link', description: 'Knowledge Fragments generate 2x faster', cost: 1200, purchased: false, effectType: 'kf_boost', effectValue: 2 },
  { id: 'p7', name: 'Eternal Cooldowns', description: 'Ability cooldowns are 25% faster', cost: 2500, purchased: false, effectType: 'cooldown_reduction', effectValue: 0.75 },
  { id: 'p8', name: 'Knowledge Expansion', description: 'Research Mode sacrifices only 25% Energy', cost: 5000, purchased: false, effectType: 'research_efficiency', effectValue: 0.25 },
  { id: 'p9', name: 'Stellar Automation', description: 'First 10 levels of all generators are 50% cheaper', cost: 10000, purchased: false, effectType: 'early_discount', effectValue: 0.5 },
  { id: 'p10', name: 'Quantum Singularity', description: 'Doubles global production', cost: 25000, purchased: false, effectType: 'global_boost', effectValue: 2 },
];

const initialResearches: Research[] = [
  { id: 'r1', name: 'Energy Condenser', description: '+7% global production compounding per level', baseCost: 10, costMultiplier: 1.85, level: 0 },
  { id: 'r2', name: 'Quantum Acceleration', description: '+15% QC rate compounding per level', baseCost: 50, costMultiplier: 2.0, level: 0 },
  { id: 'r3', name: 'Chronos Mastery', description: '+10% Offline Progress per level (Max Lvl 10)', baseCost: 100, costMultiplier: 1.75, level: 0 },
  { id: 'r4', name: 'Cosmic Architecture', description: '-5% to Generator cost multiplier per level (compounding)', baseCost: 200, costMultiplier: 2.5, level: 0 },
  { id: 'r5', name: 'Prestige Resonance', description: '+1% to Prestige Base Multiplier', baseCost: 500, costMultiplier: 2.1, level: 0 },
  { id: 'r6', name: 'Quantum Recycling', description: 'Auto-buyers have (Lvl*2.5)% chance to generate 1s of KF', baseCost: 250, costMultiplier: 2.0, level: 0 },
  { id: 'r7', name: 'Dark Energy Synth', description: '+50% Active Skill power per level', baseCost: 100, costMultiplier: 1.9, level: 0 },
  { id: 'r8', name: 'Milestone Cascade', description: 'Milestones on Gen X grant Virtual Levels to Gen X+1', baseCost: 1000, costMultiplier: 3.0, level: 0 },
];

export const getMilestoneMultiplier = (level: number) => {
  let mult = 1;
  if (level >= 10) mult *= 2;
  if (level >= 25) mult *= 2; // total 4
  if (level >= 50) mult *= 2.5; // total 10
  if (level >= 100) mult *= 5; // total 50
  if (level >= 200) mult *= 10; // total 500
  if (level >= 300) mult *= 10;
  if (level >= 400) mult *= 10;
  if (level >= 500) mult *= 10;
  
  if (level > 500) {
    const extra = Math.floor((level - 500) / 100);
    mult *= Math.pow(10, extra);
  }
  return mult;
};

export const getMilestoneTier = (level: number) => {
  let tier = 0;
  if (level >= 10) tier++;
  if (level >= 25) tier++;
  if (level >= 50) tier++;
  if (level >= 100) tier++;
  if (level >= 200) tier++;
  if (level >= 300) tier++;
  if (level >= 400) tier++;
  if (level >= 500) tier++;
  if (level > 500) {
    tier += Math.floor((level - 500) / 100);
  }
  return tier;
};

export const checkGeneratorVisibility = (genId: string, generators: Generator[], points: number): boolean => {
  const index = generators.findIndex(g => g.id === genId);
  if (index <= 0) return true; // first generator or not found is always visible
  const gen = generators[index];
  if (gen.level > 0) return true;
  if (generators[index - 1].level >= 1) return true;
  if (points >= gen.baseCost * 0.5) return true;
  return false;
};

// Pure function for ticking state
export const executeTick = (state: GameState, deltaTimeMs: number): Partial<GameState> => {
    let generatedPoints = 0;
    let pointsPerSec = 0;
    let generatedCredits = 0;
    let generatedKF = 0;
    const now = Date.now();
    
    // Prestige Base + Research R5
    const prestigeResonance = state.researches.find(r => r.id === 'r5');
    const prestigeBase = 0.1 + (prestigeResonance ? prestigeResonance.level * 0.01 : 0);
    let globalMultiplier = 1 + (state.prestigeLevel * prestigeBase);
    
    // Achievement Global Multipliers
    if (state.achievements) {
      if (state.achievements.includes('ach_e2')) globalMultiplier *= 1.05;
      if (state.achievements.includes('ach_lt1')) globalMultiplier *= 1.02;
      if (state.achievements.includes('ach_p2')) globalMultiplier *= 1.10;
      if (state.achievements.includes('ach_p4')) globalMultiplier *= 1.05;
      if (state.achievements.includes('ach_g2')) globalMultiplier *= 1.10;
      if (state.achievements.includes('ach_g4')) globalMultiplier *= 1.50;
      if (state.achievements.includes('ach_sk1')) globalMultiplier *= 1.01;
    }
    
    // Apply Lab Energy Condenser (R1)
    const energyCondenser = state.researches.find(r => r.id === 'r1');
    if (energyCondenser && energyCondenser.level > 0) {
      globalMultiplier *= Math.pow(1.07, energyCondenser.level);
    }

    // Apply Subatomic Efficiency (old R6, if it exists as legacy in state) - removed, handled by new R6
    
    // Apply Quantum Singularity Perk
    const singularityPerk = state.perks.find(p => p.effectType === 'global_boost' && p.purchased);
    if (singularityPerk) globalMultiplier *= singularityPerk.effectValue;

    const darkEnergy = state.researches.find(r => r.id === 'r7');
    const r7Mult = 1 + (darkEnergy ? darkEnergy.level * 0.5 : 0);

    state.upgrades.filter(u => (!u.isTemporary && u.purchased && !u.targetGeneratorId) || (u.isTemporary && !u.targetGeneratorId && u.activeUntil && u.activeUntil > now)).forEach(u => {
      let m = u.multiplier;
      if (u.isTemporary) m *= r7Mult;
      globalMultiplier *= m;
    });

    let totalLevels = 0;
    
    // R8: Milestone Cascade (O(N) calculation)
    const cascadeRes = state.researches.find(r => r.id === 'r8');
    const cascadeLevel = cascadeRes ? cascadeRes.level : 0;
    
    const virtualLevels = new Array(state.generators.length).fill(0);
    if (cascadeLevel > 0) {
      for (let i = 0; i < state.generators.length - 1; i++) {
        const gen = state.generators[i];
        // Solo cuentan los niveles REALES para empujar hacia abajo, para evitar feedback loops.
        const tier = getMilestoneTier(gen.level);
        virtualLevels[i + 1] = tier * cascadeLevel;
      }
    }

    state.generators.forEach((gen, index) => {
      totalLevels += gen.level;
      const effectiveLevel = gen.level + virtualLevels[index];
      
      if (effectiveLevel > 0) {
        let genMultiplier = getMilestoneMultiplier(effectiveLevel);
        
        // Achievement Gen Multipliers
        if (state.achievements) {
          if (gen.id === 'gen1') {
            if (state.achievements.includes('ach_kf3')) genMultiplier *= 1.50;
            if (state.achievements.includes('ach_g1')) genMultiplier *= 2.0;
          }
          if (['gen5', 'gen6', 'gen7', 'gen8'].includes(gen.id) && state.achievements.includes('ach_m2')) {
            genMultiplier *= 1.10;
          }
        }

        state.upgrades.filter(u => (!u.isTemporary && u.purchased && u.targetGeneratorId === gen.id) || (u.isTemporary && u.targetGeneratorId === gen.id && u.activeUntil && u.activeUntil > now)).forEach(u => {
          let m = u.multiplier;
          if (u.isTemporary) m *= r7Mult;
          genMultiplier *= m;
        });

        const rate = (gen.baseOutput * effectiveLevel * genMultiplier * globalMultiplier);
        pointsPerSec += rate;
        generatedPoints += rate * (deltaTimeMs / 1000);
      }
    });

    // Handle Research Mode
    let kfPerSec = 0;
    if (state.isResearchMode) {
      const researchEffPerk = state.perks.find(p => p.effectType === 'research_efficiency' && p.purchased);
      const sacrificeRatio = researchEffPerk ? researchEffPerk.effectValue : 0.5;

      const divertedEnergy = generatedPoints * sacrificeRatio;
      generatedPoints -= divertedEnergy;
      pointsPerSec *= (1 - sacrificeRatio);

      const kfBoostPerk = state.perks.find(p => p.effectType === 'kf_boost' && p.purchased);
      let kfMult = kfBoostPerk ? kfBoostPerk.effectValue : 1;
      
      if (state.achievements) {
        if (state.achievements.includes('ach_lt2')) kfMult *= 1.05;
        if (state.achievements.includes('ach_kf1')) kfMult *= 1.01;
        if (state.achievements.includes('ach_g3')) kfMult *= 1.10;
      }

      // Base KF generation Opción B: Math.pow(Puntos/s, 0.65) * 0.001
      kfPerSec = (Math.pow(pointsPerSec, 0.65) * 0.001) * kfMult; 
      generatedKF = kfPerSec * (deltaTimeMs / 1000);
    }

    // QC Rate
    const qcPerk = state.perks.find(p => p.effectType === 'qc_rate' && p.purchased);
    const qcAccel = state.researches.find(r => r.id === 'r2');
    let qcAccelMult = 1 + (qcAccel ? qcAccel.level * 0.05 : 0);
    
    if (state.achievements) {
      if (state.achievements.includes('ach_p1')) qcAccelMult *= 1.01;
      if (state.achievements.includes('ach_p3')) qcAccelMult *= 1.05;
      if (state.achievements.includes('ach_qc1')) qcAccelMult *= 1.02;
      if (state.achievements.includes('ach_ab2')) qcAccelMult *= 1.10;
    }

    const qcPerSec = (totalLevels * 0.0001) * (qcPerk ? qcPerk.effectValue : 1) * qcAccelMult;
    generatedCredits += qcPerSec * (deltaTimeMs / 1000);

    let newPoints = state.points + generatedPoints;
    let updatedGenerators = [...state.generators];

    // Auto-Buyers logic (from highest to lowest to prioritize expensive generators if unlocked)
    if (state.autoBuyers) {
      let quantumRecycleTriggered = false;
      const subatomicEff = state.researches.find(r => r.id === 'r6');
      
      for (let i = updatedGenerators.length - 1; i >= 0; i--) {
        const gen = updatedGenerators[i];
        const ab = state.autoBuyers[gen.id];
        if (ab && ab.unlocked && ab.active) {
          const discountPerk = state.perks.find(p => p.effectType === 'discount' && p.purchased);
          let baseDiscount = discountPerk ? discountPerk.effectValue : 1;
          const cosmicArch = state.researches.find(r => r.id === 'r4');
          if (cosmicArch && cosmicArch.level > 0) {
            baseDiscount *= Math.pow(0.95, cosmicArch.level);
          }

          let discount = baseDiscount;
          const earlyDiscount = state.perks.find(p => p.effectType === 'early_discount' && p.purchased);
          if (earlyDiscount && gen.level < 10) discount *= earlyDiscount.effectValue;

          let currentLevel = gen.level;
          let cost = Math.floor(gen.baseCost * discount * Math.pow(gen.costMultiplier, currentLevel));
          
          let bought = false;
          while (newPoints >= cost) {
            newPoints -= cost;
            currentLevel++;
            bought = true;
            
            // Re-evaluate discount if we crossed 10
            if (earlyDiscount && currentLevel === 10) {
              discount = baseDiscount; 
            }
            cost = Math.floor(gen.baseCost * discount * Math.pow(gen.costMultiplier, currentLevel));
          }
          if (bought) {
            updatedGenerators[i] = { ...gen, level: currentLevel };
            
            // R6 Quantum Recycling logic
            if (!quantumRecycleTriggered && subatomicEff && subatomicEff.level > 0) {
              const chance = subatomicEff.level * 0.025;
              if (Math.random() < chance) {
                // Generate 1s worth of KF if research mode is active, otherwise base points
                const kfGained = kfPerSec > 0 ? kfPerSec : (Math.pow(pointsPerSec, 0.65) * 0.001);
                generatedKF += kfGained;
                quantumRecycleTriggered = true;
              }
            }
          }
        }
      }
    }

    return {
      points: newPoints,
      pointsRate: pointsPerSec,
      lifetimePoints: state.lifetimePoints + generatedPoints,
      credits: state.credits + generatedCredits,
      qcRate: qcPerSec,
      knowledgeFragments: state.knowledgeFragments + generatedKF,
      kfRate: kfPerSec,
      lastSaved: now,
      generators: updatedGenerators
    };
};

export const useGameStore = create<GameState>((set, get) => ({
  points: 0,
  pointsRate: 0,
  credits: 0,
  qcRate: 0,
  knowledgeFragments: 0,
  kfRate: 0,
  isResearchMode: false,
  lastSaved: Date.now(),
  generators: initialGenerators,
  upgrades: initialUpgrades,
  perks: initialPerks,
  researches: initialResearches,
  prestigeLevel: 0,
  lifetimePoints: 0,
  activeTab: 'UPGRADES',

  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleResearchMode: () => set(state => ({ isResearchMode: !state.isResearchMode })),
  
  checkAchievements: () => {
    import('../data/achievements').then(({ achievements: achList }) => {
      const state = get();
      if (!state.achievements) return;
      
      const newAchievements = achList
        .filter(a => !state.achievements.includes(a.id))
        .filter(a => a.condition(state))
        .map(a => a.id);
        
      if (newAchievements.length > 0) {
        set(s => ({ achievements: [...s.achievements, ...newAchievements] }));
      }
    });
  },

  autoBuyers: {},
  achievements: [],
  statistics: {
    totalClicks: 0,
    skillsActivated: 0,
    timePlayed: 0,
    prestigesDone: 0
  },
  
  unlockAutoBuyer: (genId) => set((state) => {
    const index = state.generators.findIndex(g => g.id === genId);
    if (index === -1) return state;
    const cost = 25 * Math.pow(2, index);
    
    if (state.credits >= cost && !state.autoBuyers[genId]?.unlocked) {
      return {
        credits: state.credits - cost,
        autoBuyers: {
          ...state.autoBuyers,
          [genId]: { unlocked: true, active: true }
        }
      };
    }
    return state;
  }),

  toggleAutoBuyer: (genId) => set((state) => {
    const ab = state.autoBuyers[genId];
    if (!ab || !ab.unlocked) return state;
    return {
      autoBuyers: {
        ...state.autoBuyers,
        [genId]: { ...ab, active: !ab.active }
      }
    };
  }),

  addPoints: (amount) => set((state) => ({ 
    points: state.points + amount,
    lifetimePoints: state.lifetimePoints + amount,
    statistics: { ...state.statistics, totalClicks: state.statistics.totalClicks + 1 }
  })),
  
  buyGeneratorLevel: (id) => set((state) => {
    const gen = state.generators.find(g => g.id === id);
    if (!gen) return state;
    
    let discount = 1;
    state.perks.forEach(p => {
      if (p.effectType === 'discount' && p.purchased) discount *= p.effectValue;
    });

    const earlyDiscount = state.perks.find(p => p.effectType === 'early_discount' && p.purchased);
    if (earlyDiscount && gen.level < 10) {
      discount *= earlyDiscount.effectValue;
    }

    const cosmicArch = state.researches.find(r => r.id === 'r4');
    if (cosmicArch && cosmicArch.level > 0) {
      discount *= Math.pow(0.95, cosmicArch.level);
    }
    
    const cost = Math.floor(gen.baseCost * discount * Math.pow(gen.costMultiplier, gen.level));
    if (state.points >= cost) {
      return {
        points: state.points - cost,
        generators: state.generators.map(g => g.id === id ? { ...g, level: g.level + 1 } : g)
      };
    }
    return state;
  }),

  buyUpgrade: (id) => set((state) => {
    const upgrade = state.upgrades.find(u => u.id === id);
    if (!upgrade) return state;
    
    if (upgrade.isTemporary) {
      if (state.points >= upgrade.cost) {
        return {
          points: state.points - upgrade.cost,
          upgrades: state.upgrades.map(u => 
            u.id === id ? { ...u, durationLevel: (u.durationLevel || 0) + 1, cost: Math.floor(u.cost * (u.costMultiplier || 1.5)) } : u
          )
        };
      }
    } else if (!upgrade.purchased) {
      if (state.points >= upgrade.cost) {
        return {
          points: state.points - upgrade.cost,
          upgrades: state.upgrades.map(u => u.id === id ? { ...u, purchased: true } : u)
        };
      }
    }
    return state;
  }),

  buyPerk: (id) => set((state) => {
    const perk = state.perks.find(p => p.id === id);
    if (!perk || perk.purchased) return state;
    
    if (state.credits >= perk.cost) {
      return {
        credits: state.credits - perk.cost,
        perks: state.perks.map(p => p.id === id ? { ...p, purchased: true } : p)
      };
    }
    return state;
  }),

  buyResearchLevel: (id) => set((state) => {
    const res = state.researches.find(r => r.id === id);
    if (!res) return state;

    const labDiscount = state.perks.find(p => p.effectType === 'lab_discount' && p.purchased);
    let discount = labDiscount ? labDiscount.effectValue : 1;
    
    if (state.achievements) {
      if (state.achievements.includes('ach_lt3')) discount *= 0.95;
      if (state.achievements.includes('ach_kf2')) discount *= 0.98;
    }

    const cost = Math.floor(res.baseCost * discount * Math.pow(res.costMultiplier, res.level));
    if (state.knowledgeFragments >= cost) {
      return {
        knowledgeFragments: state.knowledgeFragments - cost,
        researches: state.researches.map(r => r.id === id ? { ...r, level: r.level + 1 } : r)
      };
    }
    return state;
  }),

  activateAbility: (id) => set((state) => {
    const upgrade = state.upgrades.find(u => u.id === id);
    if (!upgrade || !upgrade.isTemporary) return state;
    const now = Date.now();
    if (upgrade.cooldownUntil && now < upgrade.cooldownUntil) return state;
    
    const cooldownPerk = state.perks.find(p => p.effectType === 'cooldown_reduction' && p.purchased);
    let cdMult = cooldownPerk ? cooldownPerk.effectValue : 1;

    // Achievement rewards
    let bonusDuration = 0;
    if (state.achievements.includes('ach_sk2')) bonusDuration += 2000;
    if (state.achievements.includes('ach_sk3')) cdMult *= 0.9;

    const duration = (upgrade.baseDurationMs || 0) + ((upgrade.durationLevel || 0) * 1000) + bonusDuration;
    return {
      upgrades: state.upgrades.map(u => u.id === id ? { ...u, activeUntil: now + duration, cooldownUntil: now + duration + ((u.cooldownMs || 10000) * cdMult) } : u),
      statistics: { ...state.statistics, skillsActivated: state.statistics.skillsActivated + 1 }
    };
  }),

  prestigeReset: () => set((state) => {
    const targetPrestigeLevel = Math.floor(Math.sqrt(state.lifetimePoints / 1000000));
    const prestigeGain = targetPrestigeLevel - state.prestigeLevel;
    
    if (prestigeGain <= 0) return state;

    let initialPoints = 0;
    if (state.achievements.includes('ach_e1')) initialPoints += 50;

    return {
      points: initialPoints,
      prestigeLevel: targetPrestigeLevel,
      generators: initialGenerators,
      upgrades: state.upgrades.map(u => ({ ...u, purchased: false, durationLevel: 0, cost: initialUpgrades.find(iu => iu.id === u.id)?.cost || u.cost })),
      isResearchMode: false,
      activeTab: 'PRESTIGE',
      statistics: { ...state.statistics, prestigesDone: state.statistics.prestigesDone + 1 }
    };
  }),

  loadState: (savedState) => set((state) => ({
    ...state,
    ...savedState,
    generators: state.generators.map(g => {
      const savedG = savedState.generators?.find(sg => sg.id === g.id);
      return savedG ? { ...g, level: savedG.level } : g;
    }),
    upgrades: state.upgrades.map(u => {
      const savedU = savedState.upgrades?.find(su => su.id === u.id);
      return savedU ? { ...u, purchased: savedU.purchased, durationLevel: savedU.durationLevel || 0 } : u;
    }),
    perks: state.perks.map(p => {
      const savedP = savedState.perks?.find(sp => sp.id === p.id);
      return savedP ? { ...p, purchased: savedP.purchased } : p;
    }),
    researches: state.researches.map(r => {
      const savedR = savedState.researches?.find(sr => sr.id === r.id);
      return savedR ? { ...r, level: savedR.level } : r;
    }),
    autoBuyers: savedState.autoBuyers || state.autoBuyers,
    achievements: savedState.achievements || [],
    statistics: { ...state.statistics, ...(savedState.statistics || {}) }
  })),

  tick: (deltaTimeMs) => set((state) => executeTick(state, deltaTimeMs)),

  calculateOfflineProgress: (lastTime) => set((state) => {
    const now = Date.now();
    const diffMs = now - lastTime;
    if (diffMs > 0) {
      const offlinePerk = state.perks.find(p => p.effectType === 'offline_boost' && p.purchased);
      let boost = offlinePerk ? offlinePerk.effectValue : 1;

      const chronosMastery = state.researches.find(r => r.id === 'r3');
      if (chronosMastery && chronosMastery.level > 0) {
        boost += (chronosMastery.level * 0.1);
      }
      
      if (state.achievements) {
        if (state.achievements.includes('ach_e3')) boost += 0.05;
        if (state.achievements.includes('ach_qc2')) boost += 0.10;
        if (state.achievements.includes('ach_ab1')) boost += 0.05;
        if (state.achievements.includes('ach_m1')) boost += 0.05;
      }

      const effectiveDiff = diffMs * boost;
      
      const maxIterations = 10000;
      let chunkMs = 1000;
      let iterations = Math.ceil(effectiveDiff / chunkMs);
      
      if (iterations > maxIterations) {
        chunkMs = effectiveDiff / maxIterations;
        iterations = maxIterations;
      }
      
      let simState = { ...state };
      
      // Time played achievement logic
      if (!simState.statistics) {
        simState.statistics = { totalClicks: 0, skillsActivated: 0, timePlayed: 0, prestigesDone: 0 };
      }
      simState.statistics.timePlayed += (diffMs / 1000);

      let remaining = effectiveDiff;
      
      for (let i = 0; i < iterations; i++) {
        const step = Math.min(chunkMs, remaining);
        const changes = executeTick(simState, step);
        simState = { ...simState, ...changes };
        remaining -= step;
      }
      
      console.log(`Calculated ${diffMs}ms of offline progress (Effective: ${effectiveDiff}ms) over ${iterations} chunks.`);
      return simState;
    }
    return state;
  })
}));
