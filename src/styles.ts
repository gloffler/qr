const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    minHeight: '100vh', // lässt Platz für Footer
    display: 'flex',
    flexDirection: 'column', // wichtig für vertikales Layout
    alignItems: 'center',
    paddingTop: '100px',
    paddingLeft: '1rem',
    paddingRight: '1rem',
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
    maxWidth: '400px',
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: '1.5rem',
    margin: 0,
  },
  input: {
    padding: '0.6rem 1rem',
    fontSize: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
    width: '90%',
    marginTop: '0rem',
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
  error: {
    color: '#f87171',
    fontSize: '0.9rem',
    marginTop: '1rem',
  },
}

export default styles
