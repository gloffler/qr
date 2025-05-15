import { useState, useEffect, FormEvent, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import styles from './styles'
import './App.css' // für Toggle-Styling

function App() {
  const [text, setText] = useState('')
  const [qrValue, setQrValue] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [error, setError] = useState('')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    // Beim ersten Laden: System-Darkmode prüfen
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(prefersDark)

    // Theme setzen, wenn sich State ändert
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isValidUrl(text)) {
      setError('Please enter a valid URL (starting with http:// or https://)')
      setQrValue('')
      return
    }
    setError('')
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
          <label className="theme-toggle">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="theme-slider"></span>
          </label>
        </div>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a valid URL"
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Generate
        </button>

        {error && <p style={styles.error}>{error}</p>}

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

export default App
