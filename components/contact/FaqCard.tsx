export default function FaqCard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-bold text-gray-900 mb-3">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  );
}
