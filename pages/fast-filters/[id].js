import getConfig from "next/config";
import {
  Container,
  Row,
  Col,
  Collapse,
  Button,
  CardBody,
  Card,
  Jumbotron,
} from "reactstrap";
import dynamic from "next/dynamic";
import Hero from "../../components/Hero";

const LayoutGrid = dynamic(() => import("../../components/LayoutGrid"), {
  ssr: false,
  loading: () => <>Loading...</>,
});

export const getStaticPaths = async () => {
  const { publicRuntimeConfig } = getConfig();
  const ceoPagesRes = await fetch(`${publicRuntimeConfig.API_URL}/ceo-pages`);
  const ceoPages = await ceoPagesRes.json();

  const paths = ceoPages.map((item) => {
    return {
      params: { id: item.tag },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  const { publicRuntimeConfig } = getConfig();
  const navRes = await fetch(`${publicRuntimeConfig.API_URL}/navigations`);
  const navigation = await navRes.json();
  const ceoPagesRes = await fetch(`${publicRuntimeConfig.API_URL}/ceo-pages`);
  const ceoPages = await ceoPagesRes.json();
  const servicesRes = await fetch(
    `${publicRuntimeConfig.API_URL}/uslugi-groups`
  );
  const services = await servicesRes.json();
  const cardsRes = await fetch(
    `${publicRuntimeConfig.API_URL}/card-lookbooks?uslugis.tag=${ctx.params.categorie}`
  );
  const cards = await cardsRes.json();

  return {
    props: {
      navigation,
      services,
      cards,
      ceoPages,
      fixedBottom: true,
      title: ceoPages[0].Title,
      breadcrumbs: {
        breadcrumbs: [
          {
            name: "Домой",
            link: "/",
            linkClass: "link-purple",
          },
          {
            name: `${ceoPages[0].Title}`,
            active: true,
          },
        ],
      },
      revalidate: 60,
    },
  };
};

const FastFilters = ({ ceoPages, breadcrumbs, cards }) => (
  <Container>
    <Hero title={breadcrumbs.title} breadcrumbs={breadcrumbs.breadcrumbs} />
    {/* <Container className="px-0">
      {cards.length ? <h1>{categorie.name}</h1> : <p>Анкет не найдено</p>}
      <Row>
        <Col className="products-grid">
          <LayoutGrid cards={cards} />
        </Col>
      </Row>
    </Container> */}
  </Container>
);
export default FastFilters;
