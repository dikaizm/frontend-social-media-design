import { Canvas } from '../components/canvas/Canvas';
import { CleanPrism } from '../components/styles/CleanPrism';
import { ExportWrapper } from '../components/export/ExportWrapper';
import { PLATFORM_DIMENSIONS } from '../lib/constants';

const size = PLATFORM_DIMENSIONS.instagram['post-square'];

const features = [
  { label: 'Lightning fast', value: '2x faster', icon: '⚡' },
  { label: 'Clean design', value: 'Minimalist UI', icon: '✨' },
  { label: 'Smart features', value: 'AI-powered', icon: '🧠' },
  { label: 'Privacy first', value: '100% secure', icon: '🔒' },
];

export default function DesignCleanPrism() {
  return (
    <ExportWrapper size={size}>
      <Canvas size={size}>
        <CleanPrism
          headline="Introducing CleanPrism"
          subtext="The future of modern design is here"
          sectionTitle="Key Features"
          items={features}
          accentColor="#4361ee"
          size={size}
        />
      </Canvas>
    </ExportWrapper>
  );
}
