"use client";

import { useAtom } from "jotai";
import { productGalleryAtom } from "../../lib/atoms/product-gallery.atom";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslations } from "next-intl";

export default function ProductGallery() {
  const [productGallery, setProductGallery] = useAtom(productGalleryAtom);
  const t = useTranslations("ProductsPage");

  if (!productGallery) {
    return null;
  }

  function onClose() {
    setProductGallery(null);
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onMouseDown={handleBackdropClick}
    >
      <div className="bg-white rounded-md max-w-6xl w-full max-h-[90vh] overflow-y-scroll md:overflow-hidden scrollbar shadow-2xl relative h-full md:h-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full p-2 shadow-lg"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row h-full">
          <div className="relative flex-1 flex">
            <div className="flex items-center justify-center flex-col p-4">
              <Carousel
                className="bg-linear-to-br from-amber-200 to-orange-200 p-4 rounded-md"
                opts={{ loop: true }}
              >
                <CarouselContent className="flex items-center">
                  {[
                    { url: productGallery.image },
                    ...productGallery.photos,
                  ].map(
                    (photo, idx) =>
                      photo?.url && (
                        <CarouselItem key={`product-gallery-photo-${idx}`}>
                          <Image
                            src={`/products/${photo.url}`}
                            alt={`Loop by Family product ${idx + 1}`}
                            width={600}
                            height={400}
                            className="object-cover w-auto h-auto aspect-square"
                            loading="eager"
                          />
                        </CarouselItem>
                      ),
                  )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          <div className="p-8 flex flex-none md:flex-1 flex-col md:overflow-y-scroll h-96 md:h-150 scrollbar">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {productGallery.name}
            </h2>

            {productGallery.length && (
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {`${t("length")}: ${productGallery.length}cm`}
              </h3>
            )}

            {productGallery.width && (
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {`${t("width")}: ${productGallery.width}cm`}
              </h3>
            )}

            {productGallery.diameter && (
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {`${t("diameter")}: ${productGallery.diameter}cm`}
              </h3>
            )}

            {productGallery.height && (
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {`${t("height")}: ${productGallery.height}cm`}
              </h3>
            )}

            <p
              className="text-gray-700 text-lg leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: productGallery.description ?? "",
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
}
