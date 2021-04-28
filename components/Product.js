import React, { useState } from "react";
import { CardImg } from "reactstrap";
import Link from "next/link";
import ModalQuickView from "../components/ModalQuickView";
import Image from "./CustomImage";

const Product = ({ data, masonry, ...props }) => {
  const [quickView, setQuickView] = useState(false);

  let loading = props.loading || "lazy";
  return (
    <>
      <div className="product">
        <div className="product-image">
          <CardImg
            src={data.photo[0].url}
            alt={data.album_name}
            loading="lazy"
          />

          <div className="product-hover-overlay">
            <Link href="/filter-albums">
              <a className="product-hover-overlay-link" />
            </Link>
            <div className="product-hover-overlay-buttons">
              <Link href="/filter-albums">
                <a className="btn btn-purple btn-buy">
                  <i className="fa-search fa" />
                  <span className="btn-buy-label ml-2">Смотреть</span>
                </a>
              </Link>
              {!props.onlyViewButton && (
                <a
                  className="btn btn-purple btn-product-right"
                  onClick={() => {
                    setQuickView(!quickView);
                  }}
                >
                  <i className="fa fa-expand-arrows-alt" />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="py-1">
          {data.category && (
            <p className="text-muted text-sm mb-1">{data.category[0].title}</p>
          )}
          <h3 className="h6 text-uppercase mb-1">
            <Link href="/filter-albums">
              <a className="text-dark">{data.name}</a>
            </Link>
          </h3>
          <span className="text-muted">${data.price}</span>
        </div>
      </div>
      {props.showQuickView !== false && (
        <ModalQuickView
          isOpen={quickView}
          toggle={() => setQuickView()}
          product={data}
        />
      )}
    </>
  );
};

export default Product;
