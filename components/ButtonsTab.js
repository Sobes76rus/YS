import {
  Button,
  ButtonGroup,
  Collapse,
  CardBody,
  Card,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Link from "next/link";
import { useState } from "react";

export default function ButtonsTab({ product, isPreOpen }) {
  const [isOpen, setIsOpen] = useState(isPreOpen);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <Nav pills>
        <NavItem>
          <NavLink
            className={`detail-nav-link ${isOpen && "active"}`}
            color="disabled"
            onClick={toggle}
          >
            Услуги
            <i
              className={`ml-2 ${
                !isOpen ? "fa fa-arrow-down" : "fa fa-arrow-up"
              }  `}
            />
          </NavLink>
        </NavItem>
        <Collapse isOpen={isOpen}>
          <Card className=" border-0">
            <CardBody>
              <ButtonGroup className="flex-wrap">
                {product.uslugis.map((service, index) => (
                  <Link
                    as={`/${service.tag}/`}
                    href={"/[categorie]"}
                    key={service.id}
                  >
                    <Button
                      outline
                      color="secondary"
                      className="mr-3 text-capitalize border-0"
                      key={index}
                    >
                      {service.name}
                    </Button>
                  </Link>
                ))}
              </ButtonGroup>
            </CardBody>
          </Card>
        </Collapse>
      </Nav>
    </>
  );
}
