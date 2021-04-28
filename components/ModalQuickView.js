import React from "react";

import { Button, ModalBody, Modal, Row, Col } from "reactstrap";
import SwiperGallery from "../components/SwiperGallery";
import Stars from "./Stars";

const ModalQuickView = ({ isOpen, toggle, product }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl" modalClassName="quickview">
      <button
        className="close modal-close"
        type="button"
        onClick={toggle}
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="w-100 h-100 svg-icon-light align-middle"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>

      <ModalBody className="quickview-body">
        <Row>
          <Col lg="6">
            <div className="detail-carousel">
              <SwiperGallery data={product} vertical={true} />
            </div>
          </Col>
          <Col lg="6" className="p-lg-5">
            <h2 className="mb-4 mt-4 mt-lg-1">{product.name}</h2>
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-4">
              <ul className="list-inline mb-2 mb-sm-0">
                <li className="list-inline-item h4 font-weight-light mb-0">
                  ${product.price}
                </li>
              </ul>
              <div className="d-flex align-items-center text-sm">
                <Stars
                  stars={product.stars}
                  className="mr-2 mb-0"
                  secondColor="gray-300"
                />
                <span className="text-muted text-uppercase">1 review</span>
              </div>
            </div>
            <p className="mb-4 text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <Col sm="6" lg="12" className="detail-option mb-4">
              <h6 className="detail-option-heading">Услуги</h6>
              {product.uslugis.map((service, index) => (
                <Button
                  outline
                  color="secondary"
                  className="mr-3"
                  size="sm"
                  key={index}
                >
                  {service.name}
                </Button>
              ))}
            </Col>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default ModalQuickView;
