import "./FlaminProducts.scss";
import {
  BUTTONNAME,
  PAGENAME,
} from "../../config/amplitude/Taxonomy.constants";
import React, { Component } from "react";
import ProductList from "../../components/pages/productList/ProductList";
import { ViewedPage } from "../../config/amplitude/SnacksAmplitude";

class FlaminProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    ViewedPage(PAGENAME.SNACKS);
  }

  render() {
    const {} = this.state;
    return (
      <div className="flamin-products" id="flaminHotProductGridContainer">
        <ProductList
          screenName="flaminHot"
          selectedCartItems={(selectedItems) =>
            this.props.selectedCartItems(selectedItems)
          }
        />
      </div>
    );
  }
}

export default FlaminProducts;
