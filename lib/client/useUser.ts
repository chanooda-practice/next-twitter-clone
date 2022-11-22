import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { defaultResponse } from "../../interface/responseType";

export default function useUser() {
  const { data, error } = useSWR<defaultResponse<User>>("/api/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/log-in");
    }
  }, [data, router]);
  return { user: data?.data, isLoading: !data && !error };
}
