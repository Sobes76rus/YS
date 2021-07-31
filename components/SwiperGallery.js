import React, { useState, useRef } from "react";
import Image from "next/image";
import Lightbox from "react-image-lightbox";
import { Row, Col, Button, Container } from "reactstrap";
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
    (sliderClass = "order-md-2 order-sm-1"), (thumbsColumns = { md: 4 });
    thumbsClass = "d-flex flex-row pr-0 order-md-1 align-self-start vertical";
  }

  const sliderParams = {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
  };

  const customStyles = {
    overlay: {
      zIndex: "2000",
    },
    bodyOpen: {
      position: "fixed",
    },
    navButtonNext: {
      color: "black",
    },
  };
  return (
    <Container>
      <Row className="d-flex flex-sm-column-reverse">
        <Col className={sliderClass} {...sliderColumns}>
          <Swiper {...sliderParams} ref={gallerySwiperRef}>
            {data.photo.map((slide, index) => {
              return (
                <SwiperSlide key={index} className="align-self-center">
                  <Image
                    onClick={() => onClick(index)}
                    className="cursor-pointer"
                    src={slide.url}
                    width={slide.width}
                    height={slide.height}
                  />
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
            nextSrc={data.photo[(activeImage + 1) % data.photo.length].url}
            prevSrc={
              data.photo[
                (activeImage + data.photo.length - 1) % data.photo.length
              ].url
            }
            onMovePrevRequest={() =>
              setActiveImage(
                (activeImage + data.photo.length - 1) % data.photo.length
              )
            }
            onMoveNextRequest={() =>
              setActiveImage((activeImage + 1) % data.photo.length)
            }
            onCloseRequest={() => setLightBoxOpen(false)}
            imageCaption={data.photo[activeImage].caption}
            enableZoom={false}
            reactModalStyle={customStyles}
            className="btn-purple"
          />
        )}
      </Row>
    </Container>
  );
};

export default SwiperGallery;
