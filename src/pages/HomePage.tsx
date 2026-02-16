import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ShuffleButton from "../components/ShuffleButton";
import MealCard from "../components/MealCard";
import CategoryCard from "../components/CategoryCard";
import type { Meal, MealsResponse, Category, CategoriesResponse } from '../types/meal';
import mealIcon from "../assets/meal-icon-white.svg?url";

export default function HomePage() {
    const [query, setQuery] = useState("");
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const navigate = useNavigate();
    const categoryScrollRef = useRef<HTMLDivElement>(null);

    const scrollCategories = (direction: 'left' | 'right') => {
        const el = categoryScrollRef.current;
        if (!el) return;
        const step = 200;
        el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
    };

    const searchMeals = (term: string) => {
        setSelectedCategory(null);
        const trimmed = term.trim();
        if (!trimmed) {
            setMeals([]);
            setError("");
            setLoading(false);
            return;
        }
        setLoading(true);
        setError("");
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(trimmed)}`)
            .then((res) => {
                if (!res.ok) throw new Error("Request failed");
                return res.json();
            })
            .then((data: MealsResponse) => {
                setMeals(data.meals ?? []);
            })
            .catch(() => {
                setError("Could not load meals.");
                setMeals([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    
    const handleShuffle = () => {
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then((res) => {
                if (!res.ok) throw new Error("Request failed");
                return res.json();
            })
            .then((data: MealsResponse) => {
                const randomMeal = data.meals?.[0];
                if (randomMeal) navigate(`/meal/${randomMeal.idMeal}`);
            })
            .catch(() => {
                setError("Could not load random meal.");
            });
    }

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory(categoryName);
        setLoading(true);
        setError("");
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(categoryName)}`)
            .then((res) => {
                if (!res.ok) throw new Error("Request failed");
                return res.json();
            })
            .then((data: MealsResponse) => {
                setMeals(data.meals ?? []);
            })
            .catch(() => {
                setError("Could not load meals.");
                setMeals([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        searchMeals('chicken');
    }, []);

    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
            .then((res) => {
                if (!res.ok) throw new Error("Request failed");
                return res.json();
            })
            .then((data: CategoriesResponse) => {
                setCategories(data.categories ?? []);
            })
            .catch(() => {
                setCategories([]);
            })
            .finally(() => {
                setCategoriesLoading(false);
            });
    }, []);

     return (
    <main className="min-h-screen w-full bg-emerald-950 px-4 py-10 text-emerald-50">
      <header className="mx-auto mt-6 w-[92%] max-w-5xl rounded-2xl bg-emerald-900/70 px-6 py-4 shadow-lg backdrop-blur sm:px-8 sm:py-5 md:px-10 md:py-6">
        <h1 className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5" style={{ fontFamily: "'Pacifico', cursive" }}>
          <img
            src={mealIcon}
            alt="Meal Icon"
            className="h-14 w-14 shrink-0 sm:h-16 sm:w-16 md:h-20 md:w-20"
            aria-hidden
          />
          <span className="text-4xl font-bold text-emerald-50 sm:text-5xl md:text-6xl">Meal Finder</span>
        </h1>
      </header>

      <section className="mx-auto mt-8 max-w-5xl">
        <div className="flex items-center gap-2 sm:gap-4">
          <SearchBar value={query} onChange={setQuery} onSearch={() => searchMeals(query)} />
          <ShuffleButton onClick={handleShuffle} />
        </div>

        <p className="my-6 text-center text-emerald-200/80">OR</p>
        <p className="text-center font-semibold text-emerald-100">Browse by category</p>
        {categoriesLoading ? (
          <p className="mt-4 text-center text-emerald-50">Loading categories...</p>
        ) : (
          <div className="relative mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollCategories('left')}
              className="absolute left-0 z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-50/10 bg-emerald-50/15 text-emerald-50 shadow-md transition hover:bg-emerald-50/25 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label="Scroll categories left"
            >
              <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>
            <div
              ref={categoryScrollRef}
              className="scrollbar-hide flex flex-1 gap-3 overflow-x-auto scroll-smooth py-2 pl-12 pr-12 [-webkit-overflow-scrolling:touch]"
            >
              {categories.map((cat) => (
                <CategoryCard
                  key={cat.strCategory}
                  category={cat}
                  onClick={() => handleCategoryClick(cat.strCategory)}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollCategories('right')}
              className="absolute right-0 z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-50/10 bg-emerald-50/15 text-emerald-50 shadow-md transition hover:bg-emerald-50/25 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label="Scroll categories right"
            >
              <span className="material-symbols-outlined text-2xl">chevron_right</span>
            </button>
          </div>
        )}

        {selectedCategory && (
          <p className="mt-6 text-emerald-200/90">
            Recipes in <strong className="text-emerald-50">{selectedCategory}</strong>. Search above to see other results.
          </p>
        )}

        {loading && <p className="mt-6 text-emerald-50">Loading...</p>}
        {error && <p className="mt-6 text-red-300">{error}</p>}
        {!loading && !error && meals.length === 0 && (
          <p className="mt-6 text-emerald-50">No results found.</p>
        )}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      </section>
    </main>
  );
}
