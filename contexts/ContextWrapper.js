import { useState } from "react";
import AuthContext from "./AuthContext";
import AlbumsContext from "./AlbumsContext";
import HeaderContext from "./HeaderContext";

export default function ContextWrapper({ children }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isBlack, setIsBlack] = useState(false);
  const [albumTitle, setAlbumTitle] = useState();
  const [albumSlug, setAlbumSlug] = useState();
  const [albumImage, setAlbumImage] = useState();

  return (
    <AuthContext.Provider
      value={{ userName, setUserName, password, setPassword }}
    >
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
    </AuthContext.Provider>
  );
}
