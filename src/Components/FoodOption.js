import { imageGridCards } from "../Utils/FoodData";
import Foodcard from "./FoodCard";

export default function FoodOption() {
  return (
    <section className="w-[92%] max-w-6xl mx-auto mt-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-5">Whats on your mind?</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {imageGridCards.map((foodData) => (
          <Foodcard key={foodData.id} foodData={foodData}></Foodcard>
        ))}
      </div>
    </section>
  );
}
