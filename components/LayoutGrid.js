import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Product from "./Product";

export default function LayoutGrid({ cards }) {
  return (
    <ResponsiveMasonry
      style={{ marginTop: "50px" }}
      columnsCountBreakPoints={{ 300: 2, 900: 3, 1100: 4 }}
    >
      <Masonry gutter="30px">
        {cards.map((value) => (
          <div key={value.id} style={{ marginTop: "-30px" }}>
            <Product data={value} masonry />
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
