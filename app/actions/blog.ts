'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { BlogPostInput } from '../../lib/types'

export async function createBlogPost(formData: BlogPostInput) {
  try {
    const response = await fetch('http://localhost:3000/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error('Échec de la création du blog')
    }

    revalidatePath('/blogs')
    redirect('/blogs')
  } catch (error) {
    console.error('Erreur lors de la création du blog:', error)
    throw new Error('Échec de la création du blog')
  }
}

export async function updateBlogPost(id: string, formData: BlogPostInput) {
  try {
    const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error('Échec de la mise à jour du blog')
    }

    revalidatePath(`/blogs/${id}`)
    redirect(`/blogs/${id}`)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du blog:', error)
    throw new Error('Échec de la mise à jour du blog')
  }
}

export async function deleteBlogPost(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Échec de la suppression du blog')
    }

    revalidatePath('/blogs')
    redirect('/blogs')
  } catch (error) {
    console.error('Erreur lors de la suppression du blog:', error)
    throw new Error('Échec de la suppression du blog')
  }
}