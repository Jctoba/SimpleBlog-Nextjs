'use client'

import { useState } from 'react'
import { createBlogPost } from '../actions/blog'

export default function BlogForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    const formData = new FormData(event.target)
    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
      author: formData.get('author')
    }

    try {
      await createBlogPost(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Titre</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="author" className="form-label">Auteur</label>
        <input
          type="text"
          className="form-control"
          id="author"
          name="author"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="content" className="form-label">Contenu</label>
        <textarea
          className="form-control"
          id="content"
          name="content"
          rows="5"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Envoi en cours...' : 'Créer l\'blog'}
      </button>
    </form>
  )
} 