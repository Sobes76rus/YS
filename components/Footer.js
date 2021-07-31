import React from "react";
import Link from "next/link";

import { Container, Row, Col, Nav, Navbar } from "reactstrap";

const Footer = (props) => {
  const { navigation } = props;
  return (
    <div
      className={`${props.fixedBottom && "fixed-bottom"} bg-purple text-muted`}
    >
      <Container className="container">
        <Row className="align-items-center justify-content-center">
          <Navbar
            expand="lg"
            className={` p-0 fs-2  ${
              props.navbarHoverLight ? "navbar-hover-light" : "navbar-light"
            }`}
          >
            <Nav className="mx-auto text-light">
              <li className="nav-item" key={navigation[1]._id}>
                <Link href={navigation[1].Slug}>
                  <a className="nav-link text-light text-capitalize font-weight-normal">
                    {navigation[1].Title}
                  </a>
                </Link>
              </li>
              <li className="nav-item" key={navigation[2]._id}>
                <Link href={navigation[2].Slug}>
                  <a className="nav-link text-light text-capitalize font-weight-normal">
                    {navigation[2].Title}
                  </a>
                </Link>
              </li>
              <li className="nav-item" key={navigation[0]._id}>
                <Link href={navigation[0].Slug}>
                  <a className="nav-link text-light text-capitalize font-weight-normal">
                    {navigation[0].Title}
                  </a>
                </Link>
              </li>
            </Nav>
          </Navbar>
        </Row>
        <Row className="align-items-center justify-content-center">
          <div>
            <Link href="/contacts" passHref>
              <a className="text-light">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#fff"
                  className="bi bi-envelope-fill mr-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                </svg> */}
                your.seduction.us@protonmail.com
              </a>
            </Link>
          </div>
        </Row>
        {/* <Row className="align-items-center justify-content-center">
          <div className="col-md-6 text-center pt-2 text-light">
            <p className="mb-md-0">© 2021 Your company. All rights reserved.</p>
          </div>
        </Row> */}
      </Container>
    </div>
  );
};

export default Footer;
