import { Post } from '@prisma/client'

export type PostWithInfos =
  | (Post & {
      user: {
        id: number
        image: string
        firstName: string
        lastName: string
        maidenName: string
        email: string
      }
      comments: (Comment & {
        user: {
          id: number
          image: string
          firstName: string
          lastName: string
          maidenName: string
          email: string
        }
      })[]
    })
  | null
