import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Product from "./Product";
import useWindowSize from "../hooks/useWindowSize";

export default function LayoutGrid({ cards }) {
  const windowSize = useWindowSize();
  const isSlim = windowSize.width <= "992";

  return (
    <ResponsiveMasonry
      style={{ marginTop: "50px" }}
      columnsCountBreakPoints={{ 300: 2, 900: 3, 1100: 4 }}
    >
      <Masonry gutter="30px">
        {cards.map((value) => (
          <div key={value.id} style={{ marginTop: "-30px" }}>
            {isSlim ? (
              <Product card={value} masonry onlyViewButton />
            ) : (
              <Product card={value} masonry />
            )}
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
