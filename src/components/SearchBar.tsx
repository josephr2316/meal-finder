type SearchBarProps = {
    value: string
    onChange: (value: string) => void
    onSearch: () => void
}

export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {

    return ( 
        <div className="flex h-16 flex-1 overflow-hidden rounded-md bg-emerald-50 shadow-md">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                placeholder="Search for meals or keywords"
                className="h-full w-full bg-emerald-50 px-4 text-base text-emerald-950 outline-none placeholder:text-emerald-500 sm:px-5 sm:text-xl md:text-2xl"
            />
            <button
                onClick={onSearch}
                className="border-l border-emerald-200/60 bg-emerald-50 px-5 font-medium text-emerald-900 transition hover:bg-emerald-100"
                aria-label="Search"
            >
                <span className="material-symbols-outlined text-4xl">search</span>
            </button>
        </div>

       )
}
