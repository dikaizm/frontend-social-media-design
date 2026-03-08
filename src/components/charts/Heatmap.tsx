import { PlotlyChart } from './PlotlyChart';

interface HeatmapProps {
  z: number[][];
  x: string[];
  y: string[];
  colorscale?: (string | number)[][];
  width: number;
  height: number;
  showscale?: boolean;
}

export function Heatmap({
  z,
  x,
  y,
  colorscale = [
    [0, '#1a1a1a'],
    [0.5, '#4361ee'],
    [1, '#00ffcc'],
  ],
  width,
  height,
  showscale = false,
}: HeatmapProps) {
  const data = [
    {
      type: 'heatmap',
      z: z,
      x: x,
      y: y,
      colorscale: colorscale,
      showscale,
    },
  ];

  return <PlotlyChart data={data} width={width} height={height} />;
}
