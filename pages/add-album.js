import { useContext } from "react";

import AuthContextProvider from "../contexts/AlbumsContext";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

function addAlbum() {
  const {
    albumTitle,
    setAlbumTitle,
    albumSlug,
    setAlbumSlug,
    albumImage,
    setAlbumImage,
  } = useContext(AuthContextProvider);

  async function addAlbum() {
    const albumsInfo = {
      Album_name: albumTitle,
      Slug: albumSlug,
    };
    const add = await fetch(`${publicRuntimeConfig.API_URL}/albums`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(albumsInfo),
    });
    const addResponse = await add.json();
    console.log(addResponse);

    // const add = await fetch(`${publicRuntimeConfig.API_URL}/albums`, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(albumsInfo),
    // });

    // const addResponse = await add.json();
  }

  return (
    <div className="container">
      <form className="w-25 pt-5">
        <input
          type="text"
          className="form-control"
          placeholder="Album Title"
          onChange={(e) => setAlbumTitle(e.target.value)}
          value={albumTitle}
        />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Album Slug"
          onChange={(e) => setAlbumSlug(e.target.value)}
          value={albumSlug || ""}
        />
        <br />
        <input
          type="file"
          value={albumImage || ""}
          onChange={(e) => setAlbumImage(e.target.value)}
        />
        <button type="button" onClick={addAlbum}>
          Add Album
        </button>
      </form>
    </div>
  );
}
export default addAlbum;
