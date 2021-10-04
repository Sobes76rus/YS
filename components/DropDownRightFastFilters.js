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
  const { page, toggle } = props;

  const onToggle = function () {
    toggle();
  };
  const [btnDropright, setBtnDropright] = useState(false);
  const dropdownRightToggle = () => {
    setBtnDropright((prevState) => !prevState);
  };

  return (
    <Dropdown {...props} isOpen={btnDropright} toggle={dropdownRightToggle}>
      <Link
        as={`/fast-filters/${page.tag}/`}
        href={"/fast-filters/[id]"}
        key={page.id}
      >
        <a className="text-decoration-none">
          <DropdownItem
            color="disabled"
            className="w-100 btn-toggle-purple m-0 rounded-0 text-left top-50"
          >
            {page.Title}
          </DropdownItem>
        </a>
      </Link>
    </Dropdown>
  );
}
