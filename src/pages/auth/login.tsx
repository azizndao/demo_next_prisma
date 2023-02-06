import { LoginForm } from '@/components/auth/LoginForm'
import authOptions from '@/pages/api/auth/[...nextauth]'
import type { GetServerSidePropsContext, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import { getCsrfToken } from 'next-auth/react'

export default function Login(context: NextPage & { csrfToken: string }) {
  return <LoginForm csrfToken={context.csrfToken} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/auth/me',
        permanent: true,
      },
    }
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
