import { Bar } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear } from '@visx/scale';

interface ChartData {
  label: string;
  value: number;
}

interface VisxChartProps {
  data: ChartData[];
  width: number;
  height: number;
  color?: string;
  type?: 'bar' | 'line';
  showGrid?: boolean;
}

const margin = { top: 20, right: 20, bottom: 40, left: 50 };

export function VisxChart({
  data,
  width,
  height,
  color = '#4361ee',
  type = 'bar',
  showGrid = true,
}: VisxChartProps) {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleBand({
    range: [0, innerWidth],
    domain: data.map((d) => d.label),
    padding: 0.2,
  });

  const yScale = scaleLinear({
    range: [innerHeight, 0],
    domain: [0, Math.max(...data.map((d) => d.value))],
  });

  const tickProps = {
    fill: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontFamily: 'sans-serif',
  };

  if (type === 'bar') {
    return (
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {data.map((d) => {
            const barX = xScale(d.label) ?? 0;
            const barY = yScale(d.value);
            const barHeight = innerHeight - barY;
            return (
              <Bar
                key={d.label}
                x={barX}
                y={barY}
                height={barHeight}
                width={xScale.bandwidth()}
                fill={color}
              />
            );
          })}
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            stroke={showGrid ? 'rgba(255,255,255,0.2)' : 'transparent'}
            tickStroke="rgba(255,255,255,0.6)"
            tickLabelProps={tickProps}
          />
          <AxisLeft
            scale={yScale}
            stroke={showGrid ? 'rgba(255,255,255,0.2)' : 'transparent'}
            tickStroke="rgba(255,255,255,0.6)"
            tickLabelProps={tickProps}
          />
        </g>
      </svg>
    );
  }

  return null;
}
