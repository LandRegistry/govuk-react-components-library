import React, { Component, ReactNode } from "react";
import ProblemWithService from "../ProblemWithService/ProblemWithService";
import { ErrorBoundaryProps, ErrorBoundaryState } from "./ErrorBoundary.types";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      message: props.message || "",
      applicationName: props.applicationName || "",
    };
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    // Update state to render fallback UI on error
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, info);
    // Optionally log error details to an external service here
    this.setState({ message: error.message });
  }

  render(): ReactNode {
    const { hasError, message, applicationName } = this.state;

    if (hasError) {
      return (
        <ProblemWithService
          message={message}
          applicationName={applicationName}
          basePageName={this.props.basePageName}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
