import Image from "next/image";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const Slider = ({ albums }) => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        {/* <div className="carousel-item active">
      <img src="..." className="d-block w-100" alt="...">
    </div>
    <div className="carousel-item">
      <img src="..." className="d-block w-100" alt="...">
    </div>
    <div className="carousel-item">
      <img src="..." className="d-block w-100" alt="...">
    </div> */}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
export default Slider;

export async function getServerSideProps() {
  const url = `${publicRuntimeConfig.API_URL}/albums`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(url);

  return {
    props: {
      albums: data,
    },
  };
}
