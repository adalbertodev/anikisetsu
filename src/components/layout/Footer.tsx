import { Link } from "react-router";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <div className="footer__brand-header">
            <span className="footer__brand-logo" aria-hidden="true">
              🌸
            </span>
            <span className="footer__brand-name">AniKisetsu</span>
          </div>

          <p className="footer__brand-description">
            Tu guía completa de temporadas anime. Descubre, sigue y organiza
            todos tus animes favoritos en un solo lugar.
          </p>
        </div>

        <nav className="footer__links" aria-label="Enlaces del pie de página">
          <div className="footer__group">
            <h3 className="footer__group-title">Comunidad</h3>

            <ul className="footer__list" role="list">
              <li className="footer__item">
                <a href="" target="_blank" rel="noopener noreferrer">
                  Discord
                </a>
              </li>
              <li className="footer__item">
                <a href="" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li className="footer__item">
                <a href="" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li className="footer__item">
                <a href="" target="_blank" rel="noopener noreferrer">
                  Github
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__group">
            <h3 className="footer__group-title">Soporte</h3>

            <ul className="footer__list" role="list">
              <li className="footer__item">
                <Link to="">Moderadores</Link>
              </li>
              <li className="footer__item">
                <Link to="">Contacto</Link>
              </li>
              <li className="footer__item">
                <Link to="">Términos y privacidad</Link>
              </li>
              <li className="footer__item">
                <Link to="">Sitemap</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </footer>
  );
};
