import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import { useState } from "react";
import Link from "next/link";

import useWindowSize from "../hooks/useWindowSize";

export default function DropDownRightServices(props) {
  const windowSize = useWindowSize();
  const isSlim = windowSize.width <= "992";
  const { service, toggle, onCollapse } = props;

  const onToggle = function () {
    toggle();
    onCollapse();
  };
  const [btnDropright, setBtnDropright] = useState(false);
  const dropdownRightToggle = () => {
    setBtnDropright((prevState) => !prevState);
  };
  return (
    <Dropdown {...props} isOpen={btnDropright} toggle={dropdownRightToggle}>
      <DropdownToggle
        caret
        color="disabled"
        className="w-100 btn-toggle-purple m-0 rounded-0 text-left top-50"
      >
        {service.group_name}
      </DropdownToggle>
      <DropdownMenu>
        {service.uslugis.map((subService) => (
          <Link
            as={`/categories/${subService.tag}/`}
            href={"/categories/[categorie]"}
            key={subService.id}
          >
            <a className="text-decoration-none">
              <DropdownItem
                onClick={onToggle}
                className="w-100 btn-toggle-purple m-0 rounded-0"
              >
                {subService.name}
              </DropdownItem>
            </a>
          </Link>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
