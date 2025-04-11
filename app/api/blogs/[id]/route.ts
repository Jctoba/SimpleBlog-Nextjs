import { NextResponse } from 'next/server'
import { BlogPost, BlogPostInput } from '@/lib/types'
import { blogDB } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const blog = await blogDB.getBlog(params.id)
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog non trouvé' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du blog' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const existingBlog = await blogDB.getBlog(params.id)
    
    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog non trouvé' },
        { status: 404 }
      )
    }
    
    const body: BlogPostInput = await request.json()
    const updatedBlog: BlogPost = {
      ...existingBlog,
      ...body,
      updatedAt: new Date().toISOString()
    }
    
    await blogDB.updateBlog(updatedBlog)
    
    return NextResponse.json(updatedBlog)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du blog' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const existingBlog = await blogDB.getBlog(params.id)
    
    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog non trouvé' },
        { status: 404 }
      )
    }
    
    await blogDB.deleteBlog(params.id)
    
    return NextResponse.json(
      { message: 'Blog supprimé avec succès' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du blog' },
      { status: 500 }
    )
  }
} 