export const routes = {
  home: "/",
  campaign: "/create-cause",
  profile: "/profile",
  settings: "/settings",
  details: "/campaign-details/:id",
  logout: "/logout",
};

export const navlinks = [
  {
    name: "Home",
    link: routes.home,
  },

  {
    name: "Campaigns",
    link: routes.campaign,
  },
  {
    name: "Your Campaigns",
    link: routes.profile,
    disabled: true,
  },
  {
    name: "Settings",
    link: routes.settings,
  },
  {
    name: "Logout",
    link: routes.logout,
    disabled: true,
  },
];

export const projectName = "DefiRaise";
