import { Canvas } from '../components/canvas/Canvas';
import { Carousel } from '../components/canvas/Carousel';
import { CarouselPage } from '../components/canvas/CarouselPage';
import { CanvasContent } from '../components/canvas/CanvasContent';
import { NeonCyber } from '../components/styles/NeonCyber';
import { MetricCard } from '../components/charts/MetricCard';
import { ProgressBar } from '../components/charts/ProgressBar';
import { Icon } from '../components/ui/Icon';
import { ExportWrapper } from '../components/export/ExportWrapper';
import { PLATFORM_DIMENSIONS } from '../lib/constants';

const size = PLATFORM_DIMENSIONS.instagram.carousel;

const metrics = [
  { label: 'Revenue', value: '$4.2M', icon: 'trending-up', color: '#00ffcc' },
  { label: 'Users', value: '125K', icon: 'users', color: '#4d9fff' },
  { label: 'Growth', value: '+340%', icon: 'rocket', color: '#ff6b9b' },
];

export default function DesignTechLaunchCarousel() {
  return (
    <ExportWrapper size={size}>
      <Canvas size={size}>
        <Carousel size={size} showDots={true} showCounter={true}>
          {/* Page 1: Cover with Neon Cyber */}
          <CarouselPage>
            <NeonCyber
              headline="LAUNCH"
              subtext="The Future Is Here"
              accentColor="#0a0f1c"
              neonColor="#00ffcc"
              size={size}
            />
          </CarouselPage>

          {/* Page 2: Metrics Dashboard */}
          <CarouselPage>
            <CanvasContent
              padding="clamp(24px, 5cqw, 60px)"
              justifyContent="center"
            >
              <div
                style={{
                  width: '100%',
                  maxWidth: `${size.width * 0.85}px`,
                }}
              >
                <h2
                  style={{
                    fontSize: `${size.width * 0.06}px`,
                    fontWeight: 'bold',
                    color: '#ffffff',
                    fontFamily: 'Clash Display, sans-serif',
                    marginBottom: `${size.width * 0.06}px`,
                    textAlign: 'center',
                  }}
                >
                  By The Numbers
                </h2>
                
                <div
                  style={{
                    display: 'flex',
                    gap: `${size.width * 0.05}px`,
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  {metrics.map((metric, index) => (
                    <MetricCard
                      key={index}
                      label={metric.label}
                      value={metric.value}
                      icon={metric.icon}
                      color={metric.color}
                      size={size}
                    />
                  ))}
                </div>
              </div>
            </CanvasContent>
          </CarouselPage>

          {/* Page 3: Progress Tracking */}
          <CarouselPage>
            <CanvasContent
              padding="clamp(24px, 5cqw, 60px)"
              justifyContent="center"
            >
              <div style={{ width: '100%', maxWidth: `${size.width * 0.7}px` }}>
                <h2
                  style={{
                    fontSize: `${size.width * 0.06}px`,
                    fontWeight: 'bold',
                    color: '#ffffff',
                    fontFamily: 'Clash Display, sans-serif',
                    marginBottom: `${size.width * 0.06}px`,
                    textAlign: 'center',
                  }}
                >
                  Key Milestones
                </h2>
                
                <ProgressBar
                  value={100}
                  max={100}
                  label="Product Development"
                  color="#00ffcc"
                  size={size}
                />
                <div style={{ height: `${size.width * 0.04}px` }} />
                <ProgressBar
                  value={85}
                  max={100}
                  label="User Testing"
                  color="#4d9fff"
                  size={size}
                />
                <div style={{ height: `${size.width * 0.04}px` }} />
                <ProgressBar
                  value={92}
                  max={100}
                  label="Market Readiness"
                  color="#ff6b9b"
                  size={size}
                />
              </div>
            </CanvasContent>
          </CarouselPage>

          {/* Page 4: CTA */}
          <CarouselPage>
            <CanvasContent
              padding="clamp(24px, 5cqw, 80px)"
              justifyContent="center"
              alignItems="center"
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: `${size.width * 0.05}px`,
                }}
              >
                <div
                  style={{
                    width: `${size.width * 0.2}px`,
                    height: `${size.width * 0.2}px`,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, #00ffcc 0%, #0a0f1c 70%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: `${size.width * 0.04}px`,
                  }}
                >
                  <Icon name="check" library="lucide" size="xlarge" color="#00ffcc" />
                </div>
                
                <h1
                  style={{
                    fontSize: `${size.width * 0.08}px`,
                    fontWeight: '800',
                    color: '#ffffff',
                    fontFamily: 'Clash Display, sans-serif',
                    textAlign: 'center',
                    marginBottom: `${size.width * 0.03}px`,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Ready to Launch
                </h1>
                
                <p
                  style={{
                    fontSize: `${size.width * 0.03}px`,
                    color: 'rgba(255,255,255,0.8)',
                    fontFamily: 'Satoshi, sans-serif',
                    textAlign: 'center',
                    maxWidth: `${size.width * 0.7}px`,
                  }}
                >
                  Join the waitlist today and be the first to experience the future of tech.
                </p>
              </div>
            </CanvasContent>
          </CarouselPage>
        </Carousel>
      </Canvas>
    </ExportWrapper>
  );
}
