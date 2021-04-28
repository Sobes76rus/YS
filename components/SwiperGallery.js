import React, { useState, useRef } from "react";
import Image from "next/image";
import Lightbox from "react-image-lightbox";

import { Row, Col, Button } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";

const SwiperGallery = ({ data, vertical }) => {
  const [lightBoxOpen, setLightBoxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const gallerySwiperRef = useRef(null);

  const slideTo = (index) => {
    setActiveSlide(index);
    if (
      gallerySwiperRef.current !== null &&
      gallerySwiperRef.current.swiper !== null
    ) {
      gallerySwiperRef.current.swiper.slideToLoop(index);
    }
  };

  const onClick = (index) => {
    setActiveImage(index);
    setLightBoxOpen(!lightBoxOpen);
  };

  let sliderColumns = { xs: 12 },
    sliderClass = "detail-carousel",
    thumbsColumns = { xs: 12 },
    thumbsClass = "";

  if (vertical) {
    sliderColumns = { xs: 12, md: 10 };
    (sliderClass = "detail-carousel order-md-2"), (thumbsColumns = { md: 2 });
    thumbsClass = "d-none d-md-block pr-0 order-md-1";
  }

  const sliderParams = {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    on: {
      slideChange: () =>
        setActiveSlide(gallerySwiperRef.current.swiper.realIndex),
    },
  };

  const customStyles = {
    overlay: {
      zIndex: "1000",
    },
    bodyOpen: {
      position: "fixed",
    },
  };

  return (
    <>
      <Row>
        <Col className={sliderClass} {...sliderColumns}>
          <Swiper {...sliderParams} ref={gallerySwiperRef}>
            {data.photo.map((slide, index) => {
              return (
                <SwiperSlide key={index}>
                  <Image
                    className="img-fluid"
                    src={slide.url}
                    width={slide.width}
                    height={slide.height}
                  />
                  <Button color="expand" onClick={() => onClick(index)}>
                    <svg className="svg-icon">
                      <use xlinkHref="/icons/orion-svg-sprite.svg#expand-1"></use>
                    </svg>
                  </Button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Col>

        <Col className={thumbsClass} {...thumbsColumns}>
          {data.photo.map((slide, index) => (
            <button
              key={index}
              onClick={() => slideTo(index)}
              className={`detail-thumb-item mb-3 ${
                activeSlide === index ? "active" : ""
              }`}
            >
              <img className="img-fluid" src={slide.url} alt={slide.alt} />
            </button>
          ))}
        </Col>

        {lightBoxOpen && (
          <Lightbox
            mainSrc={data.photo[activeImage].url}
            onCloseRequest={() => setLightBoxOpen(false)}
            reactModalStyle={customStyles}
          />
        )}
      </Row>
    </>
  );
};

export default SwiperGallery;
