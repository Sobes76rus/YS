import { Container, Row, Col } from "reactstrap";
import { useState } from "react";
import SwiperCore, { Navigation, Pagination, Thumbs } from "swiper";
import Breadcrumbs from "../../components/Breadcrumbs";
import useWindowSize from "../../hooks/useWindowSize";
import DetailTabs from "../../components/DetailTabs";
import DetailMain from "../../components/DetailMain";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import getConfig from "next/config";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
SwiperCore.use([Pagination, Navigation, Thumbs]);
const SwiperProducts = dynamic(
  () => import("../../components/SwiperProducts"),
  {
    ssr: false,
    loading: () => <>Loading...</>,
  }
);

export async function getServerSideProps(ctx) {
  const { publicRuntimeConfig } = getConfig();
  const { id } = ctx.query;
  const navRes = await fetch(`${publicRuntimeConfig.API_URL}/navigations`);
  const navigation = await navRes.json();
  const allCardsFetch = await fetch(
    `${publicRuntimeConfig.API_URL}/card-lookbooks/`
  );
  const allCards = await allCardsFetch.json();

  const resPersons = await fetch(
    `${publicRuntimeConfig.API_URL}/card-lookbooks/${id}`
  );
  const personsData = await resPersons.json();

  return {
    props: {
      allCards,
      personsData,
      navigation,
      breadcrumbs: [
        {
          name: "Домой",
          link: "/",
          linkClass: "link-purple",
        },
        {
          name: "Все анкеты",
          link: "/filter-albums",
          linkClass: "link-purple",
        },
        {
          name: personsData.name,

          active: true,
        },
      ],
    },
  };
}

export default function Detail(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { personsData, allCards, breadcrumbs } = props;
  const windowSize = useWindowSize();
  const isSlim = windowSize.width <= "992";
  return (
    <>
      <section className="product-details">
        <Container fluid>
          <Row xs="3">
            <Col
              xs={{ size: 12, order: 1 }}
              lg={{ size: 6, order: 1 }}
              className="py-3"
            >
              <Swiper
                thumbs={{ swiper: thumbsSwiper }}
                slidesPerView={1}
                className="detail-full mySwiper2"
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                scrollbar
                navigation
                slidesPerView={1}
              >
                {personsData.photo.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="h-100 bg-cover"
                      style={{
                        backgroundImage: `url(${image.url})`,
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesVisibility={true}
                watchSlidesProgress={true}
                className="mySwiper"
              >
                {personsData.photo.map((image, index) => (
                  <SwiperSlide key={index} style={{ cursor: "pointer" }}>
                    <Image
                      src={image.url}
                      alt="..."
                      width={image.width}
                      height={image.height}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              lg={{ size: 6, order: 2 }}
              xl="6"
              lg="2"
              className="flex align-items-start pl-lg-5 mb-5 pb-0"
            >
              <div>
                {!isSlim && <Breadcrumbs links={breadcrumbs} />}

                <DetailMain
                  className={`${isSlim && "width-100"}`}
                  product={personsData}
                />
                <DetailTabs product={personsData} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="my-3">
        <div className="container">
          <header className="text-center">
            <h6 className="text-uppercase mb-5">Вам также могут понравиться</h6>
          </header>
          <SwiperProducts products={allCards} />
        </div>
      </section>
    </>
  );
}
