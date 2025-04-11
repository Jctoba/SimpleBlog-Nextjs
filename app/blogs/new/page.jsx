'use client';

import { useState } from 'react';
import { saveBlog } from '@/lib/indexedDB';
import { useRouter } from 'next/navigation';

export default function NewBlog() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        contenu: '',
        auteur: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newBlog = {
            ...formData,
            date: new Date().toISOString(),
            id: Date.now().toString(),
        };

        try {
            // Sauvegarder en ligne
            const response = await fetch('http://localhost:3000/publications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBlog),
            });
            
            if (!response.ok) throw new Error('Erreur réseau');
            
            // Sauvegarder localement
            await saveBlog(newBlog);
            
            router.push('/');
        } catch (error) {
            // En cas d'erreur réseau, sauvegarder uniquement en local
            await saveBlog(newBlog);
            router.push('/');
        }
    };

    return (
        <div className="container">
            <h1>Nouvel Blog</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Titre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.titre}
                        onChange={(e) => setFormData({...formData, titre: e.target.value})}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contenu</label>
                    <textarea
                        className="form-control"
                        value={formData.contenu}
                        onChange={(e) => setFormData({...formData, contenu: e.target.value})}
                        required
                        rows="10"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Auteur</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.auteur}
                        onChange={(e) => setFormData({...formData, auteur: e.target.value})}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Publier</button>
            </form>
        </div>
    );
}