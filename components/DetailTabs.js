import React, { useEffect, useRef, useState } from "react";
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
  CustomInput,
} from "reactstrap";

import classnames from "classnames";

const DetailTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [coords, setCoords] = useState();
  const mapsRef = useRef();

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const setNewLocation = () => {
    if (!mapsRef.current) {
      console.log("no maps");
      return;
    }

    console.log("set geocode");
    mapsRef.current
      .geocode(`город ${product.city.name}, метро ${product.metros[0].name}`)
      .then((result) => {
        const coords = result.geoObjects.get(0).geometry.getCoordinates();
        setCoords(coords);
      });
  };

  useEffect(() => {
    console.log("after render");
    setNewLocation();
  }, [product.city.name, product.metros[0].name]);

  return (
    <section className="mt-5">
      <Container className="p-0">
        <Nav pills className="flex-column flex-sm-row">
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
              ЦЕНА
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
              Карта
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="py-4">
          <TabPane tabId={1}>
            <Row xs="1" xl="2">
              <Col className="pb-4">
                <h1 className="detail-tab-heading main">Параметры</h1>
                <Table>
                  <tbody>
                    <tr>
                      <th className="text-uppercase font-weight-normal pl-0">
                        1 Параметр
                      </th>
                      <td className="text-muted">{product.city.name}</td>
                    </tr>
                    <tr>
                      <th className="text-uppercase font-weight-normal pl-0">
                        2 Параметр
                      </th>
                      <td className={"text-muted"}>
                        {product.metros.map((metro) => metro.name)}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-uppercase font-weight-normal pl-0">
                        3 Параметр
                      </th>
                      <td className={"text-muted"}>что-то</td>
                    </tr>
                    <tr>
                      <th className="text-uppercase font-weight-normal pl-0">
                        4 Параметр
                      </th>
                      <td className={"text-muted"}>что-то</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col dangerouslySetInnerHTML={{ __html: product.opisanie }} />
            </Row>
          </TabPane>
          <TabPane tabId={2}>
            <Row>
              <Col>
                <h1 className="detail-tab-heading main">Стоимость</h1>
                <Table>
                  <tbody>
                    <tr>
                      <th className="text-uppercase font-weight-normal pl-0">
                        1 ЧАС
                      </th>
                      <td className="text-muted">{product.price} руб.</td>
                    </tr>
                    <tr>
                      <th className="text-uppercase font-weight-normal pl-0">
                        1 ЧАС +
                      </th>
                      <td className="text-muted">{product.price} руб.</td>
                    </tr>
                    <tr>
                      <th className="text-uppercase font-weight-normal pl-0">
                        Полная работа
                      </th>
                      <td className="text-muted">{product.price} руб.</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId={3}>
            <Row className="mb-5">
              <Col lg="10" xl="9">
                <Col>
                  <h1 className="detail-tab-heading main">Мнения</h1>
                </Col>
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
          <TabPane tabId={4}>
            <Col className="pb-4">
              <h1 className="detail-tab-heading main">Местоположение</h1>
              <Table>
                <tbody>
                  <tr>
                    <th className="text-uppercase font-weight-normal pl-0">
                      Город
                    </th>
                    <td className="text-muted">{product.city.name}</td>
                  </tr>
                  <tr>
                    <th className="text-uppercase font-weight-normal pl-0">
                      Метро
                    </th>
                    <td className={"text-muted"}>
                      {product.metros.map((metro) => metro.name)}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <YMaps
              query={{
                apikey: "a071233a-e16e-42b6-9971-43c85214e736",
                load: "package.full",
              }}
            >
              <Map
                modules={["geolocation", "geocode"]}
                width="100%"
                onLoad={(ymaps) => {
                  mapsRef.current = ymaps;
                  setNewLocation();
                }}
                state={
                  coords
                    ? {
                        center: coords,
                      }
                    : undefined
                }
                defaultState={{
                  center: [55.75, 37.57],
                  zoom: 12,
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
