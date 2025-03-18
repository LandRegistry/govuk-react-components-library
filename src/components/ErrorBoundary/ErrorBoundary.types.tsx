export interface ErrorBoundaryProps {
  children: React.ReactNode;
  message?: string;
  applicationName?: string;
  basePageName?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
  applicationName: string;
}
