import { Inter } from "next/font/google";
import SessionProvider from "../SessionProvider";
import { getServerSession } from "next-auth";
import "../(CourseVideo)/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
