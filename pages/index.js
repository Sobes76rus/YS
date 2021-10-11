import { Container, Row, Col, Button } from "reactstrap";
import SwiperCore, {
  Navigation,
  Pagination,
  Parallax,
  Scrollbar,
  Autoplay,
} from "swiper";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import getConfig from "next/config";
import LayoutGrid from "../components/LayoutGrid";

// const LayoutGrid = dynamic(() => import("../components/LayoutGrid"), {
//   ssr: false,
//   loading: () => <>Loading...</>,
// });

SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Parallax]);

export async function getStaticProps() {
  const { publicRuntimeConfig } = getConfig();
  const resAlbums = await fetch(`${publicRuntimeConfig.API_URL}/albums`);
  const albums = await resAlbums.json();
  const navRes = await fetch(`${publicRuntimeConfig.API_URL}/navigations`);
  const navigation = await navRes.json();
  const cardRes = await fetch(`${publicRuntimeConfig.API_URL}/card-lookbooks`);
  const cardPhotos = await cardRes.json();
  const servicesRes = await fetch(
    `${publicRuntimeConfig.API_URL}/uslugi-groups`
  );

  const services = await servicesRes.json();
  const ceoPagesRes = await fetch(`${publicRuntimeConfig.API_URL}/ceo-pages`);

  const ceoPages = await ceoPagesRes.json();

  const randomThree = (a, n) =>
    a.sort(() => Math.random() - Math.random()).slice(0, n);

  const randomAlbums = randomThree(albums, 3);
  const randomSix = randomThree(cardPhotos, 8);
  return {
    props: {
      nav: {
        dark: true,
        color: "transparent",
      },
      navigation,
      cardPhotos,
      services,
      ceoPages,
      albums,
      randomSix,
      navbarHoverLight: true,
      headerAbsolute: true,
      bgHoverPurple: true,
      fixedBottom: true,
      title: "Транссексуалы города Москвы",
    },
    revalidate: 60,
  };
}

const Home = (props) => {
  const { albums, cardPhotos } = props;

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
        containerclass="container-fluid"
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
      >
        {albums.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="mb-5 display-2 bg-cover"
            style={{
              backgroundImage: `url(${slide.album_cover.url})`,
            }}
          >
            <Container className="h-50 px-lg-6">
              <Row
                className={`overlay-content h-100 align-items-center ${
                  slide.rowclass ? slide.rowclass : ""
                }`}
                data-swiper-parallax="-500"
              >
                <Col>
                  <h2
                    className={
                      slide.titleclass ? slide.titleclass : "text-light "
                    }
                    style={{ lineHeight: "1.2" }}
                  >
                    {slide.title}
                  </h2>
                  <h2
                    className={
                      slide.titleclass ? slide.titleclass : "text-light "
                    }
                    style={{ lineHeight: "1.2" }}
                  >
                    {slide.second_title}
                  </h2>
                  <h2
                    className={
                      slide.titleclass ? slide.titleclass : "text-light "
                    }
                    style={{ lineHeight: "1.2" }}
                  >
                    {slide.third_title}
                  </h2>
                  {slide.album_title && (
                    <p
                      className={`${
                        props.columns ? "text-muted" : "lead"
                      }  mb-5`}
                    >
                      {/* {slide.text} */}
                    </p>
                  )}
                </Col>
              </Row>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="px-3 fill">
        <div className="h-50">
          <LayoutGrid cards={cardPhotos} />
        </div>
      </div>
    </>
  );
};
export default Home;
Home.layout = {
  classes:
    "bg-hover-white bg-fixed-white navbar-hover-light navbar-fixed-light",
};
