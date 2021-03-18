import Slider from "../components/Slider";

const Index = () => {
  return (
    <>
      <Slider />
    </>
  );
};

// export async function getServerSideProps() {
//   const { API_URL } = process.env;
//   const res = await fetch(`${API_URL}/albums`);
//   const data = await res.json();

//   return {
//     props: {
//       albums: data,
//     },
//   };
// }

export default Index;
