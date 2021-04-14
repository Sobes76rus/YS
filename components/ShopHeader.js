const ShopHeader = (props) => {
  return (
    <header className="product-grid-header">
      <div className="mr-3 mb-3">
        Showing <strong>1-12 </strong>of <strong>158 </strong>products
      </div>
      <div className="mr-3 mb-3">
        <span className="mr-2">Show</span>
        <a className="product-grid-header-show active" href="#">
          12{" "}
        </a>
        <a className="product-grid-header-show " href="#">
          24{" "}
        </a>
        <a className="product-grid-header-show " href="#">
          All{" "}
        </a>
      </div>
      <div className="mb-3 d-flex align-items-center">
        <span className="d-inline-block mr-1">Sort by</span>
        <select className="custom-select w-auto border-0">
          <option value="orderby_0">Default</option>
          <option value="orderby_1">Popularity</option>
          <option value="orderby_2">Rating</option>
          <option value="orderby_3">Newest first</option>
        </select>
      </div>
    </header>
  );
};

export default ShopHeader;
