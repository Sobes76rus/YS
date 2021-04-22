import PriceSlider from "./PriceSlider";
import { useState } from "react";

import { Col, Row, ListGroupItem, ListGroup, CustomInput } from "reactstrap";

const ShopFilter = () => {
  const [filterInputs, setFilterInputs] = useState({});
  const onInputChange = (e) => {
    setFilterInputs({
      ...filterInputs,
      [e.target.name]: e.target.checked,
    });

    // setFilterInputs({
    //   ...filterInputs,
    //   [e.target.name]: e.target.checked,
    // });
  };

  const checkboxes = filters[2].checkboxes;
  console.log(filterInputs);
  return (
    <Row xs="4">
      <Col>
        <ListGroup>
          <h3 className="sidebar-heading main">Цена</h3>
          <ListGroupItem>
            <h6 className="sidebar-heading d-none d-lg-block">За 1 час</h6>
            <PriceSlider />
          </ListGroupItem>
          <ListGroupItem>
            <h6 className="sidebar-heading d-none d-lg-block">За 2 часа</h6>
            <PriceSlider />
          </ListGroupItem>
          <ListGroupItem>
            <h6 className="sidebar-heading d-none d-lg-block">За ночь</h6>
            <PriceSlider />
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col>
        <h3 className="sidebar-heading main">Секс</h3>

        {checkboxes.map((checkbox) => (
          <CustomInput
            type="checkbox"
            id={checkbox.id}
            name={checkbox.name}
            label={
              <>
                {checkbox.label} <small>({checkbox.count})</small>
              </>
            }
            checked={filterInputs[checkbox.name]}
            onChange={onInputChange}
          />
        ))}
      </Col>
      <Col>
        <h3 className="sidebar-heading main">Массаж</h3>

        {checkboxes.map((checkbox) => (
          <CustomInput
            type="checkbox"
            id={checkbox.id}
            name={checkbox.name}
            label={
              <>
                {checkbox.label} <small>({checkbox.count})</small>
              </>
            }
            checked={filterInputs[checkbox.name]}
            onChange={onInputChange}
          />
        ))}
      </Col>
      <Col>
        <h3 className="sidebar-heading main">Разное</h3>

        {checkboxes.map((checkbox) => (
          <CustomInput
            type="checkbox"
            id={checkbox.id}
            name={checkbox.name}
            label={
              <>
                {checkbox.label} <small>({checkbox.count})</small>
              </>
            }
            checked={filterInputs[checkbox.name]}
            onChange={onInputChange}
          />
        ))}
      </Col>
    </Row>
  );
};

export default ShopFilter;

const filters = [
  {
    name: "Product Categories",
    items: [
      {
        name: "Jackets",
        count: "120",
        items: [
          {
            name: "Lorem ipsum",
            link: "/",
          },
          {
            name: "Dolor",
            link: "/",
          },
          {
            name: "Sit amet",
            link: "#",
          },
          {
            name: "Donec vitae",
            link: "#",
          },
        ],
      },
      {
        name: "Jeans & chinos",
        count: "55",
        active: true,
        items: [
          {
            name: "Lorem ipsum",
            link: "filter-albums",
          },
          {
            name: "Dolor",
            link: "filter-albums",
          },
          {
            name: "Sit amet",
            link: "filter-albums",
          },
          {
            name: "Donec vitae",
            link: "filter-albums",
          },
        ],
      },
      {
        name: "Accessories",
        count: "80",
        items: [
          {
            name: "Sit amet",
            link: "#",
          },
          {
            name: "Donec vitae",
            link: "#",
          },
          {
            name: "Lorem ipsum",
            link: "#",
          },
          {
            name: "Dolor",
            link: "#",
          },
        ],
      },
    ],
  },
  {
    name: "Filter by price",
    subtitle: "Price",
    component: <PriceSlider />,
  },
  {
    name: "Filter by brand",
    subtitle: "Brands",
    checkboxes: [
      {
        name: "Calvin Klein",
        id: "brand0",
        count: "18",
        label: "Calvin Klein",
      },
      {
        name: "Levi Strauss",
        id: "brand1",
        count: "30",
        label: "Levi Strauss",
      },
      {
        name: "Hugo Boss",
        id: "brand2",
        count: "120",
        label: "Hugo Boss",
      },
      {
        name: "Tomi Hilfiger",
        id: "brand3",
        count: "70",
        label: "Tomi Hilfiger",
      },
      {
        name: "Tom Ford",
        id: "brand4",
        count: "110",
        label: "Tom Ford",
      },
    ],
  },
  {
    name: "Filter by size",
    subtitle: "Size",
    radios: [
      {
        name: "size",
        id: "size0",
        label: "Small",
      },
      {
        name: "size",
        id: "size1",
        label: "Medium",
      },
      {
        name: "size",
        id: "size2",
        label: "Large",
      },
      {
        name: "size",
        id: "size3",
        label: "X-large",
      },
    ],
  },
  {
    name: "Filter by colour",
    subtitle: "Colour",
    colours: [
      {
        name: "colour",
        id: "colour_sidebar_Blue",
        hex: "#668cb9",
      },
      {
        name: "colour",
        id: "colour_sidebar_White",
        hex: "#fff",
      },
      {
        name: "colour",
        id: "colour_sidebar_Violet",
        hex: "#8b6ea4",
      },
      {
        name: "colour",
        id: "colour_sidebar_Red",
        hex: "#dd6265",
      },
    ],
  },
];
