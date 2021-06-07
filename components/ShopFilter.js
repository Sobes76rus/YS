import PriceSlider from "./PriceSlider";
import { useState, useEffect, useContext, useRef } from "react";
import "rc-slider/assets/index.css";
import { Range } from "rc-slider";
import Nouislider from "nouislider-react";
import Select from "react-select";
import {
  Button,
  Col,
  Row,
  Form,
  ListGroupItem,
  ListGroup,
  CustomInput,
  Input,
} from "reactstrap";
import Router, { useRouter } from "next/router";
import _ from "lodash";

const ShopFilter = ({ services, cities, price, cards: a }) => {
  const { query, push, pathname } = useRouter();
  const min = Math.min(...price[0]);
  const max = Math.max(...price[0]);
  const priceMin = query.priceMin ? query.priceMin : min;
  const priceMax = query.priceMax ? query.priceMax : max;

  const citiesNameFilter = query["city.name"];
  const metrosNameFilter = query["metro.name"];
  const usluginTagsFilter =
    typeof query["usligis.name"] === "string"
      ? [query["usligis.name"]]
      : query["usligis.name"] || [];

  const finalCities = citiesNameFilter
    ? cities.filter(({ name }) => citiesNameFilter.includes(name))
    : [];
  const metros = finalCities.map((city) =>
    city.metros.map((cityMetro) => {
      return { ...cityMetro };
    })
  );

  const queryRef = useRef(query);

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  async function changeFilter(filter) {
    const nextUrl = {
      pathname,
      query: {
        ...queryRef.current,
        ...filter,
      },
    };

    await Router.push(nextUrl, nextUrl, { shallow: true });
  }

  function onUpdate(render, handle, value, un, percent) {
    console.log("render", query);
    changeFilter({
      priceMin: value[0].toFixed(0),
      priceMax: value[1].toFixed(0),
    });
  }

  const debouncedHandleChange = (evt) => {
    const u = [];

    if (typeof query["usligis.name"] === "string") {
      u.push(query["usligis.name"]);
    }
    if (Array.isArray(query["usligis.name"])) {
      u.push(...query["usligis.name"]);
    }

    if (evt.target.checked) {
      u.push(evt.target.name);
    } else {
      const index = u.findIndex((v) => v === evt.target.name);

      u.splice(index, 1);
    }

    changeFilter({
      ["usligis.name"]: u,
    });
  };

  const onInput = (e) => {
    console.log(e);
  };

  return (
    <Row xs="3">
      <Col>
        <ListGroup>
          <ListGroupItem className="border-0 p-0">
            <h3 className="sidebar-heading main">Цена за час</h3>
            <Nouislider
              className="w-100"
              key={2}
              range={{ min, max }}
              start={[min, max]}
              onSlide={onUpdate}
              connect
            />
            <Form className="nouislider-values" onSubmit={onInput}>
              <div className="min d-flex align-items-center">
                <p className="m-0 pr-2">от</p>
                <div className="mr-2">
                  <Input placeholder={priceMin} />
                </div>{" "}
              </div>
              <div className="max d-flex align-items-center">
                <p className="m-0 pr-2">до</p>
                <Input placeholder={priceMax} />
              </div>
            </Form>
          </ListGroupItem>
          {/* <ListGroupItem className="border-0">
            <h6 className="sidebar-heading d-none d-lg-block">Вторая</h6>
            <PriceSlider />
          </ListGroupItem>
          <ListGroupItem className="border-0">
            <h6 className="sidebar-heading d-none d-lg-block">
              Минимальный заказ
            </h6>
            <PriceSlider />
          </ListGroupItem> */}
        </ListGroup>
      </Col>
      <Col>
        <h3 className="sidebar-heading main">Местоположение</h3>

        <Select
          className="mb-3 link-purple"
          defaultValue={finalCities}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          options={cities}
          instanceId="cities"
          isMulti
          placeholder={"Город"}
          onChange={(values) => {
            if (values.length === 0 && metrosNameFilter) {
              changeFilter({
                "city.name": [],
                "metro.name": [],
              });
              return;
            }

            changeFilter({
              "city.name": values.map(({ name }) => name),
            });
          }}
        />
        <Select
          className="mb-3"
          defaultValue={
            finalCities.length !== 0 && metrosNameFilter
              ? metros[0].filter(({ name }) => metrosNameFilter.includes(name))
              : []
          }
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          options={metros[0]}
          instanceId="metros"
          isMulti
          placeholder={finalCities.length > 0 ? "Метро" : "Выберете город"}
          isDisabled={finalCities.length === 0 && true}
          onChange={(values) => {
            changeFilter({
              "metro.name": values.map(({ name }) => name),
            });
          }}
        />
      </Col>

      <Col>
        {services.map((service, index) => (
          <Col className="filter_col" key={index}>
            <h3 className="sidebar-heading main">{service.group_name}</h3>
            {service.uslugis.map((usluga) => {
              return (
                <CustomInput
                  type="checkbox"
                  className="text-secondary"
                  key={usluga.id}
                  id={usluga.id}
                  name={usluga.name}
                  label={usluga.name}
                  checked={usluginTagsFilter.includes(usluga.name)}
                  onChange={debouncedHandleChange}
                />
              );
            })}
          </Col>
        ))}
      </Col>
    </Row>
  );
};

export default ShopFilter;
