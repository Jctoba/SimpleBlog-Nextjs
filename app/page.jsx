'use client';
import { useEffect, useState } from 'react';
import { getAllBlogs, saveBlog } from '@/lib/indexedDB';
import Link from 'next/link';

export default function Home() {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // Essayer d'abord de récupérer depuis l'API
                const response = await fetch('http://localhost:3000/publications');
                const data = await response.json();
                
                // Sauvegarder dans IndexedDB
                await Promise.all(data.map(blog => saveBlog(blog)));
                
                setBlogs(data);
            } catch (error) {
                // En cas d'erreur, utiliser les données locales
                const localBlogs = await getAllBlogs();
                setBlogs(localBlogs);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (isLoading) return <div>Chargement...</div>;

    return (
        <div className="container">
            <h1>Blog</h1>
            <Link href="/blogs/new" className="btn btn-primary mb-4">
                Nouvel blog
            </Link>
            
            <div className="row">
                {blogs.map((blog) => (
                    <div key={blog.id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{blog.titre}</h5>
                                <p className="card-text">{blog.description}</p>
                                <Link href={`/blogs/${blog.id}`} className="btn btn-primary">
                                    Lire plus
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}