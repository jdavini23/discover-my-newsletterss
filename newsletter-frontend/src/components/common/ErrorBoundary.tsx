import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useNotificationStore } from '../../stores/rootStore';
import { Link } from 'react-router-dom';

// Error types for more specific error handling
enum ErrorType {
  NetworkError = 'NETWORK_ERROR',
  APIError = 'API_ERROR',
  RenderError = 'RENDER_ERROR',
  UnknownError = 'UNKNOWN_ERROR'
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
      componentStack
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
    addNotification({
      message: getErrorMessage(errorType),
      type: 'error'
    });
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
      errorType: ErrorType.UnknownError
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
      errorType
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
      errorType: ErrorType.UnknownError 
    });
  };

  render() {
    if (this.state.hasError) {
      // Render error notifier to trigger notification
      return (
        <>
          {this.state.error && (
            <ErrorNotifier 
              error={this.state.error} 
              errorType={this.state.errorType} 
            />
          )}
          
          {/* Use custom fallback or default fallback UI */}
          {this.props.fallback || (
            <div className="error-boundary min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
              <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">
                  Oops! Something Went Wrong
                </h1>
                <p className="text-gray-700 mb-6">
                  {getErrorMessage(this.state.errorType)}
                </p>

                {this.state.error && (
                  <details className="mb-6 text-left bg-gray-100 p-4 rounded">
                    <summary className="cursor-pointer text-gray-800 font-semibold">
                      Error Details
                    </summary>
                    <pre className="text-xs text-gray-600 overflow-x-auto">
                      {this.state.error.toString()}
                    </pre>
                  </details>
                )}

                <div className="flex flex-col space-y-4">
                  <button
                    onClick={this.handleErrorReset}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                  >
                    Try Again
                  </button>
                  
                  <Link
                    to="/"
                    className="w-full bg-gray-200 text-gray-800 py-2 rounded text-center hover:bg-gray-300 transition"
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
