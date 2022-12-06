import React, { Component } from "react";

export default class MinOrderNotification extends Component {
  render() {
    const { message } = this.props;
    return (
      <div className="min-order">
        All your favorites are here! Plus free shipping on orders over $
        {message || null}!
      </div>
    );
  }
}
