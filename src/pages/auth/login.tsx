import SignInForm from '@/components/auth/SignInForm'
import type { GetServerSidePropsContext, NextPage } from 'next'
import { getCsrfToken } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function SignIn(context: NextPage & { csrfToken: string }) {
  const params = useRouter()

  return <SignInForm csrfToken={context.csrfToken} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
