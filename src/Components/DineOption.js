import { dineoutRestaurants } from "../Utils/DineData";
import DineCard from "./DineCard";
import { Link } from "react-router";

export default function DineOption() {
  return (
    <section className="w-[92%] max-w-6xl mx-auto mt-14 pb-16">
      <div className="flex items-center justify-between gap-3">
        <p className="text-2xl sm:text-3xl font-bold">Discover best restaurants on Dineout</p>
        <Link to="/dineout" className="text-[#ff5200] font-semibold">
          View all
        </Link>
      </div>
      <div className="flex flex-nowrap overflow-x-auto mt-5 gap-4 pb-2">
        {dineoutRestaurants.map((RestData) => (
          <DineCard key={RestData?.info?.id} RestData={RestData}></DineCard>
        ))}
      </div>
    </section>
  );
}
