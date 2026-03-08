import { Canvas } from '../components/canvas/Canvas';
import { BoldSignal } from '../components/styles/BoldSignal';
import { Icon } from '../components/ui/Icon';
import { ExportWrapper } from '../components/export/ExportWrapper';
import { PLATFORM_DIMENSIONS } from '../lib/constants';

const size = PLATFORM_DIMENSIONS.instagram['post-square'];

export default function DesignInstagramPost() {
  return (
    <ExportWrapper size={size}>
      <Canvas size={size}>
        <BoldSignal
          headline="Product Launch"
          subtext="Coming soon"
          number="01"
          accentColor="#FF5722"
          size={size}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            zIndex: 10,
          }}
        >
          <Icon name="rocket" library="lucide" size="medium" color="#FF5722" />
        </div>
      </Canvas>
    </ExportWrapper>
  );
}
