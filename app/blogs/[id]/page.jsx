'use client';

import { useEffect, useState } from 'react';
import { getBlog, saveBlog } from '@/lib/indexedDB';
import { useParams } from 'next/navigation';

export default function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                // Essayer d'abord l'API
                const response = await fetch(`http://localhost:3000/publications/${id}`);
                const data = await response.json();
                
                // Sauvegarder dans IndexedDB
                await saveBlog(data);
                
                setBlog(data);
            } catch (error) {
                // Utiliser les données locales
                const localBlog = await getBlog(id);
                setBlog(localBlog);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (isLoading) return <div>Chargement...</div>;
    if (!blog) return <div>blog non trouvé</div>;

    return (
        <div className="container">
            <h1>{blog.titre}</h1>
            <div className="metadata">
                <p>Par {blog.auteur} - {blog.date}</p>
            </div>
            <div className="content">
                {blog.contenu}
            </div>
        </div>
    );
}