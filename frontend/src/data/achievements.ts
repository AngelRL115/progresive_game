import type { GameState } from '../store/gameStore';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: 'energy' | 'lifetime' | 'prestige' | 'kf' | 'qc' | 'generators' | 'autobuyers' | 'skills' | 'misc';
  condition: (state: GameState) => boolean;
  rewardType: 'global_mult' | 'gen_mult' | 'qc_rate' | 'kf_rate' | 'lab_discount' | 'offline_boost' | 'starting_points' | 'skill_cooldown' | 'skill_duration';
  rewardValue: number;
  rewardText: string;
}

export const achievements: Achievement[] = [
  // ENERGY
  {
    id: 'ach_e1',
    name: 'Primera Chispa',
    description: 'Genera 100 EP en total.',
    category: 'energy',
    condition: (state) => state.lifetimePoints >= 100,
    rewardType: 'starting_points',
    rewardValue: 50,
    rewardText: '+50 Energía inicial al hacer Prestigio'
  },
  {
    id: 'ach_e2',
    name: 'Cosechador de Estrellas',
    description: 'Acumula 1 Billón (1e9) EP totales.',
    category: 'energy',
    condition: (state) => state.lifetimePoints >= 1e9,
    rewardType: 'global_mult',
    rewardValue: 0.05,
    rewardText: '+5% Producción Global'
  },
  {
    id: 'ach_e3',
    name: 'Acaparador Galáctico',
    description: 'Acumula 1e15 EP totales.',
    category: 'energy',
    condition: (state) => state.lifetimePoints >= 1e15,
    rewardType: 'offline_boost',
    rewardValue: 0.05,
    rewardText: '+5% Velocidad Offline'
  },

  // LIFETIME
  {
    id: 'ach_lt1',
    name: 'Un Nuevo Universo',
    description: 'Alcanza 1 Millón de EP Históricos.',
    category: 'lifetime',
    condition: (state) => state.lifetimePoints >= 1000000,
    rewardType: 'global_mult',
    rewardValue: 0.02,
    rewardText: '+2% Producción Global'
  },
  {
    id: 'ach_lt2',
    name: 'Legado Cuántico',
    description: 'Alcanza 1 Trillón (1e18) EP Históricos.',
    category: 'lifetime',
    condition: (state) => state.lifetimePoints >= 1e18,
    rewardType: 'kf_rate',
    rewardValue: 0.05,
    rewardText: '+5% Generación de Knowledge Fragments'
  },
  {
    id: 'ach_lt3',
    name: 'Más Allá del Fin',
    description: 'Alcanza 1e21 EP Históricos.',
    category: 'lifetime',
    condition: (state) => state.lifetimePoints >= 1e21,
    rewardType: 'lab_discount',
    rewardValue: 0.05,
    rewardText: '-5% Costo de Laboratorio'
  },

  // PRESTIGE
  {
    id: 'ach_p1',
    name: 'Reencarnación',
    description: 'Haz Prestigio por primera vez.',
    category: 'prestige',
    condition: (state) => state.statistics.prestigesDone >= 1,
    rewardType: 'qc_rate',
    rewardValue: 0.01,
    rewardText: '+1% Tasa de QC'
  },
  {
    id: 'ach_p2',
    name: 'Viajero del Tiempo',
    description: 'Alcanza el Nivel 10 de Prestigio.',
    category: 'prestige',
    condition: (state) => state.prestigeLevel >= 10,
    rewardType: 'global_mult',
    rewardValue: 0.1,
    rewardText: '+10% Producción Global'
  },
  {
    id: 'ach_p3',
    name: 'Señor del Multiverso',
    description: 'Alcanza el Nivel 1,000 de Prestigio.',
    category: 'prestige',
    condition: (state) => state.prestigeLevel >= 1000,
    rewardType: 'qc_rate',
    rewardValue: 0.05,
    rewardText: '+5% Tasa de QC'
  },
  {
    id: 'ach_p4',
    name: 'Entidad Ascendida',
    description: 'Realiza 10 reseteos de Prestigio.',
    category: 'prestige',
    condition: (state) => state.statistics.prestigesDone >= 10,
    rewardType: 'global_mult',
    rewardValue: 0.05,
    rewardText: '+5% Producción Global'
  },

  // KNOWLEDGE FRAGMENTS
  {
    id: 'ach_kf1',
    name: 'Curiosidad',
    description: 'Acumula 100 Knowledge Fragments.',
    category: 'kf',
    condition: (state) => state.knowledgeFragments >= 100,
    rewardType: 'kf_rate',
    rewardValue: 0.01,
    rewardText: '+1% Tasa de Generación KF'
  },
  {
    id: 'ach_kf2',
    name: 'Mente Universal',
    description: 'Acumula 10,000 Knowledge Fragments.',
    category: 'kf',
    condition: (state) => state.knowledgeFragments >= 10000,
    rewardType: 'lab_discount',
    rewardValue: 0.02,
    rewardText: '-2% Costo del Laboratorio'
  },
  {
    id: 'ach_kf3',
    name: 'Omnisciencia',
    description: 'Adquiere 5 niveles en Cosmic Architecture.',
    category: 'kf',
    condition: (state) => (state.researches.find(r => r.id === 'r4')?.level || 0) >= 5,
    rewardType: 'gen_mult',
    rewardValue: 0.5,
    rewardText: '+50% Multiplicador Gen1'
  },

  // QUANTUM CREDITS
  {
    id: 'ach_qc1',
    name: 'Capitalista',
    description: 'Acumula 500 Quantum Credits.',
    category: 'qc',
    condition: (state) => state.credits >= 500,
    rewardType: 'qc_rate',
    rewardValue: 0.02,
    rewardText: '+2% Tasa de QC'
  },
  {
    id: 'ach_qc2',
    name: 'Inversor Cuántico',
    description: 'Acumula 50,000 Quantum Credits.',
    category: 'qc',
    condition: (state) => state.credits >= 50000,
    rewardType: 'offline_boost',
    rewardValue: 0.1,
    rewardText: '+10% Velocidad Offline'
  },

  // GENERATORS
  {
    id: 'ach_g1',
    name: 'Arquitecto Menor',
    description: 'Sube Gen 1 a Nivel 100.',
    category: 'generators',
    condition: (state) => (state.generators.find(g => g.id === 'gen1')?.level || 0) >= 100,
    rewardType: 'gen_mult',
    rewardValue: 1.0,
    rewardText: 'Gen 1 Produce el doble'
  },
  {
    id: 'ach_g2',
    name: 'Balance Perfecto',
    description: 'Ten todos los generadores (1 al 12) a Nivel 10.',
    category: 'generators',
    condition: (state) => state.generators.every(g => g.level >= 10),
    rewardType: 'global_mult',
    rewardValue: 0.1,
    rewardText: '+10% Producción Global'
  },
  {
    id: 'ach_g3',
    name: 'El Último Eslabón',
    description: 'Compra el Generador Omniverse Nexus.',
    category: 'generators',
    condition: (state) => (state.generators.find(g => g.id === 'gen12')?.level || 0) >= 1,
    rewardType: 'kf_rate',
    rewardValue: 0.1,
    rewardText: '+10% Tasa KF'
  },
  {
    id: 'ach_g4',
    name: 'Infinito y Más Allá',
    description: 'Alcanza el Milestone Lvl 500 en cualquier generador.',
    category: 'generators',
    condition: (state) => state.generators.some(g => g.level >= 500),
    rewardType: 'global_mult',
    rewardValue: 0.5,
    rewardText: '+50% Producción Global'
  },

  // AUTOBUYERS
  {
    id: 'ach_ab1',
    name: 'Trabajo Inteligente',
    description: 'Desbloquea 1 Auto-Buyer.',
    category: 'autobuyers',
    condition: (state) => Object.values(state.autoBuyers || {}).some(ab => ab.unlocked),
    rewardType: 'offline_boost',
    rewardValue: 0.05,
    rewardText: '+5% Velocidad Offline'
  },
  {
    id: 'ach_ab2',
    name: 'Cibernética Total',
    description: 'Desbloquea los 12 Auto-Buyers.',
    category: 'autobuyers',
    condition: (state) => Object.values(state.autoBuyers || {}).filter(ab => ab.unlocked).length >= 12,
    rewardType: 'qc_rate',
    rewardValue: 0.1,
    rewardText: '+10% Tasa de QC'
  },

  // SKILLS / CLICKS
  {
    id: 'ach_sk1',
    name: 'Clickeador Nato',
    description: 'Da 100 clics manuales en la pantalla.',
    category: 'skills',
    condition: (state) => state.statistics.totalClicks >= 100,
    rewardType: 'global_mult',
    rewardValue: 0.01,
    rewardText: '+1% Producción Global'
  },
  {
    id: 'ach_sk2',
    name: 'Ráfaga de Poder',
    description: 'Usa habilidades activas 10 veces.',
    category: 'skills',
    condition: (state) => state.statistics.skillsActivated >= 10,
    rewardType: 'skill_duration',
    rewardValue: 2000,
    rewardText: '+2 Segundos de duración de Habilidades'
  },
  {
    id: 'ach_sk3',
    name: 'Paciencia y Tiempo',
    description: 'Usa habilidades activas 100 veces.',
    category: 'skills',
    condition: (state) => state.statistics.skillsActivated >= 100,
    rewardType: 'skill_cooldown',
    rewardValue: 0.1,
    rewardText: '-10% Cooldown de Habilidades'
  },
  
  // MISC
  {
    id: 'ach_m1',
    name: 'Dedicación Absoluta',
    description: 'Juega por más de 1 hora activa.',
    category: 'misc',
    condition: (state) => state.statistics.timePlayed >= 3600,
    rewardType: 'offline_boost',
    rewardValue: 0.05,
    rewardText: '+5% Velocidad Offline'
  }
];
