export default function Grocerycard({ foodData }) {
  return (
    <div className="flex-none w-36 sm:w-40">
      <a href={foodData?.action?.link} className="block rounded-2xl border border-gray-200 p-2 bg-white hover:shadow-md transition">
        <img
          className="w-full h-28 sm:h-36 object-cover rounded-xl"
          src={"https://media-assets.swiggy.com/swiggy/image/upload/" + foodData?.imageId}
          alt={foodData?.action?.text || "Grocery"}
        ></img>
      </a>
      <h3 className="text-center font-semibold mt-2 text-sm sm:text-base">{foodData?.action?.text}</h3>
    </div>
  );
}
