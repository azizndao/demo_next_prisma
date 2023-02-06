import { Post } from '@prisma/client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function UserPage() {
  const posts: { posts: Post[] } = { posts: [] }
  console.log(posts)
  const session = useSession()

  return (
    <div className="max-w-xl mx-auto p-4">
      <pre className="bg-slate-900 text-white p-4">
        <code>{JSON.stringify(session, null, 4)}</code>
      </pre>
      <div className="flex gap-4 mt-4">
        <Link
          href="/auth/register"
          type="submit"
          className="group relative flex justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Register
        </Link>
        <Link
          href="/auth/login"
          type="submit"
          className="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Login
        </Link>
      </div>
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
