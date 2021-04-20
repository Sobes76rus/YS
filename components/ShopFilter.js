import PriceSlider from "./PriceSlider";
import { useState } from "react";

import {
  Col,
  Collapse,
  Nav,
  Form,
  Label,
  FormGroup,
  CustomInput,
  Input,
  Row,
  ListGroupItem,
  ListGroup,
} from "reactstrap";
const ShopFilter = (props) => {
  // FILTERS OBJECT IS ON THE BOTTOM OF THE PAGE

  const [filterInputs, setFilterInputs] = useState({
    // Remove or customize on PRODUCTION - Some brands are preselected
    "clothes-brand": ["brand0", "brand1"],
    // Remove or customize on PRODUCTION - Some sizes are preselected
    size: ["size1"],
  });

  // Collapse state
  const [collapse, setCollapse] = useState({});
  const toggleCollapse = (name) => {
    setCollapse({ ...collapse, [name]: !collapse[name] });
  };

  // On input change func
  const onInputChange = (e) => {
    const value = e.target.id; // Input value
    const name = e.target.name; // Input name
    filterInputs[name] // If input group exists
      ? filterInputs[name].some((item) => item === value) // If item exists in array > remove
        ? setFilterInputs({
            ...filterInputs,
            [name]: filterInputs[name].filter((x) => x !== value),
          })
        : setFilterInputs({
            ...filterInputs,
            [name]: [...filterInputs[name], value],
          }) // If item doesn't exists in array > add it to input group
      : setFilterInputs({ ...filterInputs, [name]: [value] }); // If input group doesn't exists > create input group and add value
  };

  // On input radio change func
  const onRadioChange = (e) => {
    const value = e.target.id; // Input value
    const name = e.target.name; // Input name

    // Set active radio input
    setFilterInputs({ ...filterInputs, [name]: value });
  };

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
        <Form className="mt-4 mt-lg-0" action="#">
          {filters.map((filter) => {
            <>
              <h6 className="sidebar-heading d-none d-lg-block">
                {filter.subtitle}
              </h6>

              {/* INPUT FORM */}
              <Form className="mt-4 mt-lg-0" action="filter-albums">
                <p>hello</p>
                {/* {filter.checkboxes && // IF CHECKBOXES
                  filter.checkboxes.map((
                    checkbox // LOOP THROUGH INPUTS
                  ) => (
                    <FormGroup className="mb-1" key={checkbox.id}>
                      <CustomInput
                        type="checkbox"
                        id={checkbox.id}
                        name={checkbox.name}
                        label={
                          <>
                            {checkbox.label} <small>({checkbox.count})</small>
                          </>
                        }
                        // CHECKED - CONTROLLED INPUT
                        checked={
                          filterInputs[checkbox.name]
                            ? filterInputs[checkbox.name].includes(checkbox.id)
                            : ""
                        }
                        onChange={(e) => onInputChange(e)}
                      />
                    </FormGroup>
                  ))} */}
              </Form>
            </>;
          })}
        </Form>
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
        name: "clothes-brand",
        id: "brand0",
        count: "18",
        label: "Calvin Klein",
      },
      {
        name: "clothes-brand",
        id: "brand1",
        count: "30",
        label: "Levi Strauss",
      },
      {
        name: "clothes-brand",
        id: "brand2",
        count: "120",
        label: "Hugo Boss",
      },
      {
        name: "clothes-brand",
        id: "brand3",
        count: "70",
        label: "Tomi Hilfiger",
      },
      {
        name: "clothes-brand",
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
