import React from "react";
import "./getStartedCard.scss";
import { Link } from "react-router-dom";
import { ROUTES_URL } from "../../../config/constants/routes.constant";
import { Button, Card } from "@mui/material";

const GetStartedCard = ({ closeMegaMenuOnClick, size }) => {
  return (
    <>
      <Link
        to={ROUTES_URL.MY_VARIETY_PACK}
        onClick={closeMegaMenuOnClick}
        className="getStartedcard-link"
      >
        <Card className={`getStartedcard ${size}`}>
          <div className={`product-content-wrapper ${size}`}>
            <div className={`product-information ${size}`}>
              <div className="product-heading">Make Your Own</div>
              <div className="product-heading">Variety Pack</div>
            </div>

            <div className={`product-information ${size}`}>
              <div className="product-action">
                <Button
                  className="get-started-btn"
                  aria-label="Get Started Variety Pack"
                >
                  Get Started
                </Button>
              </div>
            </div>
            <Button
              aria-label="click to open product detail dialog"
              className={`media-card-wrapper ${size}`}
            >
              <img
                alt="Multipack"
                src="https://share.snacks.com/images/Snacks.com-ApolloBox-Summer2021.png"
              />
            </Button>
          </div>
        </Card>
      </Link>
    </>
  );
};

export default GetStartedCard;
