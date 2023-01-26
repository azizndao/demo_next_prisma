import { prismaClient } from 'prisma/client'

export default async function UserPage() {
  const users = await prismaClient.user.findMany()

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  )
}
