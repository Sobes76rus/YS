import { Container, Row, Col } from "reactstrap";

import CardLookbook from "../components/CardLookbook";
import Swiper from "../components/Swiper";
import getConfig from "next/config";

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

export default function Home({ albums }) {
  return (
    <>
      <Swiper
        albums={albums}
        autoplay
        delay={5000}
        loop
        slidesPerView={1}
        spaceBetween={0}
        centeredSlides
        speed={1500}
        parallax
        navigation
        className="home-full-slider"
        containerclass="container-fluid h-100 py-5"
        paginationClass="swiper-pagination-white"
      />

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
