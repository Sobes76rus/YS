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
import Link from "next/link";
import Image from "next/image";
import StackGrid, { transitions, easings } from "react-stack-grid";

SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Parallax]);
const transition = transitions.scaleDown;

export async function getStaticProps() {
  const { publicRuntimeConfig } = getConfig();
  const resAlbums = await fetch(`${publicRuntimeConfig.API_URL}/albums`);
  const albums = await resAlbums.json();
  const navRes = await fetch(`${publicRuntimeConfig.API_URL}/navigations`);
  const navigation = await navRes.json();
  const cardRes = await fetch(`${publicRuntimeConfig.API_URL}/card-lookbooks`);
  const cardPhotos = await cardRes.json();

  const randomThree = (a, n) =>
    a.sort(() => Math.random() - Math.random()).slice(0, n);

  const randomAlbums = randomThree(albums, 3);

  return {
    props: {
      nav: {
        dark: true,
        classes:
          "bg-hover-white bg-fixed-white navbar-hover-light navbar-fixed-light",
        color: "transparent",
      },
      navigation,
      cardPhotos,
      // albums,
      randomAlbums,
      headerAbsolute: true,
      title: "Homepage",
    },
  };
}

const Home = (props) => {
  const { randomAlbums, cardPhotos } = props;
  const bigCards = cardPhotos.slice(0, 2);
  const smallCards = cardPhotos.slice(2);

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
        {randomAlbums.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="mb-5 display-2 font-weight-bold text-serif bg-cover"
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
                  {/* <Button
                    color={props.columns ? "outline-dark" : "light"}
                    href={slide.link}
                  >
                    Сексуальные транссексуалочки
                  </Button> */}
                </Col>
              </Row>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>

      <Container fluid className="px-0">
        <section className="mb-3">
          <StackGrid
            columnWidth={"33.3%"}
            duration={600}
            gutterHeight={10}
            gutterWidth={10}
            monitorImagesLoaded={true}
            easing={easings.cubicOut}
            appearDelay={60}
            appear={transition.appear}
            appeared={transition.appeared}
            enter={transition.enter}
            entered={transition.entered}
            leaved={transition.leaved}
          >
            {cardPhotos.map((card, index) => {
              const type = index < 2 ? "big" : "small";
              return <CardLookbook data={card} cardType={type} key={index} />;
            })}
          </StackGrid>
        </section>
        {/* <StackGrid columnWidth={"33.3%"} gutterHeight={10} gutterWidth={10}>
          {smallCards.map((card, index) => {
            const type = index < 2 ? "big" : "small";
            return <CardLookbook data={card} cardType={type} key={index} />;
          })}
        </StackGrid> */}

        {/* <Row className="mx-0">
          {cardPhotos.map((card, index) => {
            const columns = index < 2 ? { md: 6 } : { lg: 4 };
            const type = index < 2 ? "big" : "small";
            return (
              <Col {...columns} className="mb-10px px-5px" key={index}>
                <CardLookbook data={card} cardType={type} />
              </Col>
            );
          })}
        </Row> */}
        <section className="py-6 position-relative light-overlay">
          <Image
            className="bg-image"
            src={randomAlbums[1].album_cover.url}
            alt=""
            layout="fill"
          />
          <Container>
            <div className="overlay-content text-center text-dark">
              <h3 className="display-1 font-weight-bold text-serif mb-4">
                Транс-досуг в Москве
              </h3>
              <p className="text-uppercase font-weight-bold mb-1 letter-spacing-5">
                Lorem Ipsum - это текст-"рыба", часто используемый в печати и
                вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для
                текстов на латинице с начала XVI века. В то время некий
                безымянный печатник создал большую коллекцию размеров и форм
                шрифтов, используя Lorem Ipsum для распечатки образцов.{" "}
              </p>
              <Link href="/filter-albums">
                <a className="btn btn-dark">Смотреть еще</a>
              </Link>
            </div>
          </Container>
        </section>
      </Container>
    </>
  );
};
export default Home;
Home.layout = {
  classes:
    "bg-hover-white bg-fixed-white navbar-hover-light navbar-fixed-light",
};
