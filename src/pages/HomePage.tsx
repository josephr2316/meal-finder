import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ShuffleButton from "../components/ShuffleButton";
import  MealCard  from "../components/MealCard";
import type { Meal, MealsResponse } from '../types/meal';

export default function HomePage() {
    const [query, setQuery] = useState("");
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const searchMeals = async (term: string) => {
        try {
            setLoading(true);
            setError("");   
            const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(term)}`
            )
            
            if (!res.ok) 
                throw new Error('Request failed')
            const data: MealsResponse = await res.json()
            setMeals(data.meals ?? [])
        } catch {
            setError('Could not load meals.')
            setMeals([])
        } finally {
            setLoading(false)
        }
    }
    
    const handleShuffle = async () => {
        try {
            const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            if (!res.ok) 
                throw new Error('Request failed')
            const data: MealsResponse = await res.json()
            const randomMeal = data.meals?.[0]
            if (randomMeal) 
                navigate(`/meal/${randomMeal.idMeal}`)
        } catch {
            setError('Could not load random meal.')
        }
    }

    useEffect(() => {
        searchMeals('chicken')
    }, [])

     return (
    <main className="min-h-screen w-full bg-emerald-950 px-4 py-10">
      <section className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-center text-6xl font-bold text-emerald-50">Meal Finder</h1>

        <div className="flex items-center gap-4">
          <SearchBar value={query} onChange={setQuery} onSearch={() => searchMeals(query)} />
          <ShuffleButton onClick={handleShuffle} />
        </div>

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
