import PriceSlider from "./PriceSlider";
import { useState } from "react";
import Select from "react-select";
import { Col, Row, ListGroupItem, ListGroup, CustomInput } from "reactstrap";

const ShopFilter = ({ services, cities, metros }) => {
  const [filterInputs, setFilterInputs] = useState({ services });
  const randomThree = (a, n) =>
    a.sort(() => Math.random() - Math.random()).slice(0, n);

  const randomServices3 = randomThree(services, 3);
  const randomServices5 = randomThree(services, 5);

  const onInputChange = (e) => {
    setFilterInputs({
      ...filterInputs,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <Row xs="3">
      <Col>
        <ListGroup>
          <h3 className="sidebar-heading main">Цена</h3>
          <ListGroupItem>
            <h6 className="sidebar-heading d-none d-lg-block">Первая</h6>
            <PriceSlider />
          </ListGroupItem>
          <ListGroupItem>
            <h6 className="sidebar-heading d-none d-lg-block">Вторая</h6>
            <PriceSlider />
          </ListGroupItem>
          <ListGroupItem>
            <h6 className="sidebar-heading d-none d-lg-block">
              Минимальный заказ
            </h6>
            <PriceSlider />
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col>
        <h3 className="sidebar-heading main">Местоположение</h3>
        {cities.map((city) => (
          <Select
            className="mb-3"
            defaultValue={city}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            options={city}
            instanceId="artists"
            isMulti
            placeholder="Filter by artists"
          />
        ))}
      </Col>

      <Col>
        <Col className="filter_col">
          <h3 className="sidebar-heading main">Услуги</h3>

          {randomServices3.map((service) => (
            <CustomInput
              type="checkbox"
              key={service.id}
              id={service.id}
              name={service.name}
              label={<>{service.name}</>}
              checked={filterInputs[service.name]}
              onChange={onInputChange}
            />
          ))}
        </Col>
        <Col className="filter_col">
          <h3 className="sidebar-heading main">Услуги</h3>
          {randomServices3.map((service) => (
            <CustomInput
              type="checkbox"
              key={service.id}
              id={service.id}
              name={service.name}
              label={<>{service.name}</>}
              checked={filterInputs[service.name]}
              onChange={onInputChange}
            />
          ))}
        </Col>
        <Col className="filter_col">
          <h3 className="sidebar-heading main">Услуги</h3>
          {randomServices5.map((service) => (
            <CustomInput
              type="checkbox"
              key={service.id}
              id={service.id}
              name={service.name}
              label={service.name}
              checked={filterInputs[service.name]}
              onChange={onInputChange}
            />
          ))}
        </Col>
      </Col>
    </Row>
  );
};

export default ShopFilter;

{
  /* <Select
              defaultValue={
                artistNameFilter
                  ? artists.filter(({ artist_name }) =>
                      artistNameFilter.includes(artist_name)
                    )
                  : []
              }
              getOptionLabel={(option) => option.artist_name}
              getOptionValue={(option) => option.id}
              options={artists}
              instanceId="artists"
              isMulti
              placeholder="Filter by artists"
              onChange={(values) => {
                changeFilter({
                  "artists.artist_name": values.map(
                    ({ artist_name }) => artist_name
                  ),
                });
              }}
            /> */
}
