const BASE = "https://www.themealdb.com/api/json/v1/1";

export const mealdb = {
  search: async (query) => {
    const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.meals || [];
  },

  getById: async (id) => {
    const res = await fetch(`${BASE}/lookup.php?i=${id}`);
    const data = await res.json();
    return data.meals?.[0] || null;
  },

  getRandom: async () => {
    const res = await fetch(`${BASE}/random.php`);
    const data = await res.json();
    return data.meals?.[0] || null;
  },

  getRandomMultiple: async (count = 8) => {
    const results = await Promise.all(
      Array.from({ length: count }, () => mealdb.getRandom())
    );
    // dedupe by idMeal
    const seen = new Set();
    return results.filter(m => m && !seen.has(m.idMeal) && seen.add(m.idMeal));
  },

  getCategories: async () => {
    const res = await fetch(`${BASE}/categories.php`);
    const data = await res.json();
    return data.categories || [];
  },

  getByCategory: async (category) => {
    const res = await fetch(`${BASE}/filter.php?c=${encodeURIComponent(category)}`);
    const data = await res.json();
    return data.meals || [];
  },

  // Parses the flat ingredient/measure fields into a clean array
  parseIngredients: (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient: ingredient.trim(), measure: (measure || "").trim() });
      }
    }
    return ingredients;
  }
};