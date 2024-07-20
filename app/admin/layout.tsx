import { Inter } from "next/font/google";
import SessionProvider from "../SessionProvider";
import { getServerSession } from "next-auth";
import "../(CourseVideo)/globals.css";
import AdminNav from "./components/AdminNav";

const inter = Inter({ subsets: ["latin"] });

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen bg-gray-100`}>
        <AdminNav />
        <main className="flex-1 p-4 overflow-auto">
          <SessionProvider session={session}>{children}</SessionProvider>
        </main>
      </body>
    </html>
  );
}
