import { Row, Col, Form, Button, Label, Input } from "reactstrap";

import Link from "next/link";

import SelectBox from "./SelectBox";
import Stars from "./Stars";

export default function DetailMain({ product }) {
  return (
    <>
      <h1 className="mb-4">{product.name}</h1>

      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-4">
        <div className="h4 font-weight-light mb-0 mb-sm-0 mr-5">
          {product.price} руб
        </div>
        <div className="d-flex align-items-center">
          <Stars
            stars={3}
            secondColor="gray-300"
            starClass="mr-1"
            className="mr-2"
          />

          <span className="text-muted text-uppercase text-sm mt-1">
            {/* {product.reviewscount} reviews */}
          </span>
        </div>
      </div>
      {/* <p className="mb-4 text-muted">{product.description.short}</p> */}

      <Form>
        <Row>
          <Col sm="6" lg="12" xl="6" className="detail-option mb-4">
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
        </Row>

        <ul className="list-unstyled">
          <li>
            <strong>Category:&nbsp;</strong>
            <a className="text-muted" href="#">
              {product.category}
            </a>
          </li>
          <li>
            <strong>Tags:&nbsp;</strong>
            {/* {product.tag.map((tag, index) => (
              <React.Fragment key={tag.name}>
                <Link href={tag.link}>
                  <a className="text-muted">{tag.name}</a>
                </Link>
                {index < product.tags.length - 1 ? ",\u00A0" : ""}
              </React.Fragment>
            ))} */}
          </li>
        </ul>
      </Form>
    </>
  );
}
