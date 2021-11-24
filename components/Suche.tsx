import Link from 'next/link'
import React, { useState } from 'react'

const Suche = () => {
  const [search, setSearch] = useState<string>('')

  const handleChange = () => {
    // event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLFormElement | EventTarget | HTMLInputElement>) => {
    // setSearch(event.target.value)
    console.log(search)
  }

  return (
    <div>
      <form className="form" onSubmit={handleChange}>
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="text"
          placeholder="durchsuchen ... 🎯 "
          value={search}
          // By set a new value with the arrow function directly in the html tag, typescript will understand by default the type of event.
          onChange={(event) => { setSearch(event.target.value)}}
          required
          />
        <span 
          className="absolute mt-2 -ml-8 cursor-pointer"

        > 🔎 </span>
        <Link
          href="/suchen/[search]"
          as={`/suchen/${search.toLowerCase().replace(/ /g, '+')}`}
        >
          <a>
            <button aria-label='suchen' value="" type="submit" />
          </a>
        </Link>
      </form>
    </div>
  )
}

export default Suche
