import Header from "./Header";
import FoodOption from "./FoodOption";
import GroceryOption from "./GroceryOption";
import DineOption from "./DineOption";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-orange-50 via-white to-white min-h-screen">
      <Header></Header>
      <FoodOption></FoodOption>
      <GroceryOption></GroceryOption>
      <DineOption></DineOption>
      <Footer></Footer>
    </div>
  );
}
