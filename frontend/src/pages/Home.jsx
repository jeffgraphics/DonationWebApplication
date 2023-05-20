import React from "react";

import {
  Header,
  Slider,
  Wrapper,
  Mission,
  Causes,
  SummaryBanner,
  FeaturedCause,
  Spacer,
  CauseCategories,
  CallToAction,
  Footer,
} from "../components";

const Home = () => {
  return (
    <Wrapper showSlider={true}>
      <Mission />
      <Causes />
      <SummaryBanner />
      <FeaturedCause />
      <Spacer />
      <CauseCategories />
      <Spacer />

      <CallToAction />
    </Wrapper>
  );
};

export default Home;
