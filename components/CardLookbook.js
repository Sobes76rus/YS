import { Button, Card, CardImgOverlay, CardImg } from "reactstrap";
import StackGrid from "react-stack-grid";

import Link from "next/link";

const CardLookbook = ({ photos, data, cardType = "big" }) => {
  let headingClass =
    cardType == "big" ? "display-3 font-weight-bold mb-4" : "display-4 mb-4";
  if (data.textColor) {
    headingClass += " " + data.textColor;
  }

  return (
    <Card className="border-0 text-white text-center card-custom ">
      <CardImg src={data.photo.url} alt={data.album_name} />
      <CardImgOverlay className="d-flex align-items-center">
        <div className="w-100 py-3">
          <h2 className={headingClass}>{data.album_name}</h2>

          <Link href="/category">
            {cardType === "small" ? (
              <Button color="light">Shop now</Button>
            ) : (
              <Button
                color="link"
                className={data.textColor ? data.textColor : "text-white"}
              >
                Shop now <i className="fa-arrow-right fa ml-2" />
              </Button>
            )}
          </Link>
        </div>
      </CardImgOverlay>
    </Card>
  );
};

export default CardLookbook;
