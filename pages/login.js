function Login() {
  return (
    <form className="form-signin">
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
        type="email"
        id="inputEmail"
        className="form-control"
        placeholder="Email address"
        required=""
        autoFocus=""
      />
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="inputPassword"
        className="form-control"
        placeholder="Password"
        required=""
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
}

export default Login;
