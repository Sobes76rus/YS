const ShopPagination = (props) => {
  return (
    <nav
      className="d-flex justify-content-center mb-5 mt-3"
      aria-label="page navigation"
    >
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">Prev</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        <li className="page-item active">
          <a className="page-link" href="#">
            1{" "}
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2{" "}
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3{" "}
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            4{" "}
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            5{" "}
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">Next</span>
            <span className="sr-only">Next </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default ShopPagination;
