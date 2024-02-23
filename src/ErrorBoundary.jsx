import { Component } from "react";
import { Link } from "react-router-dom";
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error Boundary has caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h1>
          Something went wrong. <Link to="/">click here</Link> go back to home
          page
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
