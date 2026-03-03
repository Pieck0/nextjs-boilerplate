import ProcessCard from "@/components/about-us/ProcessCard";
import TeamCard from "@/components/about-us/TeamCard";
import ValuesSection from "@/components/about-us/ValuesCard";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function AboutPage() {
  const t = await getTranslations("AboutPage");

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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t("story_title")}
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>{t("story_paragraph_1")}</p>
                <p>{t("story_paragraph_2")}</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/banners/2.png"
                alt="Loop by Family story"
                width={600}
                height={400}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-linear-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("values_title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("values_subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ValuesSection
              title={t("value_quality_title")}
              description={t("value_quality_description")}
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
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
            </ValuesSection>

            <ValuesSection
              title={t("value_sustainability_title")}
              description={t("value_sustainability_description")}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
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
            </ValuesSection>
            
            <ValuesSection
              title={t("value_love_title")}
              description={t("value_love_description")}
            >
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6">
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
            </ValuesSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("process_title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("process_subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ProcessCard idx={1} title={t("process_step1_title")} description={t("process_step1_description")} />
            <ProcessCard idx={2} title={t("process_step2_title")} description={t("process_step2_description")} />
            <ProcessCard idx={3} title={t("process_step3_title")} description={t("process_step3_description")} />
          </div>
        </div>
      </section>

      <section className="py-20 bg-linear-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("team_title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("team_subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <TeamCard  name={t("team_member1_name")} role={t("team_member1_role")} bio={t("team_member1_bio")} imageContainerClassName="from-amber-300 to-orange-300"/>
            <TeamCard  name={t("team_member2_name")} role={t("team_member2_role")} bio={t("team_member2_bio")} imageContainerClassName="from-rose-300 to-pink-300"/>
          </div>
        </div>
      </section>

      <section className="py-20 bg-linear-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t("cta_title")}
          </h2>
          <p className="text-xl text-amber-50 mb-8">{t("cta_subtitle")}</p>
          <a
            href="/products"
            className="inline-block bg-white text-amber-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-50 transition-colors shadow-xl"
          >
            {t("cta_button")}
          </a>
        </div>
      </section>
    </div>
  );
}
