import React from "react";
import "./OrderReview.scss";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, LinearProgress, Typography } from "@mui/material";

const OrderReview = () => {
  return (
    <Card className="card" elevation={0}>
      <CardContent className="main-wrapper">
        <Typography color="textSecondary" className="left-wrapper" gutterBottom>
          <div className="shopping-cart-subheader">
            <div className="card-sub-header">
              <p className="notice">
                Nice! You’ve qualified for free shipping!
              </p>
              <LinearProgress
                classes={{
                  root: "root-className",

                  bar: "bar-className",
                }}
                variant="determinate"
                value={100}
              />
            </div>
          </div>
          <hr />
        </Typography>
        <Typography variant="body2" component="p" className="right-wrapper">
          <div className="shopping-cart-items">
            <Accordion className="promo-accordion" elevation={0}>
              <AccordionSummary
                className="shopping-cart-wrapper"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="accordian-header">
                  <p>Have a promo code?</p>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="row">
                    <div className="column_text">
                      <input
                        type={"text"}
                        placeholder="Gift card or promo code"
                        className="text"
                      />
                    </div>
                    <div className="column_btn">
                      <a href="#" className="button">
                        APPLY
                      </a>
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <hr />
          <div className="card-fotter">
            <span className="total-sub">Subtotal</span>
            <span className="total-sub">$19.96</span>
          </div>
          <div className="card-fotter">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="card-fotter">
            <span>Tax</span>
            <span>Calculated at check out</span>
          </div>
          <a href="#" className="button">
            CHECK OUT
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrderReview;
