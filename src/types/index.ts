export type LayerId = 'willow' | 'cisco' | 'network' | 'google';

export interface LayerInfo {
  id: LayerId;
  index: number; // 1 to 4 (top to bottom)
  title: string;
  subtitle: string;
  tag: string;
  badgeColor: string;
  accentColor: string;
  borderColor: string;
  bgGradient: string;
  description: string;
  roleInPenske: string;
  baseLatencyMs: {
    before: number;
    after: number;
  };
  metrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
  keyIssues: {
    title: string;
    description: string;
    impact: string;
    fix: string;
    resolvedBy: 'Google' | 'Cisco' | 'Joint';
    recommendations?: {
      google?: string;
      cisco?: string;
      joint?: string;
    };
  }[];
  recommendationsSummary?: {
    google?: string[];
    cisco?: string[];
  };
  mediaType?: 'waveform' | 'telephony' | 'network' | 'ai';
  techSpecs: {
    key: string;
    value: string;
  }[];
}

export interface LatencyHop {
  id: string;
  layerId: LayerId;
  name: string;
  beforeMs: number;
  afterMs: number;
  description: string;
  status: 'optimal' | 'warning' | 'critical';
  details: string;
}

export interface PenskeCallScenario {
  id: string;
  title: string;
  caller: string;
  utterance: string;
  expectedAction: string;
  totalBeforeMs: number;
  totalAfterMs: number;
  hops: {
    hopId: string;
    layer: LayerId;
    label: string;
    beforeDuration: number;
    afterDuration: number;
    detail: string;
  }[];
}
