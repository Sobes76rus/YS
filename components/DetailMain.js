import { Row, Col, Form, Button, ButtonGroup, Input } from "reactstrap";
import { useState } from "react";
import Stars from "./Stars";
import NumberFormat from "react-number-format";

export default function DetailMain({ product }) {
  const [showNumber, setShowNumber] = useState(false);

  return (
    <>
      <h1 className="mb-4">{product.name}</h1>

      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-4 ">
        <div className="h4 font-weight-light mb-0 mb-sm-0 mr-5">
          {product.price} руб
        </div>

        <div className="h4 font-weight-light mb-0 mb-sm-0 mr-5">
          <Button
            active={showNumber}
            disabled={showNumber}
            outline
            className="align-items-center"
            color="secondary"
            onClick={() => setShowNumber(true)}
          >
            {showNumber ? (
              <NumberFormat
                renderText={(value) => (
                  <h5 className="link-purple font-weight-bold m-0">{value}</h5>
                )}
                displayType={"text"}
                format="+7 (###) ###-##-##"
                mask="_"
                value={9051111111}
              />
            ) : (
              <p className="p-0 m-0">Показать телефон</p>
            )}
          </Button>
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

      <Row>
        <Col sm="6" lg="12" xl="6" className="detail-option mb-4">
          <h6 className="detail-option-heading mb-3">Услуги</h6>
          <ButtonGroup>
            {product.uslugis.map((service, index) => (
              <Button
                outline
                color="secondary"
                className="mr-3 w-100"
                size="sm"
                key={index}
              >
                {service.name}
              </Button>
            ))}
          </ButtonGroup>
        </Col>
      </Row>
    </>
  );
}
