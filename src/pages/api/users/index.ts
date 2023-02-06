import { PrismaUserSelection } from '@/utils/select'
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from 'next-auth'
import prismaClient from '@/utils/client'

type ResponseData = { users: User[] } | { message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const posts = req.body
    console.log(posts)
  } else if (req.method !== 'GET') {
    return res
      .status(404)
      .json({ message: `Method [${req.method}] not supported` })
  }

  const users = await prismaClient.user.findMany({
    select: PrismaUserSelection,
  })

  res.status(200).json({
    users: users as User[],
  })
}
