import { Container, Row, Col, Button } from "reactstrap";
import SwiperCore, {
  Navigation,
  Pagination,
  Parallax,
  Scrollbar,
  Autoplay,
} from "swiper";
import CardLookbook from "../components/CardLookbook";
import { Swiper, SwiperSlide } from "swiper/react";
import getConfig from "next/config";
SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Parallax]);

export async function getStaticProps() {
  const { publicRuntimeConfig } = getConfig();
  const res = await fetch(`${publicRuntimeConfig.API_URL}/albums`);
  const albums = await res.json();

  return {
    props: {
      albums,
      nav: {
        dark: true,
        classes:
          "bg-hover-white bg-fixed-white navbar-hover-light navbar-fixed-light",
        color: "transparent",
      },
      headerAbsolute: true,
      title: "Homepage",
    },
  };
}

export default function Home(props) {
  const { albums } = props;
  const randomThree = (a, n) =>
    a.sort(() => Math.random() - Math.random()).slice(0, n);

  const randomAlbums = randomThree(albums, 3);

  return (
    <>
      <Swiper
        autoplay
        parallax
        delay={3000}
        loop
        slidesPerView={1}
        spaceBetween={0}
        centeredSlides
        speed={1500}
        navigation
        className="home-full-slider"
        containerclass="container-fluid h-100 py-5"
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
      >
        {randomAlbums.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="mb-5 display-2 font-weight-bold text-serif bg-cover"
            style={{
              backgroundImage: !props.columns
                ? `url(${slide.album_cover.url})`
                : `none`,
            }}
          >
            <Container className="h-100 px-lg-6">
              <Row
                className={`overlay-content h-100 align-items-center ${
                  slide.rowclass ? slide.rowclass : ""
                }`}
                data-swiper-parallax="-500"
              >
                <Col>
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
                    {slide.album_title}
                  </h2>
                  {slide.album_title && (
                    <p
                      className={`${
                        props.columns ? "text-muted" : "lead"
                      }  mb-5`}
                    >
                      {slide.text}
                    </p>
                  )}
                  <Button
                    color={props.columns ? "outline-dark" : "light"}
                    href={slide.link}
                  >
                    View Collection
                  </Button>
                </Col>
              </Row>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>

      <Container fluid className="px-5px">
        <Row className="mx-0">
          {albums.map((card, index) => {
            const columns = index < 2 ? { md: 6 } : { lg: 4 };
            const type = index < 2 ? "big" : "small";
            return (
              <Col {...columns} className="mb-10px px-5px" key={index}>
                <CardLookbook data={card} cardType={type} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
