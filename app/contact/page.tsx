import FaqCard from "@/components/contact/FaqCard";
import { getTranslations } from "next-intl/server";

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");

  return (
    <div className="grow">
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

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-1">

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t("info_title")}
              </h2>
              <p className="text-gray-600 mb-8">{t("info_description")}</p>

              <div className="space-y-6 grid md:grid-cols-3">
                {/* Email */}
                <div className="flex items-start">
                  <div className="shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {t("info_email_title")}
                    </h3>
                    <a
                      href="mailto:hello@loopbyfamily.com"
                      className="text-amber-600 hover:text-amber-700"
                    >
                      hello@loopbyfamily.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {t("info_phone_title")}
                    </h3>
                    <a
                      href="tel:+48123456789"
                      className="text-amber-600 hover:text-amber-700"
                    >
                      +48 123 456 789
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex items-start">
                  <div className="shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-amber-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {t("info_social_title")}
                    </h3>
                    <a
                      href="https://www.instagram.com/loopbyfamily/"
                      target="_blank"
                      className="text-amber-600 hover:text-amber-700"
                    >
                      @loopbyfamily
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-linear-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("faq_title")}
            </h2>
            <p className="text-xl text-gray-600">{t("faq_subtitle")}</p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <FaqCard
              question={t("faq_q1")}
              answer={t("faq_a1")}
            />
            <FaqCard
              question={t("faq_q2")}
              answer={t("faq_a2")}
            />
            <FaqCard
              question={t("faq_q3")}
              answer={t("faq_a3")}
            />
            <FaqCard
              question={t("faq_q4")}
              answer={t("faq_a4")}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
