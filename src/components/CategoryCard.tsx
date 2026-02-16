import type { Category } from '../types/meal'

type CategoryCardProps = {
  category: Category
  onClick: () => void
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-24 shrink-0 flex-col items-center gap-1.5 rounded-xl bg-emerald-50/95 p-3 text-emerald-950 shadow-md transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:w-28 sm:p-4"
      aria-label={`View ${category.strCategory} recipes`}
    >
      <img
        src={category.strCategoryThumb}
        alt={category.strCategory}
        className="h-14 w-14 rounded-full object-cover sm:h-16 sm:w-16"
      />
      <span className="text-center text-xs font-semibold text-emerald-950 sm:text-sm">
        {category.strCategory}
      </span>
    </button>
  )
}
