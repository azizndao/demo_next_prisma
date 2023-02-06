import { RegistrationForm } from '@/components/auth/RegistrationForm'
import authOptions from '@/pages/api/auth/[...nextauth]'
import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import { getCsrfToken } from 'next-auth/react'

export default function RegistrationPage({
  csrfToken,
}: NextPage & { csrfToken: string }) {
  return <RegistrationForm csrfToken={csrfToken} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  console.log(session)

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
