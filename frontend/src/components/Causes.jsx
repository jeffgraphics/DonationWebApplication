import React, { useEffect, useState } from "react";

import { useStateContext } from "../context";

import { Loading, TransactionLoading, SingleCampaign } from "../components";

import { useNavigate } from "react-router-dom";

const Causes = () => {
  const [campaigns, setCampaigns] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { address, isContractLoading, getCampaigns, contract } =
    useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading((prev) => !prev);
    const campaigns = await getCampaigns();

    console.log(campaigns);
    setIsLoading((prev) => !prev);
    setCampaigns(campaigns);
  };

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.campaignId}`, { state: campaign });
  };

  useEffect(() => {
    if (!isContractLoading) {
      fetchCampaigns();
    }
  }, [isContractLoading, address, isContractLoading]);

  return (
    <div className="block">
      <div className="column_container">
        <div className="column-inner">
          <div className="wrapper">
            <div className="h55"></div>
            <div
              id="sc_donations_108588160"
              className="sc_donations sc_donations_style_excerpt"
            >
              <h2 className="sc_donations_title sc_item_title">
                Available Campaigns
              </h2>
              <div className="sc_donations_descr sc_item_descr">
                You can help lots of people by donating little.
                <b>See our causes.</b>
              </div>
              <div className="sc_donations_columns_wrap">
                {isLoading && <Loading />}

                {!isLoading && campaigns.length == 0 ? (
                  <p>No campaigns available at the moment </p>
                ) : (
                  <>
                    {campaigns.map((campaign) => (
                      <SingleCampaign
                        handleNavigate={() => handleNavigate(campaign)}
                        key={campaign.campaignId}
                        title={campaign.title}
                        image={campaign.image}
                        description={campaign.description}
                        percentRaised={campaign.percentRaised}
                        amountCollected={campaign.amountCollected}
                        target={campaign.target}
                        creator={campaign.creator}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
            {/* <!-- /.sc_donations --> */}
            <div className="h28"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Causes;
