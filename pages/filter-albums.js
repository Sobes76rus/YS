import Select from "react-select";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import getConfig from "next/config";
import { useRouter } from "next/router";
const { publicRuntimeConfig } = getConfig();

const getAlbums = async (key) => {
  console.log(key);
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

// const { data, status } = useQuery(
//   ["albums", { genre: query["genre.id"] }, { artists: query["artist.id"] }],
//   getAlbums,
//   {
//     initialData: albums,
//   }
// );

function getAlbumsUrl(query) {
  const url = new URL(`${publicRuntimeConfig.API_URL}/albums`);
  const artistId = query["artists.id"];

  if (artistId) {
    url.searchParams.append("artists.id", artistId);
  }

  return url.toString();
}

const FilterAlbums = ({ albums: a, artists, genres }) => {
  const { query, push, pathname } = useRouter();
  const [albums, setAlbums] = useState(a);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = getAlbumsUrl(query);

    setLoading(true);
    fetch(url)
      .then((r) => r.json())
      .then((a) => {
        setAlbums(a);
        setLoading(false);
      });
  }, [query["artists.id"]]);

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
            onChange={(values) => {
              const nextUrl = {
                pathname,
                query: { ...query, "artists.id": values.map(({ _id }) => _id) },
              };

              push(nextUrl, nextUrl, { shallow: true });
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
            max="5"
            id="customRange2"
          ></input>
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

  console.log(albumsUrl);
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
