import PriceSlider from "./PriceSlider";
import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { Col, Row, ListGroupItem, ListGroup, CustomInput } from "reactstrap";
import Router, { useRouter } from "next/router";
import getConfig from "next/config";
import _ from "lodash";
import FilterContext from "../contexts/FilterContext";

const { publicRuntimeConfig } = getConfig();

const ShopFilter = ({ services, cities, cards: a }) => {
  // const [filterInputs, setFilterInputs] = useState({ services: "services" });
  const { query, push, pathname } = useRouter();
  const { cards, setCards } = useContext(FilterContext);
  const citiesNameFilter = query["city.name"];
  const metrosNameFilter = query["metro.name"];
  const usluginTagsFilter =
    typeof query["usligis.name"] === "string"
      ? [query["usligis.name"]]
      : query["usligis.name"];

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

  const debouncedHandleChange = (evt) => {
    const u = [];
    if (evt.target.checked) {
      u.push(evt.target.name);
    }
    if (typeof query["usligis.name"] === "string") {
      u.push(query["usligis.name"]);
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
            <PriceSlider />
          </ListGroupItem>
          <ListGroupItem className="border-0">
            <h6 className="sidebar-heading d-none d-lg-block">Вторая</h6>
            <PriceSlider />
          </ListGroupItem>
          <ListGroupItem className="border-0">
            <h6 className="sidebar-heading d-none d-lg-block">
              Минимальный заказ
            </h6>
            <PriceSlider />
          </ListGroupItem>
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
                    usluginTagsFilter && usluginTagsFilter.includes(usluga.tag)
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
