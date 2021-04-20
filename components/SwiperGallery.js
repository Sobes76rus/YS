import React, { useState, useRef } from "react";

import Lightbox from "react-image-lightbox";
import Magnifier from "react-magnifier";
import { Row, Col, Button } from "reactstrap";

// import ReactIdSwiper from "react-id-swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const SwiperGallery = ({ data, vertical }) => {
  const [lightBoxOpen, setLightBoxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const gallerySwiperRef = useRef(null);

  // const slideTo = (index) => {
  //   setActiveSlide(index);
  //   if (
  //     gallerySwiperRef.current !== null &&
  //     gallerySwiperRef.current.swiper !== null
  //   ) {
  //     gallerySwiperRef.current.swiper.slideToLoop(index);
  //   }
  // };

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
            <div>
              <Magnifier
                mgShowOverflow={false}
                mgWidth={2000}
                mgHeight={2000}
                className="img-fluid"
                src={data.photo.url}
                alt={data.alt}
                zoomFactor={0.11}
                style={{ cursor: "default" }}
              />

              <Button color="expand">
                <svg className="svg-icon">
                  <use xlinkHref="/icons/orion-svg-sprite.svg#expand-1"></use>
                </svg>
              </Button>
            </div>
          </Swiper>
        </Col>

        <Col className={thumbsClass} {...thumbsColumns}>
          <button
            // onClick={() => slideTo(index)}
            className={`detail-thumb-item mb-3 ${activeSlide ? "active" : ""}`}
          >
            <img className="img-fluid" src={data.photo.url} alt={data.alt} />
          </button>
        </Col>

        {lightBoxOpen && (
          <Lightbox
            mainSrc={data[activeImage].photo.url}
            nextSrc={data[(activeImage + 1) % data.length].photo.url}
            prevSrc={
              data[(activeImage + data.length - 1) % data.length].photo.url
            }
            onCloseRequest={() => setLightBoxOpen(false)}
            imageCaption={data[activeImage].name}
            onMovePrevRequest={() =>
              setActiveImage((activeImage + data.length - 1) % data.length)
            }
            onMoveNextRequest={() =>
              setActiveImage((activeImage + 1) % data.length)
            }
            enableZoom={false}
            reactModalStyle={customStyles}
          />
        )}
      </Row>
    </>
  );
};

export default SwiperGallery;
