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
import { useRouter } from "next/router";
import { useState, useContext, useEffect, useRef } from "react";
import getConfig from "next/config";

import Hero from "../components/Hero";
import ShopFilter from "../components/ShopFilter";

import "rc-slider/assets/index.css";
import _ from "lodash";
import dynamic from "next/dynamic";

const LayoutGrid = dynamic(() => import("../components/LayoutGrid"), {
  ssr: false,
  loading: () => <>Loading...</>,
});
const { publicRuntimeConfig } = getConfig();

function getCardsUrl(query) {
  const url = new URL(`${publicRuntimeConfig.API_URL}/card-lookbooks`);

  const priceTagMore = query["priceMin"];
  const priceTagLess = query["priceMax"];
  const slider2TagMax = query["slider2Max"];
  const slider2TagMin = query["slider2Min"];
  const slider3TagMax = query["slider3Max"];
  const slider3TagMin = query["slider3Min"];
  const cityId = query["city.name"];
  const metroId = query["metro.name"];
  const uslugiTags = query["usligis.name"];

  if (priceTagMore) {
    url.searchParams.append("price_gte", priceTagMore);
  }
  if (priceTagLess) {
    url.searchParams.append("price_lte", priceTagLess);
  }
  if (slider2TagMax) {
    url.searchParams.append("slider_2_lte", slider2TagMax);
  }
  if (slider2TagMin) {
    url.searchParams.append("slider_2_gte", slider2TagMin);
  }
  if (slider3TagMax) {
    url.searchParams.append("slider_3_lte", slider3TagMax);
  }
  if (slider3TagMin) {
    url.searchParams.append("slider_3_gte", slider3TagMin);
  }

  if (cityId) {
    url.searchParams.append("city.name", cityId);
  }
  if (metroId) {
    url.searchParams.append("metros.name", metroId);
  }
  if (uslugiTags) {
    url.searchParams.append("uslugis.name", uslugiTags);
  }
  url.searchParams.sort();

  return url.toString();
}

const FilterAlbums = (props) => {
  const {
    allCards,
    ceoPages,
    services,
    cardPhotos,
    cities,
    metros,
    breadcrumbs,
  } = props;
  const { query, asPath } = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [cards, setCards] = useState(cardPhotos);
  const toggle = () => setIsOpen(!isOpen);
  const citiesNameFilter = query["city.name"];
  const metrosNameFilter = query["metro.name"];
  const usluginTagsFilter = query["usligis.name"];
  const price = [allCards.map((card) => Number(card.price))];
  const slider2Prop = [allCards.map((card) => Number(card.slider_2))];
  const slider3Prop = [allCards.map((card) => Number(card.slider_3))];
  const secondEffectRef = useRef(false);

  const updateDeps = [
    query.priceMin,
    query.priceMax,
    query.slider2Max,
    query.slider2Min,
    query.slider3Max,
    query.slider3Min,
    citiesNameFilter,
    metrosNameFilter,
    usluginTagsFilter,
  ];

  useEffect(() => {
    if (!secondEffectRef.current) {
      secondEffectRef.current = true;
      return;
    }

    const url = getCardsUrl(query);

    setLoading(true);
    fetch(url)
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        return Promise.reject(r);
      })
      .then((a) => {
        console.log(url, a);
        setCards(a);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        // TODO: показать ошибку
      });
  }, updateDeps);

  return (
    <Container>
      <Hero title={breadcrumbs.title} breadcrumbs={breadcrumbs.breadcrumbs} />
      <Container className="d-flex flex-column align-items-center justify-content-center p-0 ">
        <Button
          block
          onClick={toggle}
          className="btn-toggle-purple py-4"
          color="disabled"
        >
          Фильтр
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className={`svg-arrow ${isOpen ? "svg-rotate" : ""}`}
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
            />
          </svg>
        </Button>

        <Collapse className="w-100" isOpen={isOpen}>
          <Card className="border-0">
            <CardBody>
              <ShopFilter
                services={services}
                cities={cities}
                metros={metros}
                price={price}
                slider_2={slider2Prop}
                slider_3={slider3Prop}
              />
            </CardBody>
          </Card>
        </Collapse>
      </Container>

      <Container className="px-0">
        <p>С учетом фильтров</p>
        <Row>
          <Col className="products-grid">
            <LayoutGrid cards={cards} />
          </Col>
        </Row>
        {ceoPages &&
          ceoPages.map(
            (page) =>
              `/filter-albums?${page.url_filter}` === decodeURI(asPath) && (
                <Jumbotron fluid className="bg-light">
                  <Container fluid>
                    <h3 className="display-5">{page.Title}</h3>
                    <p className="lead">{page.Description}</p>
                  </Container>
                </Jumbotron>
              )
          )}
      </Container>
    </Container>
  );
};

export async function getServerSideProps(ctx) {
  const { publicRuntimeConfig } = getConfig();

  const resArtists = await fetch(`${publicRuntimeConfig.API_URL}/artists`);
  const artistsData = await resArtists.json();

  const resGenres = await fetch(`${publicRuntimeConfig.API_URL}/genres`);
  const genresData = await resGenres.json();

  const navRes = await fetch(`${publicRuntimeConfig.API_URL}/navigations`);
  const navigation = await navRes.json();

  const cardRes = await fetch(getCardsUrl(ctx.query));
  const cardPhotos = await cardRes.json();

  const allCardsRes = await fetch(
    `${publicRuntimeConfig.API_URL}/card-lookbooks`
  );
  const allCards = await allCardsRes.json();

  const serviceRes = await fetch(
    `${publicRuntimeConfig.API_URL}/uslugi-groups`
  );
  const services = await serviceRes.json();

  const citiesRes = await fetch(`${publicRuntimeConfig.API_URL}/cities`);
  const cities = await citiesRes.json();

  const metroRes = await fetch(`${publicRuntimeConfig.API_URL}/metros`);
  const metros = await metroRes.json();

  const ceoPageRes = await fetch(`${publicRuntimeConfig.API_URL}/ceo-pages`);
  const ceoPages = await ceoPageRes.json();

  if (ctx.query["metro.name"] && !ctx.query["city.name"]) {
    const newQuery = { ...ctx.query };
    delete newQuery["metro.name"];
    let queryString = new URLSearchParams(newQuery);

    queryString.sort();
    queryString = queryString.toString();

    return {
      redirect: {
        destination: `/filter-albums${
          queryString.length > 0 ? `?${queryString}` : ""
        }`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      title: `${
        ceoPages &&
        ceoPages.map((page) =>
          `/filter-albums?${page.url_filter}` === decodeURI(ctx.resolvedUrl)
            ? `${page.Title}`
            : "Все анкеты"
        )
      }`,

      breadcrumbs: {
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
      ceoPages,
      navigation,
      artists: artistsData,
      genres: genresData,
      cities,
      metros,
      cardPhotos,
      allCards,
      services,
    },
  };
}

export default FilterAlbums;
