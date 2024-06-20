import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer items-center p-4 bg-sky-200">
      <aside className="items-center grid-flow-col">
        <div className="h-10 w-10">
          <img className="max-h-full" src="/logo sm.png" alt="logo" />
        </div>
        <p>© 2024 Syigh | All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M22.23 0H1.77C.79 0 0 .77 0 1.74v20.52C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.74V1.74C24 .77 23.21 0 22.23 0zM7.08 20.45H3.56V9H7.08v11.45zM5.32 7.48c-1.13 0-2.04-.92-2.04-2.05 0-1.13.91-2.05 2.04-2.05 1.13 0 2.05.92 2.05 2.05 0 1.13-.92 2.05-2.05 2.05zM20.45 20.45h-3.52v-5.6c0-1.34-.03-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.96v5.7h-3.52V9H13.5v1.56h.05c.49-.92 1.68-1.89 3.45-1.89 3.69 0 4.37 2.43 4.37 5.58v6.2z" />
          </svg>
        </Link>
        <Link href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
          </svg>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
