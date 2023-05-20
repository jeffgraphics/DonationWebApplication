const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

const donatedAmount = ethers.utils.parseUnits("1", "ether");

const campaignCategory = {
  name: "Wildlife care",
  id: 1,
};

const currentCampaignNos = 1;

const dataUrl = {
  title: "title of campaign",
  description: "Random description of the story around the camapaing",
  target: "20matic",
  image: "https://www.youtube.com/watch?v",
};
const contractName = "DefiRaise";

const parsedCampaign = (campaign) => {
  return {
    owner: campaign.owner,
    data: campaign.data,
    deadline: Number(campaign.deadline.toString()),
    donators: campaign.donators,
    donations: campaign.donations,
    amountCollected: Number(campaign.amountCollected.toString()),
    category: Number(campaign.category.toString()),
  };
};

const formatCampaignCategories = (unformattedCategories) => {
  return unformattedCategories.map((cat) => {
    return {
      id: Number(cat.id.toString()),
      name: cat.name,
    };
  });
};

const extractDonorsAndDonations = (result) => {
  return {
    donors: result[0],
    donations: result[1],
  };
};

const parsedCampaigns = (unformattedCampaign) => {
  return unformattedCampaign.map((campaign) => {
    return {
      ...parsedCampaign(campaign),
    };
  });
};

const desiredCampaign = {
  // address: ownerAddress,
  deadline: new Date("2023-05-13").getTime(),
  categoryId: campaignCategory.id,
  data: "ipfs://localhost.com",
};

describe("DefiRaise", function () {
  let DefiRaise;
  let defiRaise;
  let defiRaiseAdress;

  before(async () => {
    DefiRaise = await ethers.getContractFactory("DefiRaise");
  });

  beforeEach(async () => {
    defiRaise = await DefiRaise.deploy();
    const result = await defiRaise.deployed();
    defiRaiseAdress = result.address;
  });

  it("Should return the contract name", async function () {
    const desiredName = ethers.utils.formatBytes32String(contractName);

    const expectedName = await defiRaise.NAME();

    expect(expectedName).to.equal(desiredName);
  });

  it("Should create a campaign category", async function () {
    const newPolicyCategoryTx = await defiRaise.createCampaignCategory(
      campaignCategory.name
    );

    await newPolicyCategoryTx.wait();

    const categoryCreated = await defiRaise.getCampaignCategory(
      campaignCategory.id
    );

    console.log(categoryCreated);

    expect(Number(categoryCreated.id.toString())).to.equal(campaignCategory.id);
    expect(categoryCreated.name).to.equal(campaignCategory.name);
  });

  it("Should retrive all campaign categories", async function () {
    const newPolicyCategoryTx = await defiRaise.createCampaignCategory(
      campaignCategory.name
    );

    await newPolicyCategoryTx.wait();

    const unformattedCategories = await defiRaise.getCampaignCategories();

    const categories = formatCampaignCategories(unformattedCategories);

    expect(categories[0].id).to.equal(campaignCategory.id);
    expect(categories[0].name).to.equal(campaignCategory.name);
  });

  it("Should create a new campaign", async function () {
    const [_, owner1] = await ethers.getSigners();

    const currentBalance = await ethers.provider
      .getBalance(owner1.address)
      .toString();

    // Ensure existence of campaign category
    const newPolicyCategoryTx = await defiRaise.createCampaignCategory(
      campaignCategory.name
    );

    await newPolicyCategoryTx.wait();

    const categoryCreated = await defiRaise.getCampaignCategory(
      campaignCategory.id
    );

    const newCampaignTx = await defiRaise.createCampaign(
      owner1.address,
      desiredCampaign.deadline,
      desiredCampaign.categoryId,
      desiredCampaign.data
    );

    await newCampaignTx.wait();

    const campaignNos = await defiRaise.getTotalNosOfCampaigns();

    console.log("Before I am here");

    console.log(campaignNos);

    // Verify the current number of campaigns
    expect(Number(campaignNos.toString())).to.equal(currentCampaignNos);

    const expectedCampaign = await defiRaise.getCampaign(
      currentCampaignNos - 1
    );

    // Handle Formatting of this result here
    const formattedCampaign = await parsedCampaign(expectedCampaign);

    expect(formattedCampaign.category).to.equal(campaignCategory.id);
    expect(formattedCampaign.data).to.equal(desiredCampaign.data);
    expect(formattedCampaign.owner).to.equal(owner1.address);
    expect(formattedCampaign.deadline).to.equal(desiredCampaign.deadline);
  });

  it("Should retrieve all campaigns", async function () {
    const [_, owner1] = await ethers.getSigners();

    const currentBalance = await ethers.provider
      .getBalance(owner1.address)
      .toString();

    // Ensure existence of campaign category
    const newPolicyCategoryTx = await defiRaise.createCampaignCategory(
      campaignCategory.name
    );

    await newPolicyCategoryTx.wait();

    const categoryCreated = await defiRaise.getCampaignCategory(
      campaignCategory.id
    );

    const newCampaignTx = await defiRaise.createCampaign(
      owner1.address,
      desiredCampaign.deadline,
      desiredCampaign.categoryId,
      desiredCampaign.data
    );

    await newCampaignTx.wait();

    const campaignNos = await defiRaise.getTotalNosOfCampaigns();

    // Verify the current number of campaigns
    expect(Number(campaignNos.toString())).to.equal(currentCampaignNos);

    const unformattedCampaigns = await defiRaise.getCampaigns();

    const campaigns = parsedCampaigns(unformattedCampaigns);

    expect(campaigns[0].category).to.equal(campaignCategory.id);
    expect(campaigns[0].data).to.equal(desiredCampaign.data);
    expect(campaigns[0].owner).to.equal(owner1.address);
    expect(campaigns[0].deadline).to.equal(desiredCampaign.deadline);
  });

  it("Should make a donation to a new campaign and retrieve donors and donations", async function () {
    const [_, owner1, donator1] = await ethers.getSigners();

    const currentBalance = await ethers.provider
      .getBalance(owner1.address)
      .toString();

    // Ensure existence of campaign category
    const newPolicyCategoryTx = await defiRaise.createCampaignCategory(
      campaignCategory.name
    );

    await newPolicyCategoryTx.wait();

    const categoryCreated = await defiRaise.getCampaignCategory(
      campaignCategory.id
    );

    const newCampaignTx = await defiRaise.createCampaign(
      owner1.address,
      desiredCampaign.deadline,
      desiredCampaign.categoryId,
      desiredCampaign.data
    );

    await newCampaignTx.wait();

    const campaignNos = await defiRaise.getTotalNosOfCampaigns();

    const campaignId = campaignNos - 1;

    // donate with another signer wallet */
    await defiRaise
      .connect(donator1)
      .donateToCampaign(campaignId, { value: donatedAmount });

    // Verify the current number of campaigns
    // expect(Number(campaignNos.toString())).to.equal(currentCampaignNos);

    const expectedCampaign = await defiRaise.getCampaign(campaignId);

    // Handle Formatting of this result here
    const formattedCampaign = await parsedCampaign(expectedCampaign);

    console.log(formattedCampaign);

    // /Get Donators
    const donatorsAndDonation = await defiRaise.getDonators(campaignId);

    const formattedDonatorsAndDonation =
      extractDonorsAndDonations(donatorsAndDonation);

    expect(Number(formattedCampaign.donations[0].toString())).to.equal(
      Number(donatedAmount.toString())
    );
    expect(formattedCampaign.donators[0]).to.equal(donator1.address);
    expect(formattedCampaign.owner).to.equal(owner1.address);
    expect(formattedDonatorsAndDonation.donors[0]).to.equal(donator1.address);
    expect(Number(formattedDonatorsAndDonation.donations[0])).to.equal(
      Number(donatedAmount.toString())
    );
    expect(Number(formattedCampaign.amountCollected.toString())).to.equal(
      Number(donatedAmount.toString())
    );
  });
});
