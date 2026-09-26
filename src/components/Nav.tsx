import Link from "next/link";

const links = [
  ["/comecar", "Por onde começar"],
  ["/mapa", "Mapa"],
  ["/concursos", "Concursos"],
  ["/provas", "Provas"],
  ["/comparar", "Comparar"],
  ["/frequencia", "Frequência"],
  ["/metodologia", "Metodologia"],
] as const;

export function Nav() {
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link href="/" className="brand" aria-label="Roadmap Concursos TI — início">
          <span className="brand-mark">{">_"}</span>
          <span>Roadmap Concursos TI</span>
        </Link>
        <nav className="nav-links" aria-label="Navegação principal">
          {links.map(([href, label]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
