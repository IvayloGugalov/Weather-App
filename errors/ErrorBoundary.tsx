import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: string) {
    // Update state so the next render will show the fallback UI.
    console.error(error)
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <main
          id="errorboundary"
          className='flex flex-nowrap gap-4 text-center'
        >
          <h1></h1>
          <span className="text-red-600">
            A problem has occured. Please reload the app. If the page is unable to load please delete cache for this page and reload.
          </span>
        </main>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary