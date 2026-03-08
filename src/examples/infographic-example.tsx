import { Canvas } from '../components/canvas/Canvas';
import { CanvasContent } from '../components/canvas/CanvasContent';
import { Heatmap } from '../components/charts/Heatmap';
import { Icon } from '../components/ui/Icon';
import { ExportWrapper } from '../components/export/ExportWrapper';
import { PLATFORM_DIMENSIONS } from '../lib/constants';

const size = PLATFORM_DIMENSIONS.instagram['post-square'];

const heatmapData = [
  [15, 25, 35, 45, 55],
  [25, 35, 45, 55, 65],
  [35, 45, 55, 65, 75],
  [45, 55, 65, 75, 85],
];

const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
const yLabels = ['2021', '2022', '2023', '2024'];

export default function DesignInfographic() {
  return (
    <ExportWrapper size={size}>
      <Canvas size={size}>
        <CanvasContent padding="clamp(24px, 5cqw, 80px)">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: `${size.width * 0.04}px`,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: `${size.width * 0.03}px`,
                marginBottom: `${size.width * 0.02}px`,
              }}
            >
              <Icon name="activity" library="lucide" size="large" color="#00ffcc" />
              <h1
                style={{
                  fontSize: `${size.width * 0.07}px`,
                  fontWeight: 'bold',
                  color: '#ffffff',
                  fontFamily: 'Clash Display, sans-serif',
                }}
              >
                Growth Trajectory
              </h1>
            </div>

            {/* Heatmap */}
            <div
              style={{
                width: '100%',
                maxWidth: `${size.width * 0.75}px`,
                height: `${size.height * 0.55}px`,
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderRadius: '12px',
                padding: `${size.width * 0.03}px`,
              }}
            >
              <Heatmap
                z={heatmapData}
                x={xLabels}
                y={yLabels}
                colorscale={[
                  [0, '#1a1a1a'],
                  [0.5, '#4361ee'],
                  [1, '#00ffcc'],
                ]}
                width={size.width * 0.75}
                height={size.height * 0.55}
              />
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: `${size.width * 0.02}px`,
                padding: `${size.width * 0.02}px ${size.width * 0.04}px`,
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
              }}
            >
              <Icon name="trending-up" library="lucide" size="small" color="#4CAF50" />
              <p
                style={{
                  fontSize: `${size.width * 0.025}px`,
                  color: 'rgba(255,255,255,0.8)',
                  fontFamily: 'Satoshi, sans-serif',
                }}
              >
                <strong>+85%</strong> YoY growth
              </p>
            </div>
          </div>
        </CanvasContent>
      </Canvas>
    </ExportWrapper>
  );
}
