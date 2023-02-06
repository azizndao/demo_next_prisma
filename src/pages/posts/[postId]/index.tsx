import { PostWithInfos } from '@/types/types'
import { notFound } from 'next/navigation'

export default async function PostPage({
  params,
}: {
  params: { postId: number }
}) {
  const { post } = await getPost({ id: params.postId })

  if (post === null) {
    return <h1 className="text-4xl font-bold">404. Post not found</h1>
  }

  const user = post.user

  const comments = post.comments

  return (
    <div className="max-w-xl mx-auto prose lg:prose-lg">
      <section className="flex items-center gap-5">
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src={user.image}
          alt={user.firstName}
          className="w-16 h-16 rounded-full bg-yellow-400"
        />
        <section>
          <div>
            {user.firstName}&nbsp;{user.lastName}
          </div>
          <small>{user.email}</small>
        </section>
      </section>
      <section>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </section>
      <section>
        <h3>Comments ({comments.length})</h3>
        <div className="flex gap-4 flex-col">
          {comments.map((comment) => (
            <article className="bg-slate-50 p-4" key={comment.id}>
              <header className="flex gap-3 items-center">
                {/* eslint-disable @next/next/no-img-element */}
                <img
                  src={comment.user.image}
                  alt={comment.user.firstName}
                  className="w-8 h-8 p-0 m-0 rounded-full bg-orange-400"
                />
                <small>{comment.user.email}</small>
              </header>
              <small>{comment.body}</small>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

async function getPost({ id }: { id: number }) {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`)

  if (!response.ok) {
    notFound()
  }

  const data: { post: PostWithInfos } = await response.json()

  return data
}
