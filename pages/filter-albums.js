const FilterAlbums = ({ albums }) => {
  return (
    <div className="container">
      <h2>Filter albums</h2>
      <div className="flex">
      <h2>Filter go here</h2>
      <ul className="row row-cols-1 list-unstyled">
        {albums.map((item) => (
          <li className="col" key={item.id}>
            <strong>{item.album_name}</strong> -{" "}
            {item.genre ? item.genre.genre : null} <br />
            {console.log(item.artist.lenght)}
            {item.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  const { API_URL } = process.env;
  const res = await fetch(`${API_URL}/albums`);
  const data = await res.json();

  return {
    props: {
      albums: data,
    },
  };
}

export default FilterAlbums;
