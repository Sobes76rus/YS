import PriceSlider from "./PriceSlider";
import { useState, useEffect, useContext } from "react";
import "rc-slider/assets/index.css";
import { Range } from "rc-slider";
import Nouislider from "nouislider-react";
import Select from "react-select";
import {
  Col,
  Row,
  ListGroupItem,
  ListGroup,
  CustomInput,
  Input,
} from "reactstrap";
import Router, { useRouter } from "next/router";
import _ from "lodash";

const ShopFilter = ({ services, cities, price, cards: a }) => {
  const { query, push, pathname } = useRouter();
  const max = Math.max.apply(null, price[0]);
  const min = Math.min.apply(null, price[0]);
  const priceMin = query["priceMin.tag"];

  const citiesNameFilter = query["city.name"];
  const metrosNameFilter = query["metro.name"];
  const usluginTagsFilter =
    typeof query["usligis.tag"] === "string"
      ? [query["usligis.tag"]]
      : query["usligis.tag"];

  const finalCities = citiesNameFilter
    ? cities.filter(({ name }) => citiesNameFilter.includes(name))
    : [];
  const metros = finalCities.map((city) =>
    city.metros.map((cityMetro) => {
      return { ...cityMetro };
    })
  );

  async function changeFilter(filter) {
    const nextUrl = {
      pathname,
      query: {
        ...query,
        ...filter,
      },
    };

    await Router.push(nextUrl, nextUrl, { shallow: true });
  }

  const onUpdate = (render, handle, value, un, percent) => {
    changeFilter({
      "priceMin.tag": value[0].toFixed(0),
      "priceMax.tag": value[1].toFixed(0),
    });
  };

  const debouncedHandleChange = (evt) => {
    const u = [];
    if (evt.target.checked) {
      u.push(evt.target.name);
    }

    if (typeof query["usligis.tag"] === "string") {
      u.push(query["usligis.tag"]);

      if (!evt.target.checked) {
        u.pop(evt.target.name);
      }
    }
    changeFilter({
      ["usligis.tag"]: u,
    });
  };

  return (
    <Row xs="3">
      <Col>
        <ListGroup>
          <h3 className="sidebar-heading main">Цена</h3>
          <ListGroupItem className="border-0">
            <h6 className="sidebar-heading d-none d-lg-block">Первая</h6>
            <Range
              allowCross={false}
              ariaLabelledByGroupForHandles={[min, max]}
              draggableTrack
            />
            {/* <Nouislider
              key={2}
              range={{ min: min, max: max }}
              start={[min, max]}
              onUpdate={onUpdate}
              connect
            /> */}
            <div className="nouislider-values">
              <div className="min d-flex align-items-center">
                <p className="m-0 pr-2">от</p>
                <div className="mr-2">
                  <Input placeholder={min} />
                </div>
              </div>
              <div className="max d-flex align-items-center">
                <p className="m-0 pr-2">до</p>
                <Input placeholder={max} />
              </div>
            </div>
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
                  checked={
                    usluginTagsFilter && usluginTagsFilter.includes(usluga.name)
                  }
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
