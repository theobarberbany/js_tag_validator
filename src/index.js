import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Raven from "raven-js";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

Raven.config("https://509f2c5e443c4252b9eb011cc14bda0f@sentry.io/232560", {
  release: "0e4fdef81448dcfa0e16ecc4433ff3997aa53572",
  autoBreadcrumbs: true,
  captureUnhandledRejections: true
}).install();

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById("root")
);
registerServiceWorker();
