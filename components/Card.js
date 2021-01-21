import Link from "next/link";

export default function Card({ item }) {
  const url = "http://localhost:1337";
  return (
    <>
      <div className="card-body">
        <h4 className="card-title">
          {item.artist + " " + "-" + " " + item.album_name}
        </h4>
      </div>
      <Link href="../pages/albums/[slug].js" as={`/albums/${item.slug}`}>
        <a>
          <img
            src={url + item.cover.url}
            className="card-img-bottom"
            alt="..."
          ></img>
        </a>
      </Link>
    </>
  );
}
