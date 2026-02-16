import { Link } from 'react-router-dom'
import type { Meal } from '../types/meal'

type MealCardProps = {
    meal: Meal
} 

export default function MealCard({ meal }: MealCardProps) {

    return ( 
        <Link 
            to={`/meal/${meal.idMeal}`} 
            className="overflow-hidden rounded-xl bg-emerald-50/95 text-emerald-950 shadow-md transition hover:scale-[1.01] hover:shadow-lg border border-emerald-200/50">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="h-52 w-full object-cover" />
            <h3 className="p-3 text-lg font-semibold text-emerald-950 sm:text-xl">{meal.strMeal}</h3>
        </Link>
       )
}
