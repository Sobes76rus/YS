import Router from "next/router";

export default function FirstPost() {
  return (
    <>
      <h1>First Post</h1>
      <button onClick={() => Router.push("/")}>Back to Home</button>
    </>
  );
}
