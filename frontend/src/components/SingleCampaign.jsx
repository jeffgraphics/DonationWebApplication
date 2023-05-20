import React from "react";

import { userIcon } from "../assets";
("../assets");

import { shortenText } from "../utils";
import { Link } from "react-router-dom";

const SingleCampaign = ({
  title,
  image,
  description,
  percentRaised,
  amountCollected,
  target,
  creator,
  handleNavigate,
}) => {
  return (
    <div className="post_item_excerpt post_type_donation sc_donations_column-1_3">
      <div className="post_featured">
        <img
          width="570"
          height="320"
          src={image}
          className="attachment-thumb_med size-thumb_med"
          alt={title}
        />
      </div>
      {/* <!-- .post_featured --> */}
      <div className="post_body">
        <div className="post_header entry-header">
          <h4 className="entry-title">
            <p
              style={{ cursor: "pointer" }}
              onClick={handleNavigate}
              rel="bookmark"
            >
              {title}
            </p>
          </h4>
        </div>
        {/* <!-- .entry-header --> */}
        <div className="post_content entry-content">
          <p>{shortenText(description)}</p>
          <div className="post_info_donations">
            <div className="top">
              <span className="post_info_item post_raised">
                <span className="post_counters_label">Raised</span>
              </span>
              <span className="post_info_item post_goal">
                <span className="post_counters_label">Goal</span>
              </span>
            </div>
            <div className="middle">
              <span style={{ width: `${percentRaised}px` }}></span>
            </div>
            <div className="bottom">
              <span className="post_counters_number_raised">
                {amountCollected} MATIC
              </span>
              <span className="post_counters_number_goal">{target} MATIC</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <Link
              style={{ height: "30px" }}
              className="more-link"
              // href="#"
              onClick={handleNavigate}
            >
              Donate
            </Link>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                width: "50%",
                padding: 0,
                height: "50px",
              }}
            >
              <img
                src={userIcon}
                style={{
                  borderRadius: "50%",
                  border: "1px solid #8A9199",
                  width: "30px",
                  height: "30px",
                  objectFit: "contain",
                  padding: "4px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "15px",
                  marginLeft: "8px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Created By</span>
                <p>{creator}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- .entry-content --> */}
      </div>
      {/* <!-- .post_body --> */}
    </div>
  );
};

export default SingleCampaign;
