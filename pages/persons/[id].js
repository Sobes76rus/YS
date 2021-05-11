import { Container, Row, Col } from "reactstrap";
import SwiperCore, { Navigation, Pagination } from "swiper";
import Breadcrumbs from "../../components/Breadcrumbs";
import DetailSimilar from "../../components/DetailSimilar";
import DetailTabs from "../../components/DetailTabs";
import DetailMain from "../../components/DetailMain";

import { Swiper, SwiperSlide } from "swiper/react";
import getConfig from "next/config";
SwiperCore.use([Pagination, Navigation]);

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
                className="detail-full"
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
            </Col>
            <Col
              xs={{ size: 12, order: 1 }}
              lg={{ size: 6, order: 2 }}
              xl="5"
              className="d-flex align-items-center pl-lg-5 mb-5"
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
      <DetailSimilar allCards={allCards} />
    </>
  );
}
