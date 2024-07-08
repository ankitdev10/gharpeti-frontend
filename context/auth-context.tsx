"use client";
import { Loading } from "@/components/loading";
import { User, me } from "@/lib/providers/auth";
import { getDropDownItems } from "@/lib/utils/dropdown";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import { toast } from "sonner";

export const AuthContext = createContext<{
  user?: User | undefined;
  isLoggedin?: boolean;
}>({});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: () => me(),
  });

  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoading && data) {
      if (!data.data && data?.status !== 200) {
        toast.error("UH! OH, You do not have permissions to see this page.");
        router.push("/login");
      } else {
        const routes = getDropDownItems(data.data);
        const currentRoute = routes.find((r) => r.link === pathname);

        if (!currentRoute) {
          setIsAuthorized(true);
          return;
        }

        if (currentRoute?.requireRoles.includes(data.data.type)) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          toast.error("UH! OH, You do not have permissions to see this page.");
          router.push("/");
        }
      }
    }
  }, [data, isLoading, pathname, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data || !isAuthorized) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user: data?.data,
        isLoggedin: !!data?.data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
