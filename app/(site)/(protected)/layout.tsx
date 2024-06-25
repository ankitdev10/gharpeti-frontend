import { AuthContextProvider } from "@/context/auth-context";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContextProvider>
      <main>{children}</main>
    </AuthContextProvider>
  );
};

export default ProtectedLayout;
