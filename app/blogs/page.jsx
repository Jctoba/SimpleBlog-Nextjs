'use client';

import { useEffect, useState } from 'react';
import { getAllBlogs } from '@/lib/indexedDB';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:3000/publications');
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                const localBlogs = await getAllBlogs();
                setBlogs(localBlogs || []);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const filteredAndSortedBlogs = blogs
        .filter(blog => 
            blog.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'titre':
                    return a.titre.localeCompare(b.titre);
                case 'date':
                    return new Date(b.date) - new Date(a.date);
                default:
                    return 0;
            }
        });

    if (isLoading) return <div className="text-center p-5">Chargement...</div>;

    return (
        <div className="container-fluid">
            <div className="p-4">
                <div className="row">
                    <div className="col-12 col-sm-10 col-md-8 mb-3 mb-sm-0">
                        <input 
                            className="form-control w-100" 
                            type="search" 
                            placeholder="Rechercher" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-12 col-sm-2 col-md-4 d-flex align-items-center">
                        <span className="me-2">Trier par:</span>
                        <select 
                            className="form-select w-100"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="date">Date</option>
                            <option value="titre">Titre</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="row px-3">
                {filteredAndSortedBlogs.map((blog) => (
                    <BlogCard 
                        key={blog.id}
                        id={blog.id}
                        title={blog.titre}
                        description={blog.description}
                        author={blog.auteur}
                        date={blog.date}
                    />
                ))}
            </div>
        </div>
    );
}