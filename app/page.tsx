import getUser from "@/components/hooks/get-user";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await getUser();

  if (user) {
    redirect("/overview");
  } else redirect("/auth/login");
}
