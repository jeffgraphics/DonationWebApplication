import React from "react";

import { Route, Routes } from "react-router-dom";

import { Header, Slider } from "./components";

import { Home, Settings, CreateCampaign, CampaignDetails } from "./pages";

// import {} from "./constants"

export default function App() {
  return (
    <div className="page_wrap">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/create-cause" element={<CreateCampaign />} />
        <Route path="/campaign-details/:id" element={<CampaignDetails />} />
      </Routes>
    </div>
  );
}
