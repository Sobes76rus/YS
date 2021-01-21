import Router from "next/router";
import Header from "../components/header";

export default function FirstPost() {
  return (
    <>
      <h1>First Post</h1>
      <button onClick={() => Router.push("/")}>Back to Home</button>
    </>
  );
}
