import { Row, Col, Form, Button, ButtonGroup, Input } from "reactstrap";
import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";
import Link from "next/link";
export default function DetailMain({ product }) {
  const { query } = useRouter();
  const [showNumber, setShowNumber] = useState(false);

  useEffect(() => {
    setShowNumber(false);
  }, [query.id]);

  return (
    <>
      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
        <h1 className="mb-4">{product.name}</h1>
        {/* <span className="text-muted text-capitalize link-purple">
          1 просмотр
        </span> */}
      </div>
      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-5 ">
        <div className="h4 font-weight-light mb-0 mb-sm-0 mr-5"></div>
        <div className="d-flex align-items-center">
          <span className="text-muted text-uppercase text-sm mt-1"></span>
        </div>
      </div>

      <Row>
        <Col sm="12" lg="12" xl="12" className="detail-option mb-4">
          <Button
            active={showNumber}
            outline
            className="align-items-center mb-5 p-0"
            color="link"
            onClick={() => setShowNumber(true)}
          >
            {showNumber ? (
              <NumberFormat
                renderText={() => (
                  <h6 className="font-weight-bold m-0 p-0">
                    <a className="link-purple" href={`tel:${product.phone}`}>
                      {product.phone}
                    </a>
                  </h6>
                )}
                displayType="text"
                type="tel"
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
        </Col>
      </Row>
    </>
  );
}
