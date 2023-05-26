import { cookies } from "next/headers";
import { EmptyMemories } from "@/components/EmptyMemories";
import { api } from "@/lib/api";

export default async function Home() {
  const isAuthenticated = cookies().has("token");

  if (!isAuthenticated) {
    return <EmptyMemories />;
  }

  const token = cookies().get("token")?.value;
  const response = await api.get("/memories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const memories = response.data;

  return <div>{JSON.stringify(memories)}</div>;
}
