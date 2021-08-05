import React, { useState } from "react";
import { CardImg } from "reactstrap";
import Link from "next/link";
import ModalQuickView from "../components/ModalQuickView";

import useWindowSize from "../hooks/useWindowSize";

const Product = ({ card, masonry, ...props }) => {
  const [quickView, setQuickView] = useState(false);

  let loading = props.loading || "lazy";
  const windowSize = useWindowSize();

  const isSlim = windowSize.width <= "992";

  return (
    <>
      <div className="product">
        <div className="product-image">
          <CardImg
            src={card.photo[0].url}
            alt={card.album_name}
            loading="lazy"
          />

          <div className="product-hover-overlay">
            <Link href="/persons/[id]" as={`/persons/${card.id}/`}>
              <a className="product-hover-overlay-link" />
            </Link>
            {!isSlim && (
              <div className="product-hover-overlay-buttons">
                <Link href="/persons/[id]" as={`/persons/${card.id}/`}>
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
            )}
          </div>
        </div>
        <div className="py-1">
          {card.category && (
            <p className="text-muted text-sm mb-1">{card.category[0].title}</p>
          )}
          <h3 className="h6 text-uppercase mb-1">
            <Link href="/filter-albums">
              <a className="text-dark">{card.name}</a>
            </Link>
          </h3>
          <span className="text-muted">{card.price}</span>
        </div>
      </div>
      {props.showQuickView !== false && (
        <ModalQuickView
          isOpen={quickView}
          toggle={() => setQuickView()}
          product={card}
        />
      )}
    </>
  );
};

export default Product;
