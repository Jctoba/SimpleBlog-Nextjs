import Link from 'next/link';

export default function Header() {
  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">Bienvenue sur le Blog CEPI</h1>
      <p className="lead mb-4">
      </p>
      <Link href="/blogs" className="btn btn-primary btn-lg">
        Voir les blogs
      </Link>
    </div>
  );
}