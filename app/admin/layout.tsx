import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { BsBox } from "react-icons/bs";

async function Sidebar() {
  const t = await getTranslations("AdminLayout");

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-amber-500">Loop By Family</h1>
      </div>

      {/* Navigation */}
      <nav className="p-6 space-y-2">
        <Link
          href="/admin/products"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
        >
          <BsBox />
          <span className="font-semibold">{t("products")}</span>
        </Link>
      </nav>
    </aside>
  );
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 w-full min-h-screen bg-linear-to-br from-amber-50 to-orange-50">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
