import { Navbar } from "@/components/navbar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto">{children}</main>
    </>
  );
}
