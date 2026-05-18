'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactGridLayout, {
  WidthProvider,
  type Layout,
  type ResizeHandleAxis,
} from 'react-grid-layout/legacy';
import { GRID_MARGIN, GRID_ROW_HEIGHT } from '@/data/dashboard-grid-config';
import {
  AI_DASHBOARD_GRID_COLS,
  AI_DASHBOARD_LAYOUT,
  AI_DASHBOARD_WIDGETS,
} from '@/data/mock-ai-widgets';
import { DashboardWidgetCard } from '@/components/dashboards/widgets/DashboardWidgetCard';
import { AiWidgetRenderer } from '@/components/dashboards/widgets/AiWidgetRenderer';
import styles from './AiDashboardCanvas.module.css';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const GridLayoutWithWidth = WidthProvider(ReactGridLayout);

function renderResizeHandle(
  _axis: ResizeHandleAxis,
  ref: React.Ref<HTMLSpanElement>
): React.ReactElement {
  return (
    <span
      ref={ref}
      className={`react-resizable-handle react-resizable-handle-se ${styles.resizeHandle}`}
      aria-label="Resize widget"
    >
      <span className="wm-resize" />
    </span>
  );
}

export function AiDashboardCanvas() {
  const [layout, setLayout] = useState<Layout>(AI_DASHBOARD_LAYOUT);
  const canvasRef = useRef<HTMLDivElement>(null);

  const widgetById = useMemo(
    () => new Map(AI_DASHBOARD_WIDGETS.map((widget) => [widget.id, widget])),
    []
  );

  const handleLayoutChange = useCallback((nextLayout: Layout) => {
    setLayout(nextLayout);
  }, []);

  const notifyChartsResize = useCallback(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  useEffect(() => {
    const element = canvasRef.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      notifyChartsResize();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [notifyChartsResize]);

  return (
    <div ref={canvasRef} className={styles.canvas}>
      <GridLayoutWithWidth
        className={styles.gridLayout}
        layout={layout}
        cols={AI_DASHBOARD_GRID_COLS}
        rowHeight={GRID_ROW_HEIGHT}
        margin={GRID_MARGIN}
        containerPadding={[0, 0]}
        compactType="vertical"
        onLayoutChange={handleLayoutChange}
        onResize={notifyChartsResize}
        onResizeStop={notifyChartsResize}
        isDraggable
        isResizable
        resizeHandles={['se']}
        resizeHandle={renderResizeHandle}
        draggableHandle={`.${styles.dragHandle}`}
        draggableCancel={`.${styles.resizeHandle}`}
      >
        {layout.map((item) => {
          const widget = widgetById.get(item.i);
          if (!widget) return null;

          return (
            <div key={widget.id} className={styles.gridItem}>
              <DashboardWidgetCard
                title={widget.title}
                dragHandleClassName={styles.dragHandle}
              >
                <AiWidgetRenderer widgetId={widget.id} type={widget.type} />
              </DashboardWidgetCard>
            </div>
          );
        })}
      </GridLayoutWithWidth>
      <button type="button" className={styles.aiFab} aria-label="AI assistant">
        <span className="wc-ai" />
      </button>
    </div>
  );
}

