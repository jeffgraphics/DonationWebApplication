import React from "react";

import {Footer} from "../components"

import Slider from "./Slider";
// page_paddings_yes
const Wrapper = ({ showSlider, children, hasCustomPadding }) => {
  return (
    <>
      {showSlider && <Slider />}
      <div
        className={`page_content_wrap ${
          hasCustomPadding ? "page_paddings_yes" : "page_paddings_no"
        }`}
      >
        <div
          className={`content_wrap ${hasCustomPadding && "wrapper typography"}`}
        >
          <div className="content">
            <div
              className="itemscope post_item post_item_single post_featured_default post_format_standard post-2 page type-page status-publish hentry"
              itemScope
              itemType="http://schema.org/Article"
            >
              <div className="post_content" itemProp="articleBody">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Wrapper;
