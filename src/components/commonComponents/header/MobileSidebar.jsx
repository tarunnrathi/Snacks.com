import "./MobileSidebar.scss";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React, { memo, useState } from "react";
import {
  toTitleCase,
  toUpperString,
  getNavListName,
} from "../../../components/Utils";

import { ROUTES_URL } from "../../../config/constants/routes.constant";
import UrlConstants from "../../../config/UrlConstants";
import { useHistory } from "react-router-dom";
import FilterCard from "./FilterCard";
import { Button, Grid, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Popover } from "@mui/material";

const MobileSidebar = ({
  showDrawer,
  toggleDrawer,
  mobileMenuAnchorEl,
  NAVIGATION_MENU,

  closeMegaMenuOnClick,
  openLoginModal,

  profileUserName,
  isAuthenticated,
  displayProfileInfo,
  userLogout,

  theme,
  filterList,
  handleSelectedMobile,
  getSelectedSubcat,
  toggleDrawClose,
}) => {
  const history = useHistory();
  const [selectedSubMenu, setSelectedSubMenu] = useState(""); // eg. Brand

  const handleSelectSubMenu = (label) => {
    handleSelectedMobile(label);

    setSelectedSubMenu(label);
  };

  const backToMenu = () => {
    setSelectedSubMenu(null);
  };

  const handleRoutes = (path) => {
    console.log(path, "Test");
    toggleDrawClose();
    history.push(path);
  };

  return (
    <>
      <Popover
        classes={{
          paper: `menu-mobile-popoverPaper ${theme} ${
            UrlConstants.isTastyRewards && "menu-mobile-popoverPaper-tr"
          }`,
        }}
        className="nav-mobile-menu"
        id="nav-mobile-menu"
        anchorEl={mobileMenuAnchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        getContentAnchorEl={null}
        open={Boolean(showDrawer)}
        onClose={(e) => {
          toggleDrawer(e);
        }}
        keepMounted
        autoFocus={false}
      >
        {selectedSubMenu ? (
          <Grid container>
            <Grid item xs={12}>
              <List
                component="ul"
                aria-labelledby="nested-submenu-subheader"
                disablePadding
                className={
                  getNavListName(selectedSubMenu)
                    ? `list-submenu brands ${theme}`
                    : `list-submenu ${theme}`
                } /*brands*/
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-submenu-subheader"
                    className={`list-submenu-header ${theme}`}
                  >
                    <ListItemIcon
                      className={`leftArrow ${theme}`}
                      onClick={() => backToMenu()}
                    >
                      <KeyboardArrowLeftIcon />
                    </ListItemIcon>
                    <ListItemText
                      className={`item-text ${theme}`}
                      primary={toUpperString(selectedSubMenu)}
                    />
                  </ListSubheader>
                }
              >
                {filterList &&
                  filterList.parentCategory.length > 0 &&
                  filterList.parentCategory.map((pCat, pIndex) => {
                    return (
                      <>
                        <div
                          className="list-submenu-title"
                          key={`MobCat${pIndex}`}
                        >
                          {toUpperString(pCat.title)}
                        </div>
                        {pCat &&
                          pCat.subCategories.length > 0 &&
                          pCat.subCategories.map((sCat, sIndex) => {
                            return (
                              <React.Fragment key={`MobSubCat${sIndex}`}>
                                <ListItem
                                  className={`list-submenu-item ${theme}`}
                                  onClick={() =>
                                    getSelectedSubcat(
                                      sCat.displayName,
                                      sCat.value
                                    )
                                  }
                                >
                                  <Button type="button" role="link">
                                    {getNavListName(selectedSubMenu) ? (
                                      <img
                                        src={sCat.image}
                                        alt={toTitleCase(sCat.displayName)}
                                      />
                                    ) : (
                                      ""
                                    )}{" "}
                                    <div>{toUpperString(sCat.displayName)}</div>
                                  </Button>
                                </ListItem>
                              </React.Fragment>
                            );
                          })}
                      </>
                    );
                  })}

                {filterList && filterList.shopAll.title ? (
                  <div className="list-submenu-title footer-title">
                    <Button
                      onClick={() => handleRoutes("allbrands")}
                      role="link"
                    >
                      {filterList.shopAll.title}
                    </Button>
                  </div>
                ) : (
                  ""
                )}

                {/* <div className="list-submenu-title footer-title">
                  <Button role="link">Shop All</Button>
                </div> */}
                {filterList && filterList.promotion.length > 0 ? (
                  <Grid container>
                    <Grid item className="filter-card">
                      <FilterCard promoData={filterList.promotion} />
                    </Grid>
                  </Grid>
                ) : (
                  ""
                )}
              </List>
            </Grid>
          </Grid>
        ) : (
          <Grid container className="list-container">
            {/* profile button starts */}
            {isAuthenticated && (
              <Grid item xs={12}>
                <Button
                  className={`links ${theme}`}
                  onClick={() => handleRoutes("/profile")}
                >
                  {displayProfileInfo(profileUserName)}
                </Button>
              </Grid>
            )}
            {/* profile button ends */}

            {/* nav menu starts */}
            <Grid item xs={12} className="list-level-1">
              <React.Fragment>
                <List
                  component="ul"
                  role="list"
                  aria-labelledby="nested-list-subheader"
                  disablePadding
                >
                  {NAVIGATION_MENU &&
                    NAVIGATION_MENU?.length > 0 &&
                    NAVIGATION_MENU?.map((sub, i) => {
                      if (sub.parentCategory.length > 0) {
                        return (
                          <React.Fragment key={`MobNavList${sub.categoryId}`}>
                            <ListItem
                              className={`list-subheader-item ${theme}`}
                              aria-haspopup="true"
                              role="listitem"
                              onClick={() => handleSelectSubMenu(sub.title)}
                            >
                              <>
                                <ListItemText
                                  className={`list-subheader-item-text ${theme}`}
                                  primary={toUpperString(sub.title)}
                                />
                                <ListItemIcon className={`rightArrow ${theme}`}>
                                  <KeyboardArrowRightIcon />
                                </ListItemIcon>
                              </>
                            </ListItem>
                          </React.Fragment>
                        );
                      } else {
                        return (
                          <React.Fragment key={`MobNavList${sub.categoryId}`}>
                            <ListItem
                              className={`list-subheader-item ${theme}`}
                              role="listitem"
                              onClick={() => handleRoutes(sub.title)}
                              aria-haspopup="true"
                            >
                              <ListItemText
                                className={`list-subheader-item-text ${theme}`}
                                primary={toUpperString(sub.title)}
                              />
                            </ListItem>
                          </React.Fragment>
                        );
                      }
                    })}
                </List>
              </React.Fragment>
            </Grid>
            {/* nav menu ends */}

            {/* extra menu starts */}
            <Grid item xs={12} className="login-grid">
              <List>
                {isAuthenticated ? (
                  <ListItem
                    role="listitem"
                    onClick={(event) => userLogout(event)}
                  >
                    Logout
                  </ListItem>
                ) : (
                  <ListItem
                    role="listitem"
                    onClick={(event) => openLoginModal(event)}
                  >
                    Login
                  </ListItem>
                )}
                <ListItem
                  role="listitem"
                  onClick={() => handleRoutes(ROUTES_URL.CONTACT_US)}
                >
                  Contact Us
                </ListItem>
              </List>
            </Grid>
            {/* extra menu ends */}
          </Grid>
        )}
      </Popover>
    </>
  );
};

export default memo(MobileSidebar);
