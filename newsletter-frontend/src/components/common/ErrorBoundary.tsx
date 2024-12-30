import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useNotificationStore } from '../../stores/rootStore';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// Error types for more specific error handling
enum ErrorType {
  NetworkError = 'NETWORK_ERROR',
  APIError = 'API_ERROR',
  RenderError = 'RENDER_ERROR',
  UnknownError = 'UNKNOWN_ERROR',
}

// Detailed error logging service
const logErrorToService = async (error: Error, errorType: ErrorType, componentStack?: string) => {
  try {
    // In a real-world scenario, replace with your actual error logging service
    console.error('Detailed Error Logging:', {
      message: error.message,
      name: error.name,
      type: errorType,
      stack: error.stack,
      componentStack,
    });

    // Optional: Send error to backend logging service
    // await fetch('/api/log-error', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     message: error.message,
    //     type: errorType,
    //     stack: error.stack
    //   })
    // });
  } catch (logError) {
    console.error('Error logging failed:', logError);
  }
};

// Wrapper component to use hook inside ErrorBoundary
const ErrorNotifier: React.FC<{ error: Error; errorType: ErrorType }> = ({ error, errorType }) => {
  const { addNotification } = useNotificationStore();

  React.useEffect(() => {
    // Log error to service
    logErrorToService(error, errorType);

    // Show user-friendly notification
    const errorNotification: Notification = {
      id: uuidv4(),
      title: 'Error Occurred',
      message: getErrorMessage(errorType),
      type: 'error',
    };

    addNotification(errorNotification);
  }, [error, errorType, addNotification]);

  return null;
};

// User-friendly error messages based on error type
const getErrorMessage = (errorType: ErrorType): string => {
  switch (errorType) {
    case ErrorType.NetworkError:
      return 'Network connection lost. Please check your internet and try again.';
    case ErrorType.APIError:
      return 'Unable to fetch data. Our team has been notified.';
    case ErrorType.RenderError:
      return 'Something went wrong while rendering the page.';
    default:
      return 'An unexpected error occurred. Please try again later.';
  }
};

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorType: ErrorType) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorType: ErrorType;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      errorType: ErrorType.UnknownError,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Determine error type based on error characteristics
    let errorType = ErrorType.UnknownError;

    if (error.message.includes('fetch') || error.message.includes('network')) {
      errorType = ErrorType.NetworkError;
    } else if (error.message.includes('API') || error.message.includes('request failed')) {
      errorType = ErrorType.APIError;
    } else {
      errorType = ErrorType.RenderError;
    }

    return {
      hasError: true,
      error,
      errorType,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Optional callback for additional error handling
    if (this.props.onError) {
      this.props.onError(error, this.state.errorType);
    }

    // Log detailed error information
    console.error('Uncaught error:', error);
    console.error('Error Info:', info.componentStack);
  }

  handleErrorReset = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorType: ErrorType.UnknownError,
    });
  };

  render() {
    if (this.state.hasError) {
      // Render error notifier to trigger notification
      return (
        <>
          {this.state.error && (
            <ErrorNotifier error={this.state.error} errorType={this.state.errorType} />
          )}

          {/* Use custom fallback or default fallback UI */}
          {this.props.fallback || (
            <div className="error-boundary flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
              <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
                <h1 className="mb-4 text-3xl font-bold text-red-600">Oops! Something Went Wrong</h1>
                <p className="mb-6 text-gray-700">{getErrorMessage(this.state.errorType)}</p>

                {this.state.error && (
                  <details className="mb-6 rounded bg-gray-100 p-4 text-left">
                    <summary className="cursor-pointer font-semibold text-gray-800">
                      Error Details
                    </summary>
                    <pre className="overflow-x-auto text-xs text-gray-600">
                      {this.state.error.toString()}
                    </pre>
                  </details>
                )}

                <div className="flex flex-col space-y-4">
                  <button
                    onClick={this.handleErrorReset}
                    className="w-full rounded bg-blue-500 py-2 text-white transition hover:bg-blue-600"
                  >
                    Try Again
                  </button>

                  <Link
                    to="/"
                    className="w-full rounded bg-gray-200 py-2 text-center text-gray-800 transition hover:bg-gray-300"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }

    return this.props.children;
  }
}
