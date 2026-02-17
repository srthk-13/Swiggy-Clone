import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import Shimmer from "./Shimmer";

export default function Dineout() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [bookings, setBookings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");
        const proxyServer = "https://cors-anywhere.herokuapp.com/";
        const swiggyAPI =
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true";
        const response = await fetch(proxyServer + swiggyAPI);
        if (!response.ok) throw new Error("Unable to load dineout listings.");
        const data = await response.json();
        const list = data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants ?? [];
        setRestaurants(list);
      } catch (err) {
        setError(err?.message || "Failed to fetch dineout data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filtered = useMemo(
    () =>
      restaurants.filter((item) => {
        const name = item?.info?.name?.toLowerCase() || "";
        const cuisines = item?.info?.cuisines?.join(" ").toLowerCase() || "";
        const q = search.toLowerCase();
        return name.includes(q) || cuisines.includes(q);
      }),
    [restaurants, search]
  );

  const sorted = useMemo(() => {
    const cloned = [...filtered];
    if (sortBy === "rating") {
      return cloned.sort((a, b) => (Number(b?.info?.avgRating) || 0) - (Number(a?.info?.avgRating) || 0));
    }
    if (sortBy === "delivery") {
      return cloned.sort(
        (a, b) => (Number(a?.info?.sla?.deliveryTime) || 999) - (Number(b?.info?.sla?.deliveryTime) || 999)
      );
    }
    return cloned;
  }, [filtered, sortBy]);

  const toggleBooking = (id) =>
    setBookings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

  if (loading) return <Shimmer count={10}></Shimmer>;

  if (error) {
    return (
      <div className="w-[92%] max-w-3xl mx-auto mt-14 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-xl text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <section className="w-[92%] max-w-6xl mx-auto my-10">
      <div className="mb-7">
        <h1 className="text-3xl sm:text-4xl font-bold">Dineout</h1>
        <p className="text-gray-600 mt-1">Find restaurants and book your table instantly</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="Search by restaurant or cuisine"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-gray-300 px-3 py-2 bg-white"
        >
          <option value="rating">Top Rated</option>
          <option value="delivery">Nearby Fastest</option>
        </select>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 p-8 text-center text-gray-600">
          No dineout listings found.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((item) => {
            const id = item?.info?.id;
            const booked = bookings[id];
            return (
              <article key={id} className="rounded-2xl border border-gray-200 p-3 bg-white">
                <img
                  className="w-full h-40 object-cover rounded-xl bg-gray-100"
                  src={"https://media-assets.swiggy.com/swiggy/image/upload/" + item?.info?.cloudinaryImageId}
                  alt={item?.info?.name || "Restaurant"}
                />
                <h3 className="text-lg font-semibold mt-3 h-14 overflow-hidden">{item?.info?.name}</h3>
                <p className="text-sm text-gray-500 h-10 overflow-hidden">{item?.info?.cuisines?.join(", ")}</p>
                <div className="mt-2 text-sm text-gray-700">
                  <span className="font-semibold text-green-700">{item?.info?.avgRating || "N/A"}</span>
                  <span className="mx-2">|</span>
                  <span>{item?.info?.areaName}</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => toggleBooking(id)}
                    className={`flex-1 px-3 py-2 rounded-xl font-semibold border transition ${
                      booked
                        ? "bg-green-600 text-white border-green-600"
                        : "border-[#ff5200] text-[#ff5200] hover:bg-orange-50"
                    }`}
                  >
                    {booked ? "Table Booked" : "Book Table"}
                  </button>
                  <Link
                    to={`/city/delhi/${id}`}
                    className="px-3 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Menu
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
