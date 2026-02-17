import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MenuCard from "./MenuCard";
import { Link } from "react-router";
import Shimmer from "./Shimmer";

export default function RestaurantMenu() {
  let { id } = useParams();
  const [selected, setSelected] = useState(null);
  const [RestData, setRestData] = useState([]);
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
        throw new Error("Unable to fetch menu right now.");
      }

      const data = await response.json();
      const tempData = data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? [];
      const filterData = tempData.filter((items) => "title" in items?.card?.card);
      setRestData(filterData);
    } catch (err) {
      setError(err?.message || "Failed to load restaurant menu.");
      setRestData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

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
    <div className="w-[92%] max-w-6xl mx-auto my-10">
      <div className="rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 p-5 sm:p-6">
        <Link to={`/city/delhi/${id}/search`}>
          <p className="w-full text-center py-3 rounded-xl bg-white border border-gray-200 text-lg sm:text-xl font-semibold hover:shadow-sm transition">
            Search dishes in this restaurant
          </p>
        </Link>
      </div>

      <div className="mt-8 mb-10 flex gap-3">
        <button
          className={`text-base sm:text-lg py-2 px-6 border rounded-xl font-semibold transition ${
            selected === "veg" ? "bg-green-600 text-white border-green-600" : "bg-white border-gray-300"
          }`}
          onClick={() => setSelected(selected === "veg" ? null : "veg")}
        >
          Veg
        </button>
        <button
          className={`text-base sm:text-lg py-2 px-6 border rounded-xl font-semibold transition ${
            selected === "nonveg" ? "bg-red-500 text-white border-red-500" : "bg-white border-gray-300"
          }`}
          onClick={() => setSelected(selected === "nonveg" ? null : "nonveg")}
        >
          Non Veg
        </button>
      </div>

      <div>
        {RestData.map((menuItems) => (
          <MenuCard
            key={menuItems?.card?.card?.title}
            menuItems={menuItems?.card?.card}
            foodselected={selected}
          ></MenuCard>
        ))}
      </div>
    </div>
  );

}
