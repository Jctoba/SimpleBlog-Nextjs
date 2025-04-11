import Link from 'next/link';

export default function BlogCard({ id, title, description, author, date }) {
    return (
        <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100" style={{backgroundColor: "#393E46"}}>
                <div className="card-body text-white">
                    <h5 className="card-title">{title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{author}</h6>
                    <p className="card-text">{description}</p>
                    <p className="card-text">
                        <small className="text-body-secondary">{date}</small>
                    </p>
                    <Link 
                        href={`/blogs/${id}`}
                        className="btn btn-primary"
                    >
                        Lire plus
                    </Link>
                </div>
            </div>
        </div>
    );
}