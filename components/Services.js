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
  import { useState } from "react";

const Services = ({service, usluginTagsFilter, debouncedHandleChange}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
return (
    
        <Col className="filter_col p-0" >
          <Button
            className="btn-filter-prpl w-100 border-0"
            color="disabled"
            onClick={toggle}
            style={{ marginBottom: "1rem" }}
          >
            {service.group_name}
    
            <svg className="svg-icon align-middle">
              {isOpen ? (
                <use xlinkHref="/icons/orion-svg-sprite.svg#arrow-up-10"></use>
              ) : (
                <use xlinkHref="/icons/orion-svg-sprite.svg#arrow-down-11"></use>
              )}
            </svg>
          </Button>
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
)
}

export default Services


