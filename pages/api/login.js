import { setCookie } from "nookies";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export default async function login(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    const loginInfo = {
      identifier: req.body.userName,
      password: req.body.password,
    };
    const login = await fetch(`${publicRuntimeConfig.API_URL}/auth/local`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });
    console.log("request done");
    if (!login.ok) {
      return res.status(login.status).end();
    }
    const loginResponse = await login.json();
    console.log(loginResponse);

    setCookie({ res }, "jwt", loginResponse.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      httpOnly: true,
    });

    return res.status(200).json({ userName: loginResponse.user.username });
  }

  if (req.method === "GET") {
    return res.status(200).json({ Hello: "World" });
  }
  return res.status(405);
}
