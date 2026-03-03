import MainPageSection from "@/components/main_page/Section";
import { getTranslations } from "next-intl/server";

export default async function Home() {

  const t = await getTranslations('HomePage');

  return (
      <main className="grow">
        <MainPageSection 
          sectionTitle={`${t('section_1.title')}`}
          sectionText={t('section_1.text')}
          sectionButtonText={t('section_1.button_text')}
          sectionClassName="from-amber-50 to-orange-50"
          imgClassName="from-amber-400 to-orange-400"
          bannerName="3.jfif"
        />
        
        <MainPageSection 
          sectionTitle={`${t('section_2.title')}`}
          sectionText={t('section_2.text')}
          imgSide="LEFT"
          sectionClassName="from-pink-50 to-rose-50"
          imgClassName="from-rose-400 to-pink-400"
          bannerName="1.jfif"
        />
        
        <MainPageSection 
          sectionTitle={`${t('section_3.title')}`}
          sectionText={t('section_3.text')}
          sectionButtonText={t('section_3.button_text')}
          imgSide="RIGHT"
          sectionClassName="from-blue-50 to-indigo-50"
          imgClassName="from-indigo-400 to-blue-400"
          bannerName="2.jfif"
        />
      </main>
  );
}