export default function TeamCard({
  name,
  role,
  bio,
  imageContainerClassName,
}: {
  name: string;
  role: string;
  bio: string;
  imageContainerClassName?: string;
}) {
  return (
    <div className="text-center">
      <div
        className={`w-48 h-48 bg-linear-to-br rounded-full mx-auto mb-6 flex items-center justify-center ${imageContainerClassName ?? ""}`}
      >
        <svg
          className="w-24 h-24 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
      <p className="text-amber-600 font-semibold mb-3">{role}</p>
      <p className="text-gray-600">{bio}</p>
    </div>
  );
}
