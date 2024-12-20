import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useNotificationStore } from '../../stores/rootStore';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// Wrapper component to use hook inside ErrorBoundary
const ErrorNotifier: React.FC<{ error: Error }> = ({ error }) => {
  const { addNotification } = useNotificationStore();

  React.useEffect(() => {
    addNotification({
      message: `An unexpected error occurred: ${error.message}`,
      type: 'error'
    });
  }, [error, addNotification]);

  return null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false,
      error: undefined 
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { 
      hasError: true,
      error 
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log the error to an error reporting service
    console.error('Uncaught error:', error);
    console.error('Error Info:', info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // Render error notifier to trigger notification
      return (
        <>
          {this.state.error && <ErrorNotifier error={this.state.error} />}
          
          {/* Use custom fallback or default fallback UI */}
          {this.props.fallback || (
            <div className="error-boundary">
              <h1>Something went wrong</h1>
              <p>We apologize for the inconvenience. Please try again later.</p>
              {this.state.error && (
                <details>
                  <summary>Error Details</summary>
                  <pre>{this.state.error.toString()}</pre>
                </details>
              )}
            </div>
          )}
        </>
      );
    }

    return this.props.children;
  }
}
