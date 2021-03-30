import React from "react";
import { Col, Row, Container } from "reactstrap";

const ServicesBlock = () => {
  return (
    <div className="bg-gray-100 text-dark-700 py-6">
      <Container>
        <Row>
          <Col lg="4" className="service-column">
            <svg className="svg-icon service-icon">
              <use xlinkHref="/icons/orion-svg-sprite.svg#delivery-time-1">
                {" "}
              </use>
            </svg>
            <div className="service-text">
              <h6 className="text-uppercase">Free shipping &amp; return</h6>
              <p className="text-muted font-weight-light text-sm mb-0">
                Free Shipping over $300
              </p>
            </div>
          </Col>
          <Col lg="4" className="service-column">
            <svg className="svg-icon service-icon">
              <use xlinkHref="/icons/orion-svg-sprite.svg#money-1"> </use>
            </svg>
            <div className="service-text">
              <h6 className="text-uppercase">Money back guarantee</h6>
              <p className="text-muted font-weight-light text-sm mb-0">
                30 Days Money Back Guarantee
              </p>
            </div>
          </Col>
          <Col lg="4" className="service-column">
            <svg className="svg-icon service-icon">
              <use xlinkHref="/icons/orion-svg-sprite.svg#customer-support-1">
                {" "}
              </use>
            </svg>
            <div className="service-text">
              <h6 className="text-uppercase">020-800-456-747</h6>
              <p className="text-muted font-weight-light text-sm mb-0">
                24/7 Available Support
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ServicesBlock;
