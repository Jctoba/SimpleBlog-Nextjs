import Link from 'next/link';
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-dark text-white">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
          <Image 
              src="/img/hummingbirdLogo"
              alt="Logo CEPI"
              width={30}
              height={24}
              className="d-inline-block align-text-top r-2"
              priority
            />
            CEPI
          </a>
          <Link href="/" className="navbar-brand">
            CEPI Blog
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/" className="nav-link">
                  Accueil
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/blogs" className="nav-link">
                  blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className="nav-link">
                  À propos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
} 