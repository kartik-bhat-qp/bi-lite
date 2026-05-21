export interface DataSlicer {
  id: number;
  name: string;
  applyToDashboard: boolean;
  /** Summary shown when details are expanded */
  description?: string;
}

export const MOCK_DATA_SLICERS: DataSlicer[] = [
  {
    id: 1,
    name: 'male who drink coke',
    applyToDashboard: false,
    description: 'Gender: Male · Beverage preference: Coca-Cola',
  },
  {
    id: 2,
    name: 'Northeast region respondents aged 25–34',
    applyToDashboard: true,
    description: 'Region: Northeast · Age: 25–34',
  },
  {
    id: 3,
    name: 'High income smartphone owners',
    applyToDashboard: false,
    description: 'Income: Top quartile · Device: Smartphone primary',
  },
  {
    id: 4,
    name: 'Brand promoters with completed NPS wave 2',
    applyToDashboard: true,
    description: 'NPS: 9–10 · Survey wave: 2 · Status: Complete',
  },
  {
    id: 5,
    name: 'Female respondents who purchased in the last 90 days and opted into email follow-up for the seasonal campaign cohort',
    applyToDashboard: false,
    description: 'Gender: Female · Purchase window: 90 days · Channel: Email opt-in',
  },
  {
    id: 6,
    name: 'Spanish language completers',
    applyToDashboard: false,
    description: 'Language: Spanish · Completion: Full',
  },
  {
    id: 7,
    name: 'Detractors — retail channel',
    applyToDashboard: false,
    description: 'NPS: 0–6 · Channel: Retail',
  },
  {
    id: 8,
    name: 'Panel wave 1 baseline',
    applyToDashboard: true,
    description: 'Wave: 1 · Cohort: Baseline',
  },
  {
    id: 9,
    name: 'Urban density tier A',
    applyToDashboard: false,
  },
  {
    id: 10,
    name: 'Cross-survey loyalty segment',
    applyToDashboard: false,
    description: 'Loyalty tier: Gold · Surveys: 3+',
  },
];

export const DATA_SLICERS_PER_PAGE = 10;
