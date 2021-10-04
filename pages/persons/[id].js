import { Container, Row, Col } from "reactstrap";

import Breadcrumbs from "../../components/Breadcrumbs";
import useWindowSize from "../../hooks/useWindowSize";
import DetailTabs from "../../components/DetailTabs";
import DetailMain from "../../components/DetailMain";
import ButtonsTab from "../../components/ButtonsTab";
import getConfig from "next/config";
import dynamic from "next/dynamic";
import SwiperGallery from "../../components/SwiperGallery";

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
  const servicesRes = await fetch(
    `${publicRuntimeConfig.API_URL}/uslugi-groups`
  );
  const services = await servicesRes.json();
  const ceoPagesRes = await fetch(`${publicRuntimeConfig.API_URL}/ceo-pages`);
  const ceoPages = await ceoPagesRes.json();
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
      fixedBottom: true,
      navbarHoverLight: true,
      bgHoverPurple: true,
      allCards,
      services,
      ceoPages,
      personsData,
      navigation,
      title: personsData.name,
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
  const { personsData, allCards, breadcrumbs } = props;
  const windowSize = useWindowSize();
  const isSlim = windowSize.width <= "992";
  return (
    <>
      <section className="product-details">
        <Container>
          <Row>
            <Col
              xs={{ size: 12, order: 1 }}
              lg={{ size: 6, order: 1 }}
              className={`${isSlim && "vp50"} align-self-center`}
            >
              <SwiperGallery data={personsData} vertical={true} />
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              lg={{ size: 6, order: 2 }}
              xl="6"
              className="flex align-items-start pl-lg-0 mb-0 pb-0"
            >
              <Container>
                <Breadcrumbs links={breadcrumbs} />
                <DetailMain
                  className={`${isSlim && "width-100"}`}
                  product={personsData}
                />
                <DetailTabs product={personsData} />

                <ButtonsTab product={personsData} />
              </Container>
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
