import { Session } from 'inspector'
import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import authOptions from '../api/auth/[...nextauth]'

export default function ProfilePage(context: { session: Session }) {
  const session = useSession()
  if (session)
    return (
      <div className="mx-auto max-w-2xl p-4">
        <pre className="bg-slate-900 text-white p-4">
          <code>{JSON.stringify(session, null, 4)}</code>
        </pre>
        <button
          onClick={() => signOut()}
          type="submit"
          className="mx-auto mt-4 group relative flex  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Log Out
        </button>
      </div>
    )
  return (
    <Link
      href="/auth/login"
      type="submit"
      className="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Login
    </Link>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: true,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
