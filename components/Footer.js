import React from "react";
import Link from "next/link";
import { Nav } from "reactstrap";

const Footer = ({ navigation }) => {
  return (
    <footer className="bg-purple ys-footer navbar navbar-expand-lg justify-content-center">
      <div>
        <div className="container d-flex flex-column">
          <div className="row justify-content-center">
            <Nav navbar className="mx-auto ">
              {navigation &&
                navigation.map((item) => (
                  <li className="nav-item" key={item._id}>
                    <Link href={item.Slug}>
                      <a className="nav-link">{item.Title}</a>
                    </Link>
                  </li>
                ))}
            </Nav>
          </div>
          <div className="row justify-content-center">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <div className="nav-item navbar-icon-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-envelope-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                </svg>
              </div>
              <p className="m-0">ys@ys.ru</p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="d-flex flex-row align-items-center justify-content-center text-w">
              <p className="m-0">© 2021 Copyright</p>

              <Link href="/" passHref>
                <a className="navbar-brand m-0">
                  <img
                    src="https://cdn.worldvectorlogo.com/logos/next-js.svg"
                    className="navbar-brand m-0 text-white"
                    width="50"
                    height="44"
                    alt="..."
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
