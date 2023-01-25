import { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from 'prisma/client'

type ResponseData = { user: User | null } | { message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res
      .status(404)
      .json({ message: `Method [${req.method}] not supported` })
  }

  const id = parseInt(req.query.userId as string)
  const user = await prismaClient.user.findUnique({
    where: { id },
  })
  res.status(200).json({ user })
}
