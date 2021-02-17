import { setCookies } from "nookies";
import getConfig from "next/config";
import { NextApiResponse, NextApiRequest } from "next";
import jwt from "jsonwebtoken";
const KEY = "sdfhgsuoyh";

export default async function login(req, res) {
  // if (!req.body) {
  //   res.status = 404;
  //   res.end("Error");
  //   return;
  // }

  const { email, password } = req.body;

  // res.json({
  //   token: jwt.sign(
  //     {
  //       identifier: email,
  //       password: password,
  //     },
  //     KEY
  //   ),
  // });

  const { publicRuntimeConfig } = getConfig();
  if (req.method === "POST") {
    const loginInfo = {
      identifier: email,
      password: password,
    };
    const login = await fetch(`${publicRuntimeConfig.API_URL}/auth/local`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });
    const loginResponse = await login.json();
    console.log(loginResponse);
    // setCookies(res, "jwt", loginResponse.jwt);
    return res.status(200);
  }
  if (req.method === "GET") {
    return res.status(200).json({ Hello: "World" });
  }
  return res.status(405);
}
