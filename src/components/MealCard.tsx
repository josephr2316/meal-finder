import { Link } from 'react-router-dom'
import type { Meal } from '../types/meal'

type MealCardProps = {
    meal: Meal
} 

export default function MealCard({ meal }: MealCardProps) {

    return ( 
        <Link 
            to={`/meal/${meal.idMeal}`} 
            className="overflow-hidden rounded-xl bg-white shadow transition hover:scale-[1.01]
            hover:shadow-lg border border-slate-200">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="h-52 w-full object-cover" />
            <h3 className="p-3 font-semibold text-slate-800">{meal.strMeal}</h3>
        </Link>
       )
}
