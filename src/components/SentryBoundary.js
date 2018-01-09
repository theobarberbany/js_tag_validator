// Error boundary utilising sentry
import React, { Component } from "react";
import Raven from "raven-js";

import "./SentryBoundary.css";
import oops from "../internal/aw_snap.svg";

class SentryBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    console.log("boundary caught error");
    this.setState({ error: error });
    Raven.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="snap">
          <img alt="oops" src={oops} />
          <div className="snap-message">
            <p>We're sorry - something's gone wrong.</p>
            <p>
              Please click
              <button
                onClick={() => Raven.lastEventId() && Raven.showReportDialog()}
              >
                here
              </button>
              to fill out a report.
            </p>
            <br />
            <p>Then refresh the page to try again.</p>
          </div>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default SentryBoundary;
