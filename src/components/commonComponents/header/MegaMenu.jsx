import "./MegaMenu.scss";
import React, { memo } from "react";
import { Link as LinkRoute } from "react-router-dom";
import BrandMenu from "./BrandMenu";
import FilterCard from "./FilterCard";
import { getNavListName } from "../../../components/Utils";
import { NAVIGATION_COUNT_MANAGE } from "../../../config/constants/content.constant";
import { Button, Container, Grid } from "@mui/material";

const MegaMenu = (props) => {
  const { filterList, hovarTitleName } = props;

  return (
    <>
      <Grid
        container
        id="nav-mega-menu"
        className="menu-mega-container"
        onMouseEnter={(e) => props.handleMegaMenuOpenNew()}
        onMouseLeave={(e) => props.closeMegaMenuOnLeave(e)}
      >
        <div className="menu-mega-container-inner">
          <Container className="container-root">
            <Grid container className="filter-container">
              {getNavListName(hovarTitleName) ? (
                <BrandMenu
                  listData={filterList}
                  getSelectedBrands={props.getSelectedSubcat}
                ></BrandMenu>
              ) : (
                <Grid xs={9} className="filter-container-list">
                  <Grid container>
                    {filterList &&
                      filterList.parentCategory.length > 0 &&
                      filterList.parentCategory.map((data, listIndex) => {
                        if (
                          `${listIndex + 1}` <=
                          `${
                            NAVIGATION_COUNT_MANAGE.parentCatMaxCount -
                            filterList.promotion.length
                          }`
                        ) {
                          return (
                            <Grid
                              xs={`${
                                filterList.promotion.length === 2
                                  ? 6
                                  : filterList.promotion.length === 1
                                  ? 4
                                  : 3
                              }`}
                            >
                              {/* 
                                1 Promo - grid 4 
                                2 Promo - grid 6 
                                0 Promo - grid 3
                              */}
                              <div
                                className="menu-mega-title"
                                key={`otherFilter ${listIndex}`}
                              >
                                <LinkRoute 
                                  to={`/productlist/allsnacks/${data.title.toLowerCase().replace(/shop |_/g,'').replaceAll(' ', '+')}`}
                                  className={`parent-menu-link`}
                                >
                                  {data.title}
                                </LinkRoute>
                              </div>
                              <ul className={`menu-mega-list`}>
                                {/* 'columns' class for columns wrap */}
                                {data &&
                                  data.subCategories &&
                                  data.subCategories.length > 0 &&
                                  data.subCategories.map(
                                    (subCatList, catIndex) => {
                                      if (
                                        `${catIndex + 1}` <=
                                        NAVIGATION_COUNT_MANAGE.subCategoryMaxCount
                                      ) {
                                        return (
                                          <li
                                            className="list-item"
                                            role="list-item"
                                            key={`otherFilterSub ${catIndex}`}
                                          >
                                            <LinkRoute 
                                              to={`/productlist/${filterList.categoryId.replace(/\s/g,'').toLowerCase()}/${subCatList.value}`}
                                              style={{textDecoration: 'none'}}
                                            >
                                              <Button
                                                role="link"
                                                onClick={() =>
                                                  props.getSelectedSubcat(
                                                    subCatList.displayName,
                                                    subCatList.value
                                                  )
                                                }
                                              >
                                                {subCatList.displayName}
                                              </Button>
                                            </LinkRoute>
                                          </li>
                                        );
                                      }
                                    }
                                  )}
                              </ul>
                            </Grid>
                          );
                        }
                      })}
                  </Grid>
                </Grid>
              )}
              {filterList && filterList.promotion.length > 0 ? (
                <FilterCard promoData={filterList.promotion} />
              ) : (
                ""
              )}
            </Grid>
          </Container>

          {filterList && filterList.shopAll.title ? (
            <div className="menu-mega-footer">
              <Button
                onClick={() => props.getSelectedSubcat("", "", "allsnacks")}
              >
                {filterList.shopAll.title}
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </Grid>
    </>
  );
};

export default memo(MegaMenu);
