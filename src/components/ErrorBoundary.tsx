/* eslint-disable react/prop-types */
import React from 'react';

type MyProps = {
  children: JSX.Element;
  fallback: any;
};

export default class ErrorBoundary extends React.Component<MyProps> {
  state = { error: null };

  static getDerivedStateFromError(error: string) {
    return { error: error };
  }

  render() {
    const { children, fallback } = this.props;
    const { error } = this.state;

    if (error) {
      if (typeof fallback === 'function') {
        return fallback({ error });
      }

      return fallback;
    }
    return children;
  }
}
