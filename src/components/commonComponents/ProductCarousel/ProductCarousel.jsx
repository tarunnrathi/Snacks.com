import React from "react";
import { isMobile } from "react-device-detect";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";

import "./ProductCarousel.scss";

const ProductCarousel = ({ gallery }) => {
  if (!gallery || gallery.length === 0) return "";

  const galleryList = gallery.map((item) => {
    if (item.isVideo) {
      const renderVideo = () => {
        return (
          <div className="image-gallery-video">
            <video controls>
              <source src={item.original} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      };
      return {
        thumbnail: item.thumbnail,
        renderItem: renderVideo,
        thumbnailClass: "product-thumbnail",
        bulletClass: "bullet",
      };
    } else {
      return {
        ...item,
        thumbnailClass: "product-thumbnail",
        bulletClass: "bullet",
      };
    }
  });
  return (
    <>
      <ImageGallery
        items={galleryList}
        showPlayButton={false}
        showFullscreenButton={false}
        showBullets={true}
        showNav={false}
        thumbnailPosition={isMobile ? "bottom" : "left"}
        thumbnailLoading="lazy"
      />
    </>
  );
};

export default ProductCarousel;
