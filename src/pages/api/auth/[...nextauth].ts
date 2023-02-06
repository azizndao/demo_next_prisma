import prismaClient from '@/utils/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = NextAuth({
  adapter: PrismaAdapter(prismaClient),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'poullo@fouta.sow',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // console.log(credentials)
        if (!credentials || req.method != 'POST') return null

        const user = await prismaClient.user.findFirst({
          where: { email: credentials.email },
        })

        if (user && user.password) {
          const isValid = await compare(credentials.password, user.password!)
          if (isValid) {
            return {
              id: user.id,
              image: user.image,
              email: user.email,
              name: user.name,
              emailVerified: user.emailVerified,
            }
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token
        token.user = user
      }
      return token
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/register',
  },
})

export default authOptions
