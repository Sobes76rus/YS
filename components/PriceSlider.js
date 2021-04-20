import React, { useState } from "react";

import Nouislider from "nouislider-react";
import { Input } from "reactstrap";

const PriceSlider = ({ top }) => {
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(30000);

  const priceSlider = (render, handle, value, un, percent) => {
    setPriceMin(value[0].toFixed(0));
    setPriceMax(value[1].toFixed(0));
  };
  return (
    <>
      <Nouislider
        key={2}
        range={{ min: 1000, max: 30000 }}
        start={[1000, 10000]}
        onUpdate={priceSlider}
        className={top ? "" : "mt-4 mt-lg-0"}
        connect
      />
      <div className={`nouislider-values ${top ? "mb-4" : ""}`}>
        <div className="min d-flex align-items-end">
          <p className="m-0 pr-2">от</p>
          <div className="mr-2">
            <Input id="slider-snap-value-from" placeholder={priceMin} />
          </div>
        </div>
        <div className="max d-flex align-items-end">
          <p className="m-0 pr-2">до</p>{" "}
          <Input id="slider-snap-value-to" placeholder={priceMax} />
        </div>
      </div>
    </>
  );
};

export default PriceSlider;
