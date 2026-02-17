import { useState } from "react";
import RestInfo from "./RestInfo";

export default function MenuCard({ menuItems, foodselected }) {
  const [isOpen, setIsOpen] = useState(true);

  if ("categories" in menuItems) {
    return (
      <div className="w-full mb-8">
        <p className="text-2xl font-bold mb-4">{menuItems.title}</p>
        <div className="space-y-5">
          {menuItems?.categories?.map((items) => (
            <MenuCard key={items?.title} menuItems={items} foodselected={foodselected}></MenuCard>
          ))}
        </div>
      </div>
    );
  }

  const itemCards = menuItems?.itemCards ?? [];
  const displayedItems =
    foodselected === "veg"
      ? itemCards.filter((food) => "isVeg" in food?.card?.info)
      : foodselected === "nonveg"
      ? itemCards.filter((food) => !("isVeg" in food?.card?.info))
      : itemCards;

  return (
    <div className="w-full mb-6 border border-gray-200 rounded-2xl p-4 sm:p-5 bg-white">
      <div className="flex justify-between items-center w-full">
        <p className="text-2xl sm:text-3xl font-bold">{menuItems.title}</p>
        <button
          className="text-2xl font-bold w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "-" : "+"}
        </button>
      </div>

      {isOpen && (
        <div className="mt-5">
          {displayedItems.length === 0 ? (
            <p className="text-gray-500">No dishes found for this filter.</p>
          ) : (
            displayedItems.map((items) => (
              <RestInfo key={items?.card?.info?.id} restData={items?.card?.info}></RestInfo>
            ))
          )}
        </div>
      )}
    </div>
  );
}
