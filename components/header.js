import Link from "next/link";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import HeaderContext from "../contexts/HeaderContext";

const Header = ({ navigation }) => {
  const { loggedIn, isBlack, setIsBlack } = useContext(HeaderContext);
  const router = useRouter();
  const onChangeBlack = () => {
    if (
      router.pathname === "/first-post" ||
      router.pathname === "/second-post"
    ) {
      setIsBlack(true);
    } else {
      setIsBlack(false);
    }
  };
  useEffect(() => {
    onChangeBlack();
  });

  return (
    <header className="header header-absolute">
      <div className="main_bg-color ">
        <nav className="bg-hover-white bg-fixed-white navbar-hover-light navbar-fixed-light navbar navbar-expand-lg  bg-transparent">
          <div className="container-fluid">
            <Link href="/">
              <a>
                <img
                  src="https://cdn.worldvectorlogo.com/logos/next-js.svg"
                  className="navbar-brand"
                  width="50"
                  height="44"
                  alt="..."
                />
              </a>
            </Link>
            <button
              aria-label="Toggle navigation"
              type="button"
              className="navbar-toggler-right navbar-toggler"
            >
              <i className="fa fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse">
              <ul className="mx-auto navbar-nav">
                {navigation.map((item) => (
                  <li className="nav-item" key={item.id}>
                    <Link href={`${item.Slug}`}>
                      <a className="nav-link main_text-color">{item.Title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="d-flex navbar-nav nav justify-content-between">
                <div className=" align-content-center nav-item px-2">
                  <Link href="/">
                    <a className="d-flex navbar-icon-link main_text-color">
                      <div className="d-flex px-1 align-self-xl-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#fff6ff"
                          className="bi bi-geo-alt-fill main_text-color"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                        </svg>
                      </div>
                      <div className="text-decoration-none d-flex align-self-xl-center">
                        Москва
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="nav-item px-2">
                  <Link className="navbar-icon-link" href="/">
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#fff6ff"
                        className="svg-icon bi bi-envelope"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                      </svg>
                    </a>
                  </Link>
                </div>
                <div className="nav-item px-2">
                  <Link className="navbar-icon-link" href="/">
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#fff6ff"
                        className="svg-icon bi bi-telegram"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
                      </svg>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>

    // <header>
    //   <nav
    //     className={`navbar navbar-light ${isBlack ? "bg-dark" : "bg-light"}`}
    //   >
    //     <div className="container-fluid">
    //       <Link href="/">
    //         <a>
    //           <img
    //             src="https://cdn.worldvectorlogo.com/logos/next-js.svg"
    //             className="navbar-brand"
    //             width="50"
    //             height="44"
    //             alt="..."
    //           />
    //         </a>
    //       </Link>
    //       <ul className="list-group flex-row list-unstyled flex justify-content-end">
    //         {navigation.map((item) => (
    //           <li className="nav-item" key={item.id}>
    //             <Link href={`${item.Slug}`}>
    //               <a className="nav-link">{item.Title}</a>
    //             </Link>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </nav>
    // </header>
  );
};

export default Header;
