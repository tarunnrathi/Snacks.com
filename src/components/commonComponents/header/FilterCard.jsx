
import "./filterCard.scss";
import { Link } from "react-router-dom";
import React from "react";
import { NAVIGATION_COUNT_MANAGE } from "../../../config/constants/content.constant";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const FilterCard = (props) => {
  const { promoData } = props;
  return (
    <>
      {promoData.length > 0 &&
        promoData.map((data, pIndex) => {
          if (
            `${pIndex + 1}` <= NAVIGATION_COUNT_MANAGE.promotionTileMaxCount
          ) {
            return (
              <Grid item xs="7" className="filter-card">
                <Link
                  to={data.buttonLlink}
                  className="filter-card-link"
                  key={`promo${pIndex}`}
                >
                  <Card className={`filter-card-inner`}>
                    <div className="filter-card-header">
                      <CardMedia
                        component="img"
                        alt="Multipack"
                        className="filter-card-img"
                        image={data.image}
                      />
                    </div>
                    <CardContent className="filter-card-content">
                      <Typography
                        gutterBottom
                        component="div"
                        className="filter-card-title"
                      >
                        {data.title}
                      </Typography>
                      <Typography component="p" className="filter-card-desc">
                        {data.description}
                      </Typography>
                      <CardActions className="filter-card-action">
                        <Button>{data.button_name}</Button>
                      </CardActions>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          }
        })}
    </>
  );
};

export default FilterCard;
