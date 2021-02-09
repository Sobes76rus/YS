import { useRouter } from "next/router";
import { useUser } from "../contexts/AuthContext";
import { parseCookies } from "nookies";

const PayedArticles = () => {
  const user = useUser();

  const router = useRouter();
  if (!user) {
    router.push("/login");
  }
  return (
    <div className="container">
      <p>Payed Articles</p>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const jwt = ctx.req.cookies.jwt;
  console.log(jwt);
  if (!jwt) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const res = await fetch(`${API_URL}/payed-articles`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  const articles = await res.json();

  return {
    props: { articles },
  };
}

export default PayedArticles;
