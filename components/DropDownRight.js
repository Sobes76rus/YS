import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import { useState } from "react";
import Link from "next/link";

import useWindowSize from "../hooks/useWindowSize";

export default function DropDownRight(props) {
  const windowSize = useWindowSize();
  const isSlim = windowSize.width <= "992";
  const { service, toggle } = props;

  const onToggle = function () {
    toggle();
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
      <DropdownMenu className={`${isSlim ? "mt-5 ml-7" : ""}`}>
        {service.uslugis.map((subService) => (
          <Link
            as={`/${subService.tag}/`}
            href={"/[categorie]"}
            key={subService.id}
          >
            <DropdownItem
              onClick={onToggle}
              className="w-100 btn-toggle-purple m-0 rounded-0"
            >
              {subService.name}
            </DropdownItem>
          </Link>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
