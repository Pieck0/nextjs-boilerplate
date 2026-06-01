import ProductsTable from "@/components/admin/products/ProductsTable";
import { trpc } from "@/trpc/server";

export default async function Products() {
  // Fetch initial data on the server
  await trpc.product.adminGetProducts({
    page: 0,
    limit: 10,
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-amber-700">Products</h1>
        <button className="px-6 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors">
          + Add Product
        </button>
      </div>

      {/* Products Table */}
      <ProductsTable />
    </div>
  );
}
