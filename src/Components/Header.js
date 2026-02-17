import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-[#ff5200] text-white">
      <div className="w-[92%] max-w-6xl mx-auto py-5 flex items-center justify-between gap-3">
        <img
          className="w-32 sm:w-40 h-10 sm:h-12 object-contain"
          src="https://res.cloudinary.com/dutdah0l9/image/upload/v1720058694/Swiggy_logo_bml6he.png"
          alt="Swiggy"
        ></img>
        <div className="hidden lg:flex text-sm font-semibold gap-8 items-center">
          <a target="_blank" href="https://www.swiggy.com/corporate/">
            Swiggy Corporate
          </a>
          <a target="_blank" href="https://partner.swiggy.com/login#/swiggy">
            Partner with Us
          </a>
          <a className="border border-white py-2 px-4 rounded-xl" target="_blank" href="https://www.swiggy.com/corporate/">
            Get The App
          </a>
          <a className="border border-black bg-black py-2 px-4 rounded-xl" target="_blank" href="https://www.swiggy.com/corporate/">
            Sign in
          </a>
        </div>
      </div>

      <div className="pt-10 pb-12 relative overflow-hidden">
        <img
          className="hidden md:block h-96 w-52 absolute top-0 left-0 opacity-90"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
          alt=""
        ></img>
        <img
          className="hidden md:block h-96 w-52 absolute top-0 right-0 opacity-90"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
          alt=""
        ></img>

        <div className="w-[92%] max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl font-black leading-tight">
            Order food and groceries. Discover best restaurants.
          </h1>
          <p className="mt-4 text-orange-100 text-lg">React + Tailwind + Live API experience</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <input className="bg-white text-gray-800 w-full text-lg px-5 py-3 rounded-xl" placeholder="Delhi, India"></input>
            <input
              className="bg-white text-gray-800 w-full text-lg px-5 py-3 rounded-xl"
              placeholder="Search for restaurants and dishes"
            ></input>
          </div>
          <div className="mt-6">
            <Link
              to="/restaurant"
              className="inline-block bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
            >
              Explore Restaurants
            </Link>
          </div>
        </div>
      </div>

      <div className="w-[92%] max-w-6xl mx-auto pb-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        <Link to="/restaurant">
          <img
            className="rounded-2xl"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/1/fa01e85b-3057-482d-9523-5289722b1df2_Food4BU.png"
            alt="Food delivery"
          ></img>
        </Link>
        <Link to="/instamart">
          <img
            className="rounded-2xl"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/16/ca34e375-f1bd-4a2e-a3e7-0a20833be83b_IM4BU1.png"
            alt="Instamart"
          ></img>
        </Link>
        <Link to="/dineout">
          <img
            className="rounded-2xl"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/1/76c30e5a-8adb-4795-bf5b-fa64e9e9e1d3_DO4BU.png"
            alt="Dineout"
          ></img>
        </Link>
        <a href="https://www.swiggy.com/genie">
          <img
            className="rounded-2xl"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/31/14033c0b-8907-420b-b72a-d26cfa68dc7b_Genie4BU.png"
            alt="Genie"
          ></img>
        </a>
      </div>
    </header>
  );
}
