import React, { useEffect, useState } from "react";
import {
  Spacer,
  Wrapper,
  Category,
  Loading,
  TransactionLoading,
} from "../components";

import { useNavigate } from "react-router-dom";

import { useStateContext } from "../context";

import { projectName } from "../constants";

const Settings = () => {
  const { createCategory, address, getCampaignCategories, isContractLoading } =
    useStateContext();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
  });

  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const fetchCategories = async () => {
    setIsLoading((prev) => !prev);
    const categories = await getCampaignCategories();
    setIsLoading((prev) => !prev);
    setCategories(categories);
  };

  useEffect(() => {
    if (!isContractLoading) {
      fetchCategories();
    }
  }, [address, isContractLoading, createCategory]);

  const handleFormFieldChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address) {
      // @Todo: change this to error message
      alert("Please connect your wallet");
      return;
    }

    if (form.name) {
      setIsSubmittingForm((prev) => !prev);
      await createCategory(form);
      setIsSubmittingForm((prev) => !prev);
    } else {
      alert("You have no enter category name");
    }
  };

  return (
    <Wrapper hasCustomPadding={true}>
      {/* <Spacer /> */}
      <div className="columns_wrap">
        <div className="column_container">
          <div className="column-inner">
            <div className="block">
              <div className="wpb_text_column">
                <div className="block">
                  <h3>Welcome, system administrator! </h3>
                  <p>Proceed to update system settings </p>
                </div>
              </div>
              <h4
                className="sc_title sc_title_regular"
                style={{ marginBottom: "20px" }}
              >
                Manage campaign category
              </h4>
              <div className="wpb_text_column ">
                <div className="block">
                  <div
                    style={{
                      background: "rgb(219 219 229)",
                      width: "100%",
                      padding: "40px",
                      borderRadius: "5px",
                      marginBottom: "50px",
                      // height: "300px",
                    }}
                  >
                    {isSubmittingForm && <TransactionLoading />}

                    <form className="row g-3">
                      <div className="col-auto">
                        <input
                          type="text"
                          className="form-control-plaintext"
                          id="staticEmail2"
                          value={form.name}
                          name="name"
                          onChange={(e) => handleFormFieldChange(e)}
                          style={{
                            width: "100%",
                            height: "60px",
                            display: "inline-block",
                          }}
                        />
                      </div>
                      <button
                        className="second_button"
                        style={{ marginBottom: "10px", marginTop: "15px" }}
                        onClick={handleSubmit}
                      >
                        Add new category
                      </button>
                    </form>
                  </div>

                  <p>All available Categories</p>

                  <div
                    className="mb-4 mt-5"
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    {isLoading && <Loading />}

                    {!isLoading && categories.length === 0 && (
                      <p>No category is available</p>
                    )}

                    {categories.map((category) => (
                      <Category key={category.id} name={category.name} />
                    ))}
                  </div>
                </div>
              </div>

              {/* < */}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Settings;
