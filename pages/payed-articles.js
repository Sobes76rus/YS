import { useRouter } from "next/router";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import { useUser } from "../contexts/AuthContext";
import { parseCookies } from "nookies";
import getConfig from "next/config";

const PayedArticles = ({ articles }) => {
  // const user = useUser();

  const { userName, setUserName, password, setPassword } = useContext(
    AuthContext
  );
  const router = useRouter();
  // if (!user) {
  //   router.push("/login");
  // }
  return (
    <div className="container">
      <ul className="list-group">
        {articles.map((item) => (
          <li className="list-group-item" key={item.id}>
            <h1>{item.Title}</h1>
            <p>{item.Body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const jwt = ctx.req.cookies.jwt;
  const { publicRuntimeConfig } = getConfig();

  if (!jwt) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const res = await fetch(`${publicRuntimeConfig.API_URL}/payed-articles`, {
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
