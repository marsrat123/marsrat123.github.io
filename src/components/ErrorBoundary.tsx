import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  declare props: Props;
  declare state: State;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || '';
      const isRateExceeded =
        errorMessage.toLowerCase().includes('rate') ||
        errorMessage.toLowerCase().includes('limit') ||
        errorMessage.toLowerCase().includes('429');

      return (
        <div className="min-h-screen bg-[#07080C] text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto text-orange-500">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight text-white">
                {isRateExceeded ? 'RPC Network Limit Reached' : 'Application Recovered'}
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {isRateExceeded
                  ? 'The BNB Smart Chain public node experienced a temporary rate limit response. Please click below to reload with refreshed fallback endpoints.'
                  : 'An unexpected state occurred. The application caught the issue safely.'}
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-400 max-h-24 overflow-y-auto break-all">
                {errorMessage}
              </div>
            )}

            <button
              onClick={this.handleReload}
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white shadow-lg shadow-orange-950/50 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
