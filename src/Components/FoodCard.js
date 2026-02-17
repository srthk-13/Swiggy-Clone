export default function Foodcard({ foodData }) {
  return (
    <a
      href={foodData?.action?.link}
      className="rounded-2xl border border-gray-200 p-2 bg-white hover:shadow-md transition"
    >
      <img
        className="w-full h-28 sm:h-36 object-cover rounded-xl"
        src={"https://media-assets.swiggy.com/swiggy/image/upload/" + foodData?.imageId}
        alt={foodData?.action?.text || "Food category"}
      ></img>
    </a>
  );
}
