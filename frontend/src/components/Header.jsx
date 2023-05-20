import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { navlinks, routes } from "../constants";

import { useStateContext } from "../context";

const NavItems = () => {
  const [isActiveMenu, setIsActiveMenu] = useState("Home");

  return (
    <>
      {navlinks.map((nav) => (
        <li
          onClick={() => {
            setIsActiveMenu(nav.name);
          }}
          key={nav.name}
          className={`menu-item ${
            isActiveMenu === nav.name && "current-menu-item"
          }`}
        >
          {/* current-menu-item menu-item-home  current-menu-ancestor current-menu-parent */}
          <Link to={nav.link}>
            <span>{nav.name}</span>
          </Link>
        </li>
      ))}
    </>
  );
};

const Header = () => {
  const navigate = useNavigate();

  const { connect, address } = useStateContext();

  return (
    <>
      <div className="top_panel_fixed_wrap"></div>
      <header className="top_panel_wrap top_panel_style_1 scheme_original">
        <div className="top_panel_wrap_inner top_panel_inner_style_1 top_panel_position_above">
          <div className="top_panel_middle">
            <div className="content_wrap">
              <div className="contact_logo">
                <div className="logo">
                  <a href="index.html">
                    <img
                      src="frontend\public\assets\images\White_Logo.png"
                      className="logo_main"
                      alt=""
                      width="118"
                      height="69"
                    />
                  </a>
                </div>
              </div>
              <div className="contact_button">
                {/* <a className="first_button" href="our-causes.html">
                  Donate
                </a> */}
                {/* title={address ? 'Create a campaign' : 'Connect'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if(address) navigate('create-campaign')
                else connect();
              }} */}
                <button
                  className="second_button"
                  onClick={() => {
                    if (address) {
                      navigate(routes.campaign);
                    } else connect();
                  }}
                >
                  {address ? "Create a Campaign" : "Connect your wallet.."}
                </button>
              </div>
        
            </div>
          </div>
          <div className="top_panel_bottom">
            <div className="content_wrap clearfix">
              <nav className="menu_main_nav_area menu_hover_fade">
                <ul id="menu_main" className="menu_main_nav">
                  <NavItems />
                </ul>
              </nav>
              <div className="search_wrap search_style_fullscreen search_state_closed">
                <div className="search_form_wrap">
                  <form
                    role="search"
                    method="get"
                    className="search_form"
                    action="#"
                  >
                    <button
                      type="submit"
                      className="search_submit icon-search"
                      title="Open search"
                    ></button>
                    <input
                      type="text"
                      className="search_field"
                      placeholder="Search"
                      value=""
                      name="s"
                      onChange={() => {}}
                    />
                    <a className="search_close icon-cancel"></a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="header_mobile">
        <div className="content_wrap">
          <div className="menu_button icon-menu"></div>
          <div className="logo">
            <a href="index.html">
              <img
                src="frontend\public\assets\images\White_Logo.png"
                className="logo_main" 
                alt=""
                width="118"
                height="69"
              />
            </a>
          </div>
        </div>
        <div className="side_wrap">
          <div className="close">Close</div>
          <div className="panel_top">
            <nav className="menu_main_nav_area">
              <ul id="menu_mobile" className="menu_main_nav">
                <NavItems />
              </ul>
            </nav>
            <div className="search_wrap search_style_ search_state_fixed search_ajax">
              <div className="search_form_wrap">
                <form
                  role="search"
                  method="get"
                  className="search_form"
                  action="#"
                >
                  <button
                    type="submit"
                    className="search_submit icon-search"
                    title="Start search"
                  ></button>
                  <input
                    type="text"
                    className="search_field"
                    placeholder="Search"
                    value=""
                    onChange={() => {}}
                    name="s"
                  />
                </form>
              </div>
              <div className="search_results widget_area scheme_original">
                <a className="search_results_close icon-cancel"></a>
                <div className="search_results_content"></div>
              </div>
            </div>
          </div>
          <div className="contact_socials">
            <div className="sc_socials sc_socials_type_icons sc_socials_shape_square sc_socials_size_small">
              <div className="sc_socials_item">
                <a
                  href="#"
                  target="_blank"
                  className="social_icons social_twitter"
                >
                  <span className="icon-twitter"></span>
                </a>
              </div>
              <div className="sc_socials_item">
                <a
                  href="#"
                  target="_blank"
                  className="social_icons social_facebook"
                >
                  <span className="icon-facebook"></span>
                </a>
              </div>
              <div className="sc_socials_item">
                <a
                  href="#"
                  target="_blank"
                  className="social_icons social_vine"
                >
                  <span className="icon-vine"></span>
                </a>
              </div>
              <div className="sc_socials_item">
                <a
                  href="#"
                  target="_blank"
                  className="social_icons social_youtube"
                >
                  <span className="icon-youtube"></span>
                </a>
              </div>
              <div className="sc_socials_item">
                <a
                  href="#"
                  target="_blank"
                  className="social_icons social_pinterest-circled"
                >
                  <span className="icon-pinterest-circled"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mask"></div>
      </div>
    </>
  );
};

export default Header;
