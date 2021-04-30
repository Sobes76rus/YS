import PriceSlider from "./PriceSlider";
import { useState } from "react";
import Select from "react-select";
import { Col, Row, ListGroupItem, ListGroup, CustomInput } from "reactstrap";

const ShopFilter = ({ services, cities, metros }) => {
  const [filterInputs, setFilterInputs] = useState({ services });
  const randomThree = (a, n) =>
    a.sort(() => Math.random() - Math.random()).slice(0, n);

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
            key={city.id}
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
