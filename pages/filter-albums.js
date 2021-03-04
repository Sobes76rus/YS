import Select from "react-select";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const getAlbums = async (key) => {
  const genreId = key.queryKey[1].genre;
  const artistsIds = key.queryKey[2].artists.map((id) => `artists.id=${id}`);

  const artistsQueryString = artistsIds.join("&");

  if (genreId) {
    const res = await fetch(
      `${publicRuntimeConfig.API_URL}/albums?genre.id=${genreId}`
    );
    return res.json();
  }
  if (artistsQueryString) {
    const res = await fetch(
      `${publicRuntimeConfig.API_URL}/albums?${artistsQueryString}`
    );
    return res.json();
  }

  if (genreId && artistsQueryString) {
    const res = await fetch(
      `${publicRuntimeConfig.API_URL}/albums?genre.id=${genreId}&${artistsQueryString}`
    );
    return res.json();
  }

  const res = await fetch(`${publicRuntimeConfig.API_URL}/albums`);
  return res.json();
};

const FilterAlbums = ({ albums, artists, genres }) => {
  const [genreId, setGenreId] = useState(null);
  const [artistsIds, setArtistsIds] = useState([]);
  const { data, status } = useQuery(
    ["albums", { genre: genreId }, { artists: artistsIds }],
    getAlbums,
    {
      initialData: albums,
    }
  );

  return (
    <div className="container">
      <h2 className=" text-sm-left">Filter albums</h2>
      <div className="d-flex flex-row">
        <div className="d-flex flex-column w-50 text-sm-left">
          <h3>Filter go here</h3>
          <Select
            getOptionLabel={(option) => `${option.artist_name}`}
            getOptionValue={(option) => option.id}
            options={artists}
            instanceId="artists"
            isMulti
            placeholder="Filter by artists"
            onChange={(values) =>
              setArtistsIds(values.map((artists) => artists.id))
            }
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
            max="5"
            id="customRange2"
          ></input>
        </div>

        <ul className="row row-cols-1 list-unstyled">
          {status === "loading" && <div>Loading The albums</div>}
          {status === "error" && <div>Something went wrong</div>}
          {status === "success" &&
            data.map((item) => (
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

export async function getServerSideProps() {
  const { API_URL } = process.env;

  const resAlbums = await fetch(`${API_URL}/albums`);
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
