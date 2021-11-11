import Link from 'next/link'
import { useState } from 'react'

const Suche = () => {
  const [search, setSearch] = useState<string>('')

  const handleChange = (e: any): void => {
    setSearch(e.target.value)
    console.log(search)
  }

  return (
    <div className="">
      <form className="form" onSubmit={handleChange}>
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="text"
          placeholder="durchsuchen ... 🎯 "
          value={search}
          onChange={handleChange}
          required
        />
        <span className="absolute mt-2 -ml-8"> 🔎 </span>
        <Link
          href="/suchen/[search]"
          as={`/suchen/${search.toLowerCase().replace(/ /g, '+')}`}
        >
          <a>
            <input value="" type="submit" />
          </a>
        </Link>
      </form>
    </div>
  )
}

export default Suche
