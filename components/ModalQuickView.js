import Link from "next/link";
import { Button, ButtonGroup, ModalBody, Modal, Row, Col } from "reactstrap";
import SwiperGallery from "../components/SwiperGallery";
import ButtonsTab from "./ButtonsTab";

const ModalQuickView = ({ isOpen, toggle, product }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl" modalClassName="quickview">
      <button
        className="close modal-close bg-transparent"
        type="button"
        onClick={toggle}
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#a279ef"
          className="w-100 h-100 svg-icon-light align-middle"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>

      <ModalBody className="quickview-body">
        <Row className="p-3">
          <Col lg="6">
            <div className="detail-carousel">
              <SwiperGallery data={product} vertical={true} />
            </div>
          </Col>
          <Col lg="6" className="p-lg-5">
            <h2 className="mb-4 mt-4 mt-lg-1">{product.name}</h2>
            <h2 className="h4 font-weight-light mb-5">{product.price} руб</h2>
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-4">
              {/* <ul className="list-inline mb-2 mb-sm-0">
                <li className="list-inline-item h4 font-weight-light mb-0">
                  
                </li>
              </ul> */}
              <Button className="p-0" color="link" outline>
                <Link href="/persons/[id]" as={`/persons/${product.id}/`}>
                  <a className="link-purple text-decoration-none ">
                    <h6 className="m-0">Перейти на анкету</h6>
                  </a>
                </Link>
              </Button>
              <div className="d-flex align-items-center text-sm">
                {/* <Stars
                  stars={product.stars}
                  className="mr-2 mb-0"
                  secondColor="gray-300"
                /> */}
                {/* <span className="text-muted text-capitalize link-purple">
                  1 просмотр
                </span> */}
              </div>
            </div>
            <p
              className="mb-4 text-muted"
              dangerouslySetInnerHTML={{ __html: product.opisanie }}
            ></p>
            <Col className="detail-option mb-4 p-0">
              <ButtonsTab isPreOpen product={product} />
            </Col>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default ModalQuickView;
