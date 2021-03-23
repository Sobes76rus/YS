import Slider from "../components/Slider";

const Index = ({ albums }) => {
  return (
    <>
      <Slider albums={albums} />
    </>
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
