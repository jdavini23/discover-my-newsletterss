import * as fs from 'fs';
import * as path from 'path';

interface ErrorContext {
  component?: string;
  action?: string;
  additionalInfo?: Record<string, unknown>;
}

interface ErrorLogEntry {
  timestamp: string;
  message: string;
  stack?: string;
  context?: ErrorContext;
}

export class SoloErrorLogger {
  private static instance: SoloErrorLogger;
  private logFilePath: string;

  private constructor() {
    // Use a path in the user's home directory for logging
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    this.logFilePath = path.join(homeDir, 'newsletter_error_logs.json');
  }

  public static getInstance(): SoloErrorLogger {
    if (!SoloErrorLogger.instance) {
      SoloErrorLogger.instance = new SoloErrorLogger();
    }
    return SoloErrorLogger.instance;
  }

  public logError(error: Error, context?: ErrorContext): void {
    const errorEntry: ErrorLogEntry = {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
      context,
    };

    try {
      // Read existing logs
      const existingLogs: ErrorLogEntry[] = this.readExistingLogs();

      // Add new error
      existingLogs.push(errorEntry);

      // Write back to file, keeping last 100 errors
      fs.writeFileSync(this.logFilePath, JSON.stringify(existingLogs.slice(-100), null, 2));

      // Console log for immediate visibility
      this.consoleLogError(errorEntry);
    } catch (writeError) {
      console.error('Failed to log error', writeError);
    }
  }

  private readExistingLogs(): ErrorLogEntry[] {
    try {
      if (fs.existsSync(this.logFilePath)) {
        const rawData = fs.readFileSync(this.logFilePath, 'utf8');
        return JSON.parse(rawData) as ErrorLogEntry[];
      }
    } catch (error) {
      console.error('Error reading error logs', error);
    }
    return [];
  }

  private consoleLogError(errorEntry: ErrorLogEntry): void {
    console.group('🚨 Error Logged');
    console.error(`Timestamp: ${errorEntry.timestamp}`);
    console.error(`Message: ${errorEntry.message}`);

    if (errorEntry.context) {
      console.log('Context:', errorEntry.context);
    }

    if (errorEntry.stack) {
      console.error('Stack Trace:');
      console.error(errorEntry.stack);
    }
    console.groupEnd();
  }

  public generateErrorReport(): void {
    const logs: ErrorLogEntry[] = this.readExistingLogs();

    console.group('📋 Error Report');
    console.log('Total Errors:', logs.length);

    // Group errors by component
    const errorsByComponent = logs.reduce(
      (acc, log) => {
        const component = log.context?.component || 'Unknown';
        if (!acc[component]) {
          acc[component] = 0;
        }
        acc[component]++;
        return acc;
      },
      {} as Record<string, number>
    );

    console.log('Errors by Component:');
    Object.entries(errorsByComponent)
      .sort((a, b) => b[1] - a[1])
      .forEach(([component, count]) => {
        console.log(`- ${component}: ${count} errors`);
      });

    console.groupEnd();
  }
}

// Utility function for easy error logging
export function logError(error: Error, context?: ErrorContext): void {
  SoloErrorLogger.getInstance().logError(error, context);
}

// Global error handler setup
export function setupGlobalErrorHandling(): void {
  const errorLogger = SoloErrorLogger.getInstance();

  // Catch unhandled promise rejections
  process.on('unhandledRejection', (_reason, _promise) => {
    errorLogger.logError(new Error('Unhandled Promise Rejection'), {
      component: 'Global Error Handler',
      additionalInfo: { reason: _reason },
    });
  });

  // Catch uncaught exceptions
  process.on('uncaughtException', error => {
    errorLogger.logError(error, { component: 'Global Exception Handler' });
  });
}
