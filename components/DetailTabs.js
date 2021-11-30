import React, { useEffect, useRef, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { useRouter } from "next/router";
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
import DisqusComments from "../components/DisqusComments";

import classnames from "classnames";

const DetailTabs = ({ product }) => {
  const { query } = useRouter();

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
    <section className="mt-0 h-25">
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
        <TabContent activeTab={activeTab} className="pt-4">
          <TabPane tabId={1}>
            <Row xs="1" xl="2">
              <Col className="pb-4">
                <Table>
                  <tbody>
                    <tr>
                      <th className="text-uppercase font-weight-normal pl-0">
                        Цвет волос
                      </th>
                      <td className={"text-muted"}>
                        {product.hair
                          ? (() => {
                              switch (product.hair) {
                                case "blonde":
                                  return "Блондинка";
                                case "brunette":
                                  return "Брюнетка";
                                case "red":
                                  return "Рыжая";
                                case "brown":
                                  return "Шатенка";
                                default:
                                  return "";
                              }
                            })()
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-uppercase font-weight-normal pl-0">
                        Возраст
                      </th>
                      <td className="text-muted">{product.age}</td>
                    </tr>

                    <tr>
                      <th className="text-uppercase font-weight-normal pl-0">
                        Грудь
                      </th>
                      <td className={"text-muted"}>{product.breast_size}</td>
                    </tr>
                    <tr>
                      <th className="text-uppercase font-weight-normal pl-0">
                        Длина члена
                      </th>
                      <td className={"text-muted"}>{product.dick_size}</td>
                    </tr>
                    <tr>
                      <th className="text-uppercase font-weight-normal pl-0">
                        Диаметр члена
                      </th>
                      <td className={"text-muted"}>
                        {product.dick_round ? product.dick_round : ""}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-uppercase font-weight-normal pl-0">
                        Рост
                      </th>
                      <td className={"text-muted"}>{product.height}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col
                className="text-muted"
                dangerouslySetInnerHTML={{ __html: product.opisanie }}
              />
            </Row>
          </TabPane>
          <TabPane tabId={2}>
            <Row>
              <Col>
                <Table>
                  <tbody>
                    <tr>
                      <th className="text-uppercase font-weight-normal pl-0">
                        1 ЧАС
                      </th>
                      <td className="text-muted">
                        {product.price ? product.price : ""} &#8381;
                      </td>
                    </tr>
                    <tr>
                      <th className="text-uppercase font-weight-normal pl-0">
                        2 ЧАСА
                      </th>
                      <td className="text-muted">
                        {product.price_2_hour ? product.price_2_hour : ""}{" "}
                        &#8381;
                      </td>
                    </tr>
                    <tr>
                      <th className="text-uppercase font-weight-normal pl-0">
                        НОЧЬ
                      </th>
                      <td className="text-muted">
                        {product.price_night ? product.price_night : ""} &#8381;
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId={3}>
            <Row className="mb-5">
              <Col lg="10" xl="9" className="h-100">
                <DisqusComments product={product} query={query} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId={4}>
            <Col className="pb-4">
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
