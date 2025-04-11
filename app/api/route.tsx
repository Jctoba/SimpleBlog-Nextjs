import { NextResponse } from 'next/server'
import { BlogPost, BlogPostInput } from '@/lib/types'

let blogs: BlogPost[] = []

//Simulation avec json

export async function GET() {
  return NextResponse.json(blogs)
}

export async function POST(request: Request) {
  try {
    const body: BlogPostInput = await request.json()
    
    const newBlog: BlogPost = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    blogs.push(newBlog)
    
    return NextResponse.json(newBlog, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la création du blog' },
      { status: 500 }
    )
  }
}