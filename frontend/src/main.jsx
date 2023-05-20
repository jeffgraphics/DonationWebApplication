import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Mumbai } from "@thirdweb-dev/chains";
// import "./styles/globals.css";
import { BrowserRouter as Router } from "react-router-dom";

import { StateContextProvider } from "./context";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
const activeChain = Mumbai.slug;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain}>
      <Router>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
