import { useEffect, useRef, useState } from "react";
import "rc-slider/assets/index.css";
import Nouislider from "nouislider-react";
import Select from "react-select";
import {
  Col,
  Row,
  Form,
  ListGroupItem,
  ListGroup,
  CustomInput,
  Input,
  Collapse,
  Dropdown,
} from "reactstrap";
import Router, { useRouter } from "next/router";
import _ from "lodash";

const ShopFilter = ({
  services,
  cities,
  price,
  slider_2,
  slider_3,
  cards: a,
}) => {
  const { query, push, pathname } = useRouter();
  const minPrice = Math.min(...price[0]);
  const maxPrice = Math.max(...price[0]);
  const minSlider2 = Math.min(...slider_2[0]);
  const maxSlider2 = Math.max(...slider_2[0]);
  const minSlider3 = Math.min(...slider_3[0]);
  const maxSlider3 = Math.max(...slider_3[0]);

  const priceMin = query.priceMin ? query.priceMin : minPrice;
  const priceMax = query.priceMax ? query.priceMax : maxPrice;
  const slider2Min = query.slider2Min ? query.slider2Min : minSlider2;
  const slider2Max = query.slider2Max ? query.slider2Max : maxSlider2;
  const slider3Min = query.slider3Min ? query.slider3Min : minSlider3;
  const slider3Max = query.slider3Max ? query.slider3Max : maxSlider3;

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

  function onUpdatePrice(render, handle, value, un, percent) {
    changeFilter({
      priceMin: value[0].toFixed(0),
      priceMax: value[1].toFixed(0),
    });
  }
  function onUpdateSlider2(render, handle, value, un, percent) {
    console.log(value);
    changeFilter({
      slider2Min: value[0].toFixed(0),
      slider2Max: value[1].toFixed(0),
    });
  }
  function onUpdateSlider3(render, handle, value, un, percent) {
    changeFilter({
      slider3Min: value[0].toFixed(0),
      slider3Max: value[1].toFixed(0),
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
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

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
              start={[minPrice, maxPrice]}
              onSlide={onUpdatePrice}
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
          <ListGroupItem className="border-0 p-0 mb-3">
            <h3 className="sidebar-heading main">Слайдер 2</h3>
            <Nouislider
              className="w-100"
              key={2}
              range={{ min: minSlider2, max: maxSlider2 }}
              start={[minSlider2, maxSlider2]}
              onSlide={onUpdateSlider2}
              connect
            />
            <Form className="nouislider-values" onSubmit={onInput}>
              <div className="min d-flex align-items-center">
                <p className="m-0 pr-2">от</p>
                <div className="mr-2">
                  <Input placeholder={slider2Min} />
                </div>{" "}
              </div>
              <div className="max d-flex align-items-center">
                <p className="m-0 pr-2">до</p>
                <Input placeholder={slider2Max} />
              </div>
            </Form>
          </ListGroupItem>
          <ListGroupItem className="border-0 p-0">
            <h3 className="sidebar-heading main">Слайдер 3</h3>
            <Nouislider
              className="w-100"
              key={2}
              range={{ min: minSlider3, max: maxSlider3 }}
              start={[minSlider3, maxSlider3]}
              onSlide={onUpdateSlider3}
              connect
            />
            <Form className="nouislider-values" onSubmit={onInput}>
              <div className="min d-flex align-items-center">
                <p className="m-0 pr-2">от</p>
                <div className="mr-2">
                  <Input placeholder={slider3Min} />
                </div>{" "}
              </div>
              <div className="max d-flex align-items-center">
                <p className="m-0 pr-2">до</p>
                <Input placeholder={slider3Max} />
              </div>
            </Form>
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col className="mb-3">
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

      <Col className="mb-3">
        {services.map((service, index) => (
          <Col className="filter_col" key={index}>
            <Dropdown
              color="primary"
              onClick={toggle}
              style={{ marginBottom: "1rem" }}
            >
              {service.group_name}
            </Dropdown>
            <Collapse isOpen={isOpen} className="sidebar-heading main">
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
            </Collapse>
          </Col>
        ))}
      </Col>
    </Row>
  );
};

export default ShopFilter;
