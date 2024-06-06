import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

class SurveyPollWidgetEmbed {
  constructor(selector) {
    this.selector = selector;
    this.render();
  }

  render() {
    const container = document.querySelector(this.selector);
    if (container) {
      const root = createRoot(container);
      root.render(<App />);
    }
  }
}

window.SurveyPollWidgetEmbed = SurveyPollWidgetEmbed;