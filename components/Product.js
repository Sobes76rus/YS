import React, { useState } from "react";
import { CardImg } from "reactstrap";
import Link from "next/link";
import ModalQuickView from "../components/ModalQuickView";
import Image from "./CustomImage";

const Product = ({ cards, masonry, ...props }) => {
  const [quickView, setQuickView] = useState(false);

  let loading = props.loading || "lazy";
  return (
    <>
      <div className="product">
        <div className="product-image">
          <CardImg
            src={cards.photo[0].url}
            alt={cards.album_name}
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
          {cards.category && (
            <p className="text-muted text-sm mb-1">{cards.category[0].title}</p>
          )}
          <h3 className="h6 text-uppercase mb-1">
            <Link href="/filter-albums">
              <a className="text-dark">{cards.name}</a>
            </Link>
          </h3>
          <span className="text-muted">${cards.price}</span>
        </div>
      </div>
      {props.showQuickView !== false && (
        <ModalQuickView
          isOpen={quickView}
          toggle={() => setQuickView()}
          product={cards}
        />
      )}
    </>
  );
};

export default Product;
