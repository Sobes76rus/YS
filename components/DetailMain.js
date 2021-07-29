import { Row, Col, Form, Button, ButtonGroup, Container } from "reactstrap";
import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";

export default function DetailMain({ product }) {
  const { query } = useRouter();
  const [showNumber, setShowNumber] = useState(false);

  useEffect(() => {
    setShowNumber(false);
  }, [query.id]);

  return (
    <>
      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between ">
        <h1 className="mb-4">{product.name}</h1>
        <span className="text-muted text-capitalize link-purple">
          1 просмотр
        </span>
      </div>
      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-5 ">
        {/* <div className="h4 font-weight-light mb-0 mb-sm-0 mr-5">
          {product.price} руб
        </div> */}

        <div className="h4 font-weight-light mb-0 mb-sm-0 mr-5"></div>
        <div className="d-flex align-items-center">
          <span className="text-muted text-uppercase text-sm mt-1">
            {/* {product.reviewscount} reviews */}
          </span>
        </div>
      </div>
      {/* <p className="mb-4 text-muted">{product.description.short}</p> */}

      <Row>
        <Col sm="6" lg="12" xl="6" className="detail-option mb-4">
          <Button
            active={showNumber}
            disabled={showNumber}
            outline
            className="align-items-center mb-5 p-0"
            color="link"
            onClick={() => setShowNumber(true)}
          >
            {showNumber ? (
              <NumberFormat
                renderText={(value) => (
                  <h6 className="link-purple font-weight-bold m-0">{value}</h6>
                )}
                displayType={"text"}
                format="+7 (###) ###-##-##"
                mask="_"
                value={Math.random()}
              />
            ) : (
              <h6 className="p-0 m-0 font-weight-bold link-purple">
                Показать телефон
              </h6>
            )}
          </Button>
          <h6 className="detail-option-heading mb-3">Услуги</h6>
          <ButtonGroup>
            {product.uslugis.map((service, index) => (
              <Button
                outline
                color="secondary"
                className="mr-3 w-100 text-capitalize border-0"
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
