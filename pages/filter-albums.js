import Select from "react-select";
import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import getConfig from "next/config";
import Router, { useRouter } from "next/router";
import ShopPagination from "../components/ShopPagination";
import Product from "../components/Product";
import Hero from "../components/Hero";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import _ from "lodash";

const { publicRuntimeConfig } = getConfig();

function getAlbumsUrl(query) {
  const url = new URL(`${publicRuntimeConfig.API_URL}/albums`);

  const artistId = query["artists.artist_name"];

  if (artistId) {
    url.searchParams.append("artists.artist_name", artistId);
  }

  return url.toString();
}

function createFilterQuery(params) {
  const nextUrl = {
    pathname,
    query: {
      ...query,
    },
  };
}

const FilterAlbums = ({ albums: a, cardPhotos, breadcrumbs }) => {
  const { query, push, pathname } = useRouter();
  const filteredArtists = query["artists.artist_name"];
  const [albums, setAlbums] = useState(a);
  const [loading, setLoading] = useState(false);

  async function changeFilter(filter) {
    const nextUrl = {
      pathname,
      query: {
        ...query,
        ...filter,
      },
    };

    await Router.push(nextUrl, nextUrl, { shallow: true });
  }

  useEffect(() => {
    const url = getAlbumsUrl(query);
    setLoading(true);

    fetch(url)
      .then((r) => r.json())
      .then((a) => {
        setAlbums(a);
        setLoading(false);
      });
  }, [filteredArtists]);

  const debouncedHandleChange = _.debounce((evt) => {
    changeFilter({
      price: evt.target.value,
    });
  }, 300);

  const artistNameFilter = query["artists.artist_name"];

  return (
    <>
      <Hero title={breadcrumbs.title} breadcrumbs={breadcrumbs.breadcrumbs} />

      <Container fluid>
        <div>
          <Row>
            <Col className="products-grid">
              {/* <ShopHeader /> */}
              <ResponsiveMasonry
                style={{ marginTop: "50px" }}
                columnsCountBreakPoints={{ 300: 2, 900: 3, 1100: 4 }}
              >
                <Masonry gutter="30px">
                  {cardPhotos.slice(0, -1).map((value, index) => (
                    <div key={index} style={{ marginTop: "-30px" }}>
                      <Product data={value} key={index} masonry />
                    </div>
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </Col>
            {/* <ShopSidebar /> */}
          </Row>
        </div>
      </Container>
    </>

    // <Container fluid className="vh-100">
    //   <Row>
    //     <h2 className=" text-sm-left">Filter albums</h2>
    //   </Row>
    //   <Row>
    //     <div className="d-flex flex-row">
    //       <div className="d-flex flex-column w-50 text-sm-left">
    //         <h3>Filter go here</h3>
    //         <Select
    //           defaultValue={
    //             artistNameFilter
    //               ? artists.filter(({ artist_name }) =>
    //                   artistNameFilter.includes(artist_name)
    //                 )
    //               : []
    //           }
    //           getOptionLabel={(option) => option.artist_name}
    //           getOptionValue={(option) => option.id}
    //           options={artists}
    //           instanceId="artists"
    //           isMulti
    //           placeholder="Filter by artists"
    //           onChange={(values) => {
    //             changeFilter({
    //               "artists.artist_name": values.map(
    //                 ({ artist_name }) => artist_name
    //               ),
    //             });
    //           }}
    //         />
    //         <br />
    //         <Select
    //           getOptionLabel={(option) => `${option.genre}`}
    //           getOptionValue={(option) => option.id}
    //           options={genres}
    //           instanceId="genres"
    //           placeholder="Filter by genres"
    //           isClearable
    //           onChange={(value) => setGenreId(value ? value.id : null)}
    //         />
    //         <input
    //           type="range"
    //           className="form-range mt-5"
    //           min="0"
    //           max="5000"
    //           id="customRange2"
    //           onChange={debouncedHandleChange}
    //         ></input>
    //         <Range />
    //       </div>

    //       {loading && "Applying filter"}
    //       <ul className="row row-cols-1 list-unstyled">
    //         {albums.map((item) => (
    //           <li className="col" key={item.id}>
    //             <strong>{item.album_name}</strong> -{" "}
    //             {item.genre ? item.genre.genre : null} <br />
    //             {item.artist}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </Row>
    // </Container>
  );
};

export async function getServerSideProps(ctx) {
  const { API_URL } = process.env;

  const albumsUrl = getAlbumsUrl(ctx.query);

  const resAlbums = await fetch(albumsUrl);
  const albumsData = await resAlbums.json();

  const resArtists = await fetch(`${API_URL}/artists`);
  const artistsData = await resArtists.json();

  const resGenres = await fetch(`${API_URL}/genres`);
  const genresData = await resGenres.json();

  const navRes = await fetch(`${publicRuntimeConfig.API_URL}/navigations`);
  const navigation = await navRes.json();

  const cardRes = await fetch(`${publicRuntimeConfig.API_URL}/card-lookbooks`);
  const cardPhotos = await cardRes.json();

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
      albums: albumsData,
      artists: artistsData,
      genres: genresData,
      cardPhotos,
    },
  };
}

export default FilterAlbums;
