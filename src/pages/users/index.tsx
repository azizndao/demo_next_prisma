import { GetServerSideProps } from "next";
import prismaClient from "@/utils/client";

export default function UserPage(context) {

  return (
    <div>
      {/*<ul>*/}
      {/*  {users.map((user) => (*/}
      {/*    <li key={user.id}>{user.username}</li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
      {JSON.stringify(context, null, 2)}
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const user = await prismaClient.user.findMany();
    return {
      props: {
        user
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}