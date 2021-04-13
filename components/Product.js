import React, { useState } from "react";
import { CardImg } from "reactstrap";
import Link from "next/link";
import Image from "./CustomImage";

const Product = ({ data, masonry, ...props }) => {
  const [quickView, setQuickView] = useState(false);
  let loading = "lazy";

  if (props.loading) {
    loading = props.loading;
  }

  return (
    <>
      <div className="product">
        <div className="product-image">
          {data.new && <div className="ribbon ribbon-info">Fresh</div>}
          {data.sale && <div className="ribbon ribbon-primary">Sale</div>}
          {data.soldout && <div className="ribbon ribbon-danger">Sold out</div>}

          <CardImg src={data.photo.url} alt={data.album_name} />

          <div className="product-hover-overlay">
            <Link href="#">
              <a className="product-hover-overlay-link" />
            </Link>
            <div className="product-hover-overlay-buttons">
              <Link href="#">
                <a className="btn btn-purple btn-buy">
                  <i className="fa-search fa" />
                  <span className="btn-buy-label ml-2">Смотреть</span>
                </a>
              </Link>
              {!props.onlyViewButton && (
                <a
                  className="btn btn-purple btn-product-right"
                  onClick={() => setQuickView(!quickView)}
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
            <Link href="#">
              <a className="text-dark">{data.name}</a>
            </Link>
          </h3>
          <span className="text-muted">${data.price}</span>
        </div>
      </div>
    </>
  );
};

export default Product;
