export default function ProcessCard({
  idx,
  title,
  description,
}: {
  idx: number;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl font-bold text-amber-600">{idx}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
