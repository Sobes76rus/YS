import React, { useState } from "react";
import {
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Media,
  Row,
  Col,
} from "reactstrap";

import classnames from "classnames";
import Stars from "./Stars";

const DetailTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState(1);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  // const groupByN = (n, data) => {
  //   let result = [];
  //   for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n));
  //   return result;
  // };

  // const groupedAdditionalInfo = groupByN(4, product.additionalinfo);

  return (
    <section className="mt-5">
      <Container>
        <Nav tabs className="flex-column flex-sm-row">
          <NavItem>
            <NavLink
              className={classnames("detail-nav-link", {
                active: activeTab === 1,
              })}
              onClick={() => {
                toggleTab(1);
              }}
            >
              Описание
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames("detail-nav-link", {
                active: activeTab === 2,
              })}
              onClick={() => {
                toggleTab(2);
              }}
            >
              Параметры
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames("detail-nav-link", {
                active: activeTab === 3,
              })}
              onClick={() => {
                toggleTab(3);
              }}
            >
              Отзывы
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="py-4">
          <TabPane tabId={1} className="px-3">
            <Row>
              <Col
                md="7"
                xl="8"
                dangerouslySetInnerHTML={{ __html: product.opisanie }}
              />
              <Col md="5" xl="4">
                <img
                  className="img-fluid"
                  src={product.photo[0].url}
                  alt={product.name}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId={2}>
            <Row>
              {/* {groupedAdditionalInfo.map((infoBlock, index) => (
                <Col key={index} md="6">
                  <table className="table text-sm">
                    <tbody>
                      {infoBlock.map((info, index) => (
                        <tr key={index}>
                          <th
                            className={`text-uppercase font-weight-normal ${
                              index == 0 ? "border-0" : ""
                            }`}
                          >
                            {info.name}
                          </th>
                          <td
                            className={`text-muted ${
                              index == 0 ? "border-0" : ""
                            }`}
                          >
                            {info.text}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Col>
              ))} */}
            </Row>
          </TabPane>
          <TabPane tabId={3}>
            <Row className="mb-5">
              <Col lg="10" xl="9">
                {/* {product.reviews.map((review) => (
                  <Media key={review.author} className="review">
                    <div className="text-center mr-4 mr-xl-5">
                      <img
                        className="review-image"
                        src={review.avatar}
                        alt={review.author}
                      />
                      <span className="text-uppercase text-muted">
                        {review.date}
                      </span>
                    </div>
                    <Media body>
                      <h5 className="mt-2 mb-1">{review.author}</h5>
                      <div className="mb-2">
                        <Stars
                          stars={review.stars}
                          color="warning"
                          secondColor="gray-200"
                          starClass="fa-xs"
                        />
                      </div>
                      <p className="text-muted">{review.text}</p>
                    </Media>
                  </Media>
                ))} */}
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Container>
    </section>
  );
};

export default DetailTabs;
