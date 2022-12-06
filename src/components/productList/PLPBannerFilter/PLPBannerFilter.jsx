import { Container, Grid } from "@mui/material";
import React from "react";
import Breadcrumbs from "../../commonComponents/Breadcrumbs/Breadcrumbs";
import dataStatic from "../../productList/data.json";
import "./PLPBannerFilter.scss";

// const selectFilterPill = (heading, item, isChecked) => {
//   console.log('==========>',item, heading, isChecked);
//   // const updatedFiltersResult = props.createSearchURL(heading.toLowerCase(), item.toLowerCase(), isChecked);
//   // console.log(updatedFiltersResult);
// };

const PLPBannerFilter = (props) => {
  const {
    data,
    bannerData,
    parsedUrlNavigationParamsArr,
    filterOptionSearchedList,
    filterOptionList,
  } = props;
  console.log(
    "parsedUrlNavigationParamsArr",
    parsedUrlNavigationParamsArr[1].split("/")
  );
  const parsedRouteArr = parsedUrlNavigationParamsArr[1]
    ? parsedUrlNavigationParamsArr[1].split("/")
    : "";
  //const parsedRouteArr = parsedUrlNavigationParamsArr[1] && parsedUrlNavigationParamsArr[1].split('/');
  const parsedRouteName = parsedRouteArr[1]
    ? ["flavor", "snacktype"].includes(parsedRouteArr[1])
      ? "brand"
      : "snacktype"
    : "brand";
  console.log("parsedRouteArr[2]", parsedRouteName);
  let filteredCategoryList =
    filterOptionSearchedList &&
    filterOptionSearchedList.filter(
      (item) =>
        item.categoryId.replace(" ", "").toLowerCase() == parsedRouteName
    );
  console.log("filteredCategoryList", filteredCategoryList);
  const parsedRouteString =
    parsedRouteArr[2] && parsedRouteArr[2].split("+").join(" ");
  console.log("parsedRouteArr>>", parsedRouteArr);
  return (
    <>
      {parsedRouteString &&
      ["savory snacks", "sweet snacks", "nuts & jerky snacks"].includes(
        parsedRouteString
      ) ? (
        <Container className="container-root flavors-container">
          <Grid
            container
            justifyContent="center"
            className="flavors-container-inner purple"
          >
            <Grid
              item
              lg="5"
              md="6"
              sm="6"
              className="flavors-container-content"
            >
              <h1>{parsedRouteString}</h1>
              <p>
                What is it about salty and savory goodness that keeps us coming
                back for more? All we know is there’s a perfect pairing in here
                with every snack-worthy activity.
              </p>
            </Grid>
            <Grid item lg="7" md="6" sm="6" className="flavors-container-img">
              {/* <img src="www/images/redesign/flavors.png" alt="Flavors" /> */}
            </Grid>
          </Grid>
        </Container>
      ) : parsedRouteArr[1] === "snacktype" ? (
        <Container className="container-root">
          <Grid container justifyContent="center" className="banner-container">
            <Grid item lg="8" md="9" sm="12">
              {parsedRouteArr[2] && <h1>{parsedRouteArr[2]}</h1>}
              <p>
                Crunch, crunch, crunch away with a wide variety of chip options.
                Have it hot, zesty, or cheesy –– flavor is calling and we think
                you should answer.
              </p>
            </Grid>
          </Grid>
        </Container>
      ) : ["flavor", "brand"].includes(parsedRouteArr[1]) ? (
        <Container className="container-root flavors-container">
          <Grid
            container
            justifyContent="center"
            className="flavors-container-inner"
          >
            <Grid item lg="7" md="6" sm="6" className="flavors-container-img">
              <img src="www/images/redesign/flavors.png" alt="Flavors" />
            </Grid>
            <Grid
              item
              lg="5"
              md="6"
              sm="6"
              className="flavors-container-content"
            >
              {parsedRouteArr[2] && <h1>{parsedRouteArr[2]}</h1>}
              <p>
                Variety is the spice of life and it doesn’t get much spicier
                than our spicy selection. Maybe you’re looking for something
                more sweet. Or… ranch-y? Either way, we have the whole flavor
                thing down.
              </p>
            </Grid>
          </Grid>
        </Container>
      ) : (
        ""
      )}
      {parsedRouteArr[1] && (
        <Container
          justifyContent="center"
          className="container-root flavors-container"
        >
          <ul>
            {filteredCategoryList[0] &&
              filteredCategoryList[0].subCategories
                //.sort((a, b) => a.displaySequence > b.displaySequence ? a : b)
                .map((item, index) => {
                  if (index >= 8) return true;
                  return (
                    <li
                      key={`${item}-${index}`}
                      className={`link-list ${
                        props.selectedFiltersArray.findIndex(
                          (filterItem) =>
                            filterItem.value.toLowerCase() ===
                            item.value.toLowerCase()
                        ) !== -1
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        props.createSearchURL(
                          filteredCategoryList[0].categoryId.toLowerCase(),
                          item.value.toLowerCase(),
                          true
                        )
                      }
                    >
                      {item.displayName}
                    </li>
                  );
                })}
          </ul>
        </Container>
      )}
    </>
  );

  //   <Container className="container-root flavors-container">
  //   <Grid
  //     container
  //     justifyContent="center"
  //     className="flavors-container-inner purple"
  //   >
  //     <Grid
  //       item
  //       lg="5"
  //       md="6"
  //       sm="6"
  //       className="flavors-container-content"
  //     >
  //       {bannerData.bannerTitle && <h1>Savory Snacks</h1>}
  //       {bannerData.description && (
  //         <p>
  //           What is it about salty and savory goodness that keeps us
  //           coming back for more? All we know is there’s a perfect pairing
  //           in here with every snack-worthy activity.
  //         </p>
  //       )}
  //     </Grid>
  //     <Grid item lg="7" md="6" sm="6" className="flavors-container-img">
  //       <img src="www/images/redesign/flavors.png" alt="Flavors" />
  //     </Grid>
  //   </Grid>
  //   <Grid container justifyContent="center">
  //     <ul>
  //       {data.items.map((item, index) => {
  //         return (
  //           <li
  //             key={index}
  //             className={item === "Cheetos" ? "active" : ""}
  //           >
  //             {item}
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   </Grid>
  // </Container>
  // <div className={"plp-flavors-wrapper"}>

  // </div>
};

export default PLPBannerFilter;
