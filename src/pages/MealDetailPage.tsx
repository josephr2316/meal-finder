import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Meal, MealsResponse } from '../types/meal'

export default function MealDetailPage() {
  const { id } = useParams()
  const [meal, setMeal] = useState<Meal | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMealById = async () => {
      if (!id) return
      try {
        setLoading(true)
        setError('')
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        if (!res.ok) throw new Error('Request failed')
        const data: MealsResponse = await res.json()
        setMeal(data.meals?.[0] ?? null)
      } catch {
        setError('Could not load meal detail.')
      } finally {
        setLoading(false)
      }
    }

    fetchMealById()
  }, [id])

  return (
    <main className="min-h-screen w-full bg-emerald-950 px-4 py-10">
      <section className="mx-auto max-w-4xl">
        <Link to="/" className="mb-6 inline-block rounded bg-white px-4 py-2 font-medium text-slate-800">
          Back
        </Link>

        {loading && <p className="text-emerald-50">Loading...</p>}
        {error && <p className="text-red-300">{error}</p>}
        {!loading && !error && !meal && <p className="text-emerald-50">Meal not found.</p>}

        {meal && (
          <article className="overflow-hidden rounded-xl bg-white shadow-xl">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="h-80 w-full object-cover" />
            <div className="p-6">
              <h1 className="text-3xl font-bold text-slate-900">{meal.strMeal}</h1>
              <p className="mt-2 text-slate-600">
                {meal.strCategory} · {meal.strArea}
              </p>
              <p className="mt-4 whitespace-pre-line text-slate-700">{meal.strInstructions}</p>
            </div>
          </article>
        )}
      </section>
    </main>
  )
}
