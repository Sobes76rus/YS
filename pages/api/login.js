import { setCookies } from "nookies";

export default async function login(req, res) {
  if (req.method === "POST") {
    const loginInfo = {
      identifier: req.body.email,
      password: req.body.password,
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
    setCookies(res, "jwt", loginResponse.jwt);
    return res.status(200);
  }
  if (req.method === "GET") {
    return res.status(200).json({ Hello: "World" });
  }
  return res.status(405);
}
