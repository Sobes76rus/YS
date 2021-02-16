import { useState } from "react";
import AuthContextProvider from "./AuthContext";
import AlbumsContext from "./AlbumsContext";
import HeaderContext from "./HeaderContext";

export default function ContextWrapper({ children }) {
  const [isBlack, setIsBlack] = useState(false);
  const [albumTitle, setAlbumTitle] = useState();
  const [albumSlug, setAlbumSlug] = useState();
  const [albumImage, setAlbumImage] = useState();

  return (
    <AuthContextProvider>
      <HeaderContext.Provider value={{ isBlack, setIsBlack }}>
        <AlbumsContext.Provider
          value={{
            albumTitle,
            setAlbumTitle,
            albumSlug,
            setAlbumSlug,
            albumImage,
            setAlbumImage,
          }}
        >
          {children}
        </AlbumsContext.Provider>
      </HeaderContext.Provider>
    </AuthContextProvider>
  );
}
