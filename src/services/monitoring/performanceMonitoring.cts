import { getCurrentConfig } from '../../config/environment';

export interface PerformanceMetrics {
  timeToFirstByte: number;
  firstContentfulPaint: number;
  loadTime: number;
  memoryUsage?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
  };
}

class PerformanceMonitoringService {
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = getCurrentConfig().PERFORMANCE_MONITORING;
  }

  public captureMetrics(): PerformanceMetrics | null {
    if (!this.isEnabled) return null;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    const memory = (performance as unknown).memory;

    const metrics: PerformanceMetrics = {
      timeToFirstByte: navigation.responseStart - navigation.requestStart,
      firstContentfulPaint:
        paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
      loadTime: navigation.loadEventEnd - navigation.navigationStart,
    };

    if (memory) {
      metrics.memoryUsage = {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
      };
    }

    return metrics;
  }

  public async reportMetrics(metrics: PerformanceMetrics): Promise<void> {
    if (!this.isEnabled) return;

    try {
      // TODO: Replace with your actual monitoring service endpoint
      console.log('[Staging] Performance Metrics:', metrics);

      // Example implementation for sending to a monitoring service:
      // await fetch('your-monitoring-service-endpoint', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(metrics),
      // });
    } catch (error) {
      console.error('[Staging] Failed to report performance metrics:', error);
    }
  }

  public startPerformanceMonitoring(): void {
    if (!this.isEnabled) return;

    // Monitor route changes
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        console.log('[Staging] Performance Entry:', entry);
      }
    });

    observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
  }
}

export const performanceMonitor = new PerformanceMonitoringService();
