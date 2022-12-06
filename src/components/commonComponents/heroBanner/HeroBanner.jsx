import { Container, Grid } from "@mui/material";
import React from "react";
import HomeBox from "./../homeBox/HomeBox";
import MinOrderNotification from "./../minOrderNotification/MinOrderNotification";
import "./heroBanner.scss";

export default class HeroBanner extends React.PureComponent {
  render() {
    const { customerDetails, authHome } = this.props;

    const userName =
      customerDetails &&
      customerDetails.accountContacts &&
      customerDetails.accountContacts.length > 0 &&
      customerDetails.accountContacts[0].firstName;
    return (
      <div className="home-box-wrapper">
        <h1 className="user-title">
          welcome back, <span>{userName}</span>
        </h1>
        <MinOrderNotification message={this.props.minAmount} />
        <div className="auth-banner">
          <Container className="container-root">
            <Grid
              container
              spacing={1}
              alignItems="center"
              className="home-row-container"
            >
              {authHome.length > 0 &&
                authHome.map((value, index) =>
                  index > 0 ? (
                    <HomeBox
                      key={`${value.sectionName}-${index}`}
                      heading={value.sectionName}
                      description={value.sectionDescription}
                      viewAllText={value.buttonText}
                      viewAllLink={value.filterLink}
                      customClass={
                        index === 1 ? "previous-orders" : "all-products"
                      }
                    />
                  ) : (
                    ""
                  )
                )}
            </Grid>
          </Container>
        </div>
      </div>
    );
  }
}
