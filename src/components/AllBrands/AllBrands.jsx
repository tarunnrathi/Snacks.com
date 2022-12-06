import React, { memo } from "react";
import { useEffect, useState } from "react";
import { getBannerData } from "../Utils";
import Breadcrumbs from "../commonComponents/Breadcrumbs/Breadcrumbs";
import PLPBanner from "../productList/PLPBanner/PLPBanner";
import PLPBannerFilter from "../productList/PLPBannerFilter/PLPBannerFilter";
import { useSelector } from "react-redux";
import Pack from "../Myovp/Pack";
import data from "../productList/data.json";
import "./AllBrands.scss";
import APIUtil from "../../config/APIUtil";
import validateAPIResponse from "../../components/ApiHelper";
import UrlConstants from "../../config/UrlConstants";
import { Button, Container } from "@mui/material";

const AllBrands = (props) => {
  const [bannerData, setBannerData] = useState({});
  const [brandListing, setBrandListing] = useState([]);

  const [bannerDataMyovp, setBannerDataMyovp] = useState({}); //= useSelector((state) => state.reducer.bannerList);

  useEffect(() => {
    try {
      setBannerData(getBannerData("All Brands"));

      APIUtil.getMethod(
        `${UrlConstants.allBrandsList}`,
        true,
        localStorage.getItem("_lo_No") || sessionStorage.getItem("_lo_No")
      ).then((response) => {
        if (validateAPIResponse(response)) {
          if (
            response.data &&
            response.data.data &&
            response.data.data.allBrands.length > 0
          ) {
            let myObj = response.data.data.allBrands.sort(
              (a, b) => a.displaySequence - b.displaySequence
            );

            setBrandListing(myObj);
            setBannerDataMyovp(response.data.data.myovpBanner);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div
        className={
          bannerData.bannerTxtColor
            ? "plp-banner-wrapper white"
            : "plp-banner-wrapper"
        }
        style={{
          backgroundColor: bannerData.bannerBgColor,

          color: bannerData.bannerTxtColor,
        }}
      >
        <Breadcrumbs crumbs={data.crumbs} />
        <PLPBanner bannerData={bannerData} data={data.banner} />
      </div>
      {/* <PLPBannerFilter bannerData={bannerData} data={data.banner} /> */}
      <Container className="container-root all-brands-container">
        <ul className="all-brands-list">
          {brandListing.length > 0 &&
            brandListing.map((subCatList, subIndex) => {
              return (
                <li
                  className="list-item"
                  role="list-item"
                  key={"brandSubCat Name" + subIndex}
                >
                  <Button role="link">
                    <div className="all-brands-img">
                      <img src={subCatList.image} alt={subCatList.title} />
                    </div>
                    <div className="all-brands-title">{subCatList.title}</div>
                  </Button>
                </li>
              );
            })}
        </ul>
        {bannerDataMyovp && <Pack data={bannerDataMyovp} />}
      </Container>
    </>
  );
};

export default memo(AllBrands);
