import { Post } from '@prisma/client'
import { User } from 'next-auth'

export type PostWithInfos = Post & {
  user: User
  comments: ( Comment & { user: User } )[]
} | null

export type PrismaUser = User
