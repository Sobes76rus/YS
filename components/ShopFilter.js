import { useEffect, useRef, useState } from "react";
import "rc-slider/assets/index.css";
import Nouislider from "nouislider-react";
import Select from "react-select";
import Services from "../components/Services";
import {
  Col,
  Row,
  Form,
  ListGroupItem,
  ListGroup,
  CustomInput,
  Input,
  Collapse,
  Button,
} from "reactstrap";
import Router, { useRouter } from "next/router";
import _ from "lodash";

const ShopFilter = ({
  services,
  cities,
  price,
  dickSize,
  breastSize,
  cards: a,
}) => {
  const { query, push, pathname } = useRouter();
  const minPrice = Math.min(...price[0]);
  const maxPrice = Math.max(...price[0]);
  const minDick = Math.min(...dickSize[0]);
  const maxDick = Math.max(...dickSize[0]);
  const minBreast = Math.min(...breastSize[0]);
  const maxBreast = Math.max(...breastSize[0]);
  //

  const priceMin = query.priceMin ? query.priceMin : minPrice;
  const priceMax = query.priceMax ? query.priceMax : maxPrice;
  const dickMin = query.dickMin ? query.dickMin : minDick;
  const dickMax = query.dickMax ? query.dickMax : maxDick;
  const breastMin = query.breastMin ? query.breastMin : minBreast;
  const breastMax = query.breastMax ? query.breastMax : maxBreast;

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
    const queryParams = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (typeof value === "string" || typeof value === "number") {
        queryParams.append(key, value);
      }
      if (Array.isArray(value)) {
        value.forEach((v) => {
          queryParams.append(key, v);
        });
      }
    });

    queryParams.sort();

    const nextUrl = {
      pathname,
      query: queryParams.toString(),
    };

    await Router.push(nextUrl, nextUrl, { shallow: true, scroll: false });
  }

  function onUpdatePrice(render, handle, value, un, percent) {
    const newQuery = { ...queryRef.current };

    if (value[0].toFixed(0) > minPrice) {
      newQuery.priceMin = value[0].toFixed(0);
    } else {
      delete newQuery.priceMin;
    }

    if (value[1].toFixed(0) < maxPrice) {
      newQuery.priceMax = value[1].toFixed(0);
    } else {
      delete newQuery.priceMax;
    }

    changeFilter(newQuery);
  }
  function onUpdateDickSlider(render, handle, value, un, percent) {
    const newQuery = { ...queryRef.current };

    if (value[0].toFixed(0) > minDick) {
      newQuery.dickMin = value[0].toFixed(0);
    } else {
      delete newQuery.dickMin;
    }

    if (value[1].toFixed(0) < maxDick) {
      newQuery.dickMax = value[1].toFixed(0);
    } else {
      delete newQuery.dickMax;
    }

    changeFilter(newQuery);
  }
  function onUpdateBreastSlider(render, handle, value, un, percent) {
    const newQuery = { ...queryRef.current };

    if (value[0].toFixed(0) > minBreast) {
      newQuery.breastMin = value[0].toFixed(0);
    } else {
      delete newQuery.breastMin;
    }

    if (value[1].toFixed(0) < maxBreast) {
      newQuery.breastMax = value[1].toFixed(0);
    } else {
      delete newQuery.breastMax;
    }

    changeFilter(newQuery);
  }

  const debounceSliderMax = (evt, queryParam, income) => {
    const newQuery = { ...queryRef.current };
    if (parseFloat(evt.target.value).toFixed(0) < income) {
      newQuery[queryParam] = evt.target.value;
    } else {
      delete newQuery[queryParam];
    }
    changeFilter(newQuery);
  };

  const debounceSliderMin = (evt, queryParam, income) => {
    const newQuery = { ...queryRef.current };
    if (parseFloat(evt.target.value).toFixed(0) > income) {
      newQuery[queryParam] = evt.target.value;
    } else {
      delete newQuery[queryParam];
    }
    changeFilter(newQuery);
  };

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
      ...queryRef.current,
      ["usligis.name"]: u,
    });
  };

  return (
    <Row xl="3" lg="3" xs="1">
      <Col className="mb-3">
        <ListGroup>
          <ListGroupItem className="border-0 p-0 mb-3">
            <h3 className="sidebar-heading main">Цена за час</h3>
            <Nouislider
              className="w-100"
              key={2}
              range={{ min: minPrice, max: maxPrice }}
              start={[priceMin, priceMax]}
              onSlide={onUpdatePrice}
              connect
              step={500}
            />
            <Form className="nouislider-values">
              <div className="min d-flex align-items-center">
                <p className="m-0 pr-2">от</p>
                <div className="mr-2">
                  <Input
                    type="number"
                    placeholder={priceMin}
                    onChange={_.debounce((e) =>
                      debounceSliderMin(e, "priceMin", minPrice)
                    )}
                  />
                </div>{" "}
              </div>
              <div className="max d-flex align-items-center">
                <p className="m-0 pr-2">до</p>
                <Input
                  type="number"
                  placeholder={priceMax}
                  onChange={_.debounce((e) =>
                    debounceSliderMax(e, "priceMax", maxPrice)
                  )}
                />
              </div>
            </Form>
          </ListGroupItem>
          <ListGroupItem className="border-0 p-0 mb-3">
            <h3 className="sidebar-heading main">Длина члена</h3>
            <Nouislider
              className="w-100"
              key={2}
              range={{ min: minDick, max: maxDick }}
              start={[dickMin, dickMax]}
              onSlide={onUpdateDickSlider}
              connect
              step={5}
            />
            <Form className="nouislider-values">
              <div className="min d-flex align-items-center">
                <p className="m-0 pr-2">от</p>
                <div className="mr-2">
                  <Input
                    type="number"
                    placeholder={dickMin}
                    onChange={_.debounce((e) =>
                      debounceSliderMin(e, "dickMin", minDick)
                    )}
                  />
                </div>{" "}
              </div>
              <div className="max d-flex align-items-center">
                <p className="m-0 pr-2">до</p>
                <Input
                  type="number"
                  placeholder={dickMax}
                  onChange={_.debounce((e) =>
                    debounceSliderMax(e, "dickMax", maxDick)
                  )}
                />
              </div>
            </Form>
          </ListGroupItem>
          <ListGroupItem className="border-0 p-0">
            <h3 className="sidebar-heading main">Размер груди</h3>
            <Nouislider
              className="w-100"
              key={2}
              range={{ min: minBreast, max: maxBreast }}
              start={[breastMin, breastMax]}
              onSlide={onUpdateBreastSlider}
              connect
              step={1}
            />
            <Form className="nouislider-values">
              <div className="min d-flex align-items-center">
                <p className="m-0 pr-2">от</p>
                <div className="mr-2">
                  <Input
                    type="number"
                    placeholder={breastMin}
                    onChange={_.debounce((e) =>
                      debounceSliderMin(e, "breastMin", minBreast)
                    )}
                  />
                </div>{" "}
              </div>
              <div className="max d-flex align-items-center">
                <p className="m-0 pr-2">до</p>
                <Input
                  type="number"
                  placeholder={breastMax}
                  onChange={_.debounce((e) =>
                    debounceSliderMax(e, "breastMax", maxBreast)
                  )}
                />
              </div>
            </Form>
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col className="mb-3">
        <h3 className="sidebar-heading main">Местоположение</h3>

        <Select
          className="mb-3 link-purple"
          value={finalCities}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          options={cities}
          instanceId="cities"
          isMulti
          placeholder={"Город"}
          onChange={(values) => {
            if (values.length === 0 && metrosNameFilter) {
              const query = { ...queryRef.current };
              delete query["city.name"];
              delete query["metro.name"];
              changeFilter(query);
              return;
            }

            changeFilter({
              ...queryRef.current,
              "city.name": values.map(({ name }) => name),
            });
          }}
        />
        <Select
          className="mb-3"
          value={
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
              ...queryRef.current,
              "metro.name": values.map(({ name }) => name),
            });
          }}
        />
      </Col>

      <Col className="mb-3 d-flex flex-column">
        {services
          .sort((a, b) => a.Sort - b.Sort)
          .map((service, index) => (
            <Services
              service={service}
              usluginTagsFilter={usluginTagsFilter}
              debouncedHandleChange={debouncedHandleChange}
              key={index}
            />
          ))}

        <Button
          onClick={() => changeFilter(queryRef)}
          className="btn-reset py-3"
        >
          Сбросить
        </Button>
      </Col>
    </Row>
  );
};

export default ShopFilter;
