import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function RestHeader() {
  const counter = useSelector((state) => state.cartslice.count);

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/90 border-b border-gray-200">
      <div className="w-[92%] max-w-6xl mx-auto py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl sm:text-3xl font-black text-[#ff5200] tracking-tight">
          Swiggy Clone
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/restaurant"
            className="px-3 py-2 sm:px-4 rounded-xl text-sm sm:text-base text-gray-700 hover:bg-gray-100 transition"
          >
            Restaurants
          </Link>
          <Link
            to="/instamart"
            className="px-3 py-2 sm:px-4 rounded-xl text-sm sm:text-base text-gray-700 hover:bg-gray-100 transition"
          >
            Instamart
          </Link>
          <Link
            to="/dineout"
            className="px-3 py-2 sm:px-4 rounded-xl text-sm sm:text-base text-gray-700 hover:bg-gray-100 transition"
          >
            Dineout
          </Link>
          <Link
            to="/checkout"
            className="px-3 py-2 sm:px-4 rounded-xl bg-[#ff5200] text-white text-sm sm:text-base font-semibold"
          >
            Cart ({counter})
          </Link>
        </nav>
      </div>
    </header>
  );
}
