import { useEffect, useState } from 'react'

// F8 (bonus): a viewport listener. The effect adds one `resize` listener
// when the component mounts ([] dependencies) and the cleanup removes it,
// so the listener does not stay behind after the component is gone.
function layoutFor(width) {
  if (width < 720) return { name: 'Phone layout', columns: 1 }
  if (width < 1024) return { name: 'Tablet layout', columns: 2 }
  return { name: 'Desktop layout', columns: 3 }
}

function WindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth)

  useEffect(() => {
    const measure = () => setWidth(window.innerWidth)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const layout = layoutFor(width)

  return (
    <div className="stack">
      <p className="big-number">{width}px</p>
      <p className="notice" aria-live="polite">{layout.name}: {layout.columns} column{layout.columns > 1 ? 's' : ''}. Resize the window to change it.</p>
      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))` }}>
        {['Navigation', 'Content', 'Sidebar'].map((label) => (
          <div key={label} className="card small">{label}</div>
        ))}
      </div>
    </div>
  )
}

export default WindowWidth
