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
        {service.name}
      </DropdownToggle>
      <DropdownMenu>
        {service.ceo_pages.map((subGroup) => (
          <Link
            as={`/fast-filters/${subGroup.tag}/`}
            href={"/fast-filters/[id]"}
            key={subGroup.id}
          >
            <a className="text-decoration-none">
              <DropdownItem
                onClick={onToggle}
                className="w-100 btn-toggle-purple dark m-0 rounded-0"
              >
                {subGroup.h1 ? subGroup.h1 : subGroup.Title}
              </DropdownItem>
            </a>
          </Link>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
