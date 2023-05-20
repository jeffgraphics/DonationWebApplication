import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
  useStorageUpload,
  useStorage,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

import { calculateBarPercentage } from "../utils";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract, isLoading, isError } = useContract(
    "0xE253C9847Df08ac1a5Bbf03974D8F5924Bfd507D"
  );

  const { mutateAsync: upload } = useStorageUpload();

  const { mutateAsync: createCampaignCategory } = useContractWrite(
    contract,
    "createCampaignCategory"
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();

  const connect = useMetamask();

  const storage = useStorage();

  const uploadToIpfs = async (dataToUpload) => {
    console.log(dataToUpload);
    // And upload the data with the upload function
    const uris = await upload({
      data: [dataToUpload],
      options: { uploadWithoutDirectory: true },
    });
    return uris;
  };

  const publishCampaign = async (form) => {
    try {
      const dataToUploaded = {
        title: form.title,
        description: form.description,
        target: form.target,
        image: form.image,
        dateCreated: form.dateCreated,
        creator: form.name,
      };

      // Upload to IPFS
      const data = await uploadToIpfs(dataToUploaded);

      const dataUrl = data[0].split("//")[1];

      //   create a new campaign
      const campaign = await createCampaign({
        args: [
          address, // owner
          form.deadline,
          form.category,
          dataUrl,
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const publishCampaignCategory = async (form) => {
    try {
      //   create a new category
      if (!isLoading) {
        const data = await createCampaignCategory({ args: [form.name] });
        console.log("contract call success", data);
      }
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaignCategories = async () => {
    const categories = await contract.call("getCampaignCategories");
    const parseCategories = categories.map((category) => ({
      id: Number(category.id.toString()),
      name: category.name,
    }));

    return parseCategories;
  };

  const getCampaign = async (id) => {
    const campaignId = parseInt(id) - 1;

    const unformattedCampaign = await contract.call("getCampaign", [
      campaignId,
    ]);

    const data = await downloadFromIPFs(unformattedCampaign.data);

    const formattedCampaign = await formatCampaignData(
      formattedCampaign,
      data,
      id
    );

    console.log(formattedCampaign);

    return formattedCampaign;
  };

  const downloadFromIPFs = async (ipfsStr) => {
    const uri = `ipfs://${ipfsStr}`;
    const url = storage.resolveScheme(uri);

    const data = await storage.downloadJSON(url);

    return data;
  };

  const formatCampaignData = (campaign, ipfsData, index) => {
    const formattedCampaign = {
      owner: campaign.owner,
      title: ipfsData.title || "",
      description: ipfsData.description || "",
      image: ipfsData.image || "",
      target: ethers.utils.formatEther(ipfsData.target),
      deadline: campaign.deadline.toString(),
      category: Number(campaign.category.toString()),
      dateCreated: ipfsData.dateCreated || "",
      amountCollected: ethers.utils.formatEther(campaign.amountCollected),
      campaignId: index + 1,
      creator: ipfsData.name || "James Dawson",
      percentRaised: calculateBarPercentage(
        Number(ethers.utils.formatEther(ipfsData.target)),
        Number(ethers.utils.formatEther(campaign.amountCollected))
      ),

      donations: campaign.donations.map((donation, index) => ({
        donation,
        donator: campaign.donators[index],
      })),
    };

    return formattedCampaign;
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");

    const formattedCampaigns = [];

    let index = 0;

    for (const campaign of campaigns) {
      const data = await downloadFromIPFs(campaign.data);

      formattedCampaigns.push(formatCampaignData(campaign, data, index));

      index++;
    }

    formattedCampaigns.reverse();

    return formattedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    console.log(pId);
    console.log(amount);

    const _id = pId - 1;

    const data = await contract.call("donateToCampaign", [_id], {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        createCategory: publishCampaignCategory,
        getCampaignCategories,
        isContractLoading: isLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
