interface ErrorContext {
  user?: string;
  component?: string;
  action?: string;
}

export class ErrorLogger {
  private static instance: ErrorLogger;
  private errorLog: Array<{
    error: Error;
    context?: ErrorContext;
    timestamp: Date;
  }> = [];

  private constructor() {}

  public static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  public logError(error: Error, context?: ErrorContext): void {
    const errorEntry = {
      error,
      context,
      timestamp: new Date(),
    };

    // Store in local log
    this.errorLog.push(errorEntry);

    // Log to console
    console.error('Logged Error:', {
      message: error.message,
      context,
      timestamp: errorEntry.timestamp,
    });

    // Optional: Send to external error tracking service
    this.sendToErrorTrackingService(errorEntry);
  }

  private sendToErrorTrackingService(errorEntry: {
    error: Error;
    context?: ErrorContext;
    timestamp: Date;
  }): void {
    // Placeholder for external error tracking service integration
    // Could be Sentry, LogRocket, etc.
    try {
      // Example mock implementation
      console.log('Sending error to tracking service:', errorEntry);
    } catch (trackingError) {
      console.error('Error sending to tracking service', trackingError);
    }
  }

  public getErrorLog(): Array<{
    error: Error;
    context?: ErrorContext;
    timestamp: Date;
  }> {
    return this.errorLog;
  }

  public clearErrorLog(): void {
    this.errorLog = [];
  }
}

// Utility function for easy error logging
export function logError(error: Error, context?: ErrorContext): void {
  ErrorLogger.getInstance().logError(error, context);
}
