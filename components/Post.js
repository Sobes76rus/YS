import Link from "next/link";

const Post = ({ data }) => {
  return (
    <>
      <div className="mb-30px">
        <Link href="/articles/[slug]" as={`/articles/${data.slug}`}>
          <a>
            <img
              style={{ height: "250px", width: "450px" }}
              className="img-fluid"
              src={data.img.url}
              alt={data.title}
            />
          </a>
        </Link>
        <div className="mt-3">
          <small className="text-uppercase text-muted">{data.category}</small>
          <h5 className="my-2">
            <Link href="/articles/[slug]" as={`/articles/${data.slug}`}>
              <a className="text-dark">{data.title}</a>
            </Link>
          </h5>

          <p className="text-gray-500 text-sm my-3">
            <i className="far fa-clock mr-2" />
            {data.date}
          </p>
          <p className="my-2 text-muted ellipsis">{data.content}</p>

          <Link href="/articles/[slug]" as={`/articles/${data.slug}`}>
            <a className="btn btn-link text-gray-700 pl-0">
              Продолжить <i className="fa fa-long-arrow-alt-right ml-2" />
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Post;
