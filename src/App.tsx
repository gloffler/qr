import { useState, useEffect, FormEvent, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import styles from './styles'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'url' | 'wifi'>('url')
  const [text, setText] = useState('')
  const [ssid, setSsid] = useState('')
  const [wifiPass, setWifiPass] = useState('')
  const [qrValue, setQrValue] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [error, setError] = useState('')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(prefersDark)
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

    if (activeTab === 'url') {
      if (!isValidUrl(text)) {
        setError('Please enter a valid URL (starting with http:// or https://)')
        setQrValue('')
        return
      }
      setError('')
      setQrValue(text)
    } else {
      const ssidValid = ssid.trim().length > 0
      const passValid = wifiPass.length >= 8 && /^[\x20-\x7E]+$/.test(wifiPass)

      if (!ssidValid || !passValid) {
        setError('SSID must not be empty. Password must be at least 8 valid characters.')
        setQrValue('')
        return
      }

      const wifiString = `WIFI:T:WPA;S:${ssid};P:${wifiPass};;`
      setError('')
      setQrValue(wifiString)
    }
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

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            margin: '1rem 0',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            style={{
              ...styles.button,
              backgroundColor: activeTab === 'url' ? '#3b82f6' : '#d1d5db',
              color: activeTab === 'url' ? 'white' : 'black',
            }}
          >
            URL
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wifi')}
            style={{
              ...styles.button,
              backgroundColor: activeTab === 'wifi' ? '#3b82f6' : '#d1d5db',
              color: activeTab === 'wifi' ? 'white' : 'black',
            }}
          >
            WiFi
          </button>
        </div>

        {activeTab === 'url' ? (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a valid URL"
            style={styles.input}
          />
        ) : (
          <>
            <input
              type="text"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
              placeholder="WiFi SSID"
              style={styles.input}
            />
            <input
              type="password"
              value={wifiPass}
              onChange={(e) => setWifiPass(e.target.value)}
              placeholder="WiFi Password"
              style={styles.input}
            />
          </>
        )}

        <button type="submit" style={styles.button}>
          Generate
        </button>

        {error && <p style={styles.error}>{error}</p>}

        {qrValue && (
          <>
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  padding: '12px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                }}
              >
                <QRCodeCanvas value={qrValue} size={200} ref={canvasRef} />
              </div>
            </div>
            <button type="button" style={{ ...styles.button, marginTop: '1rem' }} onClick={handleDownload}>
              Download
            </button>
          </>
        )}
      </form>
      <footer
        style={{
          marginTop: 'auto',
          padding: '2rem 0',
          textAlign: 'center',
          fontSize: '0.9rem',
          opacity: 0.6,
        }}
      >
        © 2025{' '}
        <a
          href="https://github.com/gloffler"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          Gregor Löffler
        </a>{' '}
        —{' '}
        <a
          href="https://opensource.org/licenses/MIT"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          MIT License
        </a>
      </footer>
    </div>
  )
}

export default App
