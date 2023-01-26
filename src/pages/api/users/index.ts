import { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from 'prisma/client'

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

  let users = await prismaClient.user.findMany()

  res.status(200).json({
    users: users,
  })
}
