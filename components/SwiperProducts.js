import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import Product from "./Product";

SwiperCore.use([Pagination, Navigation]);
const SwiperProducts = ({ products, ...props }) => {
  const sliderParams = {
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    },
    pagination:
      props.pagination !== false
        ? {
            clickable: true,
            dynamicBullets: true,
          }
        : false,
  };

  return (
    <>
      <Swiper
        {...sliderParams}
        style={{ paddingLeft: "30px" }}
        className="align-content-center"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="product-slider-item">
              <Product
                className="h-100"
                key={index}
                card={product}
                showQuickView={false}
                onlyViewButton={true}
                loading="eager"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperProducts;
