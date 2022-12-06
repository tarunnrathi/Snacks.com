import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import { SnacksCategoryIds } from "../../../../config/constants/content.constant";
import {
  ClickedButton,
  SelectedLinkItem,
} from "../../../../config/amplitude/SnacksAmplitude";
import { PAGENAME } from "../../../../config/amplitude/Taxonomy.constants";
import "./ShopBy.scss";
import { Container, Grid, Tab, Tabs } from "@mui/material";

const filterData = (data) => {
  const limit = isMobile ? 5 : 7;
  const categoryArray = data.map((obj) => {
    let continueFilter = false;
    const tab = {};
    if (obj.categoryId === SnacksCategoryIds.brand) {
      continueFilter = true;
      tab.heading = "Brand";
      tab.order = 3;
    } else if (obj.categoryId === SnacksCategoryIds.flavor) {
      continueFilter = true;
      tab.heading = "Flavor";
      tab.order = 2;
    } else if (obj.categoryId === SnacksCategoryIds.snackType) {
      continueFilter = true;
      tab.heading = "Snack";
      tab.order = 1;
    }

    if (continueFilter) {
      const subCategories = [];
      obj.parentCategory.map((parent) => {
        subCategories.push(...parent.subCategories);
      });
      tab.content = subCategories
        .sort((a, b) => a.displaySequence - b.displaySequence)
        .slice(0, limit)
        .map((item) => {
          return {
            ...item,
            link: `/productlist/${obj.categoryId
              .replace(/\s/g, "")
              .toLowerCase()}/${item.value}`,
          };
        });
      return tab;
    }
  });
  return categoryArray
    .filter((item) => item !== undefined && item !== null)
    .sort((a, b) => a.order - b.order);
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ShopBy = ({ navigationData }) => {
  const [value, setValue] = useState(0);

  if (!navigationData) {
    return null;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    ClickedButton(filteredList[newValue].heading, "Shop By", {
      PageTitle: PAGENAME.HOME,
    });
  };

  const clickHandler = (linkItem) => {
    SelectedLinkItem("CategoryLink", "Shop By", {
      PageTitle: PAGENAME.HOME,
      itemName: linkItem,
    });
  };

  const filteredList = filterData(navigationData);

  return (
    <Grid className="shop-by-wrapper">
      <h3>Shop by</h3>
      <Container>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="none"
          aria-label="basic tabs example"
        >
          {filteredList.map((item, index) => {
            return (
              <Tab
                label={item.heading}
                classes={{
                  root: "tab-heading",
                  selected: index === value ? "active" : "",
                }}
                disableRipple={true}
                {...a11yProps(index)}
                key={item.heading}
              />
            );
          })}
        </Tabs>
      </Container>
      {filteredList.map((filteredItem, index) => {
        return (
          <Grid
            container
            role="tabpanel"
            style={value !== index ? { display: "none" } : {}}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            key={filteredItem.heading}
            className="content"
          >
            {filteredItem.content.map((item) => {
              return (
                <Grid
                  item
                  md={3}
                  xs={6}
                  className={`item-box`}
                  key={item.displayName}
                >
                  <Link
                    to={item.link}
                    onClick={() => clickHandler(item.displayName)}
                  >
                    <div className="image-wrapper">
                      <img src={item.image} />
                    </div>
                    <span>{item.displayName}</span>
                  </Link>
                </Grid>
              );
            })}
            <Grid
              item
              md={3}
              sm={6}
              className={`item-box shop-all-box`}
              key={`shop-all-${filteredList.heading}`}
            >
              <Link to="/productlist" onClick={() => clickHandler("SHOP ALL")}>
                <span>SHOP ALL</span>
              </Link>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    navigationData: state.reducer.navigationData,
  };
};

export default connect(mapStateToProps)(withRouter(ShopBy));
