import { Row, Col } from "reactstrap";

import Product from "./Product";

const DetailSimilar = ({ allCards }) => {
  return (
    <section className="my-5">
      <div className="container">
        <header className="text-center">
          <h6 className="text-uppercase mb-5">Вам также могут понравиться</h6>
        </header>

        <Row>
          {allCards.slice(0, 6).map((value, index) => (
            <Col xl="2" lg="2" md="4" xs="6" key={index}>
              <Product card={value} onlyViewButton />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default DetailSimilar;
