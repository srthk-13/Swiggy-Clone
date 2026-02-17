export default function Shimmer({ count = 8 }) {
  return (
    <div className="w-[92%] max-w-6xl mx-auto mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-2xl border border-gray-200 p-3 animate-pulse">
          <div className="w-full h-44 rounded-xl bg-gray-200"></div>
          <div className="mt-4 h-6 rounded bg-gray-200"></div>
          <div className="mt-3 h-5 w-2/3 rounded bg-gray-200"></div>
          <div className="mt-3 h-5 w-1/2 rounded bg-gray-200"></div>
        </div>
      ))}
    </div>
  );
}
