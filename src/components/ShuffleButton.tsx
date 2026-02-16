type ShuffleButtonProps = {
    onClick: () => void
}   

export default function ShuffleButton({ onClick }: ShuffleButtonProps) {

  return (
    <button
      onClick={onClick}
      className="h-16 w-16 rounded-md bg-white hover:bg-slate-100 flex items-center justify-center"
      aria-label="Shuffle meal"
    >
      <span className="material-symbols-outlined text-3xl">shuffle</span>
    </button>
  )
}