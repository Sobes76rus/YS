import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import { useState } from "react";
import Link from "next/link";

export default function DropDownRight(props) {
  const { service, toggle } = props;
  const [btnDropright, setBtnDropright] = useState(false);
  const dropdownRightToggle = () => {
    setBtnDropright((prevState) => !prevState)
    
  }
  return (
    <Dropdown {...props} isOpen={btnDropright} toggle={dropdownRightToggle}>
      <DropdownToggle
        caret
        color="disabled"
        className="w-100 btn-toggle-purple m-0 rounded-0"
      >
        {service.group_name}
      </DropdownToggle>
      <DropdownMenu>
        {service.uslugis.map((subService) => (
          <Link as={`/${subService.tag}/`} href={"/[categorie]"} key={subService.id}  >
            <DropdownItem onClick={toggle} className="w-100 btn-toggle-purple m-0 rounded-0" >
              {subService.name}
            </DropdownItem>
          </Link>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
