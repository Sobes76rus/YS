const Movie = ({ album }) => {
  return (
    <>
      <h1>
        This is {album.artist} - {album.album_name}
      </h1>
    </>
  );
};

export default Movie;

export async function getServerSideProps(ctx) {
  const { API_URL } = process.env;
  const { slug } = ctx.query;

  const res = await fetch(`${API_URL}/albums?slug=${slug}`);
  const data = await res.json();
  return {
    props: { album: data[0] },
  };
}
