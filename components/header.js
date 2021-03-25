import React, { useState, useEffect, useRef } from "react";

import Link from "next/link";
import Router from "next/router";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
  Badge,
} from "reactstrap";

import UseWindowSize from "../hooks/UseWindowSize";
import useScrollPosition from "@react-hook/window-scroll";
import useSize from "@react-hook/size";

import ActiveLink from "./ActiveLink";
import CartOverviewDropdown from "./CartOverviewDropdown";

// import menu from "../data/menu.json";
// import userMenu from "../data/user-menu.json";

const Header = (props) => {

  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [parentName, setParentName] = useState(false);
  const [additionalNavClasses, setAdditionalNavClasses] = useState("");

  const size = UseWindowSize();
  const scrollY = useScrollPosition();

  const navbarRef = useRef(null);
  const topbarRef = useRef(null);
  const [topbarWidth, topbarHeight] = useSize(topbarRef);
  const [navbarWidth, navbarHeight] = useSize(navbarRef);

  const onFocus = () => setSearchFocus(!searchFocus);

  const toggleDropdown = (name) => {
    setDropdownOpen({ ...dropdownOpen, [name]: !dropdownOpen[name] });
  };

  const onLinkClick = (parent) => {
    size.width < 991 && setCollapsed(!collapsed);
    setParentName(parent);
  };

  const makeNavbarSticky = () => {
    if (props.nav.sticky !== false) {
      if (scrollY > topbarHeight) {
        setAdditionalNavClasses("fixed-top");
        navbarHeight > 0 &&
          props.headerAbsolute !== true &&
          props.setPaddingTop(navbarHeight);
      } else {
        setAdditionalNavClasses("");
        props.setPaddingTop(0);
      }
    } else {
      setAdditionalNavClasses("");
      props.setPaddingTop(0);
    }
  };

  useEffect(() => {
    makeNavbarSticky();
  }, [scrollY, topbarHeight]);

  // highlight not only active dropdown item, but also its parent, i.e. dropdown toggle
  const highlightDropdownParent = () => {
    menu.map((item) => {
      item.dropdown &&
        item.dropdown.map((dropdownLink) => {
          dropdownLink.link &&
            dropdownLink.link === Router.route &&
            setParentName(item.title);
          dropdownLink.links &&
            dropdownLink.links.map(
              (link) => link.link === Router.route && setParentName(item.title)
            );
        });
      item.megamenu &&
        item.megamenu.map((megamenuColumn) =>
          megamenuColumn.map((megamenuBlock) =>
            megamenuBlock.links.map((dropdownLink) => {
              if (dropdownLink.link === Router.route) {
                dropdownLink.parent
                  ? setParentName(dropdownLink.parent)
                  : setParentName(item.title);
              }
            })
          )
        );
      item.link === Router.route && setParentName(item.title);
    });
  };

  useEffect(highlightDropdownParent, []);

  return (
    <header
      className={`header ${props.headerClasses ? props.headerClasses : ""} ${
        props.headerAbsolute ? "header-absolute" : ""
      }`}
    >
      {/* Navbar*/}
      <div ref={navbarRef}>
        <Navbar
          color={
            props.nav.color
              ? Object.values(dropdownOpen).some((dropdown) => dropdown) ||
                collapsed
                ? "white"
                : props.nav.color
              : "white"
          }
          light={
            props.nav.light ||
            Object.values(dropdownOpen).some((dropdown) => dropdown) ||
            collapsed
          }
          dark={
            props.nav.dark &&
            !Object.values(dropdownOpen).some((dropdown) => dropdown) &&
            !collapsed
          }
          fixed={props.nav.fixed ? props.nav.fixed : ""}
          expand="lg"
          className={` ${
            props.nav.classes
              ? props.nav.classes
              : "navbar-sticky bg-fixed-white"
          } ${additionalNavClasses ? additionalNavClasses : ""}`}
        >
          <Container fluid>
            {/* Navbar Header  */}
            <Link href="/" passHref>
              <a className="py-1 navbar-brand">
                <img
                  src="https://cdn.worldvectorlogo.com/logos/next-js.svg"
                  className="navbar-brand"
                  width="50"
                  height="44"
                  alt="..."
                />
              </a>
            </Link>

            <NavbarToggler
              onClick={() => setCollapsed(!collapsed)}
              className="navbar-toggler-right"
            >
              <i className="fa fa-bars"></i>
            </NavbarToggler>
            {/* Navbar Collapse */}
            <Collapse isOpen={collapsed} navbar>
              <Nav navbar className="mx-auto">
                {menu &&
                  menu.map((item) =>
                    item.dropdown || item.megamenu ? (
                      // show entire menu to unlogged user or hide items that have hideToLoggedUser set to true
                      !props.loggedUser ||
                      (props.loggedUser && !item.hideToLoggedUser) ? (
                        <Dropdown
                          nav
                          inNavbar
                          key={item.title}
                          className={
                            item.position ? `position-${item.position}` : ``
                          }
                          isOpen={dropdownOpen[item.title]}
                          toggle={() => toggleDropdown(item.title)}
                        >
                          <DropdownToggle
                            nav
                            caret
                            className={
                              parentName === item.title ? "active" : ""
                            }
                          >
                            {item.title}
                          </DropdownToggle>
                          <DropdownMenu
                            className={` ${
                              item.megamenu ? "megamenu py-lg-0" : ""
                            }`}
                          >
                            {item.dropdown &&
                              item.dropdown.map((dropdownItem) =>
                                dropdownItem.links ? (
                                  <React.Fragment key={dropdownItem.title}>
                                    {dropdownItem.divider && (
                                      <DropdownItem divider />
                                    )}
                                    <h6 className="dropdown-header font-weight-normal">
                                      {dropdownItem.title}
                                    </h6>
                                    {dropdownItem.links.map((link) => (
                                      <ActiveLink
                                        key={link.title}
                                        activeClassName="active"
                                        href={link.link}
                                        passHref
                                      >
                                        <DropdownItem
                                          onClick={() =>
                                            onLinkClick(item.title)
                                          }
                                        >
                                          {link.title}
                                          {link.new && (
                                            <Badge
                                              color="warning"
                                              className="ml-1 mt-n1"
                                            >
                                              New
                                            </Badge>
                                          )}
                                        </DropdownItem>
                                      </ActiveLink>
                                    ))}
                                  </React.Fragment>
                                ) : (
                                  <ActiveLink
                                    key={dropdownItem.title}
                                    activeClassName="active"
                                    href={dropdownItem.link}
                                    passHref
                                  >
                                    <DropdownItem
                                      onClick={() => onLinkClick(item.title)}
                                    >
                                      {dropdownItem.title}
                                      {dropdownItem.new && (
                                        <Badge
                                          color="warning"
                                          className="ml-1 mt-n1"
                                        >
                                          New
                                        </Badge>
                                      )}
                                    </DropdownItem>
                                  </ActiveLink>
                                )
                              )}
                            {item.megamenu && (
                              <Row>
                                <Col lg="9">
                                  <Row className="p-3 pr-lg-0 pl-lg-5 pt-lg-5">
                                    {item.megamenu.map(
                                      (megamenuItem, index) => (
                                        <Col key={index} lg="3">
                                          {megamenuItem.map((block, index) => (
                                            <React.Fragment key={index}>
                                              <h6 className="text-uppercase">
                                                {block.title}
                                              </h6>
                                              <ul className="megamenu-list list-unstyled">
                                                {block.links.map(
                                                  (link, index) => (
                                                    <li
                                                      key={index}
                                                      className="megamenu-list-item"
                                                    >
                                                      <ActiveLink
                                                        activeClassName="active"
                                                        href={link.link}
                                                        as={link.as}
                                                        passHref
                                                      >
                                                        <DropdownItem
                                                          className="megamenu-list-link"
                                                          onClick={() =>
                                                            link.parent
                                                              ? onLinkClick(
                                                                  link.parent
                                                                )
                                                              : onLinkClick(
                                                                  item.title
                                                                )
                                                          }
                                                        >
                                                          {link.title}
                                                          {link.new && (
                                                            <Badge
                                                              color="warning"
                                                              className="ml-1 mt-n1"
                                                            >
                                                              New
                                                            </Badge>
                                                          )}
                                                        </DropdownItem>
                                                      </ActiveLink>
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            </React.Fragment>
                                          ))}
                                        </Col>
                                      )
                                    )}
                                  </Row>
                                  {item.services && (
                                    <Row className="megamenu-services d-none d-lg-flex pl-lg-5">
                                      {item.services.map((service) => (
                                        <Col
                                          key={service.title}
                                          xl="3"
                                          lg="6"
                                          className="d-flex"
                                        >
                                          <div className="megamenu-services-item">
                                            <svg className="svg-icon megamenu-services-icon">
                                              <use
                                                xlinkHref={service.icon}
                                              ></use>
                                            </svg>
                                            <div>
                                              <h6 className="text-uppercase">
                                                {service.title}
                                              </h6>
                                              <p className="mb-0 text-muted text-sm">
                                                {service.content}
                                              </p>
                                            </div>
                                          </div>
                                        </Col>
                                      ))}
                                    </Row>
                                  )}
                                </Col>
                                {item.image && (
                                  <Col lg="3" className="d-none d-lg-block">
                                    <img
                                      src={item.image}
                                      alt=""
                                      className="bg-image"
                                    />
                                  </Col>
                                )}
                              </Row>
                            )}
                          </DropdownMenu>
                        </Dropdown>
                      ) : (
                        ""
                      )
                    ) : (props.loggedUser && !item.hideToLoggedUser) ||
                      !props.loggedUser ? (
                      <NavItem
                        key={item.title}
                        className={
                          item.button
                            ? "mt-3 mt-lg-0 ml-lg-3 d-lg-none d-xl-inline-block"
                            : ""
                        }
                      >
                        {item.button ? (
                          item.showToLoggedUser !== false && (
                            <ActiveLink
                              activeClassName="active"
                              href={item.link}
                            >
                              <a
                                className="btn btn-primary"
                                onClick={() => onLinkClick(item.title)}
                              >
                                {item.title}
                              </a>
                            </ActiveLink>
                          )
                        ) : (
                          <ActiveLink
                            activeClassName="active"
                            href={item.link}
                            passHref
                          >
                            <NavLink onClick={() => onLinkClick(item.title)}>
                              {item.title}
                            </NavLink>
                          </ActiveLink>
                        )}
                      </NavItem>
                    ) : (
                      ""
                    )
                  )}
              </Nav>

              <div className="d-flex align-items-center justify-content-between justify-content-lg-end mt-1 mb-2 my-lg-0">
                {/* Search Button*/}
                <div
                  className="nav-item navbar-icon-link"
                  data-toggle="search"
                  onClick={() => setSearchToggle(!searchToggle)}
                >
                  <svg className="svg-icon">
                    <use xlinkHref="/icons/orion-svg-sprite.svg#search-1"></use>
                  </svg>
                </div>

                {props.loggedUser ? (
                  userMenu.map((item) => (
                    <Dropdown
                      nav
                      inNavbar
                      key={item.title}
                      tag="div"
                      className={
                        item.type === "avatar"
                          ? "navbar-icon-link mt-n1 py-0"
                          : ""
                      }
                      isOpen={dropdownOpen[item.title]}
                      toggle={() => toggleDropdown(item.title)}
                    >
                      {/* Logged User - Show User Menu */}
                      <DropdownToggle
                        nav
                        style={item.type === "avatar" && { padding: 0 }}
                      >
                        {item.type === "avatar" ? (
                          <img
                            src={item.img}
                            alt={item.title}
                            className="avatar avatar-sm avatar-border-white"
                          />
                        ) : (
                          item.title
                        )}
                      </DropdownToggle>
                      <DropdownMenu right>
                        {item.dropdown &&
                          item.dropdown.map((dropdownItem, dropdownIndex) =>
                            dropdownItem.divider ? (
                              <DropdownItem key={dropdownIndex} divider />
                            ) : (
                              <ActiveLink
                                key={dropdownIndex}
                                activeClassName="active"
                                href={dropdownItem.link}
                                passHref
                              >
                                <DropdownItem
                                  onClick={() => onLinkClick(item.title)}
                                >
                                  {dropdownItem.title}
                                </DropdownItem>
                              </ActiveLink>
                            )
                          )}
                      </DropdownMenu>
                    </Dropdown>
                  ))
                ) : (
                  <div className="nav-item">
                    {/* User Not Logged - link to login page*/}
                    <Link href="/customer-login">
                      <a className="navbar-icon-link">
                        <svg className="svg-icon">
                          <use xlinkHref="/icons/orion-svg-sprite.svg#male-user-1"></use>
                        </svg>
                        <span className="text-sm ml-2 ml-lg-0 text-uppercase text-sm font-weight-bold d-none d-sm-inline d-lg-none">
                          Log in
                        </span>
                      </a>
                    </Link>
                  </div>
                )}

                {/* Cart Overview Dropdown*/}

                <CartOverviewDropdown />
              </div>
            </Collapse>
          </Container>
        </Navbar>
      </div>
      {/* /Navbar */}
      {/* Fullscreen search area*/}
      {searchToggle && (
        <div className="search-area-wrapper" style={{ display: "block" }}>
          <div className="search-area d-flex align-items-center justify-content-center">
            <div
              className="close-btn"
              onClick={() => setSearchToggle(!searchToggle)}
            >
              <svg className="svg-icon svg-icon-light w-3rem h-3rem">
                <use xlinkHref="/icons/orion-svg-sprite.svg#close-1"> </use>
              </svg>
            </div>
            <form className="search-area-form" action="#">
              <div className="form-group position-relative">
                <input
                  className="search-area-input"
                  type="search"
                  name="search"
                  id="search"
                  autoFocus
                  placeholder="What are you looking for?"
                />
                <button className="search-area-button" type="submit">
                  <svg className="svg-icon">
                    <use xlinkHref="/icons/orion-svg-sprite.svg#search-1"></use>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* /Fullscreen search area*/}
    </header>
  );
};

export default Header;

// -----------------------------------------------

// import Link from "next/link";
// import { useContext, useEffect } from "react";
// import { useRouter } from "next/router";
// import HeaderContext from "../contexts/HeaderContext";

// const Header = () => {
//   const { loggedIn, isBlack, setIsBlack } = useContext(HeaderContext);
//   const router = useRouter();
//   const onChangeBlack = () => {
//     if (
//       router.pathname === "/first-post" ||
//       router.pathname === "/second-post"
//     ) {
//       setIsBlack(true);
//     } else {
//       setIsBlack(false);
//     }
//   };
//   useEffect(() => {
//     onChangeBlack();
//   });

//   return (
//     <header className="header header-absolute">
//       <div>
//         <nav className="navbar navbar-expand-lg main_bg-color">
//           <div className="container-fluid">
//             <Link href="/">
//               <a>
//                 <img
//                   src="https://cdn.worldvectorlogo.com/logos/next-js.svg"
//                   className="navbar-brand"
//                   width="50"
//                   height="44"
//                   alt="..."
//                 />
//               </a>
//             </Link>
//             <button
//               aria-label="Toggle navigation"
//               type="button"
//               className="navbar-toggler-right navbar-toggler"
//             >
//               <i className="fa fa-bars"></i>
//             </button>
//             <div className="collapse navbar-collapse">
//               <ul className="mx-auto navbar-nav">
//                 {/* {navigation.map((item) => (
//                   <li className="nav-item" key={item.id}>
//                     <Link href={`${item.Slug}`}>
//                       <a className="nav-link main_text-color">{item.Title}</a>
//                     </Link>
//                   </li>
//                 ))} */}
//               </ul>
//               <div className="d-flex navbar-nav nav justify-content-between">
//                 <div className=" align-content-center nav-item px-2">
//                   <Link href="/">
//                     <a className="d-flex navbar-icon-link main_text-color">
//                       <div className="d-flex px-1 align-self-center">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="16"
//                           height="16"
//                           fill="#fff6ff"
//                           className="bi bi-geo-alt-fill main_text-color"
//                           viewBox="0 0 16 16"
//                         >
//                           <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
//                         </svg>
//                       </div>
//                       <div className="text-decoration-none d-flex align-self-xl-center">
//                         Москва
//                       </div>
//                     </a>
//                   </Link>
//                 </div>
//                 <div className="nav-item px-2">
//                   <Link className="navbar-icon-link" href="/">
//                     <a>
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         fill="#fff6ff"
//                         className="svg-icon bi bi-envelope main_text-color"
//                         viewBox="0 0 16 16"
//                       >
//                         <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
//                       </svg>
//                     </a>
//                   </Link>
//                 </div>
//                 <div className="nav-item px-2">
//                   <Link className="navbar-icon-link" href="/">
//                     <a>
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         fill="#fff6ff"
//                         className="svg-icon bi bi-telegram main_text-color"
//                         viewBox="0 0 16 16"
//                       >
//                         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
//                       </svg>
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>
//     </header>

// export default Header;
