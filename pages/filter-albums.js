import Select from "react-select";
import { useState, useEffect } from "react";
import getConfig from "next/config";
import Router, { useRouter } from "next/router";
const { publicRuntimeConfig } = getConfig();
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import _ from "lodash";

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

const FilterAlbums = ({ albums: a, artists, genres }) => {
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
    <div className="container">
      <h2 className=" text-sm-left">Filter albums</h2>
      <div className="d-flex flex-row">
        <div className="d-flex flex-column w-50 text-sm-left">
          <h3>Filter go here</h3>
          <Select
            defaultValue={
              artistNameFilter
                ? artists.filter(({ artist_name }) =>
                    artistNameFilter.includes(artist_name)
                  )
                : []
            }
            getOptionLabel={(option) => option.artist_name}
            getOptionValue={(option) => option.id}
            options={artists}
            instanceId="artists"
            isMulti
            placeholder="Filter by artists"
            onChange={(values) => {
              changeFilter({
                "artists.artist_name": values.map(
                  ({ artist_name }) => artist_name
                ),
              });
            }}
          />
          <br />
          <Select
            getOptionLabel={(option) => `${option.genre}`}
            getOptionValue={(option) => option.id}
            options={genres}
            instanceId="genres"
            placeholder="Filter by genres"
            isClearable
            onChange={(value) => setGenreId(value ? value.id : null)}
          />
          <input
            type="range"
            className="form-range mt-5"
            min="0"
            max="5000"
            id="customRange2"
            onChange={debouncedHandleChange}
          ></input>
          <Range />
        </div>

        {loading && "Applying filter"}
        <ul className="row row-cols-1 list-unstyled">
          {albums.map((item) => (
            <li className="col" key={item.id}>
              <strong>{item.album_name}</strong> -{" "}
              {item.genre ? item.genre.genre : null} <br />
              {item.artist}
            </li>
          ))}
        </ul>
      </div>
    </div>
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

    

  return {
    props: {
      albums: albumsData,
      artists: artistsData,
      genres: genresData,
    },
  };
}

export default FilterAlbums;
