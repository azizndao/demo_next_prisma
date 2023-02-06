import { PrismaUserSelection } from '@/utils/select'
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from 'next-auth'
import prismaClient from '@/utils/client'

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

  const id = req.query.userId as string
  const user = await prismaClient.user.findUnique({
    where: { id },
    select: PrismaUserSelection,
  })
  res.status(200).json({ user })
}
