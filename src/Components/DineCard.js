export default function DineCard({ RestData }) {
  return (
    <div className="w-72 sm:w-80 flex-none rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition">
      <a target="_blank" href={RestData.cta.link}>
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src={"https://media-assets.swiggy.com/swiggy/image/upload/" + RestData?.info?.mediaFiles[0]?.url}
            alt={RestData?.info?.name || "Restaurant"}
          />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent"></div>
          <p className="absolute bottom-3 left-3 text-lg text-white font-semibold">{RestData.info.name}</p>
          <p className="absolute bottom-3 right-3 text-sm bg-white/90 rounded-full px-2 py-1 font-semibold">
            {RestData?.info?.rating?.value}
          </p>
        </div>
      </a>
      <div className="p-3">
        <p className="text-sm text-gray-600">{RestData?.info?.cuisines?.join(", ")}</p>
        <p className="text-sm text-gray-500 mt-1">{RestData?.info?.locality}</p>
      </div>
    </div>
  );

}
