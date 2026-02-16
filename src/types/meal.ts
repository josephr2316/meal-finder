export type Meal = {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strInstructions: string | null
  strCategory: string | null
  strArea: string | null
}

export type MealsResponse = {
    meals: Meal[] | null
}