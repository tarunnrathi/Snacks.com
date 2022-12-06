import { Button, Grid } from "@mui/material";
import React from "react";
import "./PLPBanner.scss";

const PLPBanner = (props) => {

  selectFilter = (heading, item, isChecked) => {
    console.log('==========>',item, heading, isChecked);
    const updatedFiltersResult = this.props.createSearchURL(heading.toLowerCase(), item.toLowerCase(), isChecked);
    console.log(updatedFiltersResult);
  }

  const { data, bannerData, parsedUrlNavigationParamsArr, filterOptionSearchedList, filterOptionList } = props;
  console.log('parsedUrlNavigationParamsArr',parsedUrlNavigationParamsArr[1].split('/'));
  const parsedRouteArr = parsedUrlNavigationParamsArr[1] && parsedUrlNavigationParamsArr[1].split('/');
  const parsedRouteName = parsedRouteArr[1] && parsedRouteArr[1] === 'snacktype' ? 'brand' : parsedRouteArr[1];
  let filteredCategoryList = filterOptionSearchedList && filterOptionSearchedList.filter((item) => item.categoryId.replace(" ", "").toLowerCase() == parsedRouteName.toLowerCase());
  // console.log('parsedUrlNavigationParamsArr',filterOptionSearchedList);
  console.log('filteredCategoryList',filteredCategoryList);
  return (
    <Grid container justifyContent="center" className="banner-container">
      <Grid item lg="8" md="9" sm="12">
        {bannerData.bannerTitle && <h1>{bannerData.bannerTitle}</h1>}
        {bannerData.description && <p>{bannerData.description}</p>}
        {parsedRouteArr[1] && parsedRouteArr[1] === "snacktype" &&
          <ul>
            {filteredCategoryList[0] &&
              filteredCategoryList[0].subCategories
              //.sort((a, b) => a.displaySequence > b.displaySequence ? a : b)
              .map((item, index) => {
              if(index >= 8) return true;
              return (
                <li key={index} className={"link-list"} onClick={(e) => props.selectPLPFilter(filteredCategoryList[0].categoryId.toLowerCase(), item.value.toLowerCase(), e.target.isChecked)}>
                  {item.displayName}
                </li>
              );
            })}
          </ul>
        }
      </Grid>
      <Grid item lg="8" md="9" sm="12">
        {bannerData.imageTile ? (
          <ul className="all-snacks-list">
            <li>
              <Button>
                Savory Snacks
                <img
                  src="www/images/redesign/all-snacks1.png"
                  alt="Savory Snacks"
                />
              </Button>
            </li>
            <li>
              <Button>
                Sweet Snacks
                <img
                  src="www/images/redesign/all-snacks2.png"
                  alt="Sweet Snacks"
                />
              </Button>
            </li>
            <li>
              <Button>
                Nuts & Jerky
                <img
                  src="www/images/redesign/all-snacks3.png"
                  alt="Nuts & Jerky"
                />
              </Button>
            </li>
          </ul>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
};

export default PLPBanner;
