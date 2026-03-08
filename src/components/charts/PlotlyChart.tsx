
import Plot from 'react-plotly.js';

interface PlotlyChartProps {
  data: any[];
  layout?: Partial<Plotly.Layout>;
  config?: Partial<Plotly.Config>;
  width: number;
  height: number;
}

export function PlotlyChart({
  data,
  layout,
  config,
  width,
  height,
}: PlotlyChartProps) {
  const defaultConfig: Partial<Plotly.Config> = {
    responsive: false,
    displayModeBar: false,
    staticPlot: true,
  };

  const defaultLayout: Partial<Plotly.Layout> = {
    margin: { t: 20, r: 20, b: 20, l: 20 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
      family: 'sans-serif',
    },
    ...layout,
  };

  return (
    <Plot
      data={data}
      layout={defaultLayout}
      config={{ ...defaultConfig, ...config }}
      style={{ width, height }}
      useResizeHandler={false}
    />
  );
}
