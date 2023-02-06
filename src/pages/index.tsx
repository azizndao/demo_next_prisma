import { Post } from '@prisma/client'
import Link from 'next/link'
import './page.module.css'

export default async function UserPage() {
  const posts = await getData()
  console.log(posts)

  return (
    <div className="max-w-xl mx-auto">
      <ul>
        {posts.posts.map((post) => (
          <li key={post.id.toString()}>
            <Link href={`/posts/${post.id}`}>
              <div className="py-4 px-2 rounded-md hover:bg-slate-100">
                <h2 className="text-2xl">{post.title}</h2>
                <p className="line-clamp-2 opacity-70">{post.body}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

async function getData() {
  const res = await fetch('http://localhost:3000/api/posts')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data: { posts: Post[] } = await res.json()

  return data
}
