import { useDispatch, useSelector } from "react-redux";
import { addItems, IncrementItems, DecrementItems } from "../Stored/CartSlicer";

function getItemPrice(restData) {
  return ("defaultPrice" in restData ? restData?.defaultPrice : restData?.price || 0) / 100;
}

export default function RestInfo({ restData }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cartslice.items);

  const element = items.find((item) => item.id === restData.id);
  const count = element ? element.quantity : 0;

  function handleAdditems() {
    dispatch(addItems(restData));
  }

  function handleIncrementItems() {
    dispatch(IncrementItems(restData));
  }

  function handleDecrementItems() {
    dispatch(DecrementItems(restData));
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row w-full justify-between mb-2 pb-2 gap-5">
        <div className="sm:w-[70%]">
          <p className="text-xl sm:text-2xl text-gray-700 font-semibold mb-1">{restData?.name}</p>
          <p className="text-lg sm:text-xl font-semibold text-gray-800">Rs. {getItemPrice(restData).toFixed(2)}</p>
          <div className="text-sm sm:text-base mt-1">
            <span className="text-green-700 font-semibold">{restData?.ratings?.aggregatedRating?.rating}</span>
            <span className="text-gray-500 ml-1">
              ({restData?.ratings?.aggregatedRating?.ratingCountV2 || "No ratings"})
            </span>
          </div>
          <p className="text-gray-600 mt-2">{restData?.description}</p>
        </div>

        <div className="sm:w-[22%] relative h-40 sm:h-42">
          <img
            className="w-full h-36 object-cover rounded-2xl bg-gray-100"
            src={"https://media-assets.swiggy.com/swiggy/image/upload/" + restData.imageId}
            alt={restData?.name || "dish"}
          ></img>
          {count === 0 ? (
            <button
              className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-xl text-lg text-green-600 px-6 py-2 shadow-md border border-white bg-white font-semibold"
              onClick={handleAdditems}
            >
              ADD
            </button>
          ) : (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4 text-xl text-green-600 px-5 py-2 shadow-md border border-white bg-white rounded-xl font-semibold">
              <button onClick={handleDecrementItems}>-</button>
              <span>{count}</span>
              <button onClick={handleIncrementItems}>+</button>
            </div>
          )}
        </div>
      </div>
      <hr className="mb-6 mt-2 text-gray-200"></hr>
    </>
  );
}
