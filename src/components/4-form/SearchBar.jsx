import { useState } from 'react'

export default function SearchBar({
  placeholder = 'Search...',
  onSearch,
  className = '',
}) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim() && onSearch) {
      onSearch(query.trim())
      setQuery('')
    }
  }

  return (
    <form className={`search-form ${className}`.trim()} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">🔍</button>
    </form>
  )
}
