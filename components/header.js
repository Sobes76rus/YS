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
          <div class="container-fluid">
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
                  <li className=" nav-item" key={item.id}>
                    <Link href={`${item.Slug}`}>
                      <a className="nav-link main_text-color ">{item.Title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
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
