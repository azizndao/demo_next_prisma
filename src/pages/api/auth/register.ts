import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@/utils/client";
import { hash } from 'bcrypt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res
      .status(404)
      .json({ message: `Method [${req.method}] not supported` })
  }

  const data = JSON.parse(req.body)

  const user = await prismaClient.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: await hash(data.password, 10),
    }
  })

  res.status(200).json({ user })
}
