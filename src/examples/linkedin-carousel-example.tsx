import { Carousel } from '../components/canvas/Carousel';
import { CarouselPage } from '../components/canvas/CarouselPage';
import { CanvasContent } from '../components/canvas/CanvasContent';
import { ElectricStudio } from '../components/styles/ElectricStudio';
import { VisxChart } from '../components/charts/VisxChart';
import { MetricCard } from '../components/charts/MetricCard';
import { ProgressBar } from '../components/charts/ProgressBar';
import { ExportWrapper } from '../components/export/ExportWrapper';
import { PLATFORM_DIMENSIONS } from '../lib/constants';

const size = PLATFORM_DIMENSIONS.linkedin.carousel;

const chartData = [
  { label: 'Q1', value: 45 },
  { label: 'Q2', value: 78 },
  { label: 'Q3', value: 62 },
  { label: 'Q4', value: 91 },
];

export default function DesignLinkedInCarousel() {
  return (
    <ExportWrapper size={size}>
      <Carousel size={size} showDots={true} showCounter={true}>
        {/* Page 1: Cover */}
        <CarouselPage>
          <ElectricStudio
            headline="Q4 Performance Review"
            quote="Growth happens when you embrace change"
            accentColor="#4361ee"
            size={size}
          />
        </CarouselPage>

        {/* Page 2: Chart */}
        <CarouselPage>
          <CanvasContent padding="clamp(24px, 5cqw, 60px)">
            <h2
              style={{
                fontSize: `${size.width * 0.06}px`,
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: `${size.width * 0.04}px`,
                fontFamily: 'Manrope, sans-serif',
              }}
            >
              Quarterly Growth
            </h2>
            <div
              style={{
                width: '100%',
                maxWidth: `${size.width * 0.8}px`,
                height: `${size.height * 0.4}px`,
              }}
            >
              <VisxChart
                data={chartData}
                width={size.width * 0.8}
                height={size.height * 0.4}
                color="#4361ee"
                type="bar"
              />
            </div>
          </CanvasContent>
        </CarouselPage>

        {/* Page 3: Metrics */}
        <CarouselPage>
          <CanvasContent
            padding="clamp(24px, 5cqw, 60px)"
            justifyContent="center"
          >
            <div
              style={{
                display: 'flex',
                gap: `${size.width * 0.05}px`,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <MetricCard
                label="Revenue"
                value="$2.4M"
                icon="trending-up"
                color="#4CAF50"
                size={size}
              />
              <MetricCard
                label="Users"
                value="45K"
                icon="users"
                color="#4361ee"
                size={size}
              />
              <MetricCard
                label="Growth"
                value="+32%"
                icon="bar-chart"
                color="#FF9800"
                size={size}
              />
            </div>
          </CanvasContent>
        </CarouselPage>

        {/* Page 4: Progress */}
        <CarouselPage>
          <CanvasContent
            padding="clamp(24px, 5cqw, 60px)"
            justifyContent="center"
          >
            <h2
              style={{
                fontSize: `${size.width * 0.06}px`,
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: `${size.width * 0.06}px`,
                fontFamily: 'Manrope, sans-serif',
                textAlign: 'center',
              }}
            >
              Key Metrics
            </h2>
            <div style={{ width: '100%', maxWidth: `${size.width * 0.7}px` }}>
              <ProgressBar
                value={92}
                max={100}
                label="Customer Satisfaction"
                color="#4CAF50"
                size={size}
              />
              <div style={{ height: `${size.width * 0.04}px` }} />
              <ProgressBar
                value={78}
                max={100}
                label="Market Share"
                color="#4361ee"
                size={size}
              />
              <div style={{ height: `${size.width * 0.04}px` }} />
              <ProgressBar
                value={65}
                max={100}
                label="Brand Awareness"
                color="#FF9800"
                size={size}
              />
            </div>
          </CanvasContent>
        </CarouselPage>
      </Carousel>
    </ExportWrapper>
  );
}
