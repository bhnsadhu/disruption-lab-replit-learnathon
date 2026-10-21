import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notFound">
      <div className="terminalLine">
        <div>
          <b>~/uiuc/learnathon</b>
          <span>$ cd {"<this page>"}</span>
        </div>
        <div>
          <b>error</b>
          <span>404: no such build. maybe it never shipped.</span>
          <em>▮</em>
        </div>
      </div>
      <Link className="cta" href="/">
        <span>cd ~</span> BACK TO THE WALL <b>↗</b>
      </Link>
    </main>
  );
}
