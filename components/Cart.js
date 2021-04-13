import { Row, Col } from "reactstrap";
import CartItem from "./CartItem";

import Link from "next/link";

import items from "../data/products-cart.json";

export default function Cart({ review }) {
  return (
    <>
      <div className="cart">
        <div className="cart-header text-center">
          <Row>
            <Col md="5">Item</Col>
            <Col className="d-none d-md-block">
              <Row>
                <Col md="3">Price</Col>
                <Col md="4">Quantity</Col>
                <Col md="3">Total</Col>
                <Col md="2" />
              </Row>
            </Col>
          </Row>
        </div>
        <div className="cart-body">
          {items.map((item, index) => (
            <CartItem item={item} key={index} review={review} />
          ))}
        </div>
      </div>
    </>
  );
}
