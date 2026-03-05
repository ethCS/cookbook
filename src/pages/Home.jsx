import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mealdb } from "../services/mealdb";

export default function Home() {
  const [query, setQuery] = useState("");
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const [meals, cats] = await Promise.all([
        mealdb.getRandomMultiple(8),
        mealdb.getCategories(),
      ]);
      setFeatured(meals);
      setCategories(cats.slice(0, 10));
      setLoading(false);
    };
    load();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="min-h-screen bg-stone-950">

      {/* Hero */}
      <section className="relative px-6 pt-24 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/40 via-stone-950 to-stone-950 pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Your personal cookbook
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-stone-100 tracking-tight leading-tight mb-6">
            Cook something<br />
            <span className="text-amber-400">worth remembering.</span>
          </h1>
          <p className="text-stone-400 text-lg mb-10 leading-relaxed">
            Discover thousands of recipes, save your favorites, and build your own collection.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-3 max-w-lg mx-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any dish, ingredient..."
              className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-5 py-3.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 mb-5">
          Browse by category
        </h2>
        <div className="flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.idCategory}
              onClick={() => navigate(`/search?category=${encodeURIComponent(cat.strCategory)}`)}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 rounded-full text-sm text-stone-300 transition-colors"
            >
              {cat.strCategory}
            </button>
          ))}
        </div>
      </section>

      {/* Featured recipes */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 mb-6">
          Discover recipes
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-stone-900 rounded-2xl aspect-square animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((meal) => (
              <button
                key={meal.idMeal}
                onClick={() => navigate(`/recipe/${meal.idMeal}`)}
                className="group relative rounded-2xl overflow-hidden aspect-square text-left focus:outline-none"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold text-sm leading-tight line-clamp-2">
                    {meal.strMeal}
                  </p>
                  {meal.strCategory && (
                    <p className="text-amber-400 text-xs mt-1">{meal.strCategory}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}