import Card from "../components/Card";

const Index = ({ albums }) => {
  return (
    <div className="container">
      <ul className="row row-cols-2 list-unstyled">
        {albums.map((item) => (
          <li className="col" key={item.id}>
            <Card item={item} />
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

export default Index;
