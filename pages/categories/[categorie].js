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
import LayoutGrid from "../../components/LayoutGrid";

// const LayoutGrid = dynamic(() => import("../../components/LayoutGrid"), {
//   ssr: true,
//   loading: () => <>Loading...</>,
// });

export const getStaticPaths = async () => {
  const { publicRuntimeConfig } = getConfig();
  const uslugiRes = await fetch(`${publicRuntimeConfig.API_URL}/usligis`);
  const uslugi = await uslugiRes.json();

  const paths = uslugi.map((item) => {
    return {
      params: { categorie: item.tag, fastFilter: item.tag },
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
  const res = await fetch(
    `${publicRuntimeConfig.API_URL}/usligis?tag=${ctx.params.categorie}`
  );
  const categorie = await res.json();
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
      categorie: categorie[0],
      fixedBottom: true,
      title: categorie[0].title ? categorie[0].title : categorie[0].name,
      breadcrumbs: {
        breadcrumbs: [
          {
            name: "Домой",
            link: "/",
            linkClass: "link-purple",
          },
          {
            name: `${categorie[0].name}`,
            active: true,
          },
        ],
      },
      revalidate: 1,
    },
  };
};

const Categorie = ({ categorie, breadcrumbs, cards }) => (
  <Container>
    <Hero title={breadcrumbs.title} breadcrumbs={breadcrumbs.breadcrumbs} />
    <Container className="px-0">
      {cards.length ? <h1>{categorie.name}</h1> : <p>Анкет не найдено</p>}

      <Row>
        <Col className="products-grid">
          <LayoutGrid cards={cards} />
        </Col>
      </Row>
    </Container>
  </Container>
);
export default Categorie;
