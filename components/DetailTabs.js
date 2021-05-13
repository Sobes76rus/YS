import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import {
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Table,
  Row,
  Col,
} from "reactstrap";

import classnames from "classnames";
import Stars from "./Stars";

const DetailTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [coords, setCoords] = useState(null);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  async function getCoords(y) {
    const geoCode = await y.geocode(
      `город ${product.city.name}, метро ${product.metros[0].name}`
    );
    const result = await geoCode;
    setCoords(result.geoObjects.get(0).geometry.getCoordinates());
  }

  // useEffect(() => {
  //   const { result } = getCoords();
  //   setCoords(result.geoObjects.get(0).geometry.getCoordinates());
  // });

  console.log(coords);
  return (
    <section>
      <Container className="p-0">
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
          <NavItem>
            <NavLink
              className={classnames("detail-nav-link", {
                active: activeTab === 4,
              })}
              onClick={() => {
                toggleTab(4);
              }}
            >
              Смотреть на карте
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
              <Col md="6">
                <Table className="table text-sm">
                  <thead className="detail-tab-heading main">
                    <tr>
                      <th>Местоположение</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className={"text-uppercase font-weight-normal"}>
                        Город
                      </th>
                      <td className="text-muted">{product.city.name}</td>
                    </tr>
                    <tr>
                      <th className="text-uppercase font-weight-normal">
                        Метро
                      </th>
                      <td className={"text-muted"}>
                        {product.metros.map((metro) => metro.name)}
                      </td>
                    </tr>
                  </tbody>

                  <thead className="detail-tab-heading main">
                    <tr>
                      <th>Стоимость</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <th className={"text-uppercase font-weight-normal "}>
                        Первая
                      </th>
                      <td className="text-muted">{product.price} руб.</td>
                    </tr>
                    <tr>
                      <th className="text-uppercase font-weight-normal">
                        Вторая
                      </th>
                      <td className="text-muted">{product.price} руб.</td>
                    </tr>
                    <tr>
                      <th className="text-uppercase font-weight-normal">
                        Минимальный заказ
                      </th>
                      <td className="text-muted">{product.price} руб.</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>

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
          <TabPane tabId={4} className="px-3">
            <YMaps
              query={{
                apikey: "a071233a-e16e-42b6-9971-43c85214e736",
                load: "package.full",
              }}
            >
              <Map
                modules={["geolocation", "geocode"]}
                width="100%"
                height="440px"
                onLoad={(ymaps) => getCoords(ymaps)}
                defaultState={{
                  center: [55.75, 37.57],
                  zoom: 10,
                  controls: [],
                }}
              >
                {coords && (
                  <Placemark
                    geometry={coords}
                    options={{ iconColor: "#a279ef" }}
                    properties={{ iconCaption: product.metros[0].name }}
                  />
                )}
              </Map>
            </YMaps>
          </TabPane>
        </TabContent>
      </Container>
    </section>
  );
};

export default DetailTabs;
