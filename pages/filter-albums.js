import {
  Container,
  Row,
  Col,
  Collapse,
  Button,
  CardBody,
  Card,
} from "reactstrap";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
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

  const cityId = query["city.name"];
  const metroId = query["metro.name"];
  const uslugiTags = query["usligis.name"];

  if (cityId) {
    url.searchParams.append("city.name", cityId);
  }
  if (metroId) {
    url.searchParams.append("metros.name", metroId);
  }
  if (uslugiTags) {
    url.searchParams.append("usligis.name", uslugiTags);
  }

  return url.toString();
}

const FilterAlbums = ({
  services,
  cardPhotos,
  cities,
  metros,
  breadcrumbs,
}) => {
  const { query } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [cards, setCards] = useState(cardPhotos);
  const toggle = () => setIsOpen(!isOpen);
  const citiesNameFilter = query["city.name"];
  const metrosNameFilter = query["metro.name"];
  const usluginTagsFilter = query["usligis.name"];

  useEffect(() => {
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
  }, [citiesNameFilter, metrosNameFilter, usluginTagsFilter]);

  return (
    <>
      <Hero title={breadcrumbs.title} breadcrumbs={breadcrumbs.breadcrumbs} />
      <Container
        fluid
        className="d-flex flex-column align-items-center justify-content-center "
      >
        <Button block onClick={toggle} className="btn-toggle py-4">
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
              <ShopFilter services={services} cities={cities} metros={metros} />
            </CardBody>
          </Card>
        </Collapse>
      </Container>

      <Container className="px-0">
        <Row>
          <Col className="products-grid">
            <LayoutGrid cards={cards} />
          </Col>
          {/* <ShopSidebar /> */}
        </Row>
      </Container>
    </>
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

  const cardRes = await fetch(`${publicRuntimeConfig.API_URL}/card-lookbooks`);
  const cardPhotos = await cardRes.json();

  const serviceRes = await fetch(
    `${publicRuntimeConfig.API_URL}/uslugi-groups`
  );
  const services = await serviceRes.json();

  const citiesRes = await fetch(`${publicRuntimeConfig.API_URL}/cities`);
  const cities = await citiesRes.json();

  const metroRes = await fetch(`${publicRuntimeConfig.API_URL}/metros`);
  const metros = await metroRes.json();

  if (ctx.query["metro.name"] && !ctx.query["city.name"]) {
    const newQuery = { ...ctx.query };
    delete newQuery["metro.name"];
    const queryString = new URLSearchParams(newQuery).toString();

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
      breadcrumbs: {
        title: "Все анкеты",
        subtitle: "Все анкеты",
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
      navigation,
      artists: artistsData,
      genres: genresData,
      cities,
      metros,
      cardPhotos,
      services,
    },
  };
}

export default FilterAlbums;
