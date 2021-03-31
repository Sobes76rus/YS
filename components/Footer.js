import React from "react";
import ServicesBlock from "./ServicesBlock";

const Footer = () => {
  return (
    <footer className="main-footer">
      {/* Services block*/}
      {/* <ServicesBlock /> */}

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
