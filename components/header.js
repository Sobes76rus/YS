import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-light">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link href="/">
            <a>
              <img
                src="https://cdn.worldvectorlogo.com/logos/next-js.svg"
                className="navbar-brand"
                width="50"
                height="44"
                alt="..."
              />
            </a>
          </Link>
          <ul className="list-group flex-row list-unstyled flex justify-content-end">
            <li className="nav-item">
              <Link href="/first-post">
                <a className="nav-link">To the first post</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/second-post">
                <a className="nav-link">To the second post</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
