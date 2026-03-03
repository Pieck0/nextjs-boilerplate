import Image from "next/image";

export default function MainPageSection({
  sectionTitle,
  sectionText,
  sectionButtonText,
  sectionClassName,
  imgClassName,
  imgSide = "RIGHT",
  bannerName,
}: {
  sectionTitle?: string;
  sectionText?: string;
  sectionButtonText?: string;
  sectionClassName?: string;
  imgClassName?: string;
  imgSide?: "LEFT" | "RIGHT";
  bannerName?: string;
}) {
  return (
    <section
      id="home"
      className={`min-h-screen flex items-center bg-linear-to-br bg-slate-50 ${sectionClassName ?? ""}`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={imgSide === "RIGHT" ? "order-last" : "order-first"}>
            <div
              className={`bg-linear-to-br ${imgClassName ?? ""} rounded-3xl h-96 flex items-center justify-center shadow-2xl`}
            >
              <div className="text-center text-white">
                {
                  bannerName&& (
                <Image
                  src={`/banners/${bannerName}`}
                  alt="Cozy handcrafted wooly accessories for children"
                  width={800}
                  height={600}
                  className="w-full h-96 object-cover"
                  priority
                />
                  )
                }
              </div>
            </div>
          </div>
          <div>
            {sectionTitle && (
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                {sectionTitle}
              </h2>
            )}
            {sectionText && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {sectionText}
              </p>
            )}
            {sectionButtonText && (
              <button className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors shadow-lg">
                {sectionButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
