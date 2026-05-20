export type SingleSelectChartTypeId =
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

export interface SingleSelectChartType {
  id: SingleSelectChartTypeId;
  name: string;
  imageSrc: string;
  showBetaBadge?: boolean;
}

export const DEFAULT_SINGLE_SELECT_CHART_TYPE_ID: SingleSelectChartTypeId = 'bar';

const BASE = '/images/single-select-widgets';

/** Chart types available for Single Select survey questions. */
export const SINGLE_SELECT_CHART_TYPES: SingleSelectChartType[] = [
  { id: 'bar', name: 'Bar', imageSrc: `${BASE}/bar.svg` },
  { id: 'pie', name: 'Pie', imageSrc: `${BASE}/pie.svg` },
  { id: 'line', name: 'Line', imageSrc: `${BASE}/line.svg` },
  { id: 'donut', name: 'Donut', imageSrc: `${BASE}/donut.svg` },
  { id: 'scoring-trend', name: 'Scoring trend', imageSrc: `${BASE}/scoring_trend.svg` },
  { id: 'gauge', name: 'Gauge', imageSrc: `${BASE}/gauge.svg` },
  { id: 'scoring-donut', name: 'Scoring donut', imageSrc: `${BASE}/scoring_donut.svg` },
  { id: 'benchmark', name: 'Benchmark', imageSrc: `${BASE}/benchmark.svg` },
  { id: 'semi-circle', name: 'Semi-Circle', imageSrc: `${BASE}/semi_circle.svg` },
  { id: 'leaderboard', name: 'Leaderboard', imageSrc: `${BASE}/leaderboard.svg` },
  { id: 'image-bar', name: 'Image bar', imageSrc: `${BASE}/image_bar.svg` },
  { id: 'pictorial', name: 'Pictorial', imageSrc: `${BASE}/pictorial.svg` },
  { id: 'stackbar', name: 'Stackbar', imageSrc: `${BASE}/stackbar.svg` },
  { id: 'tabular', name: 'Tabular', imageSrc: `${BASE}/tabular.svg` },
  {
    id: 'stat-highlight',
    name: 'Stat Highlight',
    imageSrc: `${BASE}/stat_highlight.svg`,
    showBetaBadge: true,
  },
];
