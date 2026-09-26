import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import "./globals.css";
import "./m1.css";
import "./m2.css";
import "./m3.css";

export const metadata: Metadata = {
  title: "Roadmap Concursos TI",
  description: "Cartografia aberta dos concursos públicos de Tecnologia da Informação no Brasil.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <Nav />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container footer-inner">
            <span>Roadmap Concursos TI · projeto aberto e orientado por fontes</span>
            <a href="https://github.com/cvaraujo11/roadmap-concursos-ti" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
