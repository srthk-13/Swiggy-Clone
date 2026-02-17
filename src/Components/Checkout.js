import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { IncrementItems, DecrementItems, removeItem, clearCart } from "../Stored/CartSlicer";

const SWIGGY_CDN = "https://media-assets.swiggy.com/swiggy/image/upload/";

function getItemUnitPrice(item) {
  return (item?.defaultPrice ?? item?.price ?? 0) / 100;
}

function resolveImage(item) {
  const imageId = item?.imageId;
  if (!imageId) return "";
  if (typeof imageId === "string" && (imageId.startsWith("http://") || imageId.startsWith("https://"))) {
    return imageId;
  }
  return SWIGGY_CDN + imageId;
}

export default function Checkout() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cartslice.items);

  const totalAmount = items.reduce((sum, item) => {
    const unitPrice = getItemUnitPrice(item);
    return sum + unitPrice * (item?.quantity ?? 0);
  }, 0);

  return (
    <div className="w-[92%] max-w-5xl mx-auto my-10 sm:my-14">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Checkout</h1>
        <div className="flex items-center gap-3">
          <Link
            to="/restaurant"
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Add more items
          </Link>
          {items.length > 0 && (
            <button
              onClick={() => dispatch(clearCart())}
              className="px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-gray-100 border border-gray-200 rounded-2xl p-10 text-center text-gray-600 text-xl">
          <p className="mb-4">No items in cart.</p>
          <Link
            to="/restaurant"
            className="inline-block px-5 py-2 rounded-xl bg-[#ff5200] text-white font-semibold"
          >
            Browse Restaurants
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {items.map((item) => {
            const unitPrice = getItemUnitPrice(item);
            const quantity = item?.quantity ?? 0;
            const lineTotal = unitPrice * quantity;

            return (
              <div
                key={item?.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row gap-4 sm:gap-5"
              >
                <div className="w-28 h-24 sm:w-32 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  {item?.imageId ? (
                    <img
                      className="w-full h-full object-cover"
                      src={resolveImage(item)}
                      alt={item?.name || "Food item"}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-500 px-2 text-center">
                      No image
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-lg sm:text-2xl font-semibold text-gray-800 truncate">
                    {item?.name}
                  </p>
                  <div className="mt-2 text-gray-600">
                    <p className="text-base sm:text-lg">Unit Price: Rs. {unitPrice.toFixed(2)}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="inline-flex items-center rounded-xl overflow-hidden border border-gray-200">
                      <button
                        onClick={() => dispatch(DecrementItems(item))}
                        className="px-3 py-2 text-lg font-semibold hover:bg-gray-100 transition"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-base font-semibold bg-gray-50">{quantity}</span>
                      <button
                        onClick={() => dispatch(IncrementItems(item))}
                        className="px-3 py-2 text-lg font-semibold hover:bg-gray-100 transition"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeItem(item))}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right self-end sm:self-center">
                  <p className="text-sm text-gray-500">Item Total</p>
                  <p className="text-lg sm:text-2xl font-bold text-[#ff5200]">
                    Rs. {lineTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="bg-[#fff7f3] border border-[#ffd8c3] rounded-2xl p-5 flex justify-between items-center">
            <p className="text-xl sm:text-2xl font-semibold text-gray-800">Grand Total</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#ff5200]">
              Rs. {totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
