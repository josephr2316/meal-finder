type ForkSpoonIconProps = {
  className?: string
  size?: number
}

export default function ForkSpoonIcon({ className = '', size }: ForkSpoonIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size ?? '100%'}
      height={size ?? '100%'}
      className={className}
      aria-hidden
    >
      {/* Fork first (behind): right side, handle bottom-right to tines top-right, 4 square-ended tines */}
      <path
        d="M38 38 L38 18 M35 10 L35 17 M37 10 L37 17 M39 10 L39 17 M41 10 L41 17"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      {/* Spoon on top: left side, oval bowl at top-left, handle to bottom-right */}
      <path
        d="M10 8 Q6 11 10 14 Q14 11 10 8 L10 15 L26 38 Q28 40 30 38"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
