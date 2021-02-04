export default function PayedArticles({ articles, authData }) {
  console.log(articles);
  return (
    <div className="container">
      <p>Payed Articles</p>
    </div>
  );
}

export async function getServerSideProps() {
  const { API_URL } = process.env;
  const loginInfo = {
    identifier: "admin",
    password: "admin123",
  };
  const login = await fetch(`${API_URL}/auth/local`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  });

  const loginResponse = await login.json();

  const res = await fetch(`${API_URL}/payed-articles`, {
    headers: {
      Authorization: `Bearer ${loginResponse.jwt}`,
    },
  });
  const articles = await res.json();

  return {
    props: {
      articles,
      authData: loginResponse,
    },
  };
}
