import type { Layout } from 'react-grid-layout';

export type AiWidgetType =
  | 'map'
  | 'response-info'
  | 'bar'
  | 'pie'
  | 'line'
  | 'donut'
  | 'scoring-trend'
  | 'gauge'
  | 'scoring-donut'
  | 'benchmark'
  | 'semi-circle'
  | 'leaderboard'
  | 'image-bar'
  | 'pictorial'
  | 'stackbar'
  | 'tabular'
  | 'stat-highlight';

export interface AiWidgetConfig {
  id: string;
  type: AiWidgetType;
  title: string;
}

const DEFAULT_W = 1;
const DEFAULT_H = 1;

export const AI_DASHBOARD_WIDGETS: AiWidgetConfig[] = [
  { id: 'w-map', type: 'map', title: 'Map' },
  { id: 'w-response', type: 'response-info', title: 'Response Info' },
  { id: 'w-bar', type: 'bar', title: 'Age' },
  { id: 'w-nps-benchmark', type: 'benchmark', title: 'NPS benchmark' },
];

/** Fixed column count — keeps widget positions when the main area narrows (e.g. sidebar expand). */
export const AI_DASHBOARD_GRID_COLS = 2;

/** Initial grid positions — each item is 500×500px (1×1 at rowHeight 500, margin 20). */
export const AI_DASHBOARD_LAYOUT: Layout = [
  { i: 'w-map', x: 0, y: 0, w: DEFAULT_W, h: DEFAULT_H, minW: 1, minH: 1 },
  { i: 'w-response', x: 1, y: 0, w: DEFAULT_W, h: DEFAULT_H, minW: 1, minH: 1 },
  { i: 'w-bar', x: 0, y: 1, w: DEFAULT_W, h: DEFAULT_H, minW: 1, minH: 1 },
  { i: 'w-nps-benchmark', x: 1, y: 1, w: DEFAULT_W, h: DEFAULT_H, minW: 1, minH: 1 },
];

export function createSeededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

export function randomInt(rand: () => number, min: number, max: number): number {
  return Math.floor(rand() * (max - min + 1)) + min;
}

export function randomPercent(rand: () => number): number {
  return Math.round(rand() * 1000) / 10;
}
