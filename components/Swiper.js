import ReactIdSwiper from "react-id-swiper";
import { Container, Row, Col, Button } from "reactstrap";

export default function Swiper(props) {
  const { albums } = props;
  const breakpoints = [];
  if (props.sm) {
    breakpoints[565] = {
      slidesPerView: props.sm,
    };
  }
  if (props.md) {
    breakpoints[768] = {
      slidesPerView: props.md,
    };
  }
  if (props.lg) {
    breakpoints[991] = {
      slidesPerView: props.lg,
    };
  }
  if (props.xl) {
    breakpoints[1200] = {
      slidesPerView: props.xl,
    };
  }
  if (props.xxl) {
    breakpoints[1400] = {
      slidesPerView: props.xxl,
    };
  }
  if (props.xxxl) {
    breakpoints[1600] = {
      slidesPerView: props.xxxl,
    };
  }
  const params = {
    containerClass: `swiper-container ${
      props.className ? props.className : ""
    }`,
    slidesPerView: props.slidesPerView,
    effect: props.effect,
    allowTouchMove: props.allowTouchMove === false ? false : true,
    spaceBetween: props.spaceBetween,
    centeredSlides: props.centeredSlides,
    roundLengths: props.roundLengths,
    loop: props.loop,
    speed: props.speed ? props.speed : 400,
    parallax: props.parallax,
    breakpoints: breakpoints,
    autoplay: props.autoplay
      ? {
          delay: props.delay,
        }
      : false,
    pagination:
      props.pagination !== false
        ? {
            el: `.swiper-pagination.${props.paginationClass}`,
            clickable: true,
            dynamicBullets: true,
          }
        : false,
    navigation: {
      nextEl: props.navigation
        ? `.swiper-button-next.swiper-button-${
            props.navigationColor ? props.navigationColor : "white"
          }.swiper-nav.d-none.d-lg-block`
        : "",
      prevEl: props.navigation
        ? `.swiper-button-prev.swiper-button-${
            props.navigationColor ? props.navigationColor : "white"
          }.swiper-nav.d-none.d-lg-block`
        : "",
    },
    wrapperClass: `swiper-wrapper ${
      props.wrapperClass ? props.wrapperClass : ""
    }`,
  };
  return albums ? (
    <ReactIdSwiper {...params}>
      {albums.map((slide, index) => (
        <div
          key={index}
          className={`${slide.itemclass ? slide.itemclass : ""} ${
            !props.columns ? "bg-cover" : ""
          } ${slide.bgdirection ? `bg-cover-${slide.bgdirection}` : ""} ${
            slide.darkOverlay ? `dark-overlay` : ""
          }`}
          style={{
            ...props.style,
            backgroundImage: !props.columns ? `url(${slide.img})` : `none`,
          }}
        >
          <Container
            fluid={props.containerFluid}
            className={`h-100 ${!props.columns ? "px-lg-6" : ""} ${
              props.containerclass ? props.containerclass : ""
            }`}
            style={slide.containerStyle}
          >
            <Row
              className={`overlay-content h-100 align-items-center ${
                slide.rowclass ? slide.rowclass : ""
              }`}
              data-swiper-parallax="-500"
            >
              <Col
                lg={{
                  size: props.columns ? 8 : 6,
                  offset: slide.contentoffset,
                }}
                className={slide.contentclass ? slide.contentclass : ""}
              >
                {slide.subtitle && (
                  <p
                    className={`subtitle letter-spacing-${
                      props.columns ? 5 : 3
                    } font-weight-light ${
                      slide.subtitleclass ? slide.subtitleclass : ""
                    }`}
                  >
                    {slide.subtitle}
                  </p>
                )}
                <h2
                  className={slide.titleclass ? slide.titleclass : ""}
                  style={{ lineHeight: "1" }}
                >
                  {slide.name}
                </h2>
                {slide.text && (
                  <p
                    className={`${props.columns ? "text-muted" : "lead"}  mb-5`}
                  >
                    {slide.text}
                  </p>
                )}
                <Button
                  color={props.columns ? "outline-dark" : "light"}
                  href={slide.link}
                >
                  {slide.button}
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      ))}
    </ReactIdSwiper>
  ) : (
    "loading"
  );
}
