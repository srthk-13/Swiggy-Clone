import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItems, IncrementItems, DecrementItems } from "../Stored/CartSlicer";
import Shimmer from "./Shimmer";

function toCartPayload(product) {
  return {
    id: `insta-${product.id}`,
    name: product.title,
    description: product.description,
    imageId: product.thumbnail,
    price: Math.round((product.price || 0) * 100),
  };
}

export default function Instamart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartslice.items);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("https://dummyjson.com/products?limit=100");
        if (!response.ok) throw new Error("Unable to load Instamart items.");
        const data = await response.json();
        setProducts(data?.products ?? []);
      } catch (err) {
        setError(err?.message || "Something went wrong while loading products.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const all = Array.from(new Set(products.map((item) => item.category))).filter(Boolean);
    return ["all", ...all];
  }, [products]);

  const filteredProducts = useMemo(
    () =>
      products.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "all" || item.category === category;
        return matchesSearch && matchesCategory;
      }),
    [products, search, category]
  );

  const getQuantity = (id) => cartItems.find((item) => item.id === `insta-${id}`)?.quantity ?? 0;

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
        <h1 className="text-3xl sm:text-4xl font-bold">Instamart</h1>
        <p className="text-gray-600 mt-1">Grocery-style shopping with cart integration</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="Search products"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-gray-300 px-3 py-2 bg-white"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All categories" : item}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 p-8 text-center text-gray-600">
          No products found.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => {
            const quantity = getQuantity(product.id);
            const cartPayload = toCartPayload(product);

            return (
              <article key={product.id} className="rounded-2xl border border-gray-200 p-3 bg-white">
                <img
                  className="w-full h-40 object-cover rounded-xl bg-gray-100"
                  src={product.thumbnail}
                  alt={product.title}
                />
                <h3 className="text-lg font-semibold mt-3 h-14 overflow-hidden">{product.title}</h3>
                <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                <p className="text-xl font-bold mt-2 text-[#ff5200]">Rs. {product.price}</p>

                <div className="mt-3">
                  {quantity === 0 ? (
                    <button
                      className="w-full px-4 py-2 rounded-xl border border-green-600 text-green-700 font-semibold hover:bg-green-50"
                      onClick={() => dispatch(addItems(cartPayload))}
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="w-full inline-flex justify-center items-center rounded-xl overflow-hidden border border-gray-200">
                      <button
                        onClick={() => dispatch(DecrementItems(cartPayload))}
                        className="px-4 py-2 text-lg font-semibold hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-5 py-2 text-base font-semibold bg-gray-50">{quantity}</span>
                      <button
                        onClick={() => dispatch(IncrementItems(cartPayload))}
                        className="px-4 py-2 text-lg font-semibold hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
