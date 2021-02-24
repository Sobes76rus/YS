import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import Router from "next/router";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  async function submitForm(e) {
    e.preventDefault();
    const req = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });
    const user = await req.json();
    setUser(user);

    Router.push("/payed-articles");
  }

  return (
    <form className="form-signin" onSubmit={submitForm}>
      <img
        className="mb-4"
        src="https://cdn.worldvectorlogo.com/logos/next-js.svg"
        alt=""
        width="72"
        height="72"
      />
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label htmlFor="inputEmail" className="sr-only">
        Email address
      </label>
      <input
        type="text"
        name="email"
        id="inputEmail"
        className="form-control"
        placeholder="Email address"
        required=""
        autoFocus=""
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      />
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="inputPassword"
        className="form-control"
        placeholder="Password"
        required=""
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="checkbox my-2">
        <label className="d-flex align-items-center justify-content-center">
          <div className="mx-1">Remember me</div>
          <input type="checkbox" value="remember-me" />
        </label>
      </div>
      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
      <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
    </form>
  );
};

export default Login;
