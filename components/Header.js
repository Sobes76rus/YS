import React, { useState, useRef } from "react";

import Link from "next/link";

import { Collapse, Navbar, NavbarToggler, Nav, Container } from "reactstrap";

const Header = (props) => {
  const { navigation } = props;
  const [collapsed, setCollapsed] = useState(false);
  const navbarRef = useRef(null);

  return (
    <header
      className={`header ${props.headerAbsolute ? "header-absolute" : ""}`}
    >
      <div ref={navbarRef}>
        <Navbar
          expand="lg"
          className={` bg-fixed-white navbar-fixed-light navbar navbar-expand-lg navbar-dark ${
            props.navbarHoverLight ? "navbar-hover-light" : "navbar-light"
          } ${props.bgHoverPurple ? "bg-hover-purple" : "bg-purple"}`}
        >
          <Container fluid>
            <NavbarToggler
              onClick={() => setCollapsed(!collapsed)}
              className="navbar-toggler-right"
            >
              <i className="fa fa-bars"></i>
            </NavbarToggler>
            <Collapse
              className="justify-content-md-between"
              isOpen={collapsed}
              navbar
            >
              <Nav navbar>
                {navigation &&
                  navigation.map((item) => (
                    <li className="nav-item" key={item._id}>
                      <Link href={item.Slug}>
                        <a className="nav-link main_text-color">{item.Title}</a>
                      </Link>
                    </li>
                  ))}
              </Nav>
              <Link href="/" passHref>
                <a className="py-1 navbar-brand">
                  <img
                    src="https://cdn.worldvectorlogo.com/logos/next-js.svg"
                    className="navbar-brand"
                    width="50"
                    height="44"
                    alt="..."
                  />
                </a>
              </Link>
              <div className="d-flex justify-content-lg-end mt-1 mb-2 my-lg-0">
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
                <div className="nav-item navbar-icon-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-telegram"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
                  </svg>
                </div>
              </div>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
