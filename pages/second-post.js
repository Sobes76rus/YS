import { useRouter } from "next/router";

export default function SecondPost() {
  const routerObj = useRouter();
  return (
    <>
      <h1>Second Post</h1>
      <button onClick={() => routerObj.push("/")}>Back to Home</button>
    </>
  );
}
