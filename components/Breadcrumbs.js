import Link from "next/link";

import { Breadcrumb, BreadcrumbItem } from "reactstrap";

const Breadcrumbs = (props) => {
  const links = props.links;

  return (
    <Breadcrumb
      listClassName={
        props.className
          ? props.className
          : "justify-content-center no-border mb-0"
      }
    >
      {links.map((item, index) => (
        <BreadcrumbItem key={index} active={item.active ? true : null}>
          {item.link ? (
            <Link href={item.link}>
              <a className={item.linkClass ? item.linkClass : ""}>
                {item.name}
              </a>
            </Link>
          ) : (
            <span className={props.spanClass ? props.spanClass : ""}>
              {item.name}
            </span>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
