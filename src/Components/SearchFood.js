import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addItems, IncrementItems, DecrementItems } from "../Stored/CartSlicer";
import Shimmer from "./Shimmer";

const SWIGGY_CDN = "https://media-assets.swiggy.com/swiggy/image/upload/";

function getItemPrice(item) {
  return (item?.defaultPrice ?? item?.price ?? 0) / 100;
}

export default function SearchFood() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartslice.items);

  const [food, setFood] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchData() {
    try {
      setLoading(true);
      setError("");

      const proxyServer = "https://cors-anywhere.herokuapp.com/";
      const swiggyAPI = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=${id}`;
      const response = await fetch(proxyServer + swiggyAPI);
      if (!response.ok) {
        throw new Error("Unable to fetch menu items right now.");
      }

      const data = await response.json();
      const tempData = data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? [];
      const menuCategories = tempData.filter((items) => "title" in items?.card?.card);

      const flatItems = menuCategories.flatMap((category) =>
        (category?.card?.card?.itemCards ?? []).map((entry) => entry?.card?.info).filter(Boolean)
      );

      setMenuItems(flatItems);
    } catch (err) {
      setError(err?.message || "Something went wrong while loading menu items.");
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  const filteredItems = useMemo(
    () => menuItems.filter((item) => item?.name?.toLowerCase().includes(food.toLowerCase())),
    [menuItems, food]
  );

  const getQuantity = (itemId) => cartItems.find((item) => item.id === itemId)?.quantity ?? 0;

  if (loading) return <Shimmer count={8}></Shimmer>;

  if (error) {
    return (
      <div className="w-[92%] max-w-3xl mx-auto mt-14 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-xl text-red-600 font-semibold">{error}</p>
        <button
          className="mt-4 px-5 py-2 rounded-xl bg-[#ff5200] text-white font-semibold"
          onClick={fetchData}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="w-[92%] max-w-6xl mx-auto my-10">
      <div className="mb-7">
        <h1 className="text-3xl sm:text-4xl font-bold">Search Dishes</h1>
        <p className="text-gray-600 mt-1">Find items quickly and add them to cart</p>
      </div>

      <input
        className="w-full pl-5 py-3 text-lg bg-white rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
        placeholder="Search by dish name"
        value={food}
        onChange={(e) => setFood(e.target.value)}
      ></input>

      <div className="mt-8 space-y-4">
        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 p-8 text-center text-gray-600">
            No dishes found.
          </div>
        ) : (
          filteredItems.map((item) => {
            const quantity = getQuantity(item.id);
            return (
              <div
                key={item?.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                {item?.imageId ? (
                  <img
                    className="w-full sm:w-32 h-28 object-cover rounded-xl bg-gray-100"
                    src={SWIGGY_CDN + item?.imageId}
                    alt={item?.name || "dish"}
                  ></img>
                ) : (
                  <div className="w-full sm:w-32 h-28 rounded-xl bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                    No image
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xl font-semibold text-gray-800">{item?.name}</p>
                  <p className="text-gray-600 mt-1">Rs. {getItemPrice(item).toFixed(2)}</p>
                  {item?.description && <p className="text-sm text-gray-500 mt-1">{item?.description}</p>}
                </div>
                {quantity === 0 ? (
                  <button
                    className="px-5 py-2 rounded-xl border border-green-600 text-green-700 font-semibold hover:bg-green-50"
                    onClick={() => dispatch(addItems(item))}
                  >
                    ADD
                  </button>
                ) : (
                  <div className="inline-flex items-center rounded-xl overflow-hidden border border-gray-200">
                    <button
                      onClick={() => dispatch(DecrementItems(item))}
                      className="px-3 py-2 text-lg font-semibold hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-base font-semibold bg-gray-50">{quantity}</span>
                    <button
                      onClick={() => dispatch(IncrementItems(item))}
                      className="px-3 py-2 text-lg font-semibold hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
