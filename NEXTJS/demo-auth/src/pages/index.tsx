import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home({
  name,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, update } = useSession();

  return (
    <div>
      <p>{JSON.stringify(data)}</p>
      <button onClick={() => update({ role: "agent" })}>Update</button>
      <button onClick={() => signOut()}>Logout</button>
      <h1>Hello {name}</h1>
      <div style={{ maxWidth: 500, paddingTop: "25%", position: "relative" }}>
        <Image
          fill
          style={{ objectFit: "cover" }}
          src="/images/photo.webp"
          alt=""
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  name: string;
}> = async () => {
  interface ResponseSuccess {
    name: string;
  }

  try {
    const response = await axios.request<ResponseSuccess>({
      url: "/api/hello",
      baseURL: "http://localhost:3000",
    });
    return {
      props: {
        name: response.data.name,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
