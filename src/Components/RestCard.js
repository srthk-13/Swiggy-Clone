import { Link } from "react-router";

export default function RestCard({ restInfo }) {
  return (
    <Link to={"/city/delhi/" + restInfo?.info?.id}>
      <article className="h-full rounded-2xl border border-gray-200 p-3 transition duration-200 hover:shadow-lg hover:-translate-y-1 bg-white">
        <img
          className="w-full h-44 object-cover rounded-xl"
          src={"https://media-assets.swiggy.com/swiggy/image/upload/" + restInfo?.info?.cloudinaryImageId}
          alt={restInfo?.info?.name || "Restaurant"}
        ></img>
        <div className="mt-3">
          <div className="font-bold text-xl leading-tight h-14 overflow-hidden">{restInfo?.info?.name}</div>
          <div className="flex items-center gap-2 mt-2">
            <svg
              className="w-5 h-5 fill-green-600"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.645 1.605-.645 1.905 0l1.525 3.78 4.173.605c.738.107 1.035 1.012.5 1.534l-3.016 2.942.712 4.15c.127.74-.651 1.299-1.305.95l-3.726-1.962-3.726 1.962c-.654.35-1.432-.21-1.305-.95l.712-4.15-3.016-2.942c-.535-.522-.238-1.427.5-1.534l4.173-.605L9.049 2.927z" />
            </svg>
            <span className="font-semibold">{restInfo?.info?.avgRating || "N/A"}</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-700">{restInfo?.info?.sla?.slaString}</span>
          </div>
          <div className="text-gray-600 mt-2 h-12 overflow-hidden">{restInfo?.info?.cuisines?.join(", ")}</div>
          <div className="text-sm text-gray-500 mt-1">{restInfo?.info?.areaName}</div>
        </div>
      </article>
    </Link>
  );
}
