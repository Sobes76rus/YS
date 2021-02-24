import { useRouter } from "next/router";

function MoviesPage({ albums, page, numberOfAlbums }) {
  const router = useRouter();
  const lastPage = Math.ceil(numberOfAlbums / 2);
  return (
    <div className="container">
      <ul className="list-group w-50 m-auto">
        {albums.map((album) => (
          <li className="list-group-item" key={album.id}>
            {`${album.artist} - ${album.album_name}`}
          </li>
        ))}
      </ul>
      <div className="pagination justify-content-center">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => router.push(`/albums?page=${page - 1}`)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => router.push(`/albums?page=${page + 1}`)}
          disabled={page >= lastPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const { API_URL } = process.env;
  const start = +page === 1 ? 0 : (+page - 1) * 3;
  const numberOfAlbumsRes = await fetch(`${API_URL}/albums/count`);
  const numberOfAlbums = await numberOfAlbumsRes.json();
  const res = await fetch(`${API_URL}/albums?_limit=2&_start=${start}`);
  const data = await res.json();
  return {
    props: {
      albums: data,
      page: +page,
      numberOfAlbums,
    },
  };
}

export default MoviesPage;
