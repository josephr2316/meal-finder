import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Meal, MealsResponse } from '../types/meal'

export default function MealDetailPage() {
  const { id } = useParams()
  const [meal, setMeal] = useState<Meal | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError('')
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Request failed')
        return res.json()
      })
      .then((data: MealsResponse) => {
        setMeal(data.meals?.[0] ?? null)
      })
      .catch(() => {
        setError('Could not load meal detail.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  return (
    <main className="min-h-screen w-full bg-emerald-950 text-emerald-50">
      <div className="mx-auto w-[92%] max-w-5xl py-8">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-2 rounded-lg border border-emerald-50/10 bg-emerald-50/10 px-4 py-2 text-sm font-medium text-emerald-50 transition hover:bg-emerald-50/15"
        >
          ← Back
        </Link>

        {loading && <p className="text-emerald-50">Loading...</p>}
        {error && <p className="text-red-300">{error}</p>}
        {!loading && !error && !meal && <p className="text-emerald-50">Meal not found.</p>}

        {meal && (
          <article className="overflow-hidden rounded-2xl bg-emerald-50/95 text-emerald-950 shadow-xl">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="h-72 w-full object-cover"
            />
            <div className="p-6 md:p-8">
              <h1 className="text-3xl font-semibold tracking-tight">{meal.strMeal}</h1>
              <div className="mt-2 flex flex-wrap gap-2">
                {meal.strCategory && (
                  <span className="rounded-full bg-emerald-900/10 px-3 py-1 text-xs font-semibold">
                    {meal.strCategory}
                  </span>
                )}
                {meal.strArea && (
                  <span className="rounded-full bg-emerald-900/10 px-3 py-1 text-xs font-semibold">
                    {meal.strArea}
                  </span>
                )}
              </div>
              <p className="mt-5 max-w-3xl whitespace-pre-line text-sm leading-7 text-emerald-950/80 md:text-base">
                {meal.strInstructions}
              </p>
            </div>
          </article>
        )}
      </div>
    </main>
  )
}
