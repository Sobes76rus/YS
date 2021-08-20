import React from "react";
import getConfig from "next/config";
import Link from "next/link";
import Image from "../components/CustomImage";

import { Container, Button } from "reactstrap";

export async function getStaticProps() {
  const { publicRuntimeConfig } = getConfig();

  const navRes = await fetch(`${publicRuntimeConfig.API_URL}/navigations`);
  const navigation = await navRes.json();
  const servicesRes = await fetch(
    `${publicRuntimeConfig.API_URL}/uslugi-groups`
  );

  const services = await servicesRes.json();
  return {
    props: {
      nav: {
        dark: true,
        classes:
          "bg-hover-white bg-fixed-white navbar-hover-light navbar-fixed-light",
        color: "transparent",
      },
      navigation,
      services,
      headerAbsolute: true,
      title: "404",
    },
  };
}

const PageNotFound = () => {
  return (
    <>
      <div className="mh-full-screen d-flex align-items-center dark-overlay pt-header-height">
        <Image
          className="bg-image"
          src="/img/photo/pete-bellis-189599-unsplash-big.jpg"
          alt=""
          layout="fill"
        />
        <Container className="text-white text-lg overlay-content py-6 py-lg-0">
          <h1 className="display-3 font-weight-bold mb-5">
            Oops, that page is not here.
          </h1>
          <p className="font-weight-light mb-5">
            Elit adipisicing aliquip irure non consequat quis ex fugiat dolor in
            irure pariatur eu aute. Ea tempor nisi sit in Lorem exercitation
            mollit ut veniam in do eu excepteur.{" "}
          </p>
          <p className="mb-6">
            <Link href="index">
              <Button href="index" color="outline-light">
                <i className="fa fa-home mr-2" />
                Start from the Homepage
              </Button>
            </Link>
          </p>
          <p className="h4 text-shadow">Error 404</p>
        </Container>
      </div>
    </>
  );
};

export default PageNotFound;
