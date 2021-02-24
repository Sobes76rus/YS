import Link from "next/link";
import Image from "next/image";

export default function Card({ item }) {
  return (
    <>
      <div className="card-body">
        <h4 className="card-title">
          {item.artist + " " + "-" + " " + item.album_name}
        </h4>
      </div>
      <Link
        href="/albums/[genre]/[slug]"
        as={`/albums/${item.genre.slug}/${item.slug}`}
      >
        <a>
          <Image
            src={item.album_cover.url}
            className="card-img-bottom"
            alt="..."
            width={500}
            height={500}
          ></Image>
        </a>
      </Link>
    </>
  );
}
