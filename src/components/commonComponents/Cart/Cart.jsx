import React from "react";
import SuggestedItems from "../suggestedProductsPDP/suggestedProductsPDP";
import "./Cart.scss";
import OrderReview from "./OrderReview";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@mui/material";

const Cart = () => {
  const renderItem = () => {
    return (
      <Grid container className="bundle-card-summary">
        <Grid item xs={3} sm={2} md={2} className="summary-row-img">
          <h1>hi</h1>
        </Grid>
      </Grid>
    );
  };
  return (
    <React.Fragment>
      <div className="cart-wrapper">
        <h3 className="cart-heading">Shopping cart</h3>
        <Grid
          container
          spacing={3}
          align="center"
          justify="center"
          direction="row"
          className="cart-container"
        >
          <Grid item xs={8} className="letf-grid">
            <Box sx={{ width: "100%" }}>
              <hr />
              <Grid
                container
                columnSpacing={{ xs: 0, sm: 0, md: 0 }}
                className="card"
              >
                <Grid xs={2} className="card-main">
                  <img src="/www/images/doritos.jpg" className="iconDetails" />
                </Grid>
                <Grid xs={10} className="card-wrapper">
                  <div className="varietyPack">
                    <p className="varietys">Custom 30ct Variety Pack</p>
                    <span className="price-of-pack">$21.50</span>
                    <div className="changeButton">
                      <a style={{ float: "left" }}>-</a>
                      <a style={{ float: "center" }}>1</a>
                      <a style={{ float: "right" }}>+</a>
                    </div>
                    <div>
                      <a className="varietyPack-edit">Edit Pack</a>
                    </div>
                  </div>
                  <div className="closeImg">
                    <CloseIcon />
                  </div>
                </Grid>
              </Grid>
              <Grid xs={12} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                <Accordion elevation={0} className="table">
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="Accordion-table-header">
                      <div>
                        <p>
                          Hide My Pack
                          <span>
                            <ExpandMoreIcon className="tableExpandIcon" />
                          </span>
                        </p>
                      </div>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="Accordion-table-Body">
                    <div div className="Accordion-table-data">
                      <div className="Accordion-firstrow">
                        <div>
                          <img
                            src="/www/images/doritos.jpg"
                            className="table-mg-icon"
                          />
                        </div>
                        <div className="container3">
                          <p className="table-data-header">
                            Doritos Dinamita Flamin’ Hot Queso Flavored Snacks
                          </p>
                        </div>
                      </div>
                      <div className="Accordion-firstrow">
                        <div>
                          <img
                            src="/www/images/doritos.jpg"
                            className="table-mg-icon"
                          />
                        </div>
                        <div className="container3">
                          <p className="table-data-header">
                            Doritos Dinamita Flamin’ Hot Queso Flavored Snacks
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <hr />
              <Grid
                container
                columnSpacing={{ xs: 0, sm: 0, md: 0 }}
                className="card"
              >
                <Grid xs={2} className="card-main">
                  <img src="/www/images/doritos.jpg" className="iconDetails" />
                </Grid>
                <Grid xs={10} className="card-wrapper">
                  <div className="varietyPack">
                    <p className="varietys">Custom 30ct Variety Pack</p>
                    <span className="price-of-pack"> 9.25oz | $21.50</span>
                    <div className="changeButton">
                      <a style={{ float: "left" }}>-</a>
                      <a style={{ float: "center" }}>1</a>
                      <a style={{ float: "right" }}>+</a>
                    </div>
                  </div>
                  <div className="closeImg">
                    <CloseIcon />
                  </div>
                </Grid>
              </Grid>
              <hr />
              <Grid
                container
                columnSpacing={{ xs: 0, sm: 0, md: 0 }}
                className="card"
              >
                <Grid xs={2} className="card-main">
                  <img src="/www/images/doritos.jpg" className="iconDetails" />
                </Grid>
                <Grid xs={10} className="card-wrapper">
                  <div className="varietyPack">
                    <p className="varietys">Custom 30ct Variety Pack</p>
                    <span className="price-of-pack"> 9.25oz | $21.50</span>
                    <div className="changeButton">
                      <a style={{ float: "left" }}>-</a>
                      <a style={{ float: "center" }}>1</a>
                      <a style={{ float: "right" }}>+</a>
                    </div>
                  </div>
                  <div className="closeImg">
                    <CloseIcon />
                  </div>
                </Grid>
              </Grid>
              <div className="free-pack">
                <p>
                  Congratulations! You qualify for a FREE sample with this
                  order.
                </p>
                <Grid
                  container
                  columnSpacing={{ xs: 0, sm: 0, md: 0 }}
                  className="card"
                >
                  <Grid xs={2} className="card-main">
                    <img
                      src="/www/images/doritos.jpg"
                      className="iconDetails"
                    />
                    <p className="info-sub">Product Info</p>
                  </Grid>
                  <Grid xs={10} className="card-wrapper">
                    <div className="varietyPack">
                      <p className="varietys">Custom 30ct Variety Pack</p>
                      <span className="bag-size">1.25oz (snack bag)</span>
                      <button className="sample-btn">Add sample</button>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Box>
          </Grid>
          <Grid item xs={4} className="right-grid">
            <OrderReview />
          </Grid>
        </Grid>
      </div>
      <SuggestedItems title="You may also like" data={[]} />
    </React.Fragment>
  );
};

export default Cart;
