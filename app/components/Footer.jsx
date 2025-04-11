export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-4">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} CEPI Blog. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
