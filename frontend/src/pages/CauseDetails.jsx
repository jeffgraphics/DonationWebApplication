import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { Wrapper, CustomButton, TransactionLoading } from "../components";

import { useStateContext } from "../context";

import { alertError, alertSuccess } from "../utils";

const CampaignDetails = () => {
  const { address, isContractLoading, getCampaign, donate } = useStateContext();

  const { state } = useLocation();

  const [amount, setAmount] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const handleDonate = async () => {
    try {
      if (!address) return alertError("Wallet not connected");

      if (!amount) return alertError("Amount to be funded not specified");

      setIsLoading(true);

      await donate(state.campaignId, amount);
      // navigate('/')
      setIsLoading(false);

      return alertSuccess("Campaign funded successfully");
    } catch (error) {
      setIsLoading(false);

      return alertError(error.message);
    }
  };

  useEffect(() => {}, []);

  return (
    <Wrapper showSlider={false}>
      {isLoading && <TransactionLoading />}
      <div class="content_wrap wrapper">
        <div style={{ marginBottom: "50px" }} class="content">
          <div
            id="post-407"
            class="post_item_single post_type_donation post-407 donation type-donation status-publish has-post-thumbnail hentry donation_category-second-group"
          >
            <div class="post_sidebar">
              <div class="post_featured">
                <img
                  width="570"
                  height="320"
                  src={state.image}
                  class="attachment-thumb_med size-thumb_med"
                  alt={state.title}
                />
              </div>
              {/* <!-- .post_featured --> */}
              <div class="post_info_donations">
                <div class="post_raised">
                  <span class="post_raised_title">Raised</span>
                  <span class="post_raised_amount">
                    {state.amountCollected} MATIC
                  </span>
                </div>
                <div class="middle">
                  <span style={{ width: `${state.percentRaised}%` }}></span>
                </div>
                <div class="post_goal">
                  <span class="post_goal_title">Goal</span>
                  <span class="post_goal_amount">{state.target} MATIC</span>
                </div>
              </div>
              <h4>Donate to Campaign</h4>
              <div id="sc_donations_form" class="sc_donations_form">
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    background: "#1c1c24",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ marginTop: "30px", overflow: "hidden" }}>
                    <input
                      type="number"
                      placeholder="MATIC 0.1"
                      step="0.01"
                      style={{
                        width: "100%",
                        paddingRight: "10px",
                        paddingLeft: "20px",
                        border: "1px solid #3a3a43",
                        backgroundColor: "transparent",
                        color: "#fff",
                        borderRadius: "10px",
                      }}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />

                    <div
                      style={{
                        marginRight: "20px",
                        padding: "20px",
                        background: "#13131a",
                        borderRadius: "10px",
                        width: "100%",
                      }}
                    >
                      <h4 style={{ fontSize: "14px", color: "#fff" }}>
                        Donate to campaign because you believe in it.
                      </h4>
                      <p
                        style={{
                          marginTop: "20px",
                          color: "#808191",
                          maxWidth: "400px",
                        }}
                      >
                        Support the campaign for no reward, just because it
                        resonates to you.
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        margin: "20px 0 20px 0 ",
                      }}
                    >
                      <CustomButton
                        btnType="button"
                        title="Fund Campaign"
                        handleClick={handleDonate}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="post_help">Help us attain our goal</div>
              <div class="post_supporters">
                <h5 class="post_supporters_title">
                  Group&#039;s supporters to date
                </h5>

                {/* <div>
                  <div style={{ b }}>
                    <img/>

                    <div>
                      <p>Anonymous</p>
                      <p style={{ fontWeight: "bold" }}>Supporter</p>
                    </div>

                  </div>

                </div> */}

                <div class="post_supporters_count">No supporters yet</div>
              </div>
            </div>

            <div class="post_body">
              <div class="post_header entry-header">
                <h1 class="post_title entry-title">{state.title}</h1>
                <div class="post_info">
                  <span class="post_info_item post_date">
                    September 12, 2016
                  </span>
                </div>
              </div>
              {/* <!-- .entry-header --> */}

              <div class="post_content entry-content">
                <p>{state.description}</p>
              </div>
              {/* <!-- .entry-content --> */}
              <div class="post_footer entry-footer">
                <div class="sc_socials_share">
                  <span class="sc_socials_share_caption">Share:</span>
                  <a
                    href="https://twitter.com/intent/tweet?text=&amp;url="
                    class="sc_socials_share_item"
                    onclick="window.open('https://twitter.com/intent/tweet?text=&amp;url=', '_blank', 'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=480, height=400, toolbar=0, status=0'); return false;"
                  >
                    <span class="icon_share-twitter"></span>
                  </a>
                  <a
                    href="http://www.facebook.com/sharer.php?s=100&amp;p%5Burl%5D=&amp;p%5Btitle%5D=&amp;p%5Bsummary%5D=&amp;p%5Bimages%5D%5B0%5D="
                    class="sc_socials_share_item"
                    onclick="window.open('http://www.facebook.com/sharer.php?s=100&amp;p%5Burl%5D=&amp;p%5Btitle%5D=&amp;p%5Bsummary%5D=&amp;p%5Bimages%5D%5B0%5D=', '_blank', 'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=480, height=400, toolbar=0, status=0'); return false;"
                  >
                    <span class="icon_share-facebook"></span>
                  </a>
                </div>
              </div>
              {/* <!-- .entry-footer --> */}
            </div>
            {/* <!-- .post_body --> */}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CampaignDetails;
