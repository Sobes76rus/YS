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
import getCardsUrl from "../side-effects/getCardsUrl";
import "rc-slider/assets/index.css";
import _ from "lodash";
import dynamic from "next/dynamic";

const LayoutGrid = dynamic(() => import("../components/LayoutGrid"), {
  ssr: false,
  loading: () => <>Loading...</>,
});

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
  const dickSizeProp = [allCards.map((card) => Number(card.dick_size))];
  const breastSizeProp = [allCards.map((card) => Number(card.breast_size))];
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
          `/filter-albums?${page.url_filter}` ===
          decodeURI(ctx.resolvedUrl).replace(/\s/g, "+")
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
      fixedBottom: true,
    },
  };
}

export default FilterAlbums;
