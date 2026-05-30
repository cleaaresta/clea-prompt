import { useState } from 'react'

export default function FavoriteButton({ isFavorite = false, onToggle }) {
  const [fav, setFav] = useState(isFavorite)

  const handleClick = () => {
    setFav(!fav)
    if (onToggle) onToggle(!fav)
  }

  return (
    <button onClick={handleClick} style={{
      background: 'none', border: 'none', cursor: 'pointer',
      fontSize: '1.2rem', padding: '4px',
      transition: 'transform 0.2s ease',
      transform: fav ? 'scale(1.2)' : 'scale(1)',
    }}>
      {fav ? '❤️' : '🤍'}
    </button>
  )
}
