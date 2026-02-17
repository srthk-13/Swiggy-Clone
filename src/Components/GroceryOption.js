import { GrocerGridCard } from "../Utils/Grocery";
import Grocerycard from "./GroceryCard";
import { Link } from "react-router";

export default function GroceryOption() {
  return (
    <section className="w-[92%] max-w-6xl mx-auto mt-14">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold">Shop Groceries on Instamart</h2>
        <Link to="/instamart" className="text-[#ff5200] font-semibold">
          View all
        </Link>
      </div>
      <div className="flex flex-nowrap overflow-x-auto mt-5 gap-4 pb-2">
        {GrocerGridCard.map((foodData) => (
          <Grocerycard key={foodData.id} foodData={foodData}></Grocerycard>
        ))}
      </div>
    </section>
  );
}
