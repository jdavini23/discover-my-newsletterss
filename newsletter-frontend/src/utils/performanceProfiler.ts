import { useState, useEffect, useRef } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
}

export function usePerformanceProfiler(componentName: string) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const startTime = useRef<number>(0);

  useEffect(() => {
    // Start tracking render time
    startTime.current = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime.current;

      // Log performance metrics
      const performanceEntry: PerformanceMetrics = {
        renderTime,
        componentName,
      };

      setMetrics(performanceEntry);

      // Optional: Log to console or send to monitoring service
      if (renderTime > 50) {
        console.warn(`Slow render detected for ${componentName}:`, renderTime);
      }
    };
  }, [componentName]);

  return metrics;
}

// Global performance tracking utility
export class PerformanceTracker {
  private static instance: PerformanceTracker;
  private metrics: Record<string, number[]> = {};

  private constructor() {}

  public static getInstance(): PerformanceTracker {
    if (!PerformanceTracker.instance) {
      PerformanceTracker.instance = new PerformanceTracker();
    }
    return PerformanceTracker.instance;
  }

  public trackMetric(metricName: string, value: number): void {
    if (!this.metrics[metricName]) {
      this.metrics[metricName] = [];
    }
    this.metrics[metricName].push(value);
  }

  public getAverageMetric(metricName: string): number | null {
    const metricValues = this.metrics[metricName];
    if (!metricValues || metricValues.length === 0) return null;

    const average = metricValues.reduce((a, b) => a + b, 0) / metricValues.length;
    return Number(average.toFixed(2));
  }

  public printPerformanceReport(): void {
    console.group('Performance Metrics Report');
    Object.keys(this.metrics).forEach(metricName => {
      const avgMetric = this.getAverageMetric(metricName);
      console.log(`${metricName}: Avg ${avgMetric}ms`);
    });
    console.groupEnd();
  }
}
