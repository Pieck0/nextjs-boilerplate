import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function ProductsPage() {
  const t = await getTranslations("ProductsPage");

  // Sample product data - in a real app, this would come from a database
  const products = [
    {
      id: 1,
      name: t("product_beanie_name"),
      category: t("category_hats"),
      price: "89.99",
      image: "/images/products/beanie.jpg",
      description: t("product_beanie_desc"),
    },
    {
      id: 2,
      name: t("product_scarf_name"),
      category: t("category_scarves"),
      price: "119.99",
      image: "/images/products/scarf.jpg",
      description: t("product_scarf_desc"),
    },
    {
      id: 3,
      name: t("product_mittens_name"),
      category: t("category_gloves"),
      price: "69.99",
      image: "/images/products/mittens.jpg",
      description: t("product_mittens_desc"),
    },
    {
      id: 4,
      name: t("product_booties_name"),
      category: t("category_footwear"),
      price: "79.99",
      image: "/images/products/booties.jpg",
      description: t("product_booties_desc"),
    },
    {
      id: 5,
      name: t("product_sweater_name"),
      category: t("category_clothing"),
      price: "199.99",
      image: "/images/products/sweater.jpg",
      description: t("product_sweater_desc"),
    },
    {
      id: 6,
      name: t("product_blanket_name"),
      category: t("category_blankets"),
      price: "249.99",
      image: "/images/products/blanket.jpg",
      description: t("product_blanket_desc"),
    },
  ];

  return (
    <div className="grow">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-amber-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t("hero_title")}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              {t("hero_subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      {/* <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-semibold">{t('filter_by')}:</span>
              <select className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none">
                <option value="all">{t('filter_all')}</option>
                <option value="hats">{t('category_hats')}</option>
                <option value="scarves">{t('category_scarves')}</option>
                <option value="gloves">{t('category_gloves')}</option>
                <option value="footwear">{t('category_footwear')}</option>
                <option value="clothing">{t('category_clothing')}</option>
                <option value="blankets">{t('category_blankets')}</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-semibold">{t('sort_by')}:</span>
              <select className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none">
                <option value="featured">{t('sort_featured')}</option>
                <option value="price-low">{t('sort_price_low')}</option>
                <option value="price-high">{t('sort_price_high')}</option>
                <option value="newest">{t('sort_newest')}</option>
              </select>
            </div>
          </div>
        </div>
      </section> */}

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative h-80 bg-linear-to-br from-amber-200 to-orange-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/banners/3.jfif"
                      alt="Loop by Family story"
                      width={600}
                      height={400}
                      className="object-fit"
                    />
                    {/* <svg className="w-32 h-32 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg> */}
                  </div>
                  {/* <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </div> */}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-amber-600">
                      {product.price} {t("currency")}
                    </span>
                    {/* <button className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                      {t("add_to_cart")}
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-linear-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("features_title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t("feature_quality_title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("feature_quality_desc")}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t("feature_eco_title")}
              </h3>
              <p className="text-gray-600 text-sm">{t("feature_eco_desc")}</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t("feature_shipping_title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("feature_shipping_desc")}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t("feature_handmade_title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("feature_handmade_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Orders CTA */}
      <section className="py-20 bg-linear-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t("custom_title")}
          </h2>
          <p className="text-xl text-amber-50 mb-8">
            {t("custom_description")}
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-amber-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-50 transition-colors shadow-xl"
          >
            {t("custom_button")}
          </a>
        </div>
      </section>
    </div>
  );
}
