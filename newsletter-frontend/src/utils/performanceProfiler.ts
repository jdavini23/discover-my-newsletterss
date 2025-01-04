import * as fs from 'fs';
import * as path from 'path';

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
  timestamp?: string;
}

// Centralized performance tracking for solo development
export class SoloPerformanceTracker {
  private static instance: SoloPerformanceTracker;
  private performanceLogs: PerformanceMetrics[] = [];
  private logFilePath: string;

  private constructor() {
    // Use a path in the user's home directory for logging
    const homeDir = process.env.HOME || process.env.USERPROFILE || '';
    this.logFilePath = path.join(homeDir, 'newsletter_performance_logs.json');
  }

  public static getInstance(): SoloPerformanceTracker {
    if (!SoloPerformanceTracker.instance) {
      SoloPerformanceTracker.instance = new SoloPerformanceTracker();
    }
    return SoloPerformanceTracker.instance;
  }

  public trackPerformance(metric: PerformanceMetrics): void {
    this.performanceLogs.push(metric);

    // Log to file if render time is significant
    if (metric.renderTime > 50) {
      try {
        const existingLogs = this.readExistingLogs();
        existingLogs.push({
          ...metric,
          timestamp: new Date().toISOString(),
        });

        fs.writeFileSync(this.logFilePath, JSON.stringify(existingLogs, null, 2));
      } catch (error) {
        console.error('Failed to log performance', error);
      }
    }
  }

  private readExistingLogs(): PerformanceMetrics[] {
    try {
      if (fs.existsSync(this.logFilePath)) {
        const rawData = fs.readFileSync(this.logFilePath, 'utf8');
        return JSON.parse(rawData);
      }
    } catch (error) {
      console.error('Error reading performance logs', error);
    }
    return [];
  }

  public generatePerformanceReport(): void {
    const logs = this.readExistingLogs();

    console.group('🚀 Performance Insights');
    console.log('Total Tracked Renders:', logs.length);

    // Find slowest components
    const slowestRenders = logs.sort((a, b) => b.renderTime - a.renderTime).slice(0, 5);

    console.log('Top 5 Slowest Renders:');
    slowestRenders.forEach(log => {
      console.log(`- ${log.componentName}: ${log.renderTime.toFixed(2)}ms (${log.timestamp})`);
    });

    console.groupEnd();
  }
}

// Hook for tracking component render performance
export function usePerformanceProfiler(componentName: string): PerformanceMetrics | null {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const startTime = useRef<number>(0);
  const tracker = SoloPerformanceTracker.getInstance();

  useEffect(() => {
    startTime.current = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime.current;

      const performanceMetric: PerformanceMetrics = {
        renderTime,
        componentName,
      };

      // Track performance
      tracker.trackPerformance(performanceMetric);

      // Log slow renders
      if (renderTime > 50) {
        console.warn(`🐌 Slow render: ${componentName} took ${renderTime.toFixed(2)}ms`);
      }

      setMetrics(performanceMetric);
    };
  }, [componentName, tracker]);

  return metrics;
}
