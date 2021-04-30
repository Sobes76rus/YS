import PriceSlider from "./PriceSlider";
import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { Col, Row, ListGroupItem, ListGroup, CustomInput } from "reactstrap";
import Router, { useRouter } from "next/router";
import getConfig from "next/config";
import _ from "lodash";
import FilterContext from "../contexts/FilterContext";

const { publicRuntimeConfig } = getConfig();

function getCardsUrl(query) {
  const url = new URL(`${publicRuntimeConfig.API_URL}/card-lookbooks`);

  const cityId = query["city.name"];

  if (cityId) {
    url.searchParams.append("city.name", cityId);
  }

  return url.toString();
}

const ShopFilter = ({ services, cities, cards: a, metros }) => {
  const [filterInputs, setFilterInputs] = useState({ services: "services" });
  const { query, push, pathname } = useRouter();
  const filteredCards = query["city.name"];
  const { cards, setCards } = useContext(FilterContext);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const url = getCardsUrl(query);
    setLoading(true);

    fetch(url)
      .then((r) => r.json())
      .then((a) => {
        setCards(a);
        setLoading(false);
      });
  }, [filteredCards]);

  const citiesNameFilter = query["city.name"];

  const onInputChange = (e) => {
    setFilterInputs({
      ...filterInputs,
      [e.target.name]: e.target.checked,
    });

    const debouncedHandleChange = _.debounce((evt) => {
      changeFilter({
        price: evt.target.value,
      });
    }, 300);
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
          className="mb-3"
          defaultValue={
            citiesNameFilter
              ? cities.filter(({ name }) => citiesNameFilter.includes(name))
              : []
          }
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          options={cities}
          instanceId="cities"
          isMulti
          placeholder="Filter by cities"
          onChange={(values) => {
            changeFilter({
              "city.name": values.map(({ name }) => name),
            });
          }}
        />
      </Col>

      <Col>
        {services.map((service, index) => {
          return (
            <>
              <Col className="filter_col">
                <h3 className="sidebar-heading main" key={index}>
                  {service.group_name}
                </h3>
                {service.uslugis.map((usluga) => (
                  <CustomInput
                    type="checkbox"
                    key={usluga.id}
                    id={usluga.id}
                    name={usluga.name}
                    label={<>{usluga.name}</>}
                    checked={filterInputs[usluga.name]}
                    onChange={onInputChange}
                  />
                ))}
              </Col>
            </>
          );
        })}
      </Col>
    </Row>
  );
};

export default ShopFilter;
