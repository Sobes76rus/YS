import {
  Container,
  Row,
  Col,
  Collapse,
  Button,
  CardBody,
  Card,
  Jumbotron,
  Spinner,
} from "reactstrap";

import { useRouter } from "next/router";
import { useState, useContext, useEffect, useRef } from "react";
import getConfig from "next/config";

import Hero from "../components/Hero";
import ShopFilter from "../components/ShopFilter";
import getCardsUrl from "../side-effects/getCardsUrl";
import "rc-slider/assets/index.css";
import _ from "lodash";
import dynamic from "next/dynamic";
import LayoutGrid from "../components/LayoutGrid";

// const LayoutGrid = dynamic(() => import("../components/LayoutGrid"), {
//   ssr: false,
//   loading: () => <>Loading...</>,
// });

const FilterAlbums = (props) => {
  const {
    allCardsPrice: price,
    allCardsDickSizeProp: dickSizeProp,
    allCardsBreastSizeProp: breastSizeProp,

    ceoPages,
    services,
    cardPhotos,
    cities,
    metros,
    breadcrumbs,
  } = props;
  const { query, asPath, push: routerPush } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [cards, setCards] = useState(cardPhotos);
  const toggle = () => setIsOpen(!isOpen);
  const citiesNameFilter = query["city.name"];
  const metrosNameFilter = query["metro.name"];
  const usluginTagsFilter = query["usligis.name"];
  const secondEffectRef = useRef(false);

  const updateDeps = [
    query.priceMin,
    query.priceMax,
    query.dickMax,
    query.dickMin,
    query.breastMax,
    query.breastMin,
    citiesNameFilter,
    metrosNameFilter,
    usluginTagsFilter,
  ];

  useEffect(() => {
    const currentUrl = new URL(window.location);
    const params = currentUrl.searchParams;
    if (params.has("metro.name") && !params.has("city.name")) {
      params.delete("metro.name");
      params.sort();

      routerPush(currentUrl);
      return;
    }

    if (secondEffectRef.current) {
      return;
    }

    secondEffectRef.current = true;
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
        setCards(a);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        // TODO: показать ошибку
      });
  }, updateDeps);

  const randomCards = (a, n) =>
    a.sort(() => Math.random() - Math.random()).slice(0, n);
  randomCards(cards, 100);
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
                dickSize={dickSizeProp}
                breastSize={breastSizeProp}
              />
            </CardBody>
          </Card>
        </Collapse>
      </Container>

      <Container className="px-0">
        <p>С учетом фильтров</p>
        <Row>
          <Col className="products-grid">
            {isLoading ? (
              <Spinner className="spinner" />
            ) : (
              <LayoutGrid cards={cards} />
            )}
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

export async function getStaticProps() {
  const { publicRuntimeConfig } = getConfig();

  const getData = async (url) => {
    const response = await fetch(url);
    return await response.json();
  };

  const data = await Promise.all([
    getData(`${publicRuntimeConfig.API_URL}/artists`),
    getData(`${publicRuntimeConfig.API_URL}/genres`),
    getData(`${publicRuntimeConfig.API_URL}/navigations`),
    // getData(getCardsUrl(ctx.query)),
    getData(`${publicRuntimeConfig.API_URL}/card-lookbooks`),
    getData(`${publicRuntimeConfig.API_URL}/uslugi-groups`),
    getData(`${publicRuntimeConfig.API_URL}/cities`),
    getData(`${publicRuntimeConfig.API_URL}/metros`),
    getData(`${publicRuntimeConfig.API_URL}/ceo-pages`),
    getData(`${publicRuntimeConfig.API_URL}/ceo-pages-groups`),
  ]);

  const [
    artistsData,
    genresData,
    navigation,
    // cardPhotos,
    allCards,
    services,
    cities,
    metros,
    ceoPages,
    ceoPagesGroups,
  ] = data;

  const price = [allCards.map((card) => Number(card.price))];
  const dickSizeProp = [allCards.map((card) => Number(card.dick_size))];
  const breastSizeProp = [allCards.map((card) => Number(card.breast_size))];

  return {
    props: {
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
      ceoPagesGroups,
      navigation,
      artists: artistsData,
      genres: genresData,
      cities,
      metros,
      cardPhotos: [],

      allCardsPrice: price,
      allCardsDickSizeProp: dickSizeProp,
      allCardsBreastSizeProp: breastSizeProp,

      services,
      fixedBottom: true,
    },

    revalidate: 60,
  };
}

export default FilterAlbums;
