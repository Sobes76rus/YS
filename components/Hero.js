import React from "react";
import Breadcrumbs from "./Breadcrumbs";

import { Container, Row, Col } from "reactstrap";

const Hero = ({ children, ...props }) => {
  return (
    <section className="hero">
      <Container fluid>
        {props.breadcrumbs && (
          <Breadcrumbs className="text-left" links={props.breadcrumbs} />
        )}
        <div className="hero-content text-left p-0">
          <h3 className="mb-5">{props.title}</h3>
          {children}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
