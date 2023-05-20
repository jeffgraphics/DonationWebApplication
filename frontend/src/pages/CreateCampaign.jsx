import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { ethers } from "ethers";

import { moneyIcon } from "../assets";

import { projectName } from "../constants";

import { useStateContext } from "../context";

import { checkIfImage, alertSuccess, alertError } from "../utils";

import {
  Spacer,
  Wrapper,
  Category,
  FormField,
  CustomButton,
  TransactionLoading,
} from "../components";

const CreateCampaign = () => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
    dateCreated: "",
    category: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { address, createCampaign, getCampaignCategories, isContractLoading } =
    useStateContext();

  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading((prev) => !prev);
        await createCampaign({
          ...form,
          deadline: new Date("2023-12-31").getTime(),
          dateCreated: new Date(),
          target: ethers.utils.parseUnits(form.target, 18),
          category: Number(form.category),
        });
        setIsLoading(false);
        alertSuccess("Campaign created successfully!");
        navigate("/");
      } else {
        alertError("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  const fetchCategories = async () => {
    // setIsLoading((prev) => !prev);
    const categories = await getCampaignCategories();
    // setIsLoading((prev) => !prev);
    setCategories(categories);
  };

  useEffect(() => {
    if (!isContractLoading) {
      fetchCategories();
    }
  }, [address]);

  return (
    <Wrapper hasCustomPadding={true}>
      {/* <Spacer /> */}
      <div className="columns_wrap">
        <div className="column_container">
          <div className="column-inner">
            <div className="block">
              <div className="wpb_text_column">
                {/* <TransactionLoading /> */}
                {isLoading && <TransactionLoading />}

                <div className="block">
                  <div
                    style={{
                      background: "rgb(219 219 229)",
                      padding: "40px",
                      borderRadius: "5px",
                      marginBottom: "50px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <p
                        style={{
                          background: "#3A3A43",
                          color: "#fff",
                          padding: "25px",
                          fontSize: "30px",
                          borderRadius: "5px",
                        }}
                      >
                        Commence a campaign
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "30px",
                        marginRight: "30px",
                      }}
                    >
                      <div
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          flexWrap: "wrap",
                          marginBottom: "40px",
                          marginRight: "40px",
                          width: "100%",
                        }}
                      >
                        <FormField
                          labelName="Your Name *"
                          placeholder="John Doe"
                          inputType="text"
                          value={form.name}
                          handleChange={(e) => handleFormFieldChange("name", e)}
                        />
                        <FormField
                          labelName="Campaign Title *"
                          placeholder="Write a title"
                          inputType="text"
                          value={form.title}
                          handleChange={(e) =>
                            handleFormFieldChange("title", e)
                          }
                        />
                      </div>
                      <div
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          flexWrap: "wrap",
                          marginBottom: "40px",
                          marginRight: "40px",
                          width: "100%",
                        }}
                      >
                        <select
                          style={{ width: "100%" }}
                          onChange={(e) => handleFormFieldChange("category", e)}
                          id="category"
                        >
                          {categories && categories.length == 0 ? (
                            <option>Categories loading...</option>
                          ) : (
                            <>
                              <option>Select category</option>
                              {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                      </div>

                      <FormField
                        labelName="Story *"
                        placeholder="Write your story"
                        isTextArea
                        value={form.description}
                        handleChange={(e) =>
                          handleFormFieldChange("description", e)
                        }
                      />

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                          marginTop: "20px",
                          marginBottom: "20px",
                          borderRadius: "10px",
                          background: "#84C554",
                          padding: "30px",
                        }}
                      >
                        {/* w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px] */}
                        <img
                          src={moneyIcon}
                          alt="money"
                          style={{
                            width: "40px",
                            objectFit: "contain",
                            height: "40px",
                            marginRight: "20px",
                          }}
                        />
                        {/*   className="w-[40px] h-[40px] object-contain" */}
                        <h4
                          style={{
                            fontSize: "25px",
                            color: "#fff",
                            width: "100%",
                            margin: 0,
                          }}
                        >
                          {/*  className="font-epilogue font-bold text-[25px] text-white ml-[20px]" */}
                          You will get 100% of the funds raised on {projectName}
                        </h4>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          marginBottom: "40px",
                          marginRight: "40px",
                        }}
                      >
                        {/* className="flex flex-wrap gap-[40px]" */}
                        <FormField
                          labelName="Goal *"
                          placeholder="ETH 0.50"
                          inputType="text"
                          value={form.target}
                          handleChange={(e) =>
                            handleFormFieldChange("target", e)
                          }
                        />
                        {/* <FormField
                          labelName="End Date *"
                          placeholder="End Date"
                          inputType="date"
                          value={form.deadline}
                          handleChange={(e) =>
                            handleFormFieldChange("deadline", e)
                          }
                        /> */}
                      </div>

                      <FormField
                        labelName="Campaign image *"
                        placeholder="Place image URL of your campaign"
                        inputType="text"
                        value={form.image}
                        handleChange={(e) => handleFormFieldChange("image", e)}
                      />

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "40px",
                        }}
                        // className="flex justify-center items-center mt-[40px]"
                      >
                        <CustomButton
                          btnType="submit"
                          title="Submit new campaign"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateCampaign;
