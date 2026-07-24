import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary — catches render-phase errors that would otherwise cause a blank
 * page, and renders a graceful fallback instead of unmounting the entire tree.
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Zanori ErrorBoundary] Caught render error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f5f4f0',
            padding: '2rem',
            fontFamily: 'serif',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', color: '#2a2520', marginBottom: '0.5rem' }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#8b6f52', marginBottom: '1.5rem' }}>
            {this.state.error?.message ?? 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.hash = '#/';
            }}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#5c4a3a',
              color: '#f5f4f0',
              border: 'none',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Return to Gallery
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
