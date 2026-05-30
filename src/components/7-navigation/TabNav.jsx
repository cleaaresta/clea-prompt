import { useState } from 'react'

export default function TabNav({ tabs = [], defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  return (
    <div className="glamour-tabs">
      <div style={{
        display: 'flex', gap: '4px', borderBottom: '2px solid #e8e1ec',
        marginBottom: '24px',
      }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontWeight: activeIndex === index ? 700 : 400,
              color: activeIndex === index ? '#7b61c4' : '#a89fb8',
              borderBottom: activeIndex === index ? '2px solid #7b61c4' : '2px solid transparent',
              marginBottom: '-2px',
              transition: 'all 0.2s ease',
              fontSize: '0.95rem',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[activeIndex]?.content}</div>
    </div>
  )
}
