type ShuffleButtonProps = {
    onClick: () => void
}   

export default function ShuffleButton({ onClick }: ShuffleButtonProps) {

  return (
    <button
      onClick={onClick}
      className="flex h-16 w-16 items-center justify-center rounded-md bg-emerald-50 font-medium text-emerald-900 shadow-md transition hover:bg-emerald-100"
      aria-label="Shuffle meal"
    >
      <span className="material-symbols-outlined text-3xl" aria-hidden>shuffle</span>
    </button>
  )
}