import React, { memo } from "react";
import { Link as LinkRoute } from "react-router-dom";
import { NAVIGATION_COUNT_MANAGE } from "../../../config/constants/content.constant";
import { Button } from "@mui/material";

const BrandMenu = (props) => {
  const { listData } = props;

  return (
    <>
      {listData &&
        listData.parentCategory.length > 0 &&
        listData.parentCategory.map((list, brandsIndex) => {
          return (
            <>
              <div
                className="menu-mega-title"
                key={`brandtitle Brand ${brandsIndex}`}
              >
                {list.title}
              </div>
              <ul className={`menu-mega-list brand`}>
                {list &&
                  list.subCategories.length > 0 &&
                  list.subCategories.map((subCatList, subIndex) => {
                    if (
                      `${subIndex + 1}` <=
                      NAVIGATION_COUNT_MANAGE.brandsListMaxCount
                    ) {
                      return (
                        <li
                          className="list-item"
                          role="list-item"
                          key={"brandSubCat Name" + subIndex}
                          onClick={() =>
                            props.getSelectedBrands(
                              subCatList.displayName,
                              subCatList.value
                            )
                          }
                        >
                          <LinkRoute
                            to={`/productlist/${listData.categoryId
                              .replace(/\s/g, "")
                              .toLowerCase()}/${subCatList.value}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button role="link">
                              <img
                                src={subCatList.image}
                                alt={subCatList.displayName}
                              />
                              <div>{subCatList.displayName}</div>
                            </Button>
                          </LinkRoute>
                        </li>
                      );
                    }
                  })}
              </ul>
            </>
          );
        })}
    </>
  );
};

export default memo(BrandMenu);
