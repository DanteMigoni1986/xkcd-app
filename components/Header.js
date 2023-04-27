import { useState, useRef } from 'react'
import Link from 'next/link'

export function Header() {
    const [results, setResults] = useState([])
    const searchRef = useRef()

    const getValue = () => searchRef.current?.value

    const handleChange = () => {
        const q = getValue()

        fetch(`/api/search?q=${q}`)
            .then(res => res.json())
            .then(searchResults => {
                setResults(searchResults)
            })
    }

    return (
        <header className='flex justify-between items-center p-4 max-w-xl m-auto'>
            <h1 className='font-bold'>
                <Link href='/' className="transition hover:opacity-80">
                    next<span className='font-light'>xkcd</span>
                </Link>
            </h1>
            <nav>
                <ul className="flex flex-row gap-2">
                    <li>
                        <Link href='/' className="text-sm font-bold">Home</Link>
                        </li>
                    <li>
                        <input className='px-4 py-1 border border-gray-400 rounded-3xl text-xs' ref={searchRef} type='search' onChange={handleChange}/>
                        <div className="relative z-10">
                            {
                                Boolean(results.length) && <div className="absolute top-0 left-0">
                                    <ul className='z-50 w-full border rounded-lg shadow-xl border-gray-50 bg-white overflow-hidden'>
                                        <li className='m-0' key='all-results'>
                                            <Link href={`/search?q=${getValue()}`} className="italic overflow-hidden text-sm text-ellipsis whitespace-nowrap 
                                            font-semibold block hover:bg-slate-200 px-2 py-1 text-gray-400">
                                                Ver {results.length} resultados
                                            </Link>
                                        </li>
                                        {results.map(result => {
                                            return (
                                                <li className='m-0' key={result.id}>
                                                    <Link href={`/comic/${result.id}`} className="overflow-hidden text-sm text-ellipsis whitespace-nowrap 
                                                    font-semibold block hover:bg-slate-200 px-2 py-1 ">
                                                        {result.title}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            }
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}