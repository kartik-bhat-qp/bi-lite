export type AdvancedWidgetTypeId =
  | 'rich-textbox'
  | 'map'
  | 'response-timeline'
  | 'response-info'
  | 'comparative-bar'
  | 'heat-map'
  | 'cross-tab'
  | 'segment-trend'
  | 'segment-bar'
  | 'funnel-chart'
  | 'response-viewer';

export interface AdvancedWidgetType {
  id: AdvancedWidgetTypeId;
  name: string;
  imageSrc: string;
  showBetaBadge?: boolean;
  showDiamond?: boolean;
}

export const LICENSE_DIAMOND_TOOLTIP =
  'Not available with your current license. Will only show a maximum of 100 responses.';

export const ADVANCED_WIDGET_TYPES: AdvancedWidgetType[] = [
  {
    id: 'rich-textbox',
    name: 'Rich textbox',
    imageSrc: '/images/advanced-widgets/text_box.svg',
  },
  {
    id: 'map',
    name: 'Map',
    imageSrc: '/images/advanced-widgets/map_chart.svg',
  },
  {
    id: 'response-timeline',
    name: 'Response timeline',
    imageSrc: '/images/advanced-widgets/response_timeline.svg',
  },
  {
    id: 'response-info',
    name: 'Response info',
    imageSrc: '/images/advanced-widgets/response_info.svg',
  },
  {
    id: 'comparative-bar',
    name: 'Comparative bar',
    imageSrc: '/images/advanced-widgets/comparative_bar.svg',
    showDiamond: true,
  },
  {
    id: 'heat-map',
    name: 'Heat map',
    imageSrc: '/images/advanced-widgets/heat_map.svg',
    showDiamond: true,
  },
  {
    id: 'cross-tab',
    name: 'Cross-tab',
    imageSrc: '/images/advanced-widgets/cross_tab.svg',
  },
  {
    id: 'segment-trend',
    name: 'Segment trend',
    imageSrc: '/images/advanced-widgets/segment_trend_line.svg',
    showDiamond: true,
  },
  {
    id: 'segment-bar',
    name: 'Segment bar',
    imageSrc: '/images/advanced-widgets/bar_chart.svg',
    showDiamond: true,
  },
  {
    id: 'funnel-chart',
    name: 'Funnel chart',
    imageSrc: '/images/advanced-widgets/funnel.svg',
    showDiamond: true,
  },
  {
    id: 'response-viewer',
    name: 'Response viewer',
    imageSrc: '/images/advanced-widgets/response_viewer.svg',
    showBetaBadge: true,
  },
];

export const DEFAULT_ADVANCED_WIDGET_TYPE_ID: AdvancedWidgetTypeId = 'rich-textbox';
