import { useState, useEffect, FormEvent, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

function App() {
  const [text, setText] = useState('')
  const [qrValue, setQrValue] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Initialisiere Darkmode bei App-Start
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      setDarkMode(saved === 'dark')
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkMode(systemPrefersDark)
    }
  }, [])

  // Theme anwenden
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setQrValue(text)
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download = 'qr-code.png'
    link.click()
  }

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.heading}>QR Code Generator</h1>
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            style={styles.toggleButton}
            title="Toggle theme"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL"
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Generate
        </button>

        {qrValue && (
          <>
            <div style={{ marginTop: '2rem' }}>
              <QRCodeCanvas value={qrValue} size={200} ref={canvasRef} />
            </div>
            <button type="button" style={{ ...styles.button, marginTop: '1rem' }} onClick={handleDownload}>
              Download
            </button>
          </>
        )}
      </form>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    backgroundColor: 'var(--bg)',
    color: 'var(--text)',
    transition: 'all 0.3s ease',
  },
  card: {
    padding: '2rem',
    borderRadius: '1rem',
    backgroundColor: 'var(--card-bg)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: '1.5rem',
  },
  toggleButton: {
    fontSize: '1.5rem',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
  input: {
    padding: '0.6rem 1rem',
    fontSize: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
    width: '100%',
    maxWidth: '300px',
    marginTop: '1.5rem',
    marginBottom: '1rem',
  },
  button: {
    padding: '0.6rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '0.5rem',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: 'white',
    cursor: 'pointer',
  },
}

export default App
