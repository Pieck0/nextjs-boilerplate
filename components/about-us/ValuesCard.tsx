import { JSX } from "react";

export default function ValuesCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: JSX.Element;
}) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
      {children}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
