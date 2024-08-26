import { Inter, Noto_Sans_Thai } from "next/font/google";
import SessionProvider from "../SessionProvider";
import { getServerSession } from "next-auth";
import "../(CourseVideo)/globals.css";
import AdminNav from "./components/AdminNav";
import Breadcrumb from "./components/AdminBreadcrumb";

const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`${noto.className} flex h-screen bg-gray-100`}>
        <AdminNav />

        <main className="flex-1 p-4 overflow-auto">
          <div className="p-4 bg-white shadow-sm rounded-md">
            <Breadcrumb />
          </div>
          <SessionProvider session={session}>{children}</SessionProvider>
        </main>
      </body>
    </html>
  );
}
