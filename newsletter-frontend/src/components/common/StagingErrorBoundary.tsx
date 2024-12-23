import React, { Component, ErrorInfo, ReactNode } from 'react';
import { getCurrentConfig } from '../../config/environment';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class StagingErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (getCurrentConfig().ENABLE_LOGGING) {
      console.error('Uncaught error:', error);
      console.error('Component stack:', errorInfo.componentStack);

      // TODO: Send to your error tracking service
      this.logError(error, errorInfo);
    }
  }

  private async logError(error: Error, errorInfo: ErrorInfo): Promise<void> {
    try {
      const errorData = {
        error: {
          message: error.message,
          stack: error.stack,
          name: error.name,
        },
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        environment: getCurrentConfig().ENV_NAME,
      };

      // TODO: Replace with your error tracking service endpoint
      console.log('[Staging] Error Data:', errorData);

      // Example implementation:
      // await fetch('your-error-tracking-endpoint', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorData),
      // });
    } catch (loggingError) {
      console.error('[Staging] Failed to log error:', loggingError);
    }
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary m-4 rounded-lg border border-red-500 bg-red-50 p-4">
          <h1 className="mb-2 text-xl font-bold text-red-700">Something went wrong</h1>
          {getCurrentConfig().ENV_NAME === 'staging' && (
            <details className="mt-2">
              <summary className="cursor-pointer text-red-600">Error Details</summary>
              <pre className="mt-2 overflow-auto rounded bg-red-100 p-2">
                {this.state.error?.toString()}
              </pre>
              {this.state.errorInfo && (
                <pre className="mt-2 overflow-auto rounded bg-red-100 p-2">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
