type SearchBarProps = {
    value: string
    onChange: (value: string) => void
    onSearch: () => void
}

export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {

    return ( 
        <div className="flex h-16 flex-1 overflow-hidden rounded-md bg-white">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                placeholder="Search for meals or keywords"
                className="h-full w-full px-5 text-2xl outline-none placeholder:text-slate-500"
            />
            <button
                onClick={onSearch}
                className="border-l border-slate-300 px-5 hover:bg-slate-100"
                aria-label="Search"
            >
                <span className="material-symbols-outlined text-4xl">search</span>
            </button>
        </div>

       )
}
