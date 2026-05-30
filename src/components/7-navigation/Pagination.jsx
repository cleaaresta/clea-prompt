export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="glamour-pagination" style={{
      display: 'flex', gap: '4px', alignItems: 'center',
      justifyContent: 'center', marginTop: '20px',
    }}>
      <button
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        style={{
          padding: '8px 14px', borderRadius: '12px', border: '1px solid #e8e1ec',
          background: 'white', cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
          color: '#4b4560', opacity: currentPage <= 1 ? 0.5 : 1,
        }}
      >
        ‹
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange && onPageChange(page)}
          style={{
            padding: '8px 14px', borderRadius: '12px', border: 'none',
            background: page === currentPage
              ? 'linear-gradient(135deg, #e95dfd 0%, #fb878c 100%)'
              : 'white',
            color: page === currentPage ? 'white' : '#4b4560',
            cursor: 'pointer', fontWeight: page === currentPage ? 700 : 400,
            boxShadow: page === currentPage ? '0 4px 12px rgba(155, 75, 255, 0.2)' : 'none',
          }}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        style={{
          padding: '8px 14px', borderRadius: '12px', border: '1px solid #e8e1ec',
          background: 'white', cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
          color: '#4b4560', opacity: currentPage >= totalPages ? 0.5 : 1,
        }}
      >
        ›
      </button>
    </div>
  )
}
