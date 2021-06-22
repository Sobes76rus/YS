import { Container, Row, Col } from "reactstrap";
import { useState } from "react";
import SwiperCore, { Navigation, Pagination, Thumbs } from "swiper";
import Breadcrumbs from "../../components/Breadcrumbs";

import DetailTabs from "../../components/DetailTabs";
import DetailMain from "../../components/DetailMain";

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
          active: true,
        },
      ],
    },
  };
}

export default function Detail(props) {
  const { query } = useRouter();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { personsData, allCards, breadcrumbs } = props;
  return (
    <>
      <section className="product-details">
        <Container fluid>
          <Row>
            <Col
              xs={{ size: 12, order: 2 }}
              lg={{ size: 6, order: 1 }}
              className="py-3"
            >
              <Swiper
                thumbs={{ swiper: thumbsSwiper }}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesVisibility={true}
                watchSlidesProgress={true}
                className="detail-full mySwiper2"
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                navigation
                scrollbar
                slidesPerView={1}
              >
                {personsData.photo.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="detail-full-item bg-cover"
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
                  <SwiperSlide key={index}>
                    <div
                      className="detail-full-item bg-cover"
                      style={{
                        backgroundImage: `url(${image.url})`,
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Col>
            <Col
              xs={{ size: 12, order: 1 }}
              lg={{ size: 6, order: 2 }}
              xl="5"
              className="d-flex align-items-start pl-lg-5 mb-5 pb-0"
            >
              <div>
                <Breadcrumbs links={breadcrumbs} />
                <DetailMain product={personsData} />
                <DetailTabs product={personsData} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="my-5">
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
