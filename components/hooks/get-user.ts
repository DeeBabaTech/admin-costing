import { createClient } from "@/utils/supabase/server";

export default async function getUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user?.user_metadata;

  return { user };
}
