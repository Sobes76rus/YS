import React from "react";
import ServicesBlock from "./ServicesBlock";

const Footer = () => {
  return (
    <footer className="main-footer">
      {/* Services block*/}
      <ServicesBlock />

      {/* Main block - menus, subscribe form*/}
      <div className="py-6 bg-gray-300 text-muted">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="font-weight-bold text-uppercase text-lg text-dark mb-3">
                Sell<span className="text-primary">.</span>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a
                    className="text-muted text-hover-primary"
                    href="#"
                    target="_blank"
                    title="twitter"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="text-muted text-hover-primary"
                    href="#"
                    target="_blank"
                    title="facebook"
                  >
                    <i className="fab fa-facebook" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="text-muted text-hover-primary"
                    href="#"
                    target="_blank"
                    title="instagram"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="text-muted text-hover-primary"
                    href="#"
                    target="_blank"
                    title="pinterest"
                  >
                    <i className="fab fa-pinterest" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="text-muted text-hover-primary"
                    href="#"
                    target="_blank"
                    title="vimeo"
                  >
                    <i className="fab fa-vimeo" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-5 mb-lg-0">
              <h6 className="text-uppercase text-dark mb-3">Shop</h6>
              <ul className="list-unstyled">
                <li>
                  <a className="text-muted" href="#">
                    For Women
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    For Men
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Stores
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Our Blog
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Shop
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-5 mb-lg-0">
              <h6 className="text-uppercase text-dark mb-3">Company</h6>
              <ul className="list-unstyled">
                <li>
                  <a className="text-muted" href="#">
                    Login
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Register
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Wishlist
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Our Products
                  </a>
                </li>
                <li>
                  <a className="text-muted" href="#">
                    Checkouts
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h6 className="text-uppercase text-dark mb-3">
                Daily Offers &amp; Discounts
              </h6>
              <p className="mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                itaque temporibus.
              </p>
              <form action="#" id="newsletter-form">
                <div className="input-group mb-3">
                  <input
                    className="form-control bg-transparent border-secondary border-right-0"
                    type="email"
                    placeholder="Your Email Address"
                    aria-label="Your Email Address"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary border-left-0"
                      type="submit"
                    >
                      <i className="fa fa-paper-plane text-lg text-dark" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright section of the footer*/}
      <div className="py-4 font-weight-light bg-gray-800 text-gray-300">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-left">
              <p className="mb-md-0">
                © 2021 Your company. All rights reserved.
              </p>
            </div>
            <div className="col-md-6">
              <ul className="list-inline mb-0 mt-2 mt-md-0 text-center text-md-right">
                <li className="list-inline-item">
                  <img className="w-2rem" src="/svg/visa.svg" alt="..." />
                </li>
                <li className="list-inline-item">
                  <img className="w-2rem" src="/svg/mastercard.svg" alt="..." />
                </li>
                <li className="list-inline-item">
                  <img className="w-2rem" src="/svg/paypal.svg" alt="..." />
                </li>
                <li className="list-inline-item">
                  <img
                    className="w-2rem"
                    src="/svg/western-union.svg"
                    alt="..."
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
