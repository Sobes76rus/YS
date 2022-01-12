import getConfig from "next/config";
import { Container, Row, Col, Jumbotron } from "reactstrap";
import { useRouter } from "next/router";
import Hero from "../../components/Hero";
import getCardsUrl from "../../side-effects/getCardsUrl";
import LayoutGrid from "../../components/LayoutGrid";

// const LayoutGrid = dynamic(() => import("../../components/LayoutGrid"), {
//   ssr: false,
//   loading: () => <>Loading...</>,
// });

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

  const ceoPageRes = await fetch(
    `${publicRuntimeConfig.API_URL}/ceo-pages?tag=${ctx.params.id}`
  );
  const ceoPage = await ceoPageRes.json();

  const query = JSON.parse(
    '{"' +
      decodeURI(
        ceoPage[0].url_filter.replace(/&/g, '","').replace(/=/g, '":"')
      ) +
      '"}'
  );

  const cardsRes = await fetch(getCardsUrl(query));

  const cards = await cardsRes.json();
  // console.log(getCardsUrl(query));
  const servicesRes = await fetch(
    `${publicRuntimeConfig.API_URL}/uslugi-groups`
  );
  const services = await servicesRes.json();
  const ceoPagesGroupsRes = await fetch(
    `${publicRuntimeConfig.API_URL}/ceo-pages-groups`
  );
  const ceoPagesGroups = await ceoPagesGroupsRes.json();

  return {
    props: {
      description: ceoPage[0].Description,
      navigation,
      services,
      cards,
      ceoPages,
      ceoPagesGroups,
      ceoPage: ceoPage[0],
      fixedBottom: true,
      title: ceoPage[0].Title,
      breadcrumbs: {
        breadcrumbs: [
          {
            name: "Домой",
            link: "/",
            linkClass: "link-purple",
          },
          {
            name: `${ceoPage[0].Title}`,
            active: true,
          },
        ],
      },
      revalidate: 60,
    },
  };
};

const FastFilters = ({ ceoPage, breadcrumbs, cards }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <Hero title={breadcrumbs.title} breadcrumbs={breadcrumbs.breadcrumbs} />
      <Container className="px-0">
        {cards.length ? (
          <h1>{ceoPage.h1 ? ceoPage.h1 : ceoPage.Title}</h1>
        ) : (
          <p>Анкет не найдено</p>
        )}
        <Jumbotron>{ceoPage.text_under_title}</Jumbotron>
        <Row>
          <Col className="products-grid">
            <LayoutGrid cards={cards} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
export default FastFilters;
