import { useEffect, useState } from "react";
import RestCard from "./RestCard";
import Shimmer from "./Shimmer";

export default function Restaurant() {
  const [RestData, setRestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const filteredRestaurants = RestData.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === "rating") {
      return (Number(b?.info?.avgRating) || 0) - (Number(a?.info?.avgRating) || 0);
    }
    if (sortBy === "delivery") {
      return (Number(a?.info?.sla?.deliveryTime) || 999) - (Number(b?.info?.sla?.deliveryTime) || 999);
    }
    return 0;
  });

  async function fetchData() {
    try {
      setLoading(true);
      setError("");
      const proxyServer = "https://cors-anywhere.herokuapp.com/";
      const swiggyAPI =
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true";

      const response = await fetch(proxyServer + swiggyAPI);
      if (!response.ok) {
        throw new Error("Unable to fetch restaurants right now.");
      }

      const data = await response.json();
      const restaurants = data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants ?? [];
      setRestData(restaurants);
    } catch (err) {
      setError(err?.message || "Something went wrong while loading restaurants.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Shimmer count={12}></Shimmer>;

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
    <section className="w-[92%] max-w-6xl mx-auto mt-8 mb-10">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-7">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Restaurants Near You</h1>
          <p className="text-gray-600 mt-1">Live listings powered by Swiggy API</p>
        </div>
        <div className="flex gap-3">
          <input
            className="min-w-0 flex-1 sm:w-72 rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            placeholder="Search restaurants"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select
            className="rounded-xl border border-gray-300 px-3 py-2 bg-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="rating">Top Rated</option>
            <option value="delivery">Fast Delivery</option>
          </select>
        </div>
      </div>

      {sortedRestaurants.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 p-10 text-center text-gray-600 text-lg">
          No restaurants matched your search.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedRestaurants.map((restInfo) => (
            <RestCard key={restInfo?.info?.id} restInfo={restInfo}></RestCard>
          ))}
        </div>
      )}
    </section>
  );

}
