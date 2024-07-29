/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";

import { Route, Router } from "@solidjs/router";
import Home from "./pages/Home";

render(
  () => (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/game" component={App} />
    </Router>
  ),
  document.getElementById("root")!
);
